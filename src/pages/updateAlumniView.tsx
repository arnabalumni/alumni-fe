import { columnsViewAlumni } from "@/components/myUi/columns";
import { DataTable } from "@/components/myUi/dataTable";
import useFetchAlumni from "@/hooks/useFetchAlumni";
import { Alumni } from "@/lib/types";

export function UpdateAlumniView() {
  const queryParams = new URLSearchParams(location.search);
  const school = queryParams.get("school");
  const department = queryParams.get("dept");
  const program = queryParams.get("program");
  const addmissionYear = queryParams.get("year");
  let alumni: Alumni[] = [];
  // const [alumni, setAlumni] = useState<Alumni[]>([]);
  if (school && department && program && addmissionYear) {
    alumni = useFetchAlumni(school, department, program, addmissionYear);
  }
  return (
    <div className="h-[100vh] pt-10">
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
        <DataTable columns={columnsViewAlumni} data={alumni} />
      </div>
    </div>
  );
}
