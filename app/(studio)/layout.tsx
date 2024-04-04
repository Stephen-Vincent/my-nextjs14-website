import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "My first sanity.io powered site",
  description: "Generated by Next + Sanity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}