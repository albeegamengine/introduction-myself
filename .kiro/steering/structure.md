# プロジェクト構造

## ディレクトリ構成

```
/app                    # Next.js App Router ページとレイアウト
  layout.tsx           # グローバルスタイルを含むルートレイアウト
  page.tsx             # ホームページ
  globals.css          # グローバルCSSとTailwindディレクティブ

/components            # Reactコンポーネント
  /ui                  # 再利用可能なUIプリミティブ（shadcn/uiスタイル）
    avatar.tsx
    badge.tsx
    button.tsx
    card.tsx
    separator.tsx
  Header.tsx           # プロフィールヘッダーコンポーネント
  Profile.tsx          # 経歴と専門分野セクション
  Links.tsx            # 外部リンクコンポーネント
  Footer.tsx           # フッターコンポーネント
  *.test.tsx           # コンポーネント単体テスト
  *.property.test.tsx  # プロパティベーステスト
  *.integration.test.tsx # 統合テスト

/types                 # TypeScript型定義
  profile.ts           # ProfileData、CompanyInfo、ExternalLink等

/data                  # 静的データファイル
  profileData.ts       # プロフィールコンテンツと設定

/lib                   # ユーティリティ関数
  utils.ts             # className結合用のcn()ヘルパー

/public               # 静的アセット
  /images             # 画像ファイル（プロフィール写真等）
    albee_icon.png    # プロフィール画像・ファビコン

/.kiro                # Kiro IDE設定
  /steering           # AI アシスタント ガイダンス文書
  /specs              # 機能仕様書
    /my-profile-page  # プロフィールページ仕様
      requirements.md # 要件定義書
      design.md       # 設計文書
      tasks.md        # 実装タスクリスト

/out                  # ビルド出力（静的エクスポート、gitignore対象）
/.next                # Next.jsビルドキャッシュ（gitignore対象）
```

## 規約

### ファイル命名

- Reactコンポーネント: PascalCase（例：`Header.tsx`、`Profile.tsx`）
- テストファイル: `ComponentName.test.tsx`、`ComponentName.property.test.tsx`、`ComponentName.integration.test.tsx`
- ユーティリティとデータ: camelCase（例：`utils.ts`、`profileData.ts`）
- 型定義: camelCase（例：`profile.ts`）

### インポートパス

- プロジェクトルートからの絶対インポートには`@/`エイリアスを使用
- 例：`import { cn } from "@/lib/utils"`
- 例：`import { ProfileData } from "@/types/profile"`

### コンポーネント構造

- TypeScriptインターフェースを持つ関数コンポーネント
- Propsインターフェースは`ComponentNameProps`と命名
- 名前付きエクスポートでコンポーネントをエクスポート：`export function ComponentName()`

### スタイリング

- Tailwindユーティリティクラスを使用
- 条件付きクラスには`@/lib/utils`の`cn()`ヘルパーを使用
- `tailwind.config.ts`でカスタムカラーを定義：primary、secondary、accent、text、background、surface
- レスポンシブブレークポイント：mobile（0px）、tablet（768px）、desktop（1024px）

### テスト

- テストは`/components`ディレクトリ内でコンポーネントと同じ場所に配置
- React Testing LibraryでVitestを使用
- テスト構造：グループ化用の`describe`ブロック、個別テスト用の`it`
- モックデータはテストファイル内で定義
- 日本語コンテンツをテストする際は日本語でテストを記述

### 型安全性

- 厳密なTypeScriptモードを有効化
- すべてのコンポーネントに型付きProps
- `/types`ディレクトリに共有型
- 暗黙のany型は使用しない

## 現在の実装状況

### 実装済みコンポーネント

- **Header**: プロフィール画像、氏名、役職、会社情報を表示
- **Profile**: 経歴と専門分野を2カラムレイアウトで表示
- **Links**: 外部リンク（Blogger、YouTube、GitHub）をカード形式で表示
- **Footer**: 著作権表示

### 実装済み機能

- レスポンシブデザイン（モバイル、タブレット、デスクトップ対応）
- shadcn/uiコンポーネントライブラリの統合
- TypeScript型定義
- Vitestによるテスト環境
- GitHub Pages用静的エクスポート設定
- SEO最適化（メタデータ、構造化データ）

### 計画中の拡張

- 複数ページ対応（趣味用・転職活動用）
- ページ間ナビゲーション
- ページ選択UI
- ページタイプ別データモデル
