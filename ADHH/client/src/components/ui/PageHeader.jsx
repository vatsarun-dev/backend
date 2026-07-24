export function PageHeader({ eyebrow, title, subtitle, action, meta }) {
  return (
    <header className="page-header page-panel" data-reveal>
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
        {meta ? <div className="header-meta">{meta}</div> : null}
      </div>
      {action ? <div className="page-action">{action}</div> : null}
    </header>
  );
}
