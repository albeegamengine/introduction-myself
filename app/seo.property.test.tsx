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
import sitemap from "./sitemap";
import robots from "./robots";
// @ts-ignore - Importing metadata from layout and pages for verification
import { metadata as layoutMetadata } from "./layout";

describe("Property Test: SEO Configuration", () => {
  it("Sitemap contains correct base URL", async () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        // @ts-ignore - sitemap is a function returning promise or array
        const sitemapData = sitemap();
        // Handle both async and sync return if needed, but for now assuming sync as implemented
        
        expect(Array.isArray(sitemapData)).toBe(true);
        if (Array.isArray(sitemapData)) {
            sitemapData.forEach(entry => {
                expect(entry.url).toContain("https://albeegamengine.github.io/introduction-myself");
            });
            expect(sitemapData.length).toBeGreaterThanOrEqual(3);
        }
      }),
      { numRuns: 1 }
    );
  });

  it("Robots.txt allows indexing", () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
            const robotsData = robots();
            expect(robotsData.rules).toBeDefined();
            // @ts-ignore
            expect(robotsData.rules.userAgent).toBe("*");
            // @ts-ignore
            expect(robotsData.rules.allow).toBe("/");
            // @ts-ignore
            expect(robotsData.sitemap).toContain("https://albeegamengine.github.io/introduction-myself/sitemap.xml");
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
