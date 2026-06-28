import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import MusicPlayer from "@/components/ui/MusicPlayer";
import { BibleVerseProvider } from "@/components/ui/BibleVerseContext";
import BibleVerseModal from "@/components/ui/BibleVerseModal";

export const metadata: Metadata = {
  title: "Brother Femi — Bond Servant of Christ",
  description:
    "A faith-inspired space to share my journey, connect with fellow believers, and encourage a Christ-centered life of love, humility, and purpose.",
  icons: {
    icon: [
      { url: "/svg/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/img/android-chrome-192x192.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <BibleVerseProvider>
          <Header />
          {children}
          <Footer />
          <MusicPlayer />
          <BibleVerseModal />
        </BibleVerseProvider>
      </body>
    </html>
  );
}
