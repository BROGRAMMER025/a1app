import React, { useEffect, useState } from "react";

function FetchData() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // Number of items per page

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Calculate pagination range
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div style={{ 
      textAlign: "center", 
      padding: "20px", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      minHeight: "100vh", 
      justifyContent: "center"
    }}>
      <h2>Todos List</h2>
      <table 
        border="1" 
        style={{ 
          width: "80%", 
          borderCollapse: "collapse", 
          textAlign: "center",
          maxWidth: "600px" 
        }}
      >
        <thead>
          <tr style={{ background: "rgba(0, 123, 255, 0.7)" }}>
            <th>ID</th>
            <th>Title</th>
            <th>Completed?</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td style={{ color: item.completed ? "green" : "red" }}>
                {item.completed ? "✅ Yes" : "❌ No"}
              </td>
              <td>{item.userId}</td>
            </tr>
          ))}

          {/* Empty rows to maintain table size */}
          {Array.from({ length: ITEMS_PER_PAGE - currentData.length }).map((_, index) => (
            <tr key={`empty-${index}`}>
              <td colSpan="4" style={{ height: "30px" }}></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            marginRight: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px"
          }}
        >
          Previous
        </button>
        <span style={{ margin: "0 15px", fontSize: "18px", fontWeight: "bold" }}>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => (endIndex < data.length ? prev + 1 : prev))}
          disabled={endIndex >= data.length}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            marginLeft: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px"
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FetchData;
