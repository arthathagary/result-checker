"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import qrImg from "@/public/Ek_QR.png";
import Image from "next/image";

import React, { useState } from "react";
import { FaSquareFacebook } from "react-icons/fa6";

const DetailCard = () => {
  const router = useRouter();
  const content =
    "Resource Books, Teacher Guide, Notes, Reference Books, Model, Past Papers, Papers, Schemes, Support seminar papers, Evaluation reports, Youtube links, Online exams, University information, Course, Vacancy, Foreign scholarship, Competition, Education, Games etc";

  const [showMore, setShowMore] = useState(false);

  const contentLimit = 100;

  const truncatedContent = showMore ? content : content.slice(0, contentLimit);
  return (
    <Card className="flex flex-col items-center md:mt-32 mt-6 mb-6 md:mb-0">
      <CardHeader>
        <CardTitle className="md:text-3xl text-2xl font-bold md:mb-4 mb-0 text-center">
          Free Education Learning Platform
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center md:text-[16px] text-xs">
          <p className={`overflow-hidden ${showMore ? "h-auto" : "h-[2.5em]"}`}>
            {truncatedContent}
          </p>
          {content.length > contentLimit && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-500 hover:underline focus:outline-none transition-all duration-300"
            >
              {showMore ? "See Less" : "See More"}
            </button>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-center">
          {/* <Link href="www.Edukinniya.lk" className="md:text-xl">
            🌐 www.Edukinniya.lk
          </Link> */}
          <Button
            className="rounded-full"
            onClick={() => {
              router.replace("https://www.edukinniya.lk/");
            }}
          >
            🌐 www.Edukinniya.lk
          </Button>
          <p className="my-4 text-xs md:text-xl">
            Grade-1,2,3,4,5,6,7,8,9,10,11,O/L,A/L Online Exams
          </p>
          {/* <Link href="www.onlineexamsfree.com" className="text-xl">
            
          </Link> */}
          <Button
            className="rounded-full"
            onClick={() => {
              router.replace("https://www.onlineexamsfree.com/");
            }}
          >
            🌐 www.onlineexamsfree.com
          </Button>

          <div className="flex flex-col items-center justify-center">
            <Image src={qrImg} alt="" height={150} width={150} />
          </div>
          <div className="flex w-full items-center justify-center mt-4 gap-4">
            <FaSquareFacebook size={30} />
            <FaSquareFacebook size={30} />
            <FaSquareFacebook size={30} />
            <FaSquareFacebook size={30} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DetailCard;
