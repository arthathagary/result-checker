"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Result = {
  _id: string;
  name: string;
  certificateNo: string;
  nic: string;
  town: string;
  district: string;
  course: string;
  competition: string;
  courseDuration: string;
  result: string;
  leactureName: string;
  founderName: string;
  registrationNo: string;
  issueDate: string;
  dob: string;
};

export const columns: ColumnDef<Result>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const result = row.original;

      return (
        <Button variant="ghost" onClick={() => console.log(result._id)}>
          {" "}
          <Trash size={16} />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "certificateNo",
    header: "Certificate No",
  },
  {
    accessorKey: "nic",
    header: "Nic",
  },
  {
    accessorKey: "town",
    header: "Town",
  },
  {
    accessorKey: "district",
    header: "District",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "competition",
    header: "Competition",
  },
  {
    accessorKey: "courseDuration",
    header: "Course Duration",
  },
  {
    accessorKey: "result",
    header: "Result",
  },
  {
    accessorKey: "leactureName",
    header: "Lecture Name",
  },
  {
    accessorKey: "founderName",
    header: "Founder Name",
  },
  {
    accessorKey: "registrationNo",
    header: "Registration No",
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
  },
  {
    accessorKey: "dob",
    header: "Date of birth",
  },
];
