import React from "react";
import { ExternalLink } from "@/types/profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LinksProps {
  links: ExternalLink[];
  pageType: "hobby" | "career";
}

export const Links: React.FC<LinksProps> = ({ links, pageType }) => {
  // Filter links based on page type
  const filteredLinks = links.filter((link) => {
    if (pageType === "hobby") {
      return (
        link.category === "hobby" ||
        link.category === "social" ||
        !link.category
      );
    } else if (pageType === "career") {
      return (
        link.category === "career" ||
        link.category === "portfolio" ||
        link.category === "work" ||
        !link.category
      );
    }
    return true;
  });

  // Get appropriate title and description based on page type
  const getTitle = () => {
    switch (pageType) {
      case "hobby":
        return "関連リンク";
      case "career":
        return "ポートフォリオ・関連リンク";
      default:
        return "関連リンク";
    }
  };

  const getDescription = () => {
    switch (pageType) {
      case "hobby":
        return "個人開発用ブログ、YouTube、GitHubのURLです。";
      case "career":
        return "転職活動・キャリア関連のリンクです。";
      default:
        return "関連リンクです。";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredLinks.map((link, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{link.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {link.description}
                </p>
              </div>
              <Button
                asChild
                variant="default"
                className="w-full sm:w-auto text-white"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  サイトを訪問
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </Button>
            </div>
            {index < filteredLinks.length - 1 && (
              <div className="border-b border-border mt-4" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
