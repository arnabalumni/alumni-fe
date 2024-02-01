import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminLayout from "@/components/myUi/adminLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { DepartmentsData } from "@/assets/school-depts";

export function UpdateAlumni() {
  const [schoolSelected, setSchoolSelected] = useState("");
  const [departmentSelected, setDepartmentSelected] = useState("");
  const [programSelected, setProgramSelected] = useState("");
  const [addmissionYear, setAddmissionYear] = useState("");
  return (
    <AdminLayout>
      <h1 className="decoration-2 text-3xl underline underline-offset-[12px]">
        Update Alumni
      </h1>
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
            {schoolSelected &&
              DepartmentsData[schoolSelected]?.Departments &&
              Object.keys(DepartmentsData[schoolSelected].Departments).map(
                (dept) => {
                  return (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  );
                }
              )}
          </SelectContent>
        </Select>
        <Select
          disabled={!departmentSelected}
          value={programSelected}
          onValueChange={setProgramSelected}
        >
          <SelectTrigger className="w-[280px] rounded-full text-left">
            <SelectValue placeholder="Program" />
          </SelectTrigger>
          <SelectContent className="rounded-lg text-left">
            {schoolSelected &&
              departmentSelected &&
              DepartmentsData[schoolSelected]?.Departments &&
              DepartmentsData[schoolSelected].Departments[departmentSelected]
                ?.Programs &&
              Object.keys(
                DepartmentsData[schoolSelected].Departments[departmentSelected]
                  .Programs
              ).map((program) => {
                return (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Year of addmission"
          id="admissionYear"
          className="rounded-full"
          value={addmissionYear}
          onChange={(e) => setAddmissionYear(e.target.value)}
        />
      </div>
      <Button className="rounded-full w-[180px]">Next</Button>
    </AdminLayout>
  );
}
