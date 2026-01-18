import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PageSelectorProps {
  onPageSelect?: (page: "hobby" | "career") => void;
}

export function PageSelector({ onPageSelect }: PageSelectorProps) {
  const handlePageSelect = (page: "hobby" | "career") => {
    if (onPageSelect) {
      onPageSelect(page);
    }
  };

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            albeeのプロフィール
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            用途に応じて最適化された2つのプロフィールページをご用意しています。
            ご覧になりたいページを選択してください。
          </p>
        </div>

        {/* Page Selection Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Hobby Profile Page */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                趣味・個人開発
              </CardTitle>
              <CardDescription className="text-center">
                個人開発プロジェクト、技術的興味、趣味に関する情報
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• 個人開発プロジェクトの紹介</p>
                <p>• 技術ブログ（Blogger）へのリンク</p>
                <p>• YouTube チャンネルへのリンク</p>
                <p>• GitHub リポジトリへのリンク</p>
                <p>• AI技術、ゲーム開発、Web技術への取り組み</p>
              </div>
              <Button
                asChild
                className="w-full text-white"
                onClick={() => handlePageSelect("hobby")}
              >
                <Link href="/hobby">趣味・個人開発ページを見る</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Career Profile Page */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                転職活動
              </CardTitle>
              <CardDescription className="text-center">
                職歴、業務経験、転職に関連するスキル情報
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• WONQ株式会社での職歴</p>
                <p>• システムエンジニアとしての業務経験</p>
                <p>• 転職活動に関連するスキル</p>
                <p>• GitHub ポートフォリオへのリンク</p>
                <p>• 九州大学大学院での学歴</p>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full"
                onClick={() => handlePageSelect("career")}
              >
                <Link href="/career">転職活動ページを見る</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            各ページには、それぞれの用途に最適化された情報とリンクが含まれています。
          </p>
        </div>
      </div>
    </section>
  );
}
