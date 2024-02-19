import Container from "@/components/Container";
import React from "react";
import eduImg from "@/public/eduImg.svg";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const ContactUsPage = () => {
  return (
    <>
      <Container>
        <h1 className="text-center md:pt-28 font-bold md:text-2xl">
          Contact Us
        </h1>
        <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center md:h-[88vh]">
          <div>
            <Image src={eduImg} width={600} alt="" />
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Email</h1>
            <p className="mb-2">edukinniya.com@gmail.com</p>
            <p className="mb-2">edukinniyalk@gmail.com</p>
            <p className="mb-4">edukinniyalk@gmail.com</p>

            <h1 className="text-2xl font-bold mb-2">Call</h1>
            <p className="mb-4">(+94) 787328850</p>

            <a
              href="https://wa.me/+94764242062"
              target="_blank"
              className="text-2xl font-bold mb-2 inline-block"
            >
              Whatsapp
            </a>
            <a
              href="https://wa.me/+94787328850"
              target="_blank"
              className="text-2xl font-bold mb-4 inline-block"
            >
              Whatsapp
            </a>

            <h1 className="text-2xl font-bold mb-2">Telegram</h1>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default ContactUsPage;
