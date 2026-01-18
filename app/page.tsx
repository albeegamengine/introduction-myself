import { PageSelector } from "@/components/PageSelector";
import { Footer } from "@/components/Footer";
import { commonData } from "@/data/commonData";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const copyright = `© ${currentYear} ${commonData.name}. All rights reserved.`;

  // JSON-LD構造化データ（WebSiteスキーマ）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "albeeのプロフィール",
    url: "https://albeegamengine.github.io/introduction-myself/",
    description:
      "WONQ株式会社のシステムエンジニア albee のプロフィールページ。趣味・個人開発用と転職活動用の2つのページを提供しています。",
    author: {
      "@type": "Person",
      name: commonData.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://albeegamengine.github.io/introduction-myself/{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* JSON-LD構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="sr-only">
        <h1>albeeのプロフィール選択</h1>
      </header>
      <main className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center py-12">
          <PageSelector />
        </div>
      </main>
      <Footer copyright={copyright} />
    </>
  );
}
