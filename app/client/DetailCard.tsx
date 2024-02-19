"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import qrImg from "@/public/Ek_QR.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import {
  FaFacebook,
  FaSquareThreads,
  FaTelegram,
  FaViber,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

const DetailCard = () => {
  const router = useRouter();
  const content =
    "Resource Books, Teacher Guide, Notes, Reference Books, Model, Past Papers, Papers, Schemes, Support seminar papers, Evaluation reports, Youtube links, Online exams, University information, Course, Vacancy, Foreign scholarship, Competition, Education, Games etc";

  const [showMore, setShowMore] = useState(false);

  const contentLimit = 100;

  const truncatedContent = showMore ? content : content.slice(0, contentLimit);
  return (
    <Card className="flex flex-col items-center md:mt-32 mt-6 mb-6 md:mb-0 bg-[#030712] dark:bg-white dark:text-[#030712] text-white">
      <CardHeader>
        <CardTitle className="md:text-3xl text-xl font-bold md:mb-4 mb-0 text-center">
          Free Education Learning Platform
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center md:text-base text-xs">
          <p className={`overflow-hidden ${showMore ? "h-auto" : "h-[2.8em]"}`}>
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
          <Button
            className="rounded-full bg-white text-[#030712] dark:bg-[#030712] dark:text-white hover:bg-[#222b44] hover:text-white transition-all duration-300 dark:hover:bg-[#353b4b] dark:hover:text-white mb-2"
            onClick={() => {
              router.replace("https://www.edukinniya.lk/");
            }}
          >
            🌐 www.Edukinniya.lk
          </Button>
          <p className="my-6 text-xs md:text-base">
            Grade-1,2,3,4,5,6,7,8,9,10,O/L,A/L Online Exams
          </p>

          <Button
            className="rounded-full bg-white text-[#030712] dark:bg-[#030712] dark:text-white hover:bg-[#222b44] hover:text-white transition-all duration-300 dark:hover:bg-[#353b4b] dark:hover:text-white mb-2"
            onClick={() => {
              router.replace("https://www.onlineexamsfree.com/");
            }}
          >
            🌐 www.onlineexamsfree.com
          </Button>
          <div className="flex flex-col items-center justify-center mb-2">
            <Image src={qrImg} alt="" height={150} width={150} />
          </div>
          <div>
            <Link href="/contactus">
              <Button className="rounded-full bg-white text-[#030712] dark:bg-[#030712] dark:text-white hover:bg-[#222b44] hover:text-white transition-all duration-300 dark:hover:bg-[#353b4b] dark:hover:text-white mb-2">
                Contact Us
              </Button>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row w-full items-center justify-center mt-4 gap-4">
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/Edukinniya">
                <FaFacebook size={30} />
              </Link>
              <Link href="https://youtube.com/c/Edukinniya">
                <FaYoutube size={30} />
              </Link>
              <Link href="https://www.edukinniya.lk/2023/08/telegram-groups.html">
                <FaTelegram size={30} />
              </Link>
              <Link href="https://www.edukinniya.lk/2023/08/whatsapp-groups.html">
                <IoLogoWhatsapp size={30} />
              </Link>
            </div>
            <div className="flex gap-4">
              <Link href="https://invite.viber.com/?g2=AQAz%2FARnp3x7JE2dblY0VZKIJP7Gf7Ohjs%2F9Aa6UgtVMN%2FtYa56H%2BxzWsNSb3F1P">
                <FaViber size={30} />
              </Link>
              <Link href="https://instagram.com/edukinniya">
                <RiInstagramFill size={30} />
              </Link>
              <Link href="https://www.threads.net/edukinniya">
                <FaSquareThreads size={30} />
              </Link>
              <Link href="https://twitter.com/Edukinniya">
                <FaXTwitter size={30} />
              </Link>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DetailCard;
