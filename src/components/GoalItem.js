import React, { useState } from "react";

function GoalItem({ goal, deleteGoal, editGoal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(goal.text);

  const handleSave = () => {
    if (!newText.trim()) return;
    editGoal(goal.id, newText);
    setIsEditing(false);
  };

  return (
    <div style={styles.item}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSave} style={styles.saveButton}>💾</button>
          <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>✖</button>
        </>
      ) : (
        <>
          <span>{goal.text}</span>
          <div>
            <button onClick={() => setIsEditing(true)} style={styles.editButton}>✏️</button>
            <button onClick={() => deleteGoal(goal.id)} style={styles.deleteButton}>❌</button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "10px",
    borderRadius: "10px",
    margin: "8px 0",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  editButton: {
    background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
    border: "none",
    padding: "5px 10px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    marginRight: "5px",
  },
  saveButton: {
    background: "linear-gradient(135deg, #11998e, #38ef7d)",
    border: "none",
    padding: "5px 10px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    marginRight: "5px",
  },
  cancelButton: {
    background: "linear-gradient(135deg, #ff9966, #ff5e62)",
    border: "none",
    padding: "5px 10px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },
  deleteButton: {
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    border: "none",
    padding: "5px 10px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },
};

export default GoalItem;
