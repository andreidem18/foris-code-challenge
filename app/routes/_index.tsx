import { Navigate } from "react-router";

export async function IndexPage() {
  return <Navigate to="/login" />;
}
