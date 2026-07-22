import { Loader2 } from "lucide-react";

export function Button({ children, icon: Icon, loading, variant = "primary", className = "", ...props }) {
  return (
    <button className={`btn btn-${variant} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 className="spin" size={17} /> : Icon ? <Icon size={17} /> : null}
      <span>{children}</span>
    </button>
  );
}
