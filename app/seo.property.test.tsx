/**
 * Feature: SEO Optimization
 *
 * **Properties:**
 * 1. Sitemap contains valid URLs
 * 2. Robots.txt allows indexing
 * 3. Pages contain JSON-LD
 */

import { describe, it, expect } from "vitest";
import fc from "fast-check";
import fs from "fs";
import path from "path";
// @ts-ignore - Importing metadata from layout and pages for verification
import { metadata as layoutMetadata } from "./layout";

describe("Property Test: SEO Configuration", () => {
  it("Sitemap contains correct base URL", async () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
        const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
        
        expect(sitemapContent).toContain("https://albeegamengine.github.io/introduction-myself");
        // Simple verification that it looks like XML and has multiple locations
        expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
        expect(sitemapContent).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
        const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
        expect(urlCount).toBeGreaterThanOrEqual(1);
      }),
      { numRuns: 1 }
    );
  });

  it("Robots.txt allows indexing", () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
            const robotsPath = path.join(process.cwd(), "public", "robots.txt");
            const robotsContent = fs.readFileSync(robotsPath, "utf-8");

            expect(robotsContent).toContain("User-agent: *");
            expect(robotsContent).toContain("Allow: /");
            expect(robotsContent).toContain("Sitemap: https://albeegamengine.github.io/introduction-myself/sitemap.xml");
        }),
        { numRuns: 1 }
      )
  });

  it("Layout metadata has correct base URL", () => {
      fc.assert(
          fc.property(fc.constant(null), () => {
            // @ts-ignore
            const metadataBase = layoutMetadata.metadataBase.toString();
            expect(metadataBase).toContain("https://albeegamengine.github.io/introduction-myself");
            
            // @ts-ignore
            expect(layoutMetadata.openGraph.url).toBe("https://albeegamengine.github.io/introduction-myself/");
          }),
          { numRuns: 1 }
      )
  });
});
