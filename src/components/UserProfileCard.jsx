import { useState } from "react";

export default function UserProfileCard({ user, onSave, onDelete }) {
  // --- componente perfil (js) ---
  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
  });

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    // --- componente perfil (html) ---
    <div className="card fade-in">
      <div className="card-body">
        <h3 className="h6 fw-semibold mb-3">Perfil de Usuario</h3>
        <form className="vstack gap-3" onSubmit={submit}>
          <div>
            <label className="form-label">Nombre de Usuario</label>
            <input
              className="form-control"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="d-flex gap-2 pt-1">
            <button type="submit" className="btn btn-primary w-100">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-outline-danger w-100"
              onClick={onDelete}
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
