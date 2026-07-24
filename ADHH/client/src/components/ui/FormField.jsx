export function FormField({ label, error, hint, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {hint && !error ? <small className="field-hint">{hint}</small> : null}
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  );
}
