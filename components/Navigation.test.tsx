import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";

describe("Navigation Component", () => {
  describe("Current page indication", () => {
    it("shows correct label for Hobby page", () => {
      render(<Navigation currentPage="hobby" />);
      
      // Should show "Current Page: Hobby/Personal Development"
      const currentPageBadge = screen.getByText("趣味・個人開発");
      expect(currentPageBadge).toBeInTheDocument();
      // Ensure it is in the "Current Page" section/badge
      expect(currentPageBadge.className).toContain("text-white"); // default variant uses white text usually
    });

    it("shows correct label for Career page", () => {
      render(<Navigation currentPage="career" />);
      
      const currentPageBadge = screen.getByText("転職活動");
      expect(currentPageBadge).toBeInTheDocument();
    });
  });

  describe("Navigation links", () => {
    it("shows link to Career page when on Hobby page", () => {
      render(<Navigation currentPage="hobby" />);
      
      const linkButton = screen.getByRole("link", { name: /転職活動ページへ/i });
      expect(linkButton).toBeInTheDocument();
      expect(linkButton).toHaveAttribute("href", "/career");
    });

    it("shows link to Hobby page when on Career page", () => {
      render(<Navigation currentPage="career" />);
      
      const linkButton = screen.getByRole("link", { name: /趣味・個人開発ページへ/i });
      expect(linkButton).toBeInTheDocument();
      expect(linkButton).toHaveAttribute("href", "/hobby");
    });
  });
});
