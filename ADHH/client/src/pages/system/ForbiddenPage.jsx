import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export function ForbiddenPage() {
  return (
    <main className="system-page">
      <h1>403</h1>
      <p>This account is not authorized for that workspace.</p>
      <Link to="/login"><Button>Return to login</Button></Link>
    </main>
  );
}
