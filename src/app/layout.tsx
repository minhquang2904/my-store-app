import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Luxe Loft",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data: any = 123;
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${jost.className} bg-[#F3F4F4]`}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}

export default RootLayout;
