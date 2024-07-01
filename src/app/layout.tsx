import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { toastConfig } from "@/app/config/toaster";

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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${jost.className} bg-[#F3F4F4]`}>
        <AuthProvider>
          <CartProvider>
            <ChakraProvider>{children}</ChakraProvider>
            <Toaster toastOptions={toastConfig} />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
