# 技術スタック

## フレームワーク & ランタイム

- **Next.js 15.1.9** (App Router) 静的エクスポートモード
- **React 19.0.1** with TypeScript
- **Node.js** (ES2017ターゲット)

## スタイリング

- **Tailwind CSS 3.4.1** ユーティリティファーストスタイリング用
- **Radix UI** アクセシブルなプリミティブコンポーネント用
- **class-variance-authority** と **clsx** 条件付きスタイリング用
- **tailwind-merge** `lib/utils.ts`の`cn()`ユーティリティ経由

## UIコンポーネントライブラリ

- Radix UIプリミティブ：Avatar、Separator、Slot
- **lucide-react 0.556.0** アイコン用
- `components/ui/`内のカスタムshadcn/uiスタイルコンポーネント

## テスト

- **Vitest 4.0.15** テストランナー
- **@testing-library/react 16.3.0** コンポーネントテスト用
- **jsdom 27.3.0** DOM環境用
- **@testing-library/jest-dom 6.9.1** アサーション用
- **fast-check 4.4.0** プロパティベーステスト用

## ビルド & 開発

- **TypeScript 5** 厳密モード有効
- パスエイリアス `@/*` がプロジェクトルートにマップ
- GitHub Pages用静的エクスポート設定（画像最適化なし）

## よく使うコマンド

```bash
# 開発
npm run dev          # Next.js開発サーバー起動

# ビルド & デプロイ
npm run build        # /outディレクトリに静的エクスポートをビルド
npm start            # 本番サーバー起動（静的エクスポートでは未使用）

# コード品質
npm run lint         # ESLint実行

# テスト
npm run test         # Vitestテスト実行（単発実行、ウォッチモードなし）

# デプロイ
npm run deploy:vercel    # Vercel本番デプロイ
npm run deploy:preview   # Vercelプレビューデプロイ
```

## 設定ファイル

- `next.config.js` - 静的エクスポートと画像設定、GitHub Pages用basePath設定
- `tailwind.config.ts` - カスタムカラーとブレークポイント
- `tsconfig.json` - パスエイリアス付きTypeScript設定
- `vitest.config.ts` - テスト環境とセットアップ
- `components.json` - shadcn/ui設定
- `vitest.setup.ts` - テストセットアップファイル

## 現在の技術的実装

### Next.js設定

- 静的エクスポートモード（`output: "export"`）
- GitHub Pages用basePath（`/introduction-myself`）
- 画像最適化無効（静的エクスポート用）
- 本番環境でのconsole.log削除
- パッケージインポート最適化

### Tailwind CSS設定

- カスタムカラーパレット（primary、secondary、accent、text、background、surface）
- レスポンシブブレークポイント（mobile: 0px、tablet: 768px、desktop: 1024px）
- カスタムスペーシング、フォントサイズ、ボーダー半径
- ボックスシャドウ設定

### TypeScript設定

- 厳密モード有効
- `@/*`パスエイリアス
- ES2017ターゲット
- JSX preserve

### テスト設定

- jsdom環境
- グローバル設定有効
- React Testing Library統合
- fast-checkによるプロパティベーステスト対応

## 依存関係

### 本番依存関係

- `@radix-ui/react-*` - UIプリミティブ
- `autoprefixer` - CSS後処理
- `class-variance-authority` - バリアント管理
- `clsx` - 条件付きクラス名
- `lucide-react` - アイコンライブラリ
- `tailwind-merge` - Tailwindクラス結合

### 開発依存関係

- `@testing-library/*` - テストライブラリ群
- `@vitejs/plugin-react` - Vite React プラグイン
- `eslint` - コード品質チェック
- `fast-check` - プロパティベーステスト
- `postcss` - CSS処理
- `tailwindcss` - CSSフレームワーク
