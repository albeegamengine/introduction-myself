import { Header } from "@/components/Header";
import { Profile } from "@/components/Profile";
import { Links } from "@/components/Links";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { careerProfileData } from "@/data/careerProfileData";
import { commonData } from "@/data/commonData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "albee - 転職活動プロフィール",
  description:
    "WONQ株式会社 システムエンジニア albee の転職活動用プロフィールページ。職歴、業務経験、転職に関連するスキル情報を掲載しています。",
  keywords: [
    "albee",
    "システムエンジニア",
    "WONQ株式会社",
    "転職",
    "キャリア",
    "フルスタック",
    "バックエンド",
    "フロントエンド",
    "AI",
    "C#",
    "TypeScript",
    "システム設計",
    "データベース設計",
    "API開発",
    "九州大学大学院",
    "業務システム",
    "基幹システム",
  ],
  openGraph: {
    title: "albee - 転職活動プロフィール",
    description:
      "WONQ株式会社 システムエンジニア albee の転職活動用プロフィールページ",
    url: "https://albeegamengine.github.io/introduction-myself/career",
    siteName: "albeeのプロフィール",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "albee - 転職活動プロフィール",
    description:
      "WONQ株式会社 システムエンジニア albee の転職活動用プロフィールページ",
  },
};

export default function CareerPage() {
  const currentYear = new Date().getFullYear();
  const copyright = `© ${currentYear} ${commonData.name}. All rights reserved.`;

  const basePath = "/introduction-myself";
  // 画像のフルパスを作成
  const imagePath = `${basePath}${careerProfileData.profileImage}`;

  // JSON-LD構造化データ（Personスキーマ）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: careerProfileData.name,
    jobTitle: careerProfileData.title,
    ...(careerProfileData.company && {
      worksFor: {
        "@type": "Organization",
        name: careerProfileData.company.name,
        url: careerProfileData.company.url,
      },
    }),
    image: `https://albeegamengine.github.io${imagePath}`,
    url: "https://albeegamengine.github.io/introduction-myself/career",
    sameAs: [
      ...(careerProfileData.company ? [careerProfileData.company.url] : []),
      ...careerProfileData.relatedLinks.map((link) => link.url),
    ],
    description: careerProfileData.biography.join(" "),
    knowsAbout: careerProfileData.expertise,
    hasOccupation: {
      "@type": "Occupation",
      name: "システムエンジニア",
      description: "建築企業向け業務システムや塗装企業向けの基幹システムの構築",
      occupationLocation: {
        "@type": "Place",
        name: "WONQ 株式会社",
      },
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "九州大学大学院総合理工学府",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://albeegamengine.github.io/introduction-myself/career",
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
        name={careerProfileData.name}
        title={careerProfileData.title}
        subTitle={careerProfileData.subTitle}
        company={careerProfileData.company}
        profileImage={imagePath}
        pageType={careerProfileData.pageType}
      />
      <main className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        <Navigation currentPage="career" />
        <Profile
          biography={careerProfileData.biography}
          expertise={careerProfileData.expertise}
          pageType={careerProfileData.pageType}
          projects={careerProfileData.projects}
          experience={careerProfileData.experience}
        />
        <Links
          links={careerProfileData.relatedLinks}
          pageType={careerProfileData.pageType}
        />
      </main>
      <Footer copyright={copyright} />
    </>
  );
}
