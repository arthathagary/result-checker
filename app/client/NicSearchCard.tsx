"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  Table,
} from "@/components/ui/table";
import axios from "axios";

import React, { useState } from "react";

interface ResulTableCellata {
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
          <Button onClick={handleClick}>
            <h1>{data.course}</h1>
          </Button>
        )}

        {data.competition && (
          <Button onClick={handleClick}>
            <h1>{data.competition}</h1>
          </Button>
        )}
      </>
    </div>
  );
};

export default NicSearchCard;