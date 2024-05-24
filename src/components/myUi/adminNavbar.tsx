import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/auth/authProvider";

export default function AdminNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex h-[8vh] px-10 py-8 justify-between items-center">
      <Button variant={"outline"} onClick={() => navigate(-1)}>
        Back
      </Button>
      <h2></h2>
      <Button variant={"outline"} onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
