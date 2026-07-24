import { DatabaseZap } from "lucide-react";

export function EmptyState({ title, message, icon, action }) {
  const VisualIcon = icon || DatabaseZap;

  return (
    <div className="empty-state">
      <div className="empty-visual"><VisualIcon size={28} /></div>
      <div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
      {action ? <div className="empty-action">{action}</div> : null}
    </div>
  );
}
