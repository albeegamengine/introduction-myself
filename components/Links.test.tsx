import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Links } from "./Links";
import { ExternalLink } from "@/types/profile";

describe("Links Component", () => {
  const mockLinks: ExternalLink[] = [
    {
      name: "Blogger",
      url: "https://linealbeegames4730.blogspot.com/",
      description: "個人開発用ブログ",
      isExternal: true,
      category: "hobby",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@albeegamengine",
      description: "個人開発用YouTube",
      isExternal: true,
      category: "hobby",
    },
    {
      name: "GitHub",
      url: "https://github.com/albeegamengine",
      description: "個人開発用GitHub",
      isExternal: true,
      category: "portfolio",
    },
  ];

  describe("要件 2.1, 2.2: 趣味用ページのリンク表示", () => {
    it("趣味用ページで適切なリンクが表示されること", () => {
      render(<Links links={mockLinks} pageType="hobby" />);

      // 趣味用のリンクが表示されることを確認
      expect(screen.getByText("Blogger")).toBeInTheDocument();
      expect(screen.getByText("YouTube")).toBeInTheDocument();
      expect(screen.getByText("個人開発用ブログ")).toBeInTheDocument();
      expect(screen.getByText("個人開発用YouTube")).toBeInTheDocument();
    });

    it("趣味用ページのタイトルと説明が正しく表示されること", () => {
      render(<Links links={mockLinks} pageType="hobby" />);

      expect(screen.getByText("関連リンク")).toBeInTheDocument();
      expect(
        screen.getByText("個人開発用ブログ、YouTube、GitHubのURLです。"),
      ).toBeInTheDocument();
    });
  });

  describe("要件 2.3: 転職活動用ページのリンク表示", () => {
    it("転職活動用ページで適切なリンクが表示されること", () => {
      render(<Links links={mockLinks} pageType="career" />);

      // 転職活動用のリンクが表示されることを確認（GitHubのみ）
      expect(screen.getByText("GitHub")).toBeInTheDocument();
      expect(screen.getByText("個人開発用GitHub")).toBeInTheDocument();
    });

    it("転職活動用ページのタイトルと説明が正しく表示されること", () => {
      render(<Links links={mockLinks} pageType="career" />);

      expect(
        screen.getByText("ポートフォリオ・関連リンク"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("転職活動・キャリア関連のリンクです。"),
      ).toBeInTheDocument();
    });
  });

  describe('要件 2.4, 2.5: rel="noopener noreferrer"の設定', () => {
    it('すべての外部リンクにrel="noopener noreferrer"が設定されていること', () => {
      render(<Links links={mockLinks} pageType="hobby" />);

      const links = screen.getAllByRole("link", { name: /サイトを訪問/i });

      links.forEach((link) => {
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });

    it('すべての外部リンクがtarget="_blank"を持つこと', () => {
      render(<Links links={mockLinks} pageType="hobby" />);

      const links = screen.getAllByRole("link", { name: /サイトを訪問/i });

      links.forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
      });
    });
  });

  describe("要件 2.6: リンクのコンテキスト（説明文）", () => {
    it("各リンクに適切な説明文が表示されること", () => {
      render(<Links links={mockLinks} pageType="hobby" />);

      // 趣味用ページで表示されるリンクの説明文を確認
      expect(screen.getByText("個人開発用ブログ")).toBeInTheDocument();
      expect(screen.getByText("個人開発用YouTube")).toBeInTheDocument();
    });
  });

  describe("ページタイプによるフィルタリング", () => {
    it("趣味用ページでは趣味関連のリンクのみ表示されること", () => {
      render(<Links links={mockLinks} pageType="hobby" />);

      // 趣味用のリンクが表示される
      expect(screen.getByText("Blogger")).toBeInTheDocument();
      expect(screen.getByText("YouTube")).toBeInTheDocument();

      // すべてのリンクボタンを取得
      const linkButtons = screen.getAllByRole("link", {
        name: /サイトを訪問/i,
      });
      expect(linkButtons).toHaveLength(2); // hobby categoryのリンクのみ
    });

    it("転職活動用ページでは転職関連のリンクのみ表示されること", () => {
      render(<Links links={mockLinks} pageType="career" />);

      // 転職活動用のリンクが表示される
      expect(screen.getByText("GitHub")).toBeInTheDocument();

      // すべてのリンクボタンを取得
      const linkButtons = screen.getAllByRole("link", {
        name: /サイトを訪問/i,
      });
      expect(linkButtons).toHaveLength(1); // portfolio categoryのリンクのみ
    });
  });

  describe("異なるリンクデータでの動作", () => {
    it("空のリンク配列でも正常にレンダリングされること", () => {
      render(<Links links={[]} pageType="hobby" />);

      expect(screen.getByText("関連リンク")).toBeInTheDocument();
      expect(
        screen.getByText("個人開発用ブログ、YouTube、GitHubのURLです。"),
      ).toBeInTheDocument();
    });

    it("単一のリンクでも正常にレンダリングされること", () => {
      const singleLink: ExternalLink[] = [
        {
          name: "Test Link",
          url: "https://example.com/",
          description: "Test description",
          isExternal: true,
          category: "hobby",
        },
      ];

      render(<Links links={singleLink} pageType="hobby" />);

      expect(screen.getByText("Test Link")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();

      const link = screen.getByRole("link", { name: /サイトを訪問/i });
      expect(link).toHaveAttribute("href", "https://example.com/");
    });
  });
});
