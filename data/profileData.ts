// data/profileData.ts

import { ProfileData } from "../types/profile";

export const profileData: ProfileData = {
  name: "albee",
  title: "システムエンジニア(SE)",
  subTitle: {
    name: "個人開発用ブログ(Blogger)",
    url: "https://linealbeegames4730.blogspot.com/",
  },
  company: {
    name: "WONQ株式会社",
    url: "https://wonq.co.jp/",
  },
  profileImage: "/images/albee_icon.png",
  pageType: "hobby", // Default to hobby for backward compatibility
  biography: [
    "WONQ株式会社 システムエンジニア。",
    "九州大学大学院総合理工学府修了。",
    "2024年12月にWONQ株式会社に入社。",
    "入社後建築企業向け業務システムや塗装企業向けの基幹システムの構築など主にバックエンド側のシステム開発に従事。",
    "現在はフロントエンドについて学習中。",
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
    "Kiro",
    "Antigravity",
    "SDD",
  ],
  relatedLinks: [
    {
      name: "個人開発用ブログ",
      url: "https://linealbeegames4730.blogspot.com/",
      description: "個人開発用ブログ(Blogger)のリンクです。",
      isExternal: true,
      category: "hobby",
    },
    {
      name: "YouTube",
      url: "https://www.YouTube.com/@albeegamengine",
      description: "個人開発用YouTubeのリンクです。",
      isExternal: true,
      category: "hobby",
    },
    {
      name: "GitHub",
      url: "https://github.com/albeegamengine",
      description: "個人開発用のGitHubのリンクです。",
      isExternal: true,
      category: "hobby",
    },
  ],
};
