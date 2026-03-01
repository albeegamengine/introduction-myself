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
    url: "https://www.wonq-xr.jp/",
  },
  profileImage: "/images/albee_icon.png",
  pageType: "career",
  biography: [
    "WONQ株式会社 システムエンジニア。",
    "九州大学大学院総合理工学府修了。",
    "2024年12月にWONQ株式会社に入社。",
    "入社後建築企業向け業務システムや塗装企業向けの基幹システムの構築など主にバックエンド側のシステム開発に従事。",
    "現在はフロントエンドおよびAI駆動開発について学習中。",
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
          text: "主にバックエンド側のシステム開発に従事",
        },
        {
          text: "経営管理(元帳作成)アプリの開発引継ぎ",
          details: [
            "仕様詰めから基本設計に参加中。",
            "バックエンドフレームワークとしてnestJSよりも高性能なパフォーマンスを目指すべく最新技術の1つであるElysiaJSを採用",
            "その他、Supabaseのメールサーバは1日2通制限があるためResendで代用する等の技術選定中",
            "バックエンドエンジニアとしてDB設計およびAPI実装に着手予定",
          ],
        },
        {
          text: "建築企業向け業務システムの構築",
          details: [
            "詳細設計としてDB設計を実施。next.jsにてAPIを実装",
            "フロントエンド担当者と綿密に相談して既存仕様との整合性を担保させることを意識しつつ\n　先方の要望を満たすようなテーブルの追加修正を実施中",
            "DBバックアップを自動化したため毎月8時間の運用保守を二次開発に充てることに成功",
            "E2EテストをPlaywrightにて実装中。最大1日かかる手動テストの業務効率化中。",
            "フロントエンド/バックエンドの相互理解・学習のために自動コードレビュー機能を実装。\n　ソースコードの改善により品質向上を目指して社内暗黙知を言語化中",
          ],
        },
        {
          text: "塗装企業向けの基幹システムの構築",
          details: [
            "nestJSにてAPIを実装",
            "外注先が実装したmockの機能を改修",
            "諸事情により現在は開発中止",
          ],
        },
        {
          text: "技術検証: AI模試の出力",
          details: [
            "ChatGPT、Claude、Geminiにて模擬試験の問題の入出力を比較した結果、Genimiが最も高精度だった。\n　Geminiは類推が得意なため、模擬試験の問題の類推を高精度で行った結果高い精度が担保されたものと思われる。",
            "Ollamaで用意されているモデルは出力精度が十全ではなかったためMastraにて開発した結果、Geminiと同等の精度で模擬試験の問題の認識および類似問題の出力に成功した。",
          ],
        },
        {
          text: "弊社HPにて記事執筆",
          details: [
            "毎月2-3本の記事を執筆",
            "最近はAIについて検索上位に出やすいキーワードにて記事を執筆中",
          ],
        },
        {
          text: "フロントエンド技術(例: React)について学習中。",
        },
      ],
      technologies: [
        "TypeScript",
        "next.js",
        "nestJS",
        "ElysiaJS",
        "詳細設計",
        "業務自動化",
        "データベース設計",
        "API設計",
        "Kiro",
        "Antigravity",
        "SDD",
        "フロントエンド",
        "React",
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
            "WindowsOSやLinuxOSに対してVBで書かれたFA(工場自動化)システムをC#にリプレースする案件に最も多く携わりました。\n　実際に工場に赴いて新規システムを開発・導入した経験もございます。",
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
        "個人開発用YouTubeのリンクです。\n技術発信の練習のため手始めに趣味であるグランブルーファンタジーの動画をアップロードいたしました。",
      isExternal: true,
      category: "career",
    },
  ],
};
