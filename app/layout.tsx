import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Edu Kinniya",
  description: "Check your results online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
