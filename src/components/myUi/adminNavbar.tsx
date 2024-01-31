import { Button } from "../ui/button";
import { useAuth } from "@/auth/authProvider";

export default function AdminNavbar() {
  const { logout } = useAuth();
  return (
    <div className="flex  h-[8vh] px-10 py-14 justify-end items-center">
      <Button variant={"ghost"} onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
