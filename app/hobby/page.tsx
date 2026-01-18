import { Header } from "@/components/Header";
import { Profile } from "@/components/Profile";
import { Links } from "@/components/Links";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { hobbyProfileData } from "@/data/hobbyProfileData";
import { commonData } from "@/data/commonData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "albee - 趣味・個人開発プロフィール",
  description:
    "個人開発者 albee の趣味・個人開発に関するプロフィールページ。AI技術、ゲーム開発、Web技術への取り組みや個人プロジェクトを紹介しています。",
  keywords: [
    "albee",
    "個人開発",
    "AI",
    "フルスタック",
    "バックエンド",
    "フロントエンド",
    "C#",
    "TypeScript",
    "Kiro",
    "Antigravity",
    "SDD",
    "ゲーム開発",
    "Web技術",
    "プログラミング",
    "技術ブログ",
    "YouTube",
    "GitHub",
  ],
  openGraph: {
    title: "albee - 趣味・個人開発プロフィール",
    description: "個人開発者 albee の趣味・個人開発に関するプロフィールページ",
    url: "https://albeegamengine.github.io/introduction-myself/hobby",
    siteName: "albeeのプロフィール",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "albee - 趣味・個人開発プロフィール",
    description: "個人開発者 albee の趣味・個人開発に関するプロフィールページ",
  },
};

export default function HobbyPage() {
  const currentYear = new Date().getFullYear();
  const copyright = `© ${currentYear} ${commonData.name}. All rights reserved.`;

  const basePath = "/introduction-myself";
  // 画像のフルパスを作成
  const imagePath = `${basePath}${hobbyProfileData.profileImage}`;

  // JSON-LD構造化データ（Personスキーマ）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: hobbyProfileData.name,
    jobTitle: hobbyProfileData.title,
    image: `https://albeegamengine.github.io${imagePath}`,
    url: "https://albeegamengine.github.io/introduction-myself/hobby",
    sameAs: hobbyProfileData.relatedLinks.map((link) => link.url),
    description: hobbyProfileData.biography.join(" "),
    knowsAbout: hobbyProfileData.expertise,
    hasOccupation: {
      "@type": "Occupation",
      name: "個人開発者",
      description: "AI技術、ゲーム開発、Web技術など幅広い分野での個人開発",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://albeegamengine.github.io/introduction-myself/hobby",
    },
  };

  return (
    <>
      {/* JSON-LD構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        name={hobbyProfileData.name}
        title={hobbyProfileData.title}
        company={hobbyProfileData.company}
        profileImage={imagePath}
        pageType={hobbyProfileData.pageType}
      />
      <main className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        <Navigation currentPage="hobby" />
        <Profile
          biography={hobbyProfileData.biography}
          expertise={hobbyProfileData.expertise}
          pageType={hobbyProfileData.pageType}
          projects={hobbyProfileData.projects}
          experience={hobbyProfileData.experience}
        />
        <Links
          links={hobbyProfileData.relatedLinks}
          pageType={hobbyProfileData.pageType}
        />
      </main>
      <Footer copyright={copyright} />
    </>
  );
}
