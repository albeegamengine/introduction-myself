/**
 * Feature: my-profile-page, Property 1: すべてのプロフィールページは基本情報を表示する
 *
 * **検証: 要件 1.3, 1.4**
 *
 * プロパティ: すべてのプロフィールページについて、氏名とプロフィール画像が表示されるべきです。
 */

import { describe, it, expect } from "vitest";
import { hobbyProfileData } from "../data/hobbyProfileData";
import { careerProfileData } from "../data/careerProfileData";
import { ProfileData } from "../types/profile";
import fc from "fast-check";

describe("プロパティベーステスト: すべてのプロフィールページは基本情報を表示する", () => {
  it("Feature: my-profile-page, Property 1: すべてのプロフィールページは基本情報を表示する", () => {
    // プロフィールデータのジェネレーター（趣味用と転職活動用の両方をテスト）
    const profileDataArbitrary = fc.constantFrom(
      hobbyProfileData,
      careerProfileData,
    );

    fc.assert(
      fc.property(profileDataArbitrary, (profileData: ProfileData) => {
        // basePath設定（実際のページと同じ設定）
        const basePath = "/introduction-myself";
        const imagePath = `${basePath}${profileData.profileImage}`;

        // 要件 1.3: 氏名が存在し、空でないことを確認
        expect(profileData.name).toBeTruthy();
        expect(typeof profileData.name).toBe("string");
        expect(profileData.name.length).toBeGreaterThan(0);

        // 要件 1.4: プロフィール画像パスが存在し、正しい形式であることを確認
        expect(profileData.profileImage).toBeTruthy();
        expect(typeof profileData.profileImage).toBe("string");
        expect(profileData.profileImage).toMatch(
          /^\/images\/.+\.(png|jpg|jpeg|gif|webp)$/i,
        );

        // 画像パスが正しく構築されることを確認
        expect(imagePath).toBe(`${basePath}${profileData.profileImage}`);
        expect(imagePath).toMatch(
          /^\/introduction-myself\/images\/.+\.(png|jpg|jpeg|gif|webp)$/i,
        );

        // プロフィールページタイプが正しく設定されていることを確認
        expect(profileData.pageType).toMatch(/^(hobby|career)$/);

        // 基本情報の構造が正しいことを確認
        expect(profileData).toHaveProperty("name");
        expect(profileData).toHaveProperty("title");
        expect(profileData).toHaveProperty("profileImage");
        expect(profileData).toHaveProperty("pageType");
        expect(profileData).toHaveProperty("biography");
        expect(profileData).toHaveProperty("expertise");

        // タイトルが存在することを確認
        expect(profileData.title).toBeTruthy();
        expect(typeof profileData.title).toBe("string");

        // 経歴と専門分野が配列であることを確認
        expect(Array.isArray(profileData.biography)).toBe(true);
        expect(Array.isArray(profileData.expertise)).toBe(true);

        // 各ページタイプ固有の検証
        if (profileData.pageType === "hobby") {
          expect(profileData.name).toBe("albee");
          expect(profileData.title).toBe("個人開発者");
        } else if (profileData.pageType === "career") {
          expect(profileData.name).toBe("albee");
          expect(profileData.title).toBe("システムエンジニア");
          expect(profileData.company).toBeTruthy();
        }
      }),
      { numRuns: 100 },
    );
  });
});
