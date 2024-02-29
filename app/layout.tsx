import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduKinniya",
  description: "Check your results online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="google-site-verification"
            content="oeuq7GgRn9Tyh9g0rCjHYBYWBgRIlHlseVqsFsAn6X8"
          />
        </Head>
      </>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div>
            <Navbar />
          </div>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
