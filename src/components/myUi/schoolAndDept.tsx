import { useAuth } from "@/auth/authProvider";
import axios from "axios";
import { useEffect, useState } from "react";

export function SchoolAndDept() {
  const { isHod, departmentId } = useAuth();
  const [school, setSchool] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
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
    }
  }, [isHod]);
  return (
    <div className="flex flex-col">
      {isHod && <span className="">{`${school}`}</span>}
      {isHod && <span className="">{`${department}`}</span>}
    </div>
  );
}
