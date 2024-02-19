"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Container from "@/components/Container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import DetailCard from "./DetailCard";
import Spinner from "@/components/Spinner";
import CoverImg from "@/components/navbar/CoverImg";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import NicSearchCard from "./NicSearchCard";

type Inputs = {
  search: string;
};

type ResulTableCellata = {
  courseDuration: number;
  course: string;
  district: string;
  dob: string;
  name: string;
  town: string;
  _id: string;
  competition: string;
  certificateNo: string;
  result: string;
  leactureName: string[];
  founderName: string;
  registrationNo: string;
  issueDate: string;
  nic: string;
};

export default function ClientPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [resulTableCellata, setResulTableCellata] = useState<
    ResulTableCellata[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState("certificateNo");
  const [isFetched, setIsFetched] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [resultDataTable, setResultDataTable] =
    useState<ResulTableCellata | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      setError(null);
      if (selectedValue === "certificateNo") {
        const response = await axios.get(`/api/results/${data.search}`);
        if (response.data.length === 0) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Check your certificate number and try again.",
          });
          // setError("No details found.");
          setIsFetched(true);
        } else {
          setResulTableCellata(response.data);
          setIsFetched(false);
        }
      } else {
        const response = await axios.get(
          `/api/nic/${data.search.toLocaleUpperCase()}`
        );
        if (response.data.length === 0) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Check your NIC number and try again.",
          });
          // setError("Check the NIC number and try again.");
          setIsFetched(true);
        } else {
          setResulTableCellata(response.data);
          setIsFetched(false);
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Check your nic or certificate number and try again.",
      });
      setError("Check your nic or certificate number and try again.");
      console.error("Error fetching data:", error);
      setIsFetched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (event: any) => {
    setSelectedValue(event);
  };

  const dateConvert = (date: any) => {
    if (!date) {
      return "";
    }
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0];
  };

  const handleClick = async (resultData: string) => {
    setIsClicked(true);
    try {
      const response = await axios.get(`/api/results/${resultData}`);
      setResultDataTable(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // const dateOfBirthObj = resulTableCellata?.dob
  //   ? new Date(resulTableCellata.dob)
  //   : new Date();
  // // Get the date in the "YYYY-MM-DD" format
  // const formattedDateDob = dateOfBirthObj.toISOString().split("T")[0];

  // const issueDateObj = resulTableCellata?.issueDate
  //   ? new Date(resulTableCellata.dob)
  //   : new Date(); // Provide a default value, you can replace it with the desired default date

  // // Get the date in the "YYYY-MM-DD" format
  // const formattedIssueDate = dateOfBirthObj.toISOString().split("T")[0];

  const [dataCount, setDataCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/results`);
        setDataCount(response.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Container>
        <div
          className={`md:grid ${
            isFetched ? "md:grid-cols-2" : ""
          } md:gap-8  md:mb-10`}
        >
          <Card className="flex flex-col items-center md:mt-32">
            <CardHeader>
              <CardTitle className="md:text-3xl text-xl text-center font-bold md:mb-4">
                Certificate Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-xs md:text-base">
                EduKinniya has issued{" "}
                <span className="font-bold">{dataCount}</span> certificates.
              </p>
            </CardContent>
            <CardContent>
              <p className="text-center text-xs md:text-base">
                Search for the details of the certificate by entering the
                certificate number or NIC.
              </p>
            </CardContent>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="grid w-full items-center gap-1.5">
                  {/* <Label htmlFor="email">Search</Label> */}
                  <div className="md:flex gap-4 mb-2">
                    <div>
                      <Select
                        required
                        value={selectedValue}
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger className="md:w-[180px] w-full mb-4 bg-[#111827] text-white dark:bg-[#F9FAFB] dark:text-[#030712]">
                          <SelectValue placeholder="Certificate No" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nic">NIC</SelectItem>
                          <SelectItem value="certificateNo">
                            Certificate No
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      type="text"
                      id="search"
                      placeholder="Enter Certificate Number or NIC"
                      {...register("search")}
                      className="w-full mb-4"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full flex gap-4 mb-6 "
                  disabled={loading}
                >
                  Search
                  {loading && <Spinner />}
                </Button>
                {error && (
                  <p className="md:mb-6 mb-4 md:text-base text-sm text-center text-red-500">
                    {error}
                  </p>
                )}
                <CoverImg />
              </form>
            </CardContent>
            {/* {loading && <p>Loading...</p>} */}

            {resulTableCellata && Object.keys(resulTableCellata).length > 0 && (
              <div
                className={`flex justify-center items-center gap-4  ${
                  resulTableCellata.length === 1 ? "w-full" : ""
                }`}
              >
                {resulTableCellata.map((certificate, index) => (
                  <div key={index} className="w-full">
                    {resulTableCellata.length === 1 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Certificate Number</TableHead>
                            <TableCell>{certificate.certificateNo}</TableCell>
                          </TableRow>
                          <TableRow className="bg-black dark:bg-white">
                            <TableHead
                              colSpan={2}
                              className="text-white dark:text-black hover:bg-black dark:hover:bg-white"
                            >
                              Personal Information
                            </TableHead>
                          </TableRow>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableCell>{certificate.name}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead>Date of birth</TableHead>
                            <TableCell>
                              {dateConvert(certificate.dob)}
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableHead>Town/Village</TableHead>
                            <TableCell>{certificate.town}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableHead>District</TableHead>
                            <TableCell>{certificate.district}</TableCell>
                          </TableRow>
                          <TableRow className="bg-black dark:bg-white">
                            <TableHead
                              colSpan={2}
                              className="text-white dark:text-black hover:bg-black dark:hover:bg-white"
                            >
                              Course / Competition Details
                            </TableHead>
                          </TableRow>
                          <TableRow>
                            <TableHead>Course</TableHead>
                            <TableCell>
                              {certificate.course ? certificate.course : "-"}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead>Competition</TableHead>
                            <TableCell>
                              {certificate.competition
                                ? certificate.competition
                                : "-"}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead>Duration</TableHead>
                            <TableCell>{certificate.courseDuration}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead>Result</TableHead>
                            <TableCell>{certificate.result}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead>Teacher/Lecture</TableHead>
                            <TableCell>
                              {certificate.leactureName.map((name, index) => (
                                <p key={index}>{name}</p>
                              ))}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead>Founder of Edukinniya</TableHead>
                            <TableCell>{certificate.founderName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead>
                              Edukinniya&apos;s Registration Number
                            </TableHead>
                            <TableCell>{certificate.registrationNo}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead>Issue Date</TableHead>
                            <TableCell>
                              {dateConvert(certificate.issueDate)}
                            </TableCell>
                          </TableRow>
                        </TableHeader>
                      </Table>
                    ) : (
                      <>
                        {!isClicked && (
                          <div className="mb-6">
                            <NicSearchCard
                              data={certificate}
                              onClick={handleClick}
                              clickedEvt={isClicked}
                              setClickedEvt={setIsClicked}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            <>
              {isClicked && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate Number</TableHead>
                      <TableCell>{resultDataTable?.certificateNo}</TableCell>
                    </TableRow>
                    <TableRow className="bg-black dark:bg-white">
                      <TableHead
                        colSpan={2}
                        className="text-white dark:text-black hover:bg-black dark:hover:bg-white"
                      >
                        Personal Information
                      </TableHead>
                    </TableRow>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableCell>{resultDataTable?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Date of birth</TableHead>
                      <TableCell>{dateConvert(resultDataTable?.dob)}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableHead>Town/Village</TableHead>
                      <TableCell>{resultDataTable?.town}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableHead>District</TableHead>
                      <TableCell>{resultDataTable?.district}</TableCell>
                    </TableRow>
                    <TableRow className="bg-black dark:bg-white">
                      <TableHead
                        colSpan={2}
                        className="text-white dark:text-black hover:bg-black dark:hover:bg-white"
                      >
                        Course / Competition Details
                      </TableHead>
                    </TableRow>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableCell>
                        {" "}
                        {resultDataTable?.course ? resultDataTable.course : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Competition</TableHead>
                      <TableCell>
                        {" "}
                        {resultDataTable?.competition
                          ? resultDataTable.competition
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Duration</TableHead>
                      <TableCell>{resultDataTable?.courseDuration}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Result</TableHead>
                      <TableCell>{resultDataTable?.result}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Teacher/Lecture</TableHead>
                      <TableCell>
                        {resultDataTable?.leactureName.map((name, index) => (
                          <p key={index}>{name}</p>
                        ))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Founder of Edukinniya</TableHead>
                      <TableCell>{resultDataTable?.founderName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>
                        Edukinniya&apos;s Registration Number
                      </TableHead>
                      <TableCell>{resultDataTable?.registrationNo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Issue Date</TableHead>
                      <TableCell>
                        {dateConvert(resultDataTable?.issueDate)}
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                </Table>
              )}
            </>

            {!loading &&
              !error &&
              resulTableCellata &&
              Object.keys(resulTableCellata).length === 0 && (
                <p>No details found.</p>
              )}
          </Card>
          <div> {isFetched && <DetailCard />}</div>
        </div>
      </Container>
      <div>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
