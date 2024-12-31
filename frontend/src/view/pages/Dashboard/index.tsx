import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components/Button";

export function DashBoard() {
  const { signout } = useAuth();

  return (
    <div>
      <h1>Dashboard Page</h1>

      <Button onClick={signout}>Sair</Button>
    </div>
  );
}
