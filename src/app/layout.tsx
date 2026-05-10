import type { Metadata } from "next";
import { Noto_Serif_Thai, Noto_Sans_Thai, Inter } from "next/font/google";
import "./globals.css";

const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-noto-serif-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memory",
  description: "A living love letter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${notoSerifThai.variable} ${notoSansThai.variable} ${inter.variable} h-full antialiased bg-zinc-950 text-zinc-100`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
