import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "../../components/ui/Button";

export function NotFoundPage() {
  return (
    <main className="system-page">
      <div className="system-card">
      <Compass size={34} />
      <h1>404</h1>
      <span className="eyebrow">Page missing</span>
      <p>The page you requested does not exist.</p>
      <Link to="/login"><Button>Go home</Button></Link>
      </div>
    </main>
  );
}
