/**
 * Feature: my-profile-page, Property 6: すべてのページは適切なHTML構造とメタデータを持つ
 *
 * **検証: 要件 7.1, 7.2, 7.5, 7.6, 7.7**
 *
 * プロパティ:
 * 1. ルートレイアウトはファビコン設定を持つ
 * 2. すべてのページはタイトルと説明を持つ
 * 3. 趣味用ページは趣味関連のキーワードを持つ
 * 4. 転職活動用ページはキャリア関連のキーワードを持つ
 */

import { describe, it, expect, vi } from "vitest";
import fc from "fast-check";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-inter", className: "font-inter" }),
}));

import { metadata as layoutMetadata } from "./layout";
import { metadata as hobbyMetadata } from "./hobby/page";
import { metadata as careerMetadata } from "./career/page";

describe("Property Test: Metadata Verification", () => {
  it("Requirement 7.7: Root layout has favicon configuration", () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        expect(layoutMetadata.icons).toBeDefined();
        // @ts-ignore - metadata types might be complex, simplified check
        expect(layoutMetadata.icons?.icon).toBeDefined();
        // @ts-ignore
        expect(layoutMetadata.icons?.icon).toBe("/images/albee_icon.png");
      }),
      { numRuns: 1 }
    );
  });

  it("Requirement 7.2, 7.5: Hobby page has appropriate specific metadata", () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        expect(hobbyMetadata.title).toContain("趣味");
        expect(hobbyMetadata.description).toContain("個人開発");
        
        const keywords = hobbyMetadata.keywords;
        expect(Array.isArray(keywords)).toBe(true);
        if (Array.isArray(keywords)) {
             expect(keywords).toEqual(expect.arrayContaining(["個人開発", "ゲーム開発", "Web技術"]));
        }
      }),
      { numRuns: 1 }
    );
  });

  it("Requirement 7.2, 7.6: Career page has appropriate specific metadata", () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          expect(careerMetadata.title).toContain("転職");
          expect(careerMetadata.description).toContain("WONQ株式会社");
          expect(careerMetadata.description).toContain("システムエンジニア");
          
          const keywords = careerMetadata.keywords;
          expect(Array.isArray(keywords)).toBe(true);
          if (Array.isArray(keywords)) {
               expect(keywords).toEqual(expect.arrayContaining(["転職", "キャリア", "システムエンジニア"]));
          }
        }),
        { numRuns: 1 }
      );
    });
});
