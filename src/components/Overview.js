import React from "react";

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + Number(g.savedAmount || 0), 0);
  const completed = goals.filter((g) => Number(g.savedAmount || 0) >= Number(g.targetAmount || 0)).length;

  const now = new Date();

  return (
    <div style={styles.overview}>
      <h2>📊 Overview</h2>
      <p>Total Goals: <strong>{totalGoals}</strong></p>
      <p>Total Saved: <strong>${totalSaved.toLocaleString()}</strong></p>
      <p>Completed: <strong>{completed}</strong></p>

      <div style={{ marginTop: 10 }}>
        {goals.map((g) => {
          const deadline = new Date(g.deadline);
          const msLeft = deadline - now;
          const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
          const done = Number(g.savedAmount || 0) >= Number(g.targetAmount || 0);

          if (done) {
            return (
              <p key={g.id} style={{ margin: "4px 0", color: "#0b7d3b" }}>
                ✅ <strong>{g.name}</strong> completed!
              </p>
            );
          }
          if (daysLeft < 0) {
            return (
              <p key={g.id} style={{ margin: "4px 0", color: "red" }}>
                ⏰ <strong>{g.name}</strong> is Overdue!
              </p>
            );
          }
          if (daysLeft <= 30) {
            return (
              <p key={g.id} style={{ margin: "4px 0", color: "orange" }}>
                ⚠️ <strong>{g.name}</strong> is due in {daysLeft} days!
              </p>
            );
          }
          return null;
        })}
      </div>
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
