import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yashvardhan Raj Singh | Portfolio",
  description:
    "Personal portfolio of Yashvardhan Raj Singh – Computer Science student passionate about web development, React, and Python.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
