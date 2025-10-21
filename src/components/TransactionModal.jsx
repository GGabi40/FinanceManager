import { useEffect, useState } from "react";

export default function TransactionModal({
  open,
  tx,
  onClose,
  onSave,
  onDelete,
}) {
  const [form, setForm] = useState({
    id: 0,
    type: "income",
    amount: 0,
    category: "comida",
    description: "",
  });

  useEffect(() => {
    if (tx)
      setForm({
        id: tx.id,
        type: tx.type,
        amount: tx.amount,
        category: tx.category,
        description: tx.description,
      });
  }, [tx]);

  const isIncome = form.type === "income";

  const submit = (e) => {
    e.preventDefault();
    onSave({ ...form, amount: parseFloat(form.amount) });
  };

  if (!open || !tx) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} />

      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h5 className="modal-title">Editar Transacción</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <form className="vstack gap-3" onSubmit={submit}>
                <div>
                  <label className="form-label">Tipo</label>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className={`btn w-100 ${
                        isIncome ? "btn-success" : "btn-outline-success"
                      }`}
                      onClick={() => setForm({ ...form, type: "income" })}
                    >
                      Ingreso
                    </button>
                    <button
                      type="button"
                      className={`btn w-100 ${
                        !isIncome ? "btn-danger" : "btn-outline-danger"
                      }`}
                      onClick={() => setForm({ ...form, type: "expense" })}
                    >
                      Gasto
                    </button>
                  </div>
                </div>
                <div>
                  <label className="form-label">Cantidad</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-control"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Categoría</label>
                  <select
                    className="form-select"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
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
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>
                <div className="d-flex justify-content-end gap-2 pt-1">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(form.id)}
                  >
                    Eliminar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
