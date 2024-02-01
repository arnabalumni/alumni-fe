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
    <div>
      <h1>Update Alumni View</h1>
    </div>
  );
}
