import AdminLayout from "@/components/myUi/adminLayout";
import AdminNavbar from "@/components/myUi/adminNavbar";
import { DataTable } from "@/components/myUi/dataTable";
// import useFetchAlumni from "@/hooks/useFetchAlumni";
import { Alumni } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { Pencil, Save, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type EditableDataKey = "name" | "occupation" | "address" | "email" | "linkedin";

const url = `${import.meta.env.VITE_APP_LOCAL_SERVER_URL}/api/v1/updatealumni`;

export function UpdateAlumniView() {
  // Initialize editableData with an object shape that matches your data
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const editableDataRef = useRef<Alumni>({
    id: -1,
    name: "",
    occupation: "",
    address: "",
    email: "",
    linkedin: "",
  });

  const handleInputChange = (key: EditableDataKey, value: string) => {
    editableDataRef.current[key] = value;
  };

  const queryParams = new URLSearchParams(location.search);
  const school = queryParams.get("school");
  const department = queryParams.get("dept");
  const program = queryParams.get("program");
  const admissionYear = queryParams.get("year");

  const [alumni, setAlumni] = useState<Alumni[]>([]);
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
        if (editingRowId === info.row.index) {
          return (
            <input
              className="border border-black rounded-sm"
              defaultValue={alumni[info.row.index]?.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              // //onBlur={() => saveChanges(info.row.index)}
            />
          );
        }
        return info.getValue();
      },
    },
    {
      accessorKey: "occupation",
      header: "Occupation",
      cell: (info) => {
        if (editingRowId === info.row.index) {
          return (
            <input
              className="border border-black rounded-sm"
              defaultValue={alumni[info.row.index]?.occupation}
              onChange={(e) => handleInputChange("occupation", e.target.value)}
              required
              //onBlur={() => saveChanges(info.row.index)}
            />
          );
        }
        return info.getValue();
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: (info) => {
        if (editingRowId === info.row.index) {
          return (
            <input
              className="border border-black rounded-sm"
              defaultValue={alumni[info.row.index]?.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
              //onBlur={() => saveChanges(info.row.index)}
            />
          );
        }
        return info.getValue();
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => {
        if (editingRowId === info.row.index) {
          return (
            <input
              className="border border-black rounded-sm"
              defaultValue={alumni[info.row.index]?.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              //onBlur={() => saveChanges(info.row.index)}
            />
          );
        }
        return info.getValue();
      },
    },
    {
      accessorKey: "linkedin",
      header: "LinkedIn",
      cell: (info) => {
        if (editingRowId === info.row.index) {
          return (
            <input
              className="border border-black rounded-sm"
              defaultValue={alumni[info.row.index]?.linkedin}
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
              required
              //onBlur={() => saveChanges(info.row.index)}
            />
          );
        }
        return info.getValue();
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const currentlyEditing = editingRowId === row.index;

        const handleEdit = () => {
          setEditingRowId(row.index);
          // Populate the editableDataRef with the row's data
          editableDataRef.current = {
            id: alumni[row.index].id,
            name: alumni[row.index].name,
            occupation: alumni[row.index].occupation,
            address: alumni[row.index].address,
            email: alumni[row.index].email,
            linkedin: alumni[row.index].linkedin,
          };
        };

        const handleSave = async () => {
          // Assuming you have a function to update the alumni data on the backend
          // Replace `updateAlumniData` with your actual update function
          const updatedData = { ...editableDataRef.current };
          if (Object.values(updatedData).some((value) => value === "")) {
            alert("All fields are required");
            return;
          }
          console.log(updatedData);
          try {
            const response = await axios.put(url, updatedData, {
              headers: { "Content-Type": "application/json" },
            });
            console.log("Data saved:", response.data);
            // Update the local state to reflect the changes
            setAlumni((prev) => {
              return prev.map((item) =>
                item.id === updatedData.id ? { ...item, ...updatedData } : item
              );
            });
            setEditingRowId(null); // Exit editing mode
          } catch (error) {
            console.error("Failed to save changes:", error);
          }
        };

        return currentlyEditing ? (
          <div className="flex gap-3 w-[2rem] h-[2rem]">
            <button onClick={handleSave}>
              <Save className="w-4" />
            </button>
            <button onClick={() => setEditingRowId(null)}>
              <X className="w-5" />
            </button>
          </div>
        ) : (
          <button className="w-[2rem] h-[2rem]" onClick={handleEdit}>
            <Pencil className="w-4" />
          </button>
        );
      },
    },
  ];

  return (
    <AdminLayout className="gap-[5rem] py-0">
      {/* <AdminNavbar/> */}
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
    </AdminLayout>
  );
}
