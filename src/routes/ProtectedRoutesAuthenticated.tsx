import { useAuth } from "@/auth/authProvider";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutesNoAuth() {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/adminpanel" />;
  }
  return <Outlet />;
}
