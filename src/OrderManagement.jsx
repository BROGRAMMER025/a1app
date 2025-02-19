import React, { useState, useEffect } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ name: "", status: "Pending" });
  const [editingOrder, setEditingOrder] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
    setFilteredOrders(savedOrders);
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
    filterOrders(filter);
  }, [orders]);

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, name: e.target.value });
  };

  const addOrder = () => {
    if (!newOrder.name) return alert("Order name cannot be empty!");

    const updatedOrders = [
      ...orders,
      { id: Date.now(), name: newOrder.name, status: newOrder.status },
    ];

    setOrders(updatedOrders);
    setNewOrder({ name: "", status: "Pending" });
  };

  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  const startEdit = (order) => {
    setEditingOrder(order);
  };

  const saveEdit = () => {
    const updatedOrders = orders.map((order) =>
      order.id === editingOrder.id ? editingOrder : order
    );

    setOrders(updatedOrders);
    setEditingOrder(null);
  };

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const filterOrders = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Manage Your Orders</h3>
        <div>
          <input
            type="text"
            placeholder="Enter Order Name"
            value={newOrder.name}
            onChange={handleInputChange}
            style={styles.input}
          />
          <select
            value={newOrder.status}
            onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
            style={styles.select}
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={addOrder} style={styles.button}>
            Add Order
          </button>
        </div>

        <div>
          <button onClick={() => filterOrders("All")} style={styles.button}>
            All
          </button>
          <button onClick={() => filterOrders("Pending")} style={styles.button}>
            Pending
          </button>
          <button
            onClick={() => filterOrders("In Transit")}
            style={styles.button}
          >
            In Transit
          </button>
          <button
            onClick={() => filterOrders("Completed")}
            style={styles.button}
          >
            Completed
          </button>
        </div>

        <div>
          {filteredOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} style={styles.orderCard}>
                <h4>{order.name}</h4>
                <p>Status: {order.status}</p>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  style={styles.select}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Completed">Completed</option>
                </select>
                <button onClick={() => deleteOrder(order.id)} style={styles.button}>
                  Delete
                </button>
                <button onClick={() => startEdit(order)} style={styles.button}>
                  Edit
                </button>

                {editingOrder && editingOrder.id === order.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingOrder.name}
                      onChange={(e) =>
                        setEditingOrder({ ...editingOrder, name: e.target.value })
                      }
                      style={styles.input}
                    />
                    <select
                      value={editingOrder.status}
                      onChange={(e) =>
                        setEditingOrder({ ...editingOrder, status: e.target.value })
                      }
                      style={styles.select}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Completed">Completed</option>
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

// Adjusted styles
const styles = {
  container: {
    textAlign: "center",
    width: "100%",
    marginLeft: "260px", // Moves the entire component away from the sidebar
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    margin: "auto",
  },
  input: {
    padding: "8px",
    marginRight: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  select: {
    padding: "8px",
    marginRight: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
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
  orderCard: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default OrderManagement;
