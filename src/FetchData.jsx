import React, { useEffect, useState } from "react";

function FetchData() {
  const [data, setData] = useState([]);

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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Todos List</h2>
      <table border="1" style={{ width: "80%", margin: "auto", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th>ID</th>
            <th>Title</th>
            <th>Completed?</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td style={{ color: item.completed ? "green" : "red" }}>
                {item.completed ? "✅ Yes" : "❌ No"}
              </td>
              <td>{item.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FetchData;
