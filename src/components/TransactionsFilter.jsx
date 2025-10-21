export default function TransactionsFilter({ category, type, onChange }) {
  const set = (field, value) =>
    onChange((prev) => ({ ...prev, [field]: value }));
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-2">
          <h3 className="h6 fw-semibold mb-0">Transacciones</h3>
          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={category}
              onChange={(e) => set("category", e.target.value)}
            >
              <option value="all">Todas las categorías</option>
              <option value="comida">Comida</option>
              <option value="transporte">Transporte</option>
              <option value="entretenimiento">Entretenimiento</option>
              <option value="salario">Salario</option>
              <option value="otros">Otros</option>
            </select>
            <select
              className="form-select"
              value={type}
              onChange={(e) => set("type", e.target.value)}
            >
              <option value="all">Todos los tipos</option>
              <option value="income">Ingresos</option>
              <option value="expense">Gastos</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
