import React, { useState, useEffect } from "react";

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [newDelivery, setNewDelivery] = useState({ recipient: "", address: "", status: "Pending" });
  const [editingDelivery, setEditingDelivery] = useState(null);
  const [filter, setFilter] = useState("All");

  // Load deliveries from localStorage
  useEffect(() => {
    const savedDeliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
    setDeliveries(savedDeliveries);
    setFilteredDeliveries(savedDeliveries);
  }, []);

  // Save deliveries to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("deliveries", JSON.stringify(deliveries));
    filterDeliveries(filter);
  }, [deliveries]);

  // Handle input changes
  const handleInputChange = (e) => {
    setNewDelivery({ ...newDelivery, [e.target.name]: e.target.value });
  };

  // Add a new delivery
  const addDelivery = () => {
    if (!newDelivery.recipient || !newDelivery.address) {
      return alert("Please enter recipient and address.");
    }

    const updatedDeliveries = [
      ...deliveries,
      { id: Date.now(), ...newDelivery },
    ];

    setDeliveries(updatedDeliveries);
    setNewDelivery({ recipient: "", address: "", status: "Pending" });
  };

  // Delete a delivery
  const deleteDelivery = (id) => {
    const updatedDeliveries = deliveries.filter((delivery) => delivery.id !== id);
    setDeliveries(updatedDeliveries);
  };

  // Start editing a delivery
  const startEdit = (delivery) => {
    setEditingDelivery(delivery);
  };

  // Save edited delivery details
  const saveEdit = () => {
    const updatedDeliveries = deliveries.map((delivery) =>
      delivery.id === editingDelivery.id ? editingDelivery : delivery
    );

    setDeliveries(updatedDeliveries);
    setEditingDelivery(null);
  };

  // Update delivery status
  const updateStatus = (id, newStatus) => {
    const updatedDeliveries = deliveries.map((delivery) =>
      delivery.id === id ? { ...delivery, status: newStatus } : delivery
    );
    setDeliveries(updatedDeliveries);
  };

  // Filter deliveries by status
  const filterDeliveries = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredDeliveries(deliveries);
    } else {
      setFilteredDeliveries(deliveries.filter((delivery) => delivery.status === status));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Manage Deliveries</h3>

        {/* Add New Delivery Form */}
        <div>
          <input
            type="text"
            name="recipient"
            placeholder="Recipient Name"
            value={newDelivery.recipient}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="address"
            placeholder="Delivery Address"
            value={newDelivery.address}
            onChange={handleInputChange}
            style={styles.input}
          />
          <select
            name="status"
            value={newDelivery.status}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="Pending">Pending</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button onClick={addDelivery} style={styles.button}>
            Add Delivery
          </button>
        </div>

        {/* Filter Deliveries */}
        <div>
          <button onClick={() => filterDeliveries("All")} style={styles.button}>All</button>
          <button onClick={() => filterDeliveries("Pending")} style={styles.button}>Pending</button>
          <button onClick={() => filterDeliveries("Out for Delivery")} style={styles.button}>Out for Delivery</button>
          <button onClick={() => filterDeliveries("Delivered")} style={styles.button}>Delivered</button>
        </div>

        {/* Display Deliveries */}
        <div>
          {filteredDeliveries.length === 0 ? (
            <p>No deliveries found.</p>
          ) : (
            filteredDeliveries.map((delivery) => (
              <div key={delivery.id} style={styles.deliveryCard}>
                <h4>{delivery.recipient}</h4>
                <p>Address: {delivery.address}</p>
                <p>Status: {delivery.status}</p>
                <select
                  value={delivery.status}
                  onChange={(e) => updateStatus(delivery.id, e.target.value)}
                  style={styles.select}
                >
                  <option value="Pending">Pending</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button onClick={() => deleteDelivery(delivery.id)} style={styles.button}>
                  Delete
                </button>
                <button onClick={() => startEdit(delivery)} style={styles.button}>
                  Edit
                </button>

                {/* Edit Delivery Form */}
                {editingDelivery && editingDelivery.id === delivery.id ? (
                  <div>
                    <input
                      type="text"
                      name="recipient"
                      
                      
                    
                      value={editingDelivery.recipient}
                      onChange={(e) => setEditingDelivery({ ...editingDelivery, recipient: e.target.value })}
                      style={styles.input}
                    />
                    <input
                      type="text"
                      name="address"
                      value={editingDelivery.address}
                      onChange={(e) => setEditingDelivery({ ...editingDelivery, address: e.target.value })}
                      style={styles.input}
                    />
                    <select
                      name="status"
                      value={editingDelivery.status}
                      onChange={(e) => setEditingDelivery({ ...editingDelivery, status: e.target.value })}
                      style={styles.select}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
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
  deliveryCard: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
};

export default Deliveries;

