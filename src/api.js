const BASE = "http://localhost:3000/goals";

export const getGoals = async () => {
  const res = await fetch(BASE);
  return res.json();
};

export const createGoal = async (goal) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  return res.json();
};

export const updateGoal = async (id, patch) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return res.json();
};

export const deleteGoal = async (id) => {
  await fetch(`${BASE}/${id}`, { method: "DELETE" });
};
