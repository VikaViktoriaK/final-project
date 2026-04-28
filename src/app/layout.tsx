import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HR Management System",
  description:
    "Human resource management application for managing employees, CVs, and more.",
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
