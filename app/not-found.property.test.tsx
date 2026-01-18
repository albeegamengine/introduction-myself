/**
 * Feature: Migration / 404 Handling
 * 
 * **Verification:**
 * Ensure 404 page guides users to valid paths.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("404 Page (Migration Support)", () => {
    it("Contains links to all main profiles", () => {
        render(<NotFound />);
        
        // Check for presence of navigation links
        const links = screen.getAllByRole("link");
        expect(links.length).toBeGreaterThanOrEqual(3);
        
        const hrefs = links.map(link => link.getAttribute("href"));
        expect(hrefs).toContain("/");
        expect(hrefs).toContain("/hobby");
        expect(hrefs).toContain("/career");
    });
    
    it("Contains helpful message", () => {
        render(<NotFound />);
        expect(screen.getByText(/ページが見つかりませんでした/)).toBeInTheDocument();
        expect(screen.getByText(/移動または削除された可能性/)).toBeInTheDocument();
    });
});
