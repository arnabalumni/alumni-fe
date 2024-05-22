import { useAuth } from "@/auth/authProvider";
import AdminLayout from "@/components/myUi/adminLayout";
import { SchoolAndDept } from "@/components/myUi/schoolAndDept";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Download } from "lucide-react";
import { useState } from "react";

export function AddAlumniBulk() {
  const { isHod, token } = useAuth();
  const { toast } = useToast();
  console.log(isHod);
  type AppState = {
    file: File | null; // since initially there might not be a file, null is a valid state
  };
  const [file, setFile] = useState<AppState["file"]>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      // Check if there are files selected
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      // Check if a file is selected
      const url = `${
        import.meta.env.VITE_APP_LOCAL_SERVER_URL
      }/api/v1/addalumnibulk`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(url, formData, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Error Occurred",
            description: error.message,
          }); // It's good practice to handle potential errors
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-16 -mt-20">
        <div className="flex flex-col gap-4">
          <h1 className="decoration-2 text-3xl underline underline-offset-[12px]">
            Add Alumni (XLSX)
          </h1>
          <SchoolAndDept />
        </div>
        <a
          href={
            isHod
              ? "/bulkStudentHODFormat.xlsx"
              : "/bulkStudentAdminFormat.xlsx"
          }
          download
        >
          <Button className="flex w-full gap-4" variant={"outline"}>
            <Download size={16} />
            Download Sample Excel File
          </Button>
        </a>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input type="file" onChange={handleChange} required accept=".xlsx" />
          <div className="flex flex-col gap-2">
            <Button type="submit" className="flex-grow">
              Upload
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
