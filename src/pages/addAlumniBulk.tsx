import { useAuth } from "@/auth/authProvider";
import AdminLayout from "@/components/myUi/adminLayout";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

export function AddAlumniBulk() {
  const auth = useAuth();
  console.log(auth);
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
          Authorization: `Bearer ${auth.token}`,
        },
      };
      axios
        .post(url, formData, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          // It's good practice to handle potential errors
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-20">
        <h1 className="decoration-2 text-3xl underline underline-offset-[12px]">
          Add Alumni (XLSX)
        </h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleChange} required accept=".xlsx" />
          <Button type="submit">Upload</Button>
        </form>
      </div>
    </AdminLayout>
  );
}
