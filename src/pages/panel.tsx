import { useAuth } from "@/auth/authProvider";
import AdminNavbar from "@/components/myUi/adminNavbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { GraduationCap, KeyRound, Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Panel() {
  const navigate = useNavigate();
  const { isHod, departmentId } = useAuth();
  const [userType, setUserType] = useState<string>("Admin");
  const [school, setSchool] = useState<string>("Admin");
  const [department, setDepartment] = useState<string>("Admin");
  const [adminOptionsDisplay, setAdminOptionsDisplay] =
    useState<string>("flex");

  useEffect(() => {
    if (isHod) {
      (async () => {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_LOCAL_SERVER_URL}/api/v1/getdepartment`,
          {
            id: departmentId,
          }
        );
        setSchool(response.data.schoolName);
        setDepartment(response.data.departmentName);
      })();
      setUserType("HOD");
      setAdminOptionsDisplay("hidden");
    }
  }, [isHod]);
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col items-center gap-[4rem] py-[10rem]">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl decoration-2 underline underline-offset-[12px]">
            {userType} Panel
          </h1>
          {isHod && <span className="">{`${school}, ${department}`}</span>}
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-10">
            <Button
              className="w-[18rem] text-lg py-7 rounded-full"
              size={"lg"}
              onClick={() => {
                navigate("updatealumni");
              }}
            >
              <Pencil size={15} className="mx-2" />
              Update Alumni
            </Button>
            <Button
              className="w-[18rem] text-lg py-7 rounded-full"
              size={"lg"}
              onClick={() => {
                navigate("addalumni");
              }}
            >
              <GraduationCap size={17} className="mx-2" />
              Add Alumni
            </Button>
            <Button
              className="flex min-w-[18rem] text-lg py-7 rounded-full"
              size={"lg"}
              onClick={() => {
                navigate("addalumnibulk");
              }}
            >
              <div className="flex h-auto">
                <GraduationCap size={17} className="" />
                <GraduationCap size={17} className="mx-2" />
              </div>
              <span>Add Alumni in Bulk</span>
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
