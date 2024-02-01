import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/myUi/adminLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { setCookieWithExpiry } from "@/lib/utils";

import { DepartmentsData } from "@/assets/school-depts";

export default function GenerateCredentials() {
  const navigate = useNavigate();
  const [schoolSelected, setSchoolSelected] = useState("");
  const [departmentSelected, setDepartmentSelected] = useState("");
  const [fullName, setFullName] = useState("");

  function handleClick() {
    axios
      .post(
        `${import.meta.env.VITE_APP_LOCAL_SERVER_URL}/api/v1/generatecreds`,
        {
          schoolName: schoolSelected,
          departmentName: departmentSelected,
          name: fullName,
        }
      )
      .then((response) => {
        setCookieWithExpiry("credentials", response.data, 30);
        navigate(
          `/adminpanel/viewcredentials?school=${schoolSelected}&dept=${departmentSelected}`
        );
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <h1 className="decoration-2 text-3xl underline underline-offset-[12px]">
          Generate Credential
        </h1>
        <p>for a department</p>
      </div>

      <div className="flex flex-col gap-5">
        <Select value={schoolSelected} onValueChange={setSchoolSelected}>
          <SelectTrigger className="w-[280px] rounded-full text-left">
            <SelectValue placeholder="School" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            {Object.entries(DepartmentsData).map(([schoolName]) => (
              <SelectItem key={schoolName} value={schoolName}>
                {schoolName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          disabled={!schoolSelected}
          value={departmentSelected}
          onValueChange={setDepartmentSelected}
        >
          <SelectTrigger className="w-[280px] rounded-full text-left">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent className="rounded-lg text-left">
            {Object.entries(DepartmentsData).map(([schoolName, schoolData]) => {
              if (schoolName == schoolSelected) {
                return Object.keys(schoolData.Departments).map((dept) => {
                  return (
                    <SelectItem key={dept} className="" value={dept}>
                      {dept}
                    </SelectItem>
                  );
                });
              }
              return null;
            })}
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Full name of the HOD"
          id="name"
          className="rounded-full"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
      </div>
      <Button className="rounded-full w-[180px]" onClick={handleClick}>
        Generate
      </Button>
    </AdminLayout>
  );
}
