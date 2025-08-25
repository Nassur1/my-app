import React, { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";

const BASE_URL = "http://localhost:3000"; // change to 3001 if your json-server runs there

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  // READ
  useEffect(() => {
    fetch(`${BASE_URL}/goals`)
      .then((r) => {
        if (!r.ok) throw new Error(`Fetch failed: ${r.status}`);
        return r.json();
      })
      .then((data) => setGoals(data))
      .catch((err) => setErrMsg(err.message))
      .finally(() => setLoading(false));
  }, []);

  // CREATE
  const addGoal = (goal) => {
    const payload = {
      ...goal,
      targetAmount: Number(goal.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    fetch(`${BASE_URL}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // 🚫 no id sent → json-server generates it
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Create failed: ${r.status}`);
        return r.json();
      })
      .then((newGoal) => setGoals((prev) => [...prev, newGoal]))
      .catch((err) => setErrMsg(err.message));
  };

  // UPDATE (generic PATCH for edits & deposits)
  const updateGoal = (id, updates) => {
    fetch(`${BASE_URL}/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Update failed: ${r.status}`);
        return r.json();
      })
      .then((updated) =>
        setGoals((prev) => prev.map((g) => (g.id === id ? updated : g)))
      )
      .catch((err) => setErrMsg(err.message));
  };

  // DELETE
  const deleteGoal = (id) => {
    fetch(`${BASE_URL}/goals/${id}`, { method: "DELETE" })
      .then((r) => {
        if (!r.ok) throw new Error(`Delete failed: ${r.status}`);
        setGoals((prev) => prev.filter((g) => g.id !== id));
      })
      .catch((err) => setErrMsg(err.message));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌟 Smart Goal Planner 🌟</h1>

      {errMsg && (
        <div style={styles.error}>⚠️ {errMsg}</div>
      )}

      <Overview goals={goals} />

      <GoalForm addGoal={addGoal} />

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading goals…</p>
      ) : (
        <GoalList
          goals={goals}
          deleteGoal={deleteGoal}
          updateGoal={updateGoal}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    background: "linear-gradient(135deg, #a8edea, #fed6e3)",
    borderRadius: "15px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  error: {
    background: "#ffe5e5",
    color: "#b10000",
    padding: "10px 12px",
    borderRadius: "8px",
    marginBottom: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
};

export default App;
