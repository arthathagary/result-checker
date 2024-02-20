"use client";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  certificateNo: string;
  nic: string;
  town: string;
  gender: string;
  district: string;
  course: string;
  competition: string;
  courseDuration: string;
  result: string;
  lectureName: string;
  founderName: string;
  registrationNo: string;
  issueDate: string;
  dob: string;
};

interface AddResultProps {
  id?: string;
}
const AddResult = ({ id }: AddResultProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const [dobdate, setDobDate] = useState<Date>();
  const [issueDate, setIssueDate] = useState<Date>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState("certificateNo");
  const [isFetched, setIsFetched] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/results/${id}`);
        const { data } = response;
        const firstRecord = data[0];
        // console.log("firstRecord", firstRecord.leactureName.join(","));

        setValue("certificateNo", firstRecord.certificateNo);
        setValue("name", firstRecord.name);
        setValue("nic", firstRecord.nic);
        setValue("gender", firstRecord.gender);
        setValue("town", firstRecord.town);
        setValue("district", firstRecord.district);
        setValue("course", firstRecord.course);
        setValue("competition", firstRecord.competition);
        setValue("courseDuration", firstRecord.courseDuration);
        setValue("result", firstRecord.result);
        setValue("lectureName", firstRecord.leactureName.join(","));
        setValue("founderName", firstRecord.founderName);
        setValue("registrationNo", firstRecord.registrationNo);
        setValue("issueDate", firstRecord.issueDate);
        setValue("dob", firstRecord.dob);

        // Do something with the fetched data if needed
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
        setIsFetched(true);
      }
    };

    if (id) {
      fetchData(); // Fetch data when id is available
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      if (!id) {
        // const formattedDobDate = dobdate ? format(dobdate, "yyyy-MM-dd") : null;
        // const formattedIssueDate = issueDate
        //   ? format(issueDate, "yyyy-MM-dd")
        //   : null;
        if (data.lectureName) {
          const lectureData = {
            teacherNames: data.lectureName
              .split(",")
              .map((name) => name.trim()),
          };
          const response = await axios.post("/api/results", {
            ...data,
            // dob: formattedDobDate,
            // issueDate: formattedIssueDate,
            lectureName: lectureData,
          });

          toast({
            title: "Success",
            description: "Record added successfully.",
          });

          router.refresh();
        } else {
          const response = await axios.post("/api/results", {
            ...data,
          });

          toast({
            title: "Success",
            description: "Record added successfully.",
          });

          router.refresh();
        }
      } else {
        if (data.lectureName) {
          const lectureData = {
            teacherNames: data.lectureName
              .split(",")
              .map((name) => name.trim()),
          };
          const response = await axios.put(`/api/results/${id}`, {
            ...data,
            lectureName: lectureData.teacherNames,
          });
          console.log("data", lectureData);
        } else {
          const response = await axios.put(`/api/results/${id}`, {
            ...data,
          });
        }

        toast({
          title: "Success",
          description: "Record updated successfully.",
        });

        router.refresh();
      }
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
          <h1
            className={`${
              !id ? "md:pt-32" : ""
            } text-center font-bold mb-4 text-xl`}
          >
            {id ? "Edit Records" : "Add Records"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto">
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

            <Input
              type="text"
              placeholder="Date of birth (YYYY-MM-DD)"
              {...register("dob")}
              className="mb-4"
            />
            <Input
              type="text"
              placeholder="Enter Gender"
              {...register("gender")}
              className="mb-4"
            />
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
              {...register("lectureName")}
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

            <Input
              type="text"
              placeholder="Issue Date (YYYY-MM-DD)"
              {...register("issueDate")}
              className="mb-4"
            />
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
