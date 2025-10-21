export default function TransactionsList({ items, onEdit }) {
  if (!items.length) {
    return (
      <div className="card">
        <div className="p-3 text-center text-secondary">
          No hay transacciones registradas
        </div>
      </div>
    );
  }

  const format = (iso) =>
    new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  const categoryName = (c) =>
    ({
      comida: "Comida",
      transporte: "Transporte",
      entretenimiento: "Entretenimiento",
      salario: "Salario",
      otros: "Otros",
    }[c] || c);

  return (
    <div className="card">
      <div className="list-group list-group-flush">
        {items.map((tr) => (
          <button
            key={tr.id}
            onClick={() => onEdit(tr.id)}
            className={`list-group-item list-group-item-action text-start ${
              tr.type === "income"
                ? "transaction-income"
                : "transaction-expense"
            }`}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fw-medium">{tr.description}</div>
                <div className="small text-secondary">
                  {format(tr.date)} • {categoryName(tr.category)}
                </div>
              </div>
              <div className="text-end">
                <div
                  className={`fw-semibold ${
                    tr.type === "income" ? "text-success" : "text-danger"
                  }`}
                >
                  {tr.type === "income" ? "+" : "-"}${tr.amount.toFixed(2)}
                </div>
                <div className="text-muted small">
                  {tr.type === "income" ? "Ingreso" : "Gasto"}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
