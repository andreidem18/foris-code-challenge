import { Navigate } from "react-router";
import { useAuth } from "~/features/auth/hooks/use-auth";
import { logout } from "~/features/auth/services/logout";
import { Button } from "~/ui/button/button";

export function meta() {
  return [
    { title: "Game" },
    { name: "description", content: "Memory game" },
  ];
}

export default function GamePage() {
  // TODO: implement in a specific component to validate session
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // o spinner
  }

  if (!user) return <Navigate to="/auth/login" replace />;

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
      <div>game</div>
    </div>
  );
}
