import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "岩下直人 | WONQ株式会社 代表取締役",
  description: "WONQ株式会社 代表取締役 岩下直人のプロフィールページ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
