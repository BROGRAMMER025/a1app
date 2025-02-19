import React, { useState, useEffect } from "react";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "", email: "", type: "Regular" });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [filter, setFilter] = useState("All");

  // Load customers from localStorage
  useEffect(() => {
    const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(savedCustomers);
    setFilteredCustomers(savedCustomers);
  }, []);

  // Save customers to localStorage whenever there's a change
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
    filterCustomers(filter);
  }, [customers]);

  // Handle input changes for the new customer form
  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  // Add a new customer
  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone || !newCustomer.email) {
      return alert("Please fill in all customer details.");
    }

    const updatedCustomers = [
      ...customers,
      { id: Date.now(), ...newCustomer },
    ];

    setCustomers(updatedCustomers);
    setNewCustomer({ name: "", phone: "", email: "", type: "Regular" });
  };

  // Delete a customer
  const deleteCustomer = (id) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(updatedCustomers);
  };

  // Start editing a customer
  const startEdit = (customer) => {
    setEditingCustomer(customer);
  };

  // Save edited customer details
  const saveEdit = () => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === editingCustomer.id ? editingCustomer : customer
    );

    setCustomers(updatedCustomers);
    setEditingCustomer(null);
  };

  // Filter customers by type
  const filterCustomers = (type) => {
    setFilter(type);
    if (type === "All") {
      setFilteredCustomers(customers);
    } else {
      setFilteredCustomers(customers.filter((customer) => customer.type === type));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Manage Customers</h3>

        {/* Add New Customer Form */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={newCustomer.name}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={newCustomer.phone}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={newCustomer.email}
            onChange={handleInputChange}
            style={styles.input}
          />
          <select
            name="type"
            value={newCustomer.type}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="Regular">Regular</option>
            <option value="VIP">VIP</option>
            <option value="New">New</option>
          </select>
          <button onClick={addCustomer} style={styles.button}>
            Add Customer
          </button>
        </div>

        {/* Filter Customers */}
        <div>
          <button onClick={() => filterCustomers("All")} style={styles.button}>All</button>
          <button onClick={() => filterCustomers("Regular")} style={styles.button}>Regular</button>
          <button onClick={() => filterCustomers("VIP")} style={styles.button}>VIP</button>
          <button onClick={() => filterCustomers("New")} style={styles.button}>New</button>
        </div>

        {/* Display Customers */}
        <div>
          {filteredCustomers.length === 0 ? (
            <p>No customers found.</p>
          ) : (
            filteredCustomers.map((customer) => (
              <div key={customer.id} style={styles.customerCard}>
                <h4>{customer.name}</h4>
                <p>Phone: {customer.phone}</p>
                <p>Email: {customer.email}</p>
                <p>Type: {customer.type}</p>
                <button onClick={() => deleteCustomer(customer.id)} style={styles.button}>
                  Delete
                </button>
                <button onClick={() => startEdit(customer)} style={styles.button}>
                  Edit
                </button>

                {/* Edit Customer Form */}
                {editingCustomer && editingCustomer.id === customer.id ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={editingCustomer.name}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                      style={styles.input}
                    />
                    <input
                      type="text"
                      name="phone"
                      value={editingCustomer.phone}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                      style={styles.input}
                    />
                    <input
                      type="email"
                      name="email"
                      value={editingCustomer.email}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                      style={styles.input}
                    />
                    <select
                      name="type"
                      value={editingCustomer.type}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, type: e.target.value })}
                      style={styles.select}
                    >
                      <option value="Regular">Regular</option>
                      <option value="VIP">VIP</option>
                      <option value="New">New</option>
                    </select>
                    <button onClick={saveEdit} style={styles.button}>
                      Save
                    </button>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    width: "100%",
    marginLeft: "260px", // Moves the component away from the sidebar
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    margin: "auto",
  },
  input: {
    padding: "8px",
    marginRight: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "90%",
    display: "block",
    marginBottom: "10px",
  },
  select: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "95%",
    marginBottom: "10px",
  },
  button: {
    padding: "8px 12px",
    margin: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
  },
  customerCard: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
};

export default Customer;
