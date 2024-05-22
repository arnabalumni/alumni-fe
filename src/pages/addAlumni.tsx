import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
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

// import { DepartmentsData } from "@/assets/school-depts";
import axios from "axios";
import { useAuth } from "@/auth/authProvider";
import { useToast } from "@/components/ui/use-toast";
import { DepartmentsData } from "@/lib/types";
import { SchoolAndDept } from "@/components/myUi/schoolAndDept";

const FormSchema = z.object({
  school: z.string().min(1, "School selection is required."),
  department: z.string().min(1, "Department selection is required."),
  program: z.string().min(1, "Program selection is required."),
  name: z.string().min(1, "Name is required."),
  admissionYear: z
    .string()
    .regex(/^\d{4}$/, "Year of admission must be a four-digit number."),
  address: z.string().optional(), // Now optional
  occupation: z.string().optional(), // Now optional
  email: z.string().optional(), // Now optional
  linkedin: z.string().optional(),
  contact: z.string().optional(), // New field for contact key
});

function clearForm(form: UseFormReturn<z.infer<typeof FormSchema>>) {
  // Extract the current values for school, department, and program
  const { school, department, program } = form.getValues();

  // Reset only the specified fields to empty, and restore the others
  form.reset({
    school, // keep the current school
    department, // keep the current department
    program, // keep the current program
    name: "",
    admissionYear: "",
    address: "",
    occupation: "",
    email: "",
    contact: "",
    linkedin: "",
  });
}

export function AddAlumni() {
  const { toast } = useToast();
  const [DepartmentsData, setDepartmentsData] = useState<DepartmentsData>({});
  const [schoolSelected, setSchoolSelected] = useState("");
  const [departmentSelected, setDepartmentSelected] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const user = useAuth();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      admissionYear: "",
      address: "",
      occupation: "",
      email: "",
      contact: "",
      linkedin: "",
    },
  });
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_LOCAL_SERVER_URL
          }/api/v1/getallinstitution`
        );
        const data = await response.json();
        setDepartmentsData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  useEffect(() => {
    if (user.isHod) {
      (async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_APP_LOCAL_SERVER_URL}/api/v1/getdepartment`,
            { id: user.departmentId }
          );
          const { schoolName, departmentName } = response.data;

          form.setValue("school", schoolName, { shouldValidate: true });
          form.setValue("department", departmentName, { shouldValidate: true });

          setSchoolSelected(schoolName);
          setDepartmentSelected(departmentName);

          toast({
            title: "Success",
            description: "Department info fetched successfully.",
          });
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Error Occurred",
            description: error.response.data,
          });
          console.error("Error fetching department info:", error);
        }
      })();
    }
  }, [form, user.isHod, user.departmentId]);
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    axios
      .post(
        `${import.meta.env.VITE_APP_LOCAL_SERVER_URL}/api/v1/addalumni`,
        data
      )
      .then((response) => {
        setUploadStatus("Uploaded Successfully");
        console.log(response.data);
        toast({
          title: "Success",
          description: "Upload Successful",
        });
        clearForm(form);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error Occurred",
          description: error.response.data,
        });
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
        <SchoolAndDept />
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
                    defaultValue={user.isHod ? schoolSelected : field.value}
                    disabled={user.isHod}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-full text-left">
                        <SelectValue
                          placeholder={user.isHod ? schoolSelected : "School"}
                        />
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
                    defaultValue={user.isHod ? departmentSelected : field.value}
                    disabled={user.isHod}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-full text-left">
                        <SelectValue
                          placeholder={
                            user.isHod ? departmentSelected : "Department"
                          }
                        />
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
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-5 text-xs ">
                  Present Occupation
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
                <FormLabel className="px-5 text-xs ">Present Address</FormLabel>
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
                <FormLabel className="px-5 text-xs ">Email ID</FormLabel>
                <Input {...field} type="text" className="rounded-full" />
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-5 text-xs ">Contact Number</FormLabel>
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
                  LinkedIn or Personal Webpage
                </FormLabel>
                <Input {...field} type="text" className="rounded-full" />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5 py-10">
            <Button
              variant={"outline"}
              className="rounded-full col-span-3 w-[10rem] justify-self-center mt-16"
              onClick={() => clearForm(form)}
            >
              Clear
            </Button>
            <Button
              className="rounded-full col-span-3 w-[10rem] justify-self-center mt-16"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
}
