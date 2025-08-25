import React, { useState } from "react";

function GoalList({ goals, deleteGoal, updateGoal }) {
  const [deposit, setDeposit] = useState({});
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  const beginEdit = (g) => {
    setEditId(g.id);
    setEditForm({
      name: g.name,
      targetAmount: g.targetAmount,
      category: g.category,
      deadline: g.deadline,
    });
  };

  const saveEdit = (id) => {
    const payload = {
      ...editForm,
      targetAmount: Number(editForm.targetAmount),
    };
    updateGoal(id, payload);
    setEditId(null);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const handleDeposit = (goal) => {
    const amt = Number(deposit[goal.id] || 0);
    if (!amt) return;
    const newSaved = Number(goal.savedAmount || 0) + amt;
    updateGoal(goal.id, { savedAmount: newSaved });
    setDeposit((d) => ({ ...d, [goal.id]: "" }));
  };

  return (
    <div>
      <h2 style={{ color: "#444", marginBottom: "10px" }}>🎯 Your Goals</h2>

      {goals.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#666" }}>
          No goals yet. Add one above! 🚀
        </p>
      ) : (
        goals.map((g) => {
          const saved = Number(g.savedAmount || 0);
          const target = Math.max(1, Number(g.targetAmount || 0)); // avoid /0
          const progress = Math.min(100, (saved / target) * 100);
          const remaining = Math.max(0, target - saved);

          const isEditing = editId === g.id;

          return (
            <div
              key={g.id}
              style={{
                padding: "15px",
                marginBottom: "15px",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {isEditing ? (
                <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 150px 150px 180px auto auto" }}>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                    style={styles.input}
                    placeholder="Name"
                  />
                  <input
                    type="number"
                    value={editForm.targetAmount}
                    onChange={(e) => setEditForm((f) => ({ ...f, targetAmount: e.target.value }))}
                    style={styles.input}
                    placeholder="Target"
                  />
                  <input
                    value={editForm.category}
                    onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))}
                    style={styles.input}
                    placeholder="Category"
                  />
                  <input
                    type="date"
                    value={editForm.deadline}
                    onChange={(e) => setEditForm((f) => ({ ...f, deadline: e.target.value }))}
                    style={styles.input}
                    placeholder="Deadline"
                  />
                  <button onClick={() => saveEdit(g.id)} style={styles.saveButton}>💾 Save</button>
                  <button onClick={cancelEdit} style={styles.cancelButton}>✖ Cancel</button>
                </div>
              ) : (
                <>
                  <h3 style={{ margin: "0 0 8px 0" }}>{g.name}</h3>
                  <p style={{ margin: "4px 0" }}>📂 Category: <strong>{g.category}</strong></p>
                  <p style={{ margin: "4px 0" }}>📅 Deadline: <strong>{g.deadline}</strong></p>
                  <p style={{ margin: "4px 0" }}>
                    💰 Saved: <strong>${saved.toLocaleString()}</strong> / ${target.toLocaleString()} ({progress.toFixed(1)}%)
                  </p>
                  <div style={styles.progressWrap}>
                    <div style={{ ...styles.progressBar, width: `${progress}%` }} />
                  </div>
                  <p style={{ marginTop: 6 }}>Remaining: ${remaining.toLocaleString()}</p>

                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10 }}>
                    <input
                      type="number"
                      min="0"
                      placeholder="Deposit amount"
                      value={deposit[g.id] || ""}
                      onChange={(e) =>
                        setDeposit((d) => ({ ...d, [g.id]: e.target.value }))
                      }
                      style={styles.input}
                    />
                    <button onClick={() => handleDeposit(g)} style={styles.depositButton}>
                      Deposit 💰
                    </button>
                    <button onClick={() => beginEdit(g)} style={styles.editButton}>
                      ✏️ Edit
                    </button>
                    <button onClick={() => deleteGoal(g.id)} style={styles.deleteButton}>
                      ❌ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

const styles = {
  input: {
    padding: "8px 10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
  },
  progressWrap: {
    width: "100%",
    height: 10,
    background: "#eee",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
  },
  depositButton: {
    background: "linear-gradient(135deg, #11998e, #38ef7d)",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  editButton: {
    background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  saveButton: {
    background: "linear-gradient(135deg, #11998e, #38ef7d)",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cancelButton: {
    background: "linear-gradient(135deg, #ff9966, #ff5e62)",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteButton: {
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default GoalList;
