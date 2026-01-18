// data/careerProfileData.ts

import { ProfileData } from "../types/profile";

export const careerProfileData: ProfileData = {
  name: "麻生真介",
  title: "システムエンジニア",
  subTitle: {
    name: "個人ブログ",
    url: "https://linealbeegames4730.blogspot.com/",
  },
  company: {
    name: "WONQ株式会社",
    url: "https://wonq.co.jp/",
  },
  profileImage: "/images/albee_icon.png",
  pageType: "career",
  biography: [
    "WONQ株式会社 システムエンジニア。",
    "九州大学大学院総合理工学府修了。",
    "2024年12月にWONQ株式会社に入社。",
    "入社後建築企業向け業務システムや塗装企業向けの基幹システムの構築など主にバックエンド側のシステム開発に従事。",
    "現在はフロントエンドおよびAI技術について学習中。",
  ],
  wishToDo: [
    "TODO",
  ],
  expertise: [
    "フルスタック",
    "バックエンド",
    "フロントエンド",
    "AI",
    "C#",
    "TypeScript",
    "データベース設計",
    "API設計",
    "Kiro",
    "Antigravity",
    "SDD",
  ],
  experience: [
    {
      company: "WONQ 株式会社",
      position: "システムエンジニア",
      period: "2026年1月 - 現在",
      description: [
        "建築企業向け業務システムの構築",
        "塗装企業向けの基幹システムの構築",
        "主にバックエンド側のシステム開発に従事",
        "フロントエンド技術の学習・適用",
      ],
      technologies: ["C#", "TypeScript", "データベース設計", "API設計"],
    },
  ],
  relatedLinks: [
    {
      name: "GitHub",
      url: "https://github.com/albeegamengine",
      description: "技術的なプロジェクトとコード",
      isExternal: true,
      category: "portfolio",
    },
    {
      name: "個人開発用ブログ",
      url: "https://linealbeegames4730.blogspot.com/",
      description: "個人開発用ブログ(Blogger)のリンクです。",
      isExternal: true,
      category: "career",
    },
    {
      name: "YouTube",
      url: "https://www.YouTube.com/@albeegamengine",
      description: "個人開発用YouTubeのリンクです。",
      isExternal: true,
      category: "career",
    },
  ],
};
