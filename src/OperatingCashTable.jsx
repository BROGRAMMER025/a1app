import React, { useEffect, useState } from "react";

function OperatingCashTable() {
  const API_URL =
    "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/dts/operating_cash_balance";

  const [data, setData] = useState([]); // Store full data
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const rowsPerPage = 10; // Define number of rows per page

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((json) => {
        console.log("API Response:", json); // ✅ Debugging Log
        setData(json.data); // ✅ Fetches all data without slicing
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // **Pagination Logic**
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Operating Cash Balance</h3>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Account Type</th>
              <th style={styles.th}>Closing Balance</th>
              <th style={styles.th}>Opening Balance</th>
              <th style={styles.th}>Fiscal Year</th>
              <th style={styles.th}>Calendar Year</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  <td style={styles.td}>{item.record_date}</td>
                  <td style={styles.td}>{item.account_type}</td>
                  <td style={styles.td}>{item.close_today_bal}</td>
                  <td style={styles.td}>{item.open_today_bal}</td>
                  <td style={styles.td}>{item.record_fiscal_year}</td>
                  <td style={styles.td}>{item.record_calendar_year}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.loading}>
                  Loading data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={styles.pagination}>
        <button 
          onClick={() => setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1} 
          style={styles.button}
        >
          Prev
        </button>
        <span style={styles.pageNumber}>
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={() => setCurrentPage(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          style={styles.button}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// 🔹 Inline Styles: Full-Page Scrolling with Pagination Buttons
const styles = {
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "100%",
  },
  tableContainer: {
    overflowX: "auto", // ✅ Enables horizontal scrolling
    width: "100vw", // ✅ Makes the table full viewport width
    whiteSpace: "nowrap", // ✅ Prevents table from wrapping
  },
  title: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    minWidth: "1200px", // ✅ Forces horizontal scrolling for smaller screens
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  td: {
    padding: "8px",
    border: "1px solid #ddd",
    fontSize: "12px",
  },
  loading: {
    padding: "10px",
    textAlign: "center",
    fontSize: "14px",
    color: "gray",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  button: {
    padding: "8px 12px",
    margin: "0 5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  pageNumber: {
    fontSize: "14px",
    margin: "0 10px",
  },
};

export default OperatingCashTable;
