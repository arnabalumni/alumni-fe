import { clearCookie, getCookie } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import AdminLayout from "../components/myUi/adminLayout";

export function ViewCredentials() {
  const queryParams = new URLSearchParams(location.search);
  const [username, setUsername] = useState(""); //set to ""
  const [password, setPassword] = useState(""); //set to ""
  const school = useRef(queryParams.get("school"));
  const department = useRef(queryParams.get("dept"));
  useEffect(() => {
    const credentialsCookie = getCookie("credentials");
    const credentialsParsed = credentialsCookie
      ? JSON.parse(credentialsCookie)
      : null;
    // setCredentials(JSON.stringify(credentialsParsed));
    if (credentialsParsed) {
      setUsername(credentialsParsed.username);
      setPassword(credentialsParsed.password);
    }

    clearCookie("credentials");
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl decoration-2 underline underline-offset-[12px]">
          Credentials
        </h1>
        <p>
          for {department.current}, {school.current}
        </p>
      </div>
      {username && password ? (
        <>
          <div className="flex flex-col border border-black rounded-sm text-left w-[25rem]">
            <h1 className="py-4 px-6">
              <strong>Username:</strong> {username}
            </h1>
            <hr className="border border-black border-b-0" />
            <h1 className="py-4 px-6">
              <strong> Password:</strong> {password}
            </h1>
          </div>
          <p>Safely store this credential, it will be destroyed on refresh.</p>
        </>
      ) : (
        <div className="text-red-600 font-bold ">
          No credentials available, try to generate again, if it fails then
          entry needs to be cleared from Database first
        </div>
      )}
    </AdminLayout>
  );
}
