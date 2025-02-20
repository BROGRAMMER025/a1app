import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function UsData() {
  const [data, setData] = useState([]); // ✅ Ensures 'data' is defined

  useEffect(() => {
    fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((json) => {
        console.log("API Response:", json);
        setData(json.data); // ✅ Stores only the 'data' array
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // ✅ Extract Year and Population
  const chartData = {
    labels: data.map((item) => item.Year).reverse(), // Shows years (ascending order)
    datasets: [
      {
        label: "U.S. Population",
        data: data.map((item) => item.Population).reverse(), // Population values
        backgroundColor: "rgba(0, 123, 255, 0.7)", // Blue bars
        borderColor: "rgba(0, 123, 255, 1)", // Darker blue border
        borderWidth: 2,
        barThickness: 50, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { display: false }, 
      title: { display: true, text: "U.S. Population Over the Years", font: { size: 20 } },
    },
    scales: {
      x: { title: { display: true, text: "Year", font: { size: 12 } } },
      y: { title: { display: true, text: "Population", font: { size: 12 } }, beginAtZero: false },
    },
  };

  return (
    <div style={{ width: "70%", height: "370px", margin: "auto", textAlign: "center", padding: "20px" }}>
      <h2>U.S. Population Data</h2>
      {data.length > 0 ? <Bar data={chartData} options={options} /> : <p>Loading data...</p>}
    </div>
  );
}

export default UsData;
