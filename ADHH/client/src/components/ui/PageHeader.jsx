export function PageHeader({ eyebrow, title, subtitle, action, meta }) {
  return (
    <header className="page-header page-panel" data-reveal>
      <div className="page-header-copy">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
        {meta ? <div className="header-meta">{meta}</div> : null}
        {action ? <div className="page-action page-action-inline">{action}</div> : null}
      </div>
    </header>
  );
}
