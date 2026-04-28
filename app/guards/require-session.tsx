import { useAuth } from "../features/auth/hooks/use-auth";
import { Navigate, Outlet } from "react-router";

export default function RequireSession() {
  const { user, loading } = useAuth();

  if (!loading && !user) return <Navigate to="/auth/login" replace />;
  return <Outlet />;
}
