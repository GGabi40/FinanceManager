import { useState } from "react";

export default function QuickAddTransaction({ onAdd }) {
  // --- componente agregar-transaccion (js) ---
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("comida");
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!num || num <= 0) return alert("Por favor ingresa una cantidad válida");
    onAdd({ type, amount: num, category, description });
    setAmount("");
    setCategory("comida");
    setDescription("");
    setType("income");
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="h6 fw-semibold mb-3">Agregar Transacción</h3>
        <form className="vstack gap-2" onSubmit={submit}>
          <div>
            <label className="form-label">Tipo</label>
            <div className="d-flex gap-2">
              <button
                type="button"
                className={`btn w-100 ${
                  type === "income" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setType("income")}
              >
                Ingreso
              </button>
              <button
                type="button"
                className={`btn w-100 ${
                  type === "expense" ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => setType("expense")}
              >
                Gasto
              </button>
            </div>
          </div>
          <div>
            <label className="form-label">Importe</label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="comida">Comida</option>
              <option value="transporte">Transporte</option>
              <option value="entretenimiento">Entretenimiento</option>
              <option value="salario">Salario</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          <div>
            <label className="form-label">Descripción</label>
            <input
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-1 w-100">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}
