import React, { useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";

function App() {
  const [goals, setGoals] = useState([]);

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const editGoal = (id, newText) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, text: newText } : goal
      )
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌟 Smart Goal Planner 🌟</h1>
      <Overview goals={goals} />
      <GoalForm addGoal={addGoal} />
      <GoalList goals={goals} deleteGoal={deleteGoal} editGoal={editGoal} />
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
};

export default App;
