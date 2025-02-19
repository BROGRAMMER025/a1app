import React, { useState, useEffect } from "react";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({ name: "", phone: "", vehicle: "", status: "Available" });
  const [editingDriver, setEditingDriver] = useState(null);
  const [filter, setFilter] = useState("All");

  // Load drivers from local storage
  useEffect(() => {
    const savedDrivers = JSON.parse(localStorage.getItem("drivers")) || [];
    setDrivers(savedDrivers);
    setFilteredDrivers(savedDrivers);
  }, []);

  // Save drivers to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem("drivers", JSON.stringify(drivers));
    filterDrivers(filter);
  }, [drivers]);

  // Handle input changes
  const handleInputChange = (e) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
  };

  // Add a new driver
  const addDriver = () => {
    if (!newDriver.name || !newDriver.phone || !newDriver.vehicle) {
      return alert("Please fill in all driver details.");
    }

    const updatedDrivers = [
      ...drivers,
      { id: Date.now(), ...newDriver },
    ];

    setDrivers(updatedDrivers);
    setNewDriver({ name: "", phone: "", vehicle: "", status: "Available" });
  };

  // Delete a driver
  const deleteDriver = (id) => {
    const updatedDrivers = drivers.filter((driver) => driver.id !== id);
    setDrivers(updatedDrivers);
  };

  // Start editing a driver
  const startEdit = (driver) => {
    setEditingDriver(driver);
  };

  // Save edited driver details
  const saveEdit = () => {
    const updatedDrivers = drivers.map((driver) =>
      driver.id === editingDriver.id ? editingDriver : driver
    );

    setDrivers(updatedDrivers);
    setEditingDriver(null);
  };

  // Update driver status
  const updateStatus = (id, newStatus) => {
    const updatedDrivers = drivers.map((driver) =>
      driver.id === id ? { ...driver, status: newStatus } : driver
    );
    setDrivers(updatedDrivers);
  };

  // Filter drivers by status
  const filterDrivers = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredDrivers(drivers);
    } else {
      setFilteredDrivers(drivers.filter((driver) => driver.status === status));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Manage Drivers</h3>

        {/* Add New Driver Form */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Driver Name"
            value={newDriver.name}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={newDriver.phone}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="vehicle"
            placeholder="Vehicle Type"
            value={newDriver.vehicle}
            onChange={handleInputChange}
            style={styles.input}
          />
          <select
            name="status"
            value={newDriver.status}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="Available">Available</option>
            <option value="On Duty">On Duty</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <button onClick={addDriver} style={styles.button}>
            Add Driver
          </button>
        </div>

        {/* Filter Drivers */}
        <div>
          <button onClick={() => filterDrivers("All")} style={styles.button}>All</button>
          <button onClick={() => filterDrivers("Available")} style={styles.button}>Available</button>
          <button onClick={() => filterDrivers("On Duty")} style={styles.button}>On Duty</button>
          <button onClick={() => filterDrivers("Unavailable")} style={styles.button}>Unavailable</button>
        </div>

        {/* Display Drivers */}
        <div>
          {filteredDrivers.length === 0 ? (
            <p>No drivers found.</p>
          ) : (
            filteredDrivers.map((driver) => (
              <div key={driver.id} style={styles.driverCard}>
                <h4>{driver.name}</h4>
                <p>Phone: {driver.phone}</p>
                <p>Vehicle: {driver.vehicle}</p>
                <p>Status: {driver.status}</p>
                <select
                  value={driver.status}
                  onChange={(e) => updateStatus(driver.id, e.target.value)}
                  style={styles.select}
                >
                  <option value="Available">Available</option>
                  <option value="On Duty">On Duty</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
                <button onClick={() => deleteDriver(driver.id)} style={styles.button}>
                  Delete
                </button>
                <button onClick={() => startEdit(driver)} style={styles.button}>
                  Edit
                </button>

                {/* Edit Driver Form */}
                {editingDriver && editingDriver.id === driver.id ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={editingDriver.name}
                      onChange={(e) => setEditingDriver({ ...editingDriver, name: e.target.value })}
                      style={styles.input}
                    />
                    <input
                      type="text"
                      name="phone"
                      value={editingDriver.phone}
                      onChange={(e) => setEditingDriver({ ...editingDriver, phone: e.target.value })}
                      style={styles.input}
                    />
                    <input
                      type="text"
                      name="vehicle"
                      value={editingDriver.vehicle}
                      onChange={(e) => setEditingDriver({ ...editingDriver, vehicle: e.target.value })}
                      style={styles.input}
                    />
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
    marginLeft: "260px", 
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
  driverCard: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
};

export default Drivers;
