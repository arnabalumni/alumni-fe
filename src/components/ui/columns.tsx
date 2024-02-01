import { Alumni } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Alumni>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
];
