"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Spinner from "@/components/Spinner";
import CoverImg from "@/components/navbar/CoverImg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import BookIcon from "@/public/book.png";
import CapIcon from "@/public/cap.png";
import CertificateIcon from "@/public/certificate.png";
import { motion, useAnimation, useInView } from "framer-motion";
import DetailCard from "./DetailCard";
import NicSearchCard from "./NicSearchCard";

import Image from "next/image";
import { cn } from "@/lib/utils";

type Inputs = {
  search: string;
};

type ResulTableCellata = {
  courseDuration: string;
  course: string;
  district: string;
  dob: string;
  gender: string;
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
  const [selectedValue, setSelectedValue] = useState("certificateNo");

  const ref = useRef(null);
  const isView = useInView(ref, { once: true });
  const controlAnimation = useAnimation();
  useEffect(() => {
    if (isView) {
      controlAnimation.start("visible");
    } else {
      controlAnimation.start("hidden");
    }
  }, [isView, controlAnimation]);

  const [resulTableCellata, setResulTableCellata] = useState<
    ResulTableCellata[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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

  // useEffect(() => {
  //   controlAnimation.start("visible");
  // }, [controlAnimation]);
  return (
    // <motion.div
    //   ref={ref}
    //   variants={{
    //     hidden: { y: "100vw", opacity: 0 },
    //     visible: { y: 0, opacity: 1 },
    //   }}
    //   initial="hidden"
    //   animate={controlAnimation}
    //   transition={{ type: "spring", stiffness: 50 }}
    // >
    <>
      <Container>
        <div
          className={`md:grid ${
            isFetched ? "md:grid-cols-2" : ""
          } md:gap-8  md:mb-10`}
        >
          <Card className="flex flex-col items-center md:mt-32">
            <CardHeader>
              <CardTitle className="flex justify-between mb-4">
                <Image
                  src={CapIcon}
                  alt="cap icon"
                  className="md:h-20 md:w-20 h-16 w-16"
                />
                <Image
                  src={CertificateIcon}
                  alt="certificate icon"
                  className="md:h-20 md:w-20 h-16 w-16"
                />
                <Image
                  src={BookIcon}
                  alt="book icon"
                  className="md:h-20 md:w-20 h-16 w-16"
                />
              </CardTitle>
              <CardTitle className="md:text-3xl text-xl text-center font-bold md:mb-4">
                Certificate Verification
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-center text-xs md:text-base">
                Search for the details of the certificate by entering the
                certificate number or NIC.
              </p>
            </CardContent>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="grid w-full items-center gap-1.5">
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

            {resulTableCellata && Object.keys(resulTableCellata).length > 0 && (
              <div
                className={`flex flex-col justify-center items-center w-full px-6  ${
                  resulTableCellata.length === 1 ? "w-full" : ""
                }`}
              >
                {resulTableCellata.map((certificate, index) => (
                  <div key={index} className="w-full">
                    {resulTableCellata.length === 1 ? (
                      <Table className="mb-8 table-result">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold dark:text-white">
                              Certificate Number
                            </TableHead>
                            <TableCell className="font-bold">
                              {certificate.certificateNo}
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-black dark:bg-white">
                            <TableHead
                              colSpan={2}
                              className="text-white dark:text-black hover:bg-black dark:hover:bg-white font-bold"
                            >
                              Personal Information
                            </TableHead>
                          </TableRow>
                          <TableRow className="bg-blue-100 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              Name
                            </TableHead>
                            <TableCell>{certificate.name}</TableCell>
                          </TableRow>
                          <TableRow className="bg-blue-100 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              Date of birth
                            </TableHead>
                            <TableCell>
                              {dateConvert(certificate.dob)}
                            </TableCell>
                          </TableRow>

                          <TableRow className="bg-blue-100 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              Gender
                            </TableHead>
                            <TableCell>{certificate.gender}</TableCell>
                          </TableRow>

                          <TableRow className="bg-blue-100 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              Town/Village
                            </TableHead>
                            <TableCell>{certificate.town}</TableCell>
                          </TableRow>

                          <TableRow className="bg-blue-100 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              District
                            </TableHead>
                            <TableCell>{certificate.district}</TableCell>
                          </TableRow>
                          <TableRow className="bg-black dark:bg-white">
                            <TableHead
                              colSpan={2}
                              className="text-white dark:text-black hover:bg-black dark:hover:bg-white font-bold"
                            >
                              Course / Competition Details
                            </TableHead>
                          </TableRow>
                          <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              Course
                            </TableHead>
                            <TableCell>
                              {certificate.course ? certificate.course : "-"}
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              Competition
                            </TableHead>
                            <TableCell>
                              {certificate.competition
                                ? certificate.competition
                                : "-"}
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              Duration
                            </TableHead>
                            <TableCell>{certificate.courseDuration}</TableCell>
                          </TableRow>
                          <TableRow className="bg-purple-500 border-black text-white hover:text-black dark:hover:text-white">
                            <TableHead className="text-white hover:text-black dark:hover:text-white font-bold">
                              Result
                            </TableHead>
                            <TableCell className="font-bold">
                              {certificate.result}
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              Teacher/Lecture
                            </TableHead>
                            <TableCell>
                              {certificate.leactureName.map((name, index) => (
                                <p key={index}>{name}</p>
                              ))}
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              Founder of Edukinniya
                            </TableHead>
                            <TableCell>{certificate.founderName}</TableCell>
                          </TableRow>
                          <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              Edukinniya&apos;s Gov Reg No
                            </TableHead>
                            <TableCell>{certificate.registrationNo}</TableCell>
                          </TableRow>
                          <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                            <TableHead className="dark:text-black dark:hover:text-white">
                              Issue Date
                            </TableHead>
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
                <Table className="mb-8 table-result">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold dark:text-white">
                        Certificate Number
                      </TableHead>
                      <TableCell className="font-bold">
                        {resultDataTable?.certificateNo}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-black dark:bg-white">
                      <TableHead
                        colSpan={2}
                        className="text-white dark:text-black hover:bg-black dark:hover:bg-white font-bold"
                      >
                        Personal Information
                      </TableHead>
                    </TableRow>
                    <TableRow className="bg-blue-100 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        Name
                      </TableHead>
                      <TableCell>{resultDataTable?.name}</TableCell>
                    </TableRow>
                    <TableRow className="bg-blue-100 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        Date of birth
                      </TableHead>
                      <TableCell>{dateConvert(resultDataTable?.dob)}</TableCell>
                    </TableRow>

                    <TableRow className="bg-blue-100 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        Gender
                      </TableHead>
                      <TableCell>{resultDataTable?.gender}</TableCell>
                    </TableRow>

                    <TableRow className="bg-blue-100 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        Town/Village
                      </TableHead>
                      <TableCell>{resultDataTable?.town}</TableCell>
                    </TableRow>

                    <TableRow className="bg-blue-100 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        District
                      </TableHead>
                      <TableCell>{resultDataTable?.district}</TableCell>
                    </TableRow>
                    <TableRow className="bg-black dark:bg-white">
                      <TableHead
                        colSpan={2}
                        className="text-white dark:text-black hover:bg-black dark:hover:bg-white font-bold"
                      >
                        Course / Competition Details
                      </TableHead>
                    </TableRow>
                    <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        Course
                      </TableHead>
                      <TableCell>
                        {resultDataTable?.course
                          ? resultDataTable?.course
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        Competition
                      </TableHead>
                      <TableCell>
                        {resultDataTable?.competition
                          ? resultDataTable?.competition
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        Duration
                      </TableHead>
                      <TableCell>{resultDataTable?.courseDuration}</TableCell>
                    </TableRow>
                    <TableRow className="bg-purple-500 border-black text-white hover:text-black dark:hover:text-white">
                      <TableHead className="text-white hover:text-black dark:hover:text-white font-bold">
                        Result
                      </TableHead>
                      <TableCell className="font-bold">
                        {resultDataTable?.result}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        Teacher/Lecture
                      </TableHead>
                      <TableCell>
                        {resultDataTable?.leactureName.map((name, index) => (
                          <p key={index}>{name}</p>
                        ))}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        Founder of Edukinniya
                      </TableHead>
                      <TableCell>{resultDataTable?.founderName}</TableCell>
                    </TableRow>
                    <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        Edukinniya&apos;s Gov Reg No
                      </TableHead>
                      <TableCell>{resultDataTable?.registrationNo}</TableCell>
                    </TableRow>
                    <TableRow className="bg-pink-200 border-black dark:text-black dark:hover:text-white">
                      <TableHead className="dark:text-black dark:hover:text-white">
                        Issue Date
                      </TableHead>
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
          <div> {isFetched && <DetailCard dataCount={dataCount} />}</div>
        </div>
      </Container>
      <Toaster />
      <div>
        <Footer />
      </div>
    </>
    // </motion.div>
  );
}
