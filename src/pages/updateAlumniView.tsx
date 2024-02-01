import { DataTable } from "@/components/myUi/dataTable";
import useFetchAlumni from "@/hooks/useFetchAlumni";
import { Alumni } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { Pencil, Save, X } from "lucide-react";
import { useEffect, useState } from "react";

const NameEditComponent = () => {};

export function UpdateAlumniView() {
  // Initialize editableData with an object shape that matches your data
  const [editingRowId, setEditingRowId] = useState("");
  const [editableData, setEditableData] = useState({
    name: "",
    occupation: "",
    address: "",
    email: "",
    linkedin: "",
  });

  const queryParams = new URLSearchParams(location.search);
  const school = queryParams.get("school");
  const department = queryParams.get("dept");
  const program = queryParams.get("program");
  const admissionYear = queryParams.get("year");

  const [alumni, setAlumni] = useState<Alumni[]>([]);
  //   useEffect(() => {
  //     setAlumni([
  //       {
  //         name: "hello",
  //         occupation: "world",
  //         address: "hello",
  //         email: "world",
  //         linkedin: "hello",
  //       },
  //     ]);
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${
        import.meta.env.VITE_APP_LOCAL_SERVER_URL
      }/api/v1/students`;

      let data = { school, department, program, admissionYear };

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
  }, [school, department, program, admissionYear]);

  const columnsUpdateAlumni: ColumnDef<Alumni>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => {
        if (editingRowId === info.row.id) {
          return (
            <input
              className="border border-black rounded-sm"
              value={alumni[Number(editingRowId)].name}
              onChange={(e) => {
                setAlumni((prev) => {
                  prev[Number(editingRowId)].name = e.target.value;
                  return prev;
                });
              }}
              autoFocus
            />
          );
        }
        return info.getValue();
      },
    },
    {
      accessorKey: "occupation",
      header: "Occupation",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "linkedin",
      header: "LinkedIn",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const currentlyEditing = editingRowId === row.id;
        return currentlyEditing ? (
          <div className="flex gap-3 w-[2rem] h-[2rem]">
            <button onClick={() => setEditingRowId("")}>
              <Save className="w-4" />
            </button>
            <button>
              <X className="w-5" />
            </button>
          </div>
        ) : (
          <button
            className="w-[2rem] h-[2rem]"
            onClick={() => {
              setEditingRowId(row.id);
              console.log(row.id);
            }}
          >
            <Pencil className="w-4" />
          </button>
        );
      },
    },
  ];

  return (
    <div className="h-[100vh] pt-10">
      {school && department && admissionYear && (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl">Update Alumni Details</h1>
          <p className="">for {school}</p>
          <p className="border border-black py-1 px-4 rounded-sm">
            {program} | {department} | {admissionYear}
          </p>
        </div>
      )}
      <div className="container mx-auto py-10 w-[90rem]">
        <DataTable columns={columnsUpdateAlumni} data={alumni} />
      </div>
    </div>
  );
}
