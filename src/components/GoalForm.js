import React, { useState } from "react";

function GoalForm({ addGoal }) {
  const [form, setForm] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.targetAmount || !form.category || !form.deadline) {
      alert("Please fill in all fields.");
      return;
    }
    addGoal(form); // 🚫 do not add id here
    setForm({ name: "", targetAmount: "", category: "", deadline: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        name="name"
        type="text"
        placeholder="Goal name (e.g., Emergency Fund)"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        name="targetAmount"
        type="number"
        placeholder="Target amount"
        value={form.targetAmount}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        name="category"
        type="text"
        placeholder="Category (Travel, Education, …)"
        value={form.category}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={handleChange}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add Goal ➕</button>
    </form>
  );
}

const styles = {
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 160px 160px 180px 140px",
    gap: "8px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "10px",
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
    borderRadius: "10px",
  },
};

export default GoalForm;
