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
  wishToDo: ["TODO"],
  expertise: [
    "フルスタック",
    "バックエンド",
    "フロントエンド",
    "AI",
    "C#",
    "TypeScript",
    "next.js",
    "nestJS",
    "Hono(学習中)",
    "ElysiaJS",
    "React(学習中)",
    "詳細設計",
    "データベース設計",
    "API設計",
    "AI駆動開発",
    "Antigravity",
    "Kiro",
    "SDD",
  ],
  experience: [
    {
      company: "WONQ 株式会社",
      position: "システムエンジニア",
      period: "2024年12月 - 現在",
      description: [
        {
          text: "建築企業向け業務システムの構築",
          details: [
            "CI/CDパイプラインの構築により、デプロイ時間を2時間から15分に短縮",
            "コードレビュー文化の導入により、バグ検出率が30%向上",
          ],
        },
        {
          text: "塗装企業向けの基幹システムの構築",
          details: ["コードレビュー文化の導入により、バグ検出率が30%向上"],
        },
        {
          text: "主にバックエンド側のシステム開発に従事",
        },
        {
          text: "フロントエンド技術の学習・適用",
        },
      ],
      technologies: [
        "TypeScript",
        "データベース設計",
        "API設計",
        "Kiro",
        "Antigravity",
        "SDD",
        "フロントエンド",
      ],
    },
    {
      company: "カナテック 株式会社",
      position: "プログラマ",
      period: "2022年4月 - 2024年7月",
      description: [
        {
          text: "主にバックエンド側のシステム開発に従事",
          details: [
            "WindowsOSやLinuxOSに対してVBで書かれたFAシステムをC#にリプレースする案件に最も多く携わりました。\n工場に赴いて新規システムを開発・導入した経験もございます。",
          ],
        },
      ],
      technologies: ["C#", "postgres"],
    },
  ],
  relatedLinks: [
    {
      name: "GitHub",
      url: "https://github.com/albeegamengine",
      description: "技術的なプロジェクトとコードです。",
      isExternal: true,
      category: "portfolio",
    },
    {
      name: "個人開発用ブログ",
      url: "https://linealbeegames4730.blogspot.com/",
      description:
        "個人開発用ブログ(Blogger)のリンクです。\n技術発信の練習のために記事を定期的に公開しています。",
      isExternal: true,
      category: "career",
    },
    {
      name: "YouTube",
      url: "https://www.YouTube.com/@albeegamengine",
      description:
        "個人開発用YouTubeのリンクです。\n技術発信の練習のため手始めに趣味であるグランブルーファンタジーの動画をアップロードしてみました。",
      isExternal: true,
      category: "career",
    },
  ],
};
