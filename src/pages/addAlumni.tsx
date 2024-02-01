import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import AdminLayout from "../components/myUi/adminLayout";

import { DepartmentsData } from "@/assets/school-depts";
import axios from "axios";

const FormSchema = z.object({
  school: z.string().min(1, "School selection is required."),
  department: z.string().min(1, "Deparment selection is required."),
  program: z.string().min(1, "Program selection is required."),
  name: z.string().min(1, "Name is required."),
  admissionYear: z.string().min(1, "Year of admission is required."),
  address: z.string().min(1, "Address is required."),
  occupation: z.string().min(1, "Occupation is required."),
  email: z.string().min(1, "Email is required."),
  linkedin: z.string().optional(),
});

export function AddAlumni() {
  const [schoolSelected, setSchoolSelected] = useState("");
  const [departmentSelected, setDepartmentSelected] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      school: "",
      department: "",
      program: "",
      name: "",
      admissionYear: "",
      address: "",
      occupation: "",
      email: "",
      linkedin: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    axios
      .post(
        `${import.meta.env.VITE_APP_LOCAL_SERVER_URL}/api/v1/addalumni`,
        data
      )
      .then((response) => {
        setUploadStatus("Uploaded Successfully");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    console.log(data);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <h1 className="decoration-2 text-3xl underline underline-offset-[12px]">
          Add Alumni
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-5 px-20 text-left w-[65rem]"
        >
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-5 text-xs ">School</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSchoolSelected(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-full text-left">
                        <SelectValue placeholder="School" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(DepartmentsData).map(([schoolName]) => (
                        <SelectItem key={schoolName} value={schoolName}>
                          {schoolName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-5 text-xs ">Department</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setDepartmentSelected(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-full text-left">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {schoolSelected &&
                        DepartmentsData[schoolSelected]?.Departments &&
                        Object.keys(
                          DepartmentsData[schoolSelected].Departments
                        ).map((dept) => {
                          return (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-5 text-xs ">Program</FormLabel>

                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-full text-left">
                        <SelectValue placeholder="Program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {schoolSelected &&
                        departmentSelected &&
                        DepartmentsData[schoolSelected]?.Departments &&
                        DepartmentsData[schoolSelected].Departments[
                          departmentSelected
                        ]?.Programs &&
                        Object.keys(
                          DepartmentsData[schoolSelected].Departments[
                            departmentSelected
                          ].Programs
                        ).map((program) => {
                          return (
                            <SelectItem key={program} value={program}>
                              {program}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-5 text-xs ">Name</FormLabel>
                <Input {...field} type="text" className="rounded-full" />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="admissionYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-5 text-xs ">
                  Year of Admission
                </FormLabel>
                <Input {...field} type="text" className="rounded-full" />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-5 text-xs ">Address</FormLabel>
                <Input {...field} type="text" className="rounded-full" />
                <FormMessage {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-5 text-xs ">Occupation</FormLabel>
                <Input {...field} type="text" className="rounded-full" />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-5 text-xs ">Email</FormLabel>
                <Input {...field} type="text" className="rounded-full" />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-5 text-xs ">
                  LinkedIn (Optional)
                </FormLabel>
                <Input {...field} type="text" className="rounded-full" />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="rounded-full col-span-3 w-[10rem] justify-self-center mt-16"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </AdminLayout>
  );
}
