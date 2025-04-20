import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/(navbar)/Navbar";

export const metadata: Metadata = {
  title: "KinoLog - your place to find some movies",
  description: "KinoLog is a movie searcher where you can have a horrous actious, delightoul, romantical experience in the world of the black screens ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <Navbar />
        <div className="">
          {children}
        </div>
      </body>
    </html>
  );
}
