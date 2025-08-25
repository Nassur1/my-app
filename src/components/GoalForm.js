import React, { useState } from "react";

function GoalForm({ addGoal }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addGoal({ id: Date.now(), text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="✍️ Enter your goal..."
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add Goal ➕</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px 0 0 10px",
    border: "2px solid #4facfe",
    fontSize: "1rem",
  },
  button: {
    padding: "10px 15px",
    background: "linear-gradient(135deg, #43e97b, #38f9d7)",
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "0 10px 10px 0",
  },
};

export default GoalForm;
