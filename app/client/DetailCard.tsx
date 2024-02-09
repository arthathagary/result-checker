import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";

const DetailCard = () => {
  return (
    <Card className="flex flex-col items-center md:mt-32 mt-6 mb-6 md:mb-0">
      <CardHeader>
        <CardTitle className="md:text-3xl text-2xl font-bold mb-4 text-center">
          Free Education Learning Platform
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          Resource Books, Teacher Guide, Notes, Reference Books, Model,Past
          Papers, Papers,Schemes,Support seminar papers,Evaluvation reports,
          Youtube links, Online exams, University information, Course, Vacancy,
          Foreign scholarship, Competition, Education, Games etc
        </p>
      </CardContent>
      <CardFooter>
        <div className="text-center">
          <a
            href="www.Edukinniya.lk"
            rel="noopener noreferrer"
            target="_blank"
            className="mb-4"
          >
            🌐 www.Edukinniya.lk
          </a>
          <p className="mb-4">
            Grade-1,2,3,4,5,6,7,8,9,10,11,O/L,A/L Online Exams
          </p>
          <Link href="www.onlineexamsfree.com">🌐 www.onlineexamsfree.com</Link>

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
