import "./globals.css";
import "./images.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import FriendList from "./components/FriendList";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LoLStats",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="flex flex-col xl:flex-row pt-[68px] min-h-screen">
          <div className="mx-auto xl:basis-[1024px] w-full xl:w-auto bg-slate-700">
            {children}
          </div>
          <FriendList className="relative right-0 basis-[256px] h-auto bg-slate-750 shrink-0" />
        </div>
      </body>
    </html>
  );
}
