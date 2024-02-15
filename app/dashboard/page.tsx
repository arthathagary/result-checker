import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Calendar } from "./Calender";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { DataTable } from "../DataTable/data-table";
import TablePage from "../DataTable/page";
import Container from "@/components/Container";
import AddResult from "./AddResult";

type Inputs = {
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
const Dashboard = () => {
  // const { data: session } = useSession();
  // if (!session) {
  //   return <div>loading...</div>;
  // }
  return (
    <Container>
      <div className="md:grid md:grid-cols-4">
        <div className="md:col-span-1">
          <AddResult />
        </div>
        <div className="md:col-span-3">
          <TablePage />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
