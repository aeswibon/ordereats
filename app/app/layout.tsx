import type { Metadata } from "next";
import { Prata } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const prata = Prata({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Order Eats",
  description: "An app to order food from your favorite restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={prata.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
