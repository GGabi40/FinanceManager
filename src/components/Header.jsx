export default function Header({ username, onToggleProfile }) {
  // --- componente header (js) ---
  return (
    // --- componente header (html) ---
    <header className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="h3 fw-bold text-primary">
        <i className="fas fa-wallet me-2" /> Control de Gastos
      </h1>
      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-white bg-white border rounded-3 shadow-sm d-flex align-items-center gap-2"
          onClick={onToggleProfile}
        >
          <div
            className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
            style={{ width: 32, height: 32 }}
          >
            <i className="fas fa-user small" />
          </div>
          <span className="fw-medium">{username}</span>
        </button>
      </div>
    </header>
  );
}
