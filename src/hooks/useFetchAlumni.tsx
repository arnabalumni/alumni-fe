// hooks/useFetchAlumni.js
import { useState, useEffect } from "react";
import axios from "axios";
import { Alumni } from "@/lib/types";

export function useFetchAlumni(
  school: string,
  department: string,
  program: string,
  year: string
) {
  const [alumni, setAlumni] = useState<Alumni[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${
        import.meta.env.VITE_APP_LOCAL_SERVER_URL
      }/api/v1/students`;

      let data = { school, department, program, admissionYear: year };

      try {
        const response = await axios.post(url, data, {
          headers: { "Content-Type": "application/json" },
        });
        setAlumni(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, [school, department, program, year]);

  return alumni;
}

export default useFetchAlumni;
