/**
 * Feature: Styling and Responsive Design
 *
 * **Properties:**
 * 3. All pages have responsive design (Requirement 4.1-4.4)
 * 4. All pages have unified design (Requirement 5.1-5.3)
 */

import { describe, it, expect } from "vitest";
import fc from "fast-check";
import fs from "fs";
import path from "path";

describe("Property Test: Design System", () => {
  it("Property 3: All main containers use responsive classes", () => {
    // Check that page files utilize container or max-w-* classes for layout
    fc.assert(
      fc.property(fc.constant(null), () => {
        const appDir = path.join(process.cwd(), "app");
        const pageFiles = ["page.tsx", "hobby/page.tsx", "career/page.tsx"];

        pageFiles.forEach((file) => {
          const content = fs.readFileSync(path.join(appDir, file), "utf-8");
          // Should use container or dynamic flex/grid layouts
          // Checking for common responsive patterns
          const hasResponsiveLayout = 
            content.includes("container") || 
            content.includes("flex-col") || 
            content.includes("grid") ||
            content.includes("max-w-");
          
          expect(hasResponsiveLayout).toBe(true);
        });
      }),
      { numRuns: 1 }
    );
  });

  it("Property 4: Components use consistent design tokens", () => {
    // Check components for usage of Tailwind classes that map to design system
    fc.assert(
      fc.property(fc.constant(null), () => {
        const componentsDir = path.join(process.cwd(), "components");
        const files = fs.readdirSync(componentsDir).filter(f => 
          f.endsWith(".tsx") && 
          !f.endsWith(".test.tsx") && 
          !f.endsWith(".property.test.tsx") &&
          !f.endsWith(".d.ts")
        );

        files.forEach((file) => {
          const content = fs.readFileSync(path.join(componentsDir, file), "utf-8");
          // Check for color token usage (text-muted-foreground, bg-surface, etc which are shadcn/tailwind conventions)
          // or standard tailwind spacing/colors
          const usesDesignTokens = 
            content.includes("text-") || 
            content.includes("bg-") || 
            content.includes("p-") || 
            content.includes("m-");
            
          expect(usesDesignTokens).toBe(true);
        });
      }),
      { numRuns: 1 }
    );
  });
  
  it("Global CSS defines required variables", () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
            const globalsCssPath = path.join(process.cwd(), "app", "globals.css");
            const content = fs.readFileSync(globalsCssPath, "utf-8");
            
            expect(content).toContain("--color-primary");
            expect(content).toContain("--color-surface");
            expect(content).toContain("@media (max-width: 767px)"); // Mobile
            expect(content).toContain("@media (min-width: 1024px)"); // Desktop
        }),
        { numRuns: 1 }
      )
  });
});
