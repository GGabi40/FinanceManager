import { useEffect, useState } from "react";

export default function NoteModal({ open, note, onClose, onSave, onDelete }) {
  const [form, setForm] = useState({
    id: 0,
    title: "",
    content: "",
    pinned: false,
  });

  useEffect(() => {
    if (note)
      setForm({
        id: note.id,
        title: note.title,
        content: note.content,
        pinned: note.pinned,
      });
  }, [note]);

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!open || !note) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} />

      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h5 className="modal-title">Editar Nota</h5>
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
                  <label className="form-label">Título</label>
                  <input
                    className="form-control"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Contenido</label>
                  <textarea
                    rows="4"
                    className="form-control"
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                  />
                </div>
                <div className="form-check">
                  <input
                    id="editNotePinned"
                    type="checkbox"
                    className="form-check-input"
                    checked={form.pinned}
                    onChange={(e) =>
                      setForm({ ...form, pinned: e.target.checked })
                    }
                  />
                  <label htmlFor="editNotePinned" className="form-check-label">
                    Fijar nota
                  </label>
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
