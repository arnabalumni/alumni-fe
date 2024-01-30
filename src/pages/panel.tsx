import AdminNavbar from "@/components/myUi/adminNavbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GraduationCap, KeyRound, Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Panel() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>("Admin");
  const [adminOptionsDisplay, setAdminOptionsDisplay] =
    useState<string>("flex");

  useEffect(() => {}, []);
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col items-center gap-[7rem] py-[10rem]">
        <h1 className="text-3xl decoration-2 underline underline-offset-[12px]">
          {userType} Panel
        </h1>

        <div className="flex flex-col gap-5">
          <div className="flex gap-10">
            <Button className="w-[18rem] text-lg py-7 rounded-full" size={"lg"}>
              <Pencil size={15} className="mx-2" />
              Update Alumni
            </Button>
            <Button className="w-[18rem] text-lg py-7 rounded-full" size={"lg"}>
              <GraduationCap size={17} className="mx-2" />
              Add Alumni
            </Button>
          </div>
          <div className={cn("gap-10", adminOptionsDisplay)}>
            <Button
              className="w-[18rem] text-lg py-7 rounded-full"
              size={"lg"}
              variant={"outline"}
              onClick={() => {
                navigate("generatecredentials");
              }}
            >
              <KeyRound size={15} className="mx-2" />
              Generate Credentials
            </Button>
            <Button
              className="w-[18rem] text-lg py-7 rounded-full"
              size={"lg"}
              variant={"outline"}
            >
              <Plus size={15} className="mx-2" />
              Add Department
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
