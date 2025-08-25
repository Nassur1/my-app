import React from "react";
import GoalItem from "./GoalItem";

function GoalList({ goals, deleteGoal, editGoal }) {
  return (
    <div>
      <h2 style={styles.heading}>🎯 Your Goals</h2>
      {goals.length === 0 ? (
        <p style={styles.empty}>No goals yet. Add one above! 🚀</p>
      ) : (
        goals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} deleteGoal={deleteGoal} editGoal={editGoal} />
        ))
      )}
    </div>
  );
}

const styles = {
  heading: {
    color: "#444",
    marginBottom: "10px",
  },
  empty: {
    fontStyle: "italic",
    color: "#666",
  },
};

export default GoalList;
