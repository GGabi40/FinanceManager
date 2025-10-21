import { useState } from "react";

export default function Notes({ notes, onCreate, onEdit }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", pinned: false });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim())
      return alert("Por favor ingresa un título para la nota");
    onCreate({ ...form });
    setForm({ title: "", content: "", pinned: false });
    setShowForm(false);
  };

  const pinned = notes.filter((n) => n.pinned);
  const normal = notes.filter((n) => !n.pinned);

  const Card = ({ note }) => (
    <div className={`card card-body p-3 ${note.pinned ? "note-pinned" : ""}`}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h4 className="h6 fw-semibold mb-0">{note.title}</h4>
        {note.pinned && (
          <span className="badge border rounded-pill bg-primary">
            Fijada
          </span>
        )}
      </div>
      <p className="text-secondary small mb-2">{note.content}</p>
      <div className="d-flex justify-content-between align-items-center text-muted small">
        <span>
          {new Date(note.createdAt).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
        <button
          className="btn btn-link p-0 text-primary"
          onClick={() => onEdit(note.id)}
        >
          <i className="fas fa-edit" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="h6 fw-semibold mb-0">Notas Personales</h3>
          <button
            className="btn btn-primary btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36 }}
            onClick={() => setShowForm((s) => !s)}
          >
            <i className="fas fa-plus" />
          </button>
        </div>

        {showForm && (
          <div className="fade-in mb-3">
            <form className="vstack gap-2" onSubmit={submit}>
              <div>
                <label className="form-label">Título</label>
                <input
                  className="form-control"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Contenido</label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                />
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="form-check">
                  <input
                    id="notePinned"
                    className="form-check-input"
                    type="checkbox"
                    checked={form.pinned}
                    onChange={(e) =>
                      setForm({ ...form, pinned: e.target.checked })
                    }
                  />
                  <label htmlFor="notePinned" className="form-check-label">
                    Fijar nota
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setShowForm(false);
                      setForm({ title: "", content: "", pinned: false });
                    }}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {notes.length === 0 && (
          <div className="p-3 text-center text-secondary">
            No hay notas creadas
          </div>
        )}
        <div className="vstack gap-2">
          {pinned.map((n) => (
            <Card key={n.id} note={n} />
          ))}
          {normal.map((n) => (
            <Card key={n.id} note={n} />
          ))}
        </div>
      </div>
    </div>
  );
}
