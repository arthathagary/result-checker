import Container from "@/components/Container";
import React from "react";
import eduImg from "@/public/eduImg.svg";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ContactUsPage = () => {
  return (
    <>
      <Container>
        <h1 className="text-center md:pt-28 font-bold md:text-4xl text-2xl mb-8">
          Contact Us
        </h1>
        <div className="grid md:grid-cols-2 grid-cols-1 justify-center  ">
          <div>
            <Image src={eduImg} width={600} alt="" />
          </div>
          <Card className="bg-[#030712] dark:bg-white dark:text-[#030712] text-white md:h-[90%] px-4 mb-6 md:mb-0">
            <div className="p-4 mt-8">
              <div className="md:flex justify-between">
                <h1 className="md:text-2xl text-xl font-bold mb-2">Email</h1>
                <div>
                  <Link href="mailto:edukinniya.com@gmail.com">
                    {" "}
                    <p className="mb-2">edukinniya.com@gmail.com</p>
                  </Link>
                  <Link href="mailto:edukinniyalk@gmail.com">
                    <p className="mb-2">edukinniyalk@gmail.com</p>
                  </Link>
                  <Link href="mailto:edukinniyalk@gmail.com">
                    <p className="mb-4">edukinniyalk@gmail.com</p>
                  </Link>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="md:flex justify-between">
                <h1 className="md:text-2xl text-xl font-bold mb-2">Call</h1>
                <p className="mb-4">(+94) 787328850</p>
              </div>
              <Separator className="my-4" />
              <div className="md:flex justify-between">
                <Link
                  href="https://wa.me/+94764242062"
                  target="_blank"
                  className="md:text-2xl text-xl font-bold mb-2 inline-block"
                >
                  Whatsapp
                </Link>
                <Link href="https://wa.me/+94764242062" target="_blank">
                  <p className="mb-4">(+94) 764242062</p>
                </Link>
              </div>
              <Separator className="my-4" />
              <div className="md:flex justify-between">
                <Link
                  href="https://wa.me/+94787328850"
                  target="_blank"
                  className="md:text-2xl text-xl font-bold mb-4 inline-block"
                >
                  Whatsapp
                </Link>
                <Link href="https://wa.me/+94787328850" target="_blank">
                  <p className="mb-4">(+94) 787328850</p>
                </Link>
              </div>
              <Separator className="my-4" />
              <div className="md:flex justify-between">
                <Link
                  href="https://www.edukinniya.lk/2023/08/telegram-groups.html"
                  className="md:text-2xl text-xl font-bold mb-2 inline-block"
                >
                  Telegram
                </Link>
                <Link href="https://www.edukinniya.lk/2023/08/telegram-groups.html">
                  <p className="mb-4">(+94) 764242062</p>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </Container>
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default ContactUsPage;
