import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-primary mb-2">
            404
          </CardTitle>
          <CardDescription className="text-lg">
            ページが見つかりませんでした
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            お探しのページは移動または削除された可能性があります。
            以下のページから目的のコンテンツをお探しください。
          </p>

          <div className="flex flex-col gap-3">
            <Button asChild className="w-full" variant="default">
              <Link href="/">トップページ（プロフィール選択）へ</Link>
            </Button>
            <Button asChild className="w-full" variant="outline">
              <Link href="/hobby">趣味・個人開発プロフィールへ</Link>
            </Button>
            <Button asChild className="w-full" variant="outline">
              <Link href="/career">転職活動プロフィールへ</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
