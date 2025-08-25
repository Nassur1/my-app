import React from "react";

function Overview({ goals }) {
  return (
    <div style={styles.overview}>
      <h2>📊 Overview</h2>
      <p>Total Goals: <strong>{goals.length}</strong></p>
    </div>
  );
}

const styles = {
  overview: {
    background: "linear-gradient(135deg, #f6d365, #fda085)",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
  },
};

export default Overview;
