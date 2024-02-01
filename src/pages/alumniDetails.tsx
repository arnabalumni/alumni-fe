import { Navbar } from "@/components/myUi/navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { columns } from "@/components/myUi/columns";
import { DataTable } from "@/components/myUi/dataTable";
import axios from "axios";
import { Alumni } from "@/lib/types";
import useFetchAlumni from "@/hooks/useFetchAlumni";

export function AlumniDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const school = queryParams.get("school");
  const department = queryParams.get("department");
  const program = queryParams.get("program");
  const addmissionYear = queryParams.get("year");
  let alumni: Alumni[] = [];
  // const [alumni, setAlumni] = useState<Alumni[]>([]);
  if (school && department && program && addmissionYear) {
    alumni = useFetchAlumni(school, department, program, addmissionYear);
  }
  return (
    <div className="h-[100vh]">
      <Navbar />
      {school && department && addmissionYear && (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl">Alumni Details</h1>
          <p className="">for {school}</p>
          <p className="border border-black py-1 px-4 rounded-sm">
            {program} | {department} | {addmissionYear}
          </p>
        </div>
      )}
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={alumni} />
      </div>
    </div>
  );
}
