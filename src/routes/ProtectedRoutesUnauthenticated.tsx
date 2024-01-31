import { useAuth } from "@/auth/authProvider";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutesAuth() {
  const { token, loading } = useAuth();
  console.log("token");
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!token) {
    return <Navigate to="/loginpage" />;
  }
  return <Outlet />;
}
