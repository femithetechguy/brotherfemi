import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brother Femi — Bond Servant of Christ",
  description:
    "A faith-inspired space to share my journey, connect with fellow believers, and encourage a Christ-centered life of love, humility, and purpose.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
