import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface NavigationProps {
  currentPage: "hobby" | "career";
}

export function Navigation({ currentPage }: NavigationProps) {
  const getPageLabel = (page: "hobby" | "career") => {
    switch (page) {
      case "hobby":
        return "趣味・個人開発";
      case "career":
        return "転職活動";
      default:
        return page;
    }
  };

  const getOtherPage = (current: "hobby" | "career"): "hobby" | "career" => {
    return current === "hobby" ? "career" : "hobby";
  };

  const otherPage = getOtherPage(currentPage);

  return (
    <nav className="w-full">
      <Card className="border-none shadow-sm bg-surface/50">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Current page indicator */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                現在のページ:
              </span>
              <Badge variant="default" className="text-white">
                {getPageLabel(currentPage)}
              </Badge>
            </div>

            {/* Navigation to other page */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                他のページを見る:
              </span>
              <Button asChild variant="outline" size="sm">
                <Link href={`/${otherPage}`}>
                  {getPageLabel(otherPage)}ページへ
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </nav>
  );
}
