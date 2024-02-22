"use client";
import { Button } from "@/components/ui/button";

import { useState } from "react";

interface ResulTableCellata {
  courseDuration: string;
  course: string;
  district: string;
  gender: string;
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
}

interface NicSearchCardProps {
  data: ResulTableCellata;
  onClick: (resultData: string) => void;
  setClickedEvt: (value: boolean) => void;
  clickedEvt: boolean;
}

const NicSearchCard = ({
  data,
  onClick,
  clickedEvt,
  setClickedEvt,
}: NicSearchCardProps) => {
  const [clicked, setClicked] = useState(false);
  const [resultData, setResultData] = useState("");

  const handleClick = () => {
    setResultData(data.certificateNo);

    onClick(data.certificateNo);
  };

  const dateConvert = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0];
  };

  return (
    <div className="w-full">
      <>
        {data.course && (
          <Button
            className="w-full h-14 flex flex-col gap-1 bg-blue-200 text-black"
            onClick={handleClick}
          >
            <h1>{data.course}</h1>
            <h1>{data.certificateNo}</h1>
          </Button>
        )}

        {data.competition && (
          <Button
            className="w-full h-14 flex flex-col gap-1 bg-blue-200 text-black"
            onClick={handleClick}
          >
            <h1>{data.competition}</h1>
            <h1>{data.certificateNo}</h1>
          </Button>
        )}
      </>
    </div>
  );
};

export default NicSearchCard;
