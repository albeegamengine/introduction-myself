// data/hobbyProfileData.ts

import { ProfileData } from "../types/profile";

export const hobbyProfileData: ProfileData = {
  name: "albee",
  title: "個人開発者",
  profileImage: "/images/albee_icon.png",
  pageType: "hobby",
  biography: [
    "個人開発者として、様々なプロジェクトに取り組んでいます。",
    "AI技術、ゲーム開発、Web技術など幅広い分野に興味を持ち、継続的に学習を続けています。",
    "現在はフロントエンドについて学習中です。",
  ],
  expertise: [
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
  ],
  projects: [
    {
      name: "個人開発用ブログ",
      description: "技術と個人開発について発信するBloggerブログ",
      technologies: ["Blogger", "JavaScript", "HTML/CSS"],
      url: "https://linealbeegames4730.blogspot.com/",
      status: "active",
    },
    {
      name: "YouTube",
      description:
        "グランブルーファンタジー(GBF)・プログラミングとAI技術の解説動画",
      technologies: [
        "動画編集",
        "プレゼンテーション",
        "グランブルーファンタジー",
        "GBF",
      ],
      url: "https://www.YouTube.com/@albeegamengine",
      status: "active",
    },
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
