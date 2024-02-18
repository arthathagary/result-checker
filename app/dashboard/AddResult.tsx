"use client";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Calendar } from "./Calender";

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
const AddResult = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [dobdate, setDobDate] = useState<Date>();
  const [issueDate, setIssueDate] = useState<Date>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState("certificateNo");
  const [isFetched, setIsFetched] = useState(true);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formattedDobDate = dobdate ? format(dobdate, "yyyy-MM-dd") : null;
    const formattedIssueDate = issueDate
      ? format(issueDate, "yyyy-MM-dd")
      : null;

    const lectureData = {
      teacherNames: data.leactureName.split(",").map((name) => name.trim()),
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/results", {
        ...data,
        dob: formattedDobDate,
        issueDate: formattedIssueDate,
        leactureName: lectureData,
      });

      toast({
        title: "Success",
        description: "Record added successfully.",
      });

      router.refresh();
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add record. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const { data: session } = useSession();
  if (!session) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div className="">
        <div>
          <h1 className="md:pt-32 text-center font-bold mb-4 text-xl">
            Add Records
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Enter Certificate No"
              className="mb-4"
              {...register("certificateNo")}
              required
            />
            <Input
              type="text"
              placeholder="Enter Name"
              {...register("name")}
              className="mb-4"
              required
            />
            <Input
              type="text"
              placeholder="Enter NIC"
              {...register("nic")}
              className="mb-4"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mb-4",
                    !dobdate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dobdate ? (
                    format(dobdate, "PPP")
                  ) : (
                    <span>Pick Date of birth</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className=" w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  selected={dobdate}
                  onSelect={setDobDate}
                  fromYear={1960}
                  toYear={2030}
                />
              </PopoverContent>
            </Popover>

            <Input
              type="text"
              placeholder="Enter Town"
              {...register("town")}
              className="mb-4"
            />
            <Input
              type="text"
              placeholder="Enter District"
              {...register("district")}
              className="mb-4"
            />
            <Input
              type="text"
              placeholder="Enter Course"
              {...register("course")}
              className="mb-4"
            />
            <Input
              type="text"
              placeholder="Enter Competition"
              {...register("competition")}
              className="mb-4"
            />
            <Input
              type="text"
              placeholder="Enter Course Duration"
              {...register("courseDuration")}
              className="mb-4"
            />
            <Input
              type="text"
              placeholder="Enter Result"
              {...register("result")}
              className="mb-4"
            />
            <Input
              type="text"
              placeholder="Enter Lecture Names (comma-separated)"
              {...register("leactureName")}
              className="mb-4"
            />
            <Input
              type="text"
              placeholder="Enter Founder Name"
              {...register("founderName")}
              className="mb-4"
            />
            <Input
              type="text"
              placeholder="Enter Registration No"
              {...register("registrationNo")}
              className="mb-4"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mb-4",
                    !issueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {issueDate ? (
                    format(issueDate, "PPP")
                  ) : (
                    <span>Select Issue Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className=" w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  selected={issueDate}
                  onSelect={setIssueDate}
                  fromYear={1960}
                  toYear={2030}
                />
              </PopoverContent>
            </Popover>
            <Button
              disabled={loading}
              type="submit"
              className="mt-2 w-full flex gap-4"
            >
              Submit {loading && <Spinner />}
            </Button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddResult;
