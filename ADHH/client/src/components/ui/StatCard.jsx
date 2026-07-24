import React from "react";
export function StatCard({ label, value, meta, icon: Icon, tone = "neutral", trend }) {
  return (
    <section className={`stat-card tone-${tone}`} data-reveal>
      <div className="stat-icon">{Icon ? <Icon size={20} /> : null}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {meta ? <span>{meta}</span> : null}
      </div>
      {trend ? <em>{trend}</em> : null}
    </section>
  );
}
