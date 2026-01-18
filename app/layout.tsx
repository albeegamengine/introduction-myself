import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://introduce-myself.github.io"),
  title: "albee",
  description:
    "WONQ株式会社 システムエンジニア(SE) 麻生真介のプロフィールページ。WONQ株式会社にてフルスタックエンジニアとして従事しながら個人開発を進めている。",
  keywords: [
    "麻生真介",
    "個人開発",
    "WONQ",
    "システムエンジニア(SE)",
    "バックエンド",
    "フロントエンド",
    "AI",
  ],
  authors: [{ name: "麻生真介" }],
  creator: "麻生真介",
  publisher: "麻生真介",
  openGraph: {
    type: "profile",
    locale: "ja_JP",
    url: "https://introduce-myself.github.io/",
    siteName: "麻生真介 プロフィール",
    title: "albee",
    description:
      "WONQ株式会社 システムエンジニア(SE) 麻生真介のプロフィールページ。WONQ株式会社にてフルスタックエンジニアとして従事しながら個人開発を進めている。",
    images: [
      {
        url: "/images/albee_icon.png",
        width: 800,
        height: 800,
        alt: "麻生真介のプロフィール写真",
      },
    ],
  },
  //meta data property source
  //https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/metadata/types/twitter-types.ts
  twitter: {
    card: "summary",
    title: "albee",
    description:
      "WONQ株式会社 システムエンジニア(SE) 麻生真介のプロフィールページ。WONQ株式会社にてフルスタックエンジニアとして従事しながら個人開発を進めている。",
    images: ["/images/albee_icon.png"],
    creator: "@albeegamengine",
    site: "@albeegamengine",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
