import { DatabaseZap } from "lucide-react";

export function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <DatabaseZap size={28} />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
