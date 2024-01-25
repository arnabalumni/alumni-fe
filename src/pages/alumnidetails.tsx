import { Navbar } from "@/components/myUi/navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Student, columns } from "@/components/ui/columns";
import { DataTable } from "@/components/myUi/data-table";
import axios from "axios";

export function AlumniDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const school = queryParams.get("school");
  const department = queryParams.get("department");
  const program = queryParams.get("program");
  const year = queryParams.get("year");

  const [alumni, setAlumni] = useState<any>([]);

  useEffect(() => {
    //api call here
    const url = "http://localhost:8080/api/v1/students";
    let data = {
      school: school,
      department: department,
      program: program,
      admission_year: year,
    };
    console.log(data);

    axios({
      method: "post",
      url: url,
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response.data);
        setAlumni(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [school, department, program, year]);

  return (
    <div className="h-[100vh]">
      <Navbar />
      {school && department && year && (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl">Alumni Details</h1>
          <p className="">for {school}</p>
          <p className="border border-black py-1 px-4 rounded-sm">
            {program} | {department} | {year}
          </p>
        </div>
      )}
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={alumni} />
      </div>
    </div>
  );
}
