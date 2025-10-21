export const storage = {
  getUser() {
    const raw = localStorage.getItem("expenseTrackerUser");
    return raw ? JSON.parse(raw) : null;
  },
  setUser(user) {
    localStorage.setItem("expenseTrackerUser", JSON.stringify(user));
  },
  getTransactions(userId) {
    const raw = localStorage.getItem("expenseTrackerTransactions");
    if (!raw) return [];
    return JSON.parse(raw).filter((t) => t.userId === userId);
  },
  setTransactions(userId, items) {
    const raw = localStorage.getItem("expenseTrackerTransactions");
    const others = raw
      ? JSON.parse(raw).filter((t) => t.userId !== userId)
      : [];
    localStorage.setItem(
      "expenseTrackerTransactions",
      JSON.stringify([...others, ...items])
    );
  },
  getNotes(userId) {
    const raw = localStorage.getItem("expenseTrackerNotes");
    if (!raw) return [];
    return JSON.parse(raw).filter((n) => n.userId === userId);
  },
  setNotes(userId, items) {
    const raw = localStorage.getItem("expenseTrackerNotes");
    const others = raw
      ? JSON.parse(raw).filter((n) => n.userId !== userId)
      : [];
    localStorage.setItem(
      "expenseTrackerNotes",
      JSON.stringify([...others, ...items])
    );
  },
};
