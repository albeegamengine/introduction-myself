// data/profileData.ts

import { ProfileData } from "../types/profile";

export const profileData: ProfileData = {
  name: "麻生真介",
  title: "システムエンジニア(SE)",
  company: {
    name: "WONQ株式会社",
    url: "https://linealbeegames4730.blogspot.com/",
  },
  profileImage: "/images/albee_icon.png",
  biography: [
    "WONQ株式会社 システムエンジニア。",
    "九州大学大学院総合理工学府修了。",
    "2024年12月にWONQ株式会社に入社。",
    "入社後建築企業向け業務システムや塗装企業向けの基幹システムの構築など主にバックエンド側のシステム開発に従事。",
    "現在はフロントエンドについて学習中。",
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
      name: "Blogger",
      url: "https://linealbeegames4730.blogspot.com/",
      description: "個人開発用ブログ",
      isExternal: true,
    },
    // {
    //   name: "Lion AI",
    //   url: "https://www.lion-ai.co.jp/",
    //   description: "WONQ株式会社のAI事業",
    //   isExternal: true,
    // },
  ],
};
