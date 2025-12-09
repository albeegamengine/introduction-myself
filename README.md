# 岩下直人 プロフィールページ

WONQ株式会社 代表取締役 岩下直人のプロフィールページです。

## 技術スタック

- **Next.js 15** (App Router) - 静的エクスポートモード
- **React 19** with TypeScript
- **Tailwind CSS** - スタイリング
- **Shadcn UI** - UIコンポーネント
- **Vitest** - テストフレームワーク

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド（静的エクスポート）
npm run build

# テストの実行
npm run test
```

## 画像の配置と最適化

### プロフィール画像の配置

プロフィール画像は `public/images/profile.jpg` に配置してください。

### 画像最適化のガイドライン

1. **ファイル形式**: WebP形式を推奨（フォールバック用にJPGも可）
2. **画像サイズ**: 
   - プロフィール画像: 800x800px（正方形）
   - 最大ファイルサイズ: 200KB以下
3. **最適化ツール**:
   - [Squoosh](https://squoosh.app/) - ブラウザベースの画像圧縮
   - [ImageOptim](https://imageoptim.com/) - Mac用画像最適化
   - `cwebp` コマンドラインツール（WebP変換）

### WebP変換コマンド例

```bash
# JPGからWebPへの変換
cwebp -q 80 profile.jpg -o profile.webp

# 複数形式を配置する場合
public/images/
  ├── profile.jpg   # フォールバック用
  └── profile.webp  # 最適化版
```

### アクセシビリティ

すべての画像には適切な代替テキスト（alt属性）が設定されています：
- プロフィール画像: `{name}のプロフィール写真`

## ビルドとパフォーマンス最適化

### ビルド設定

`next.config.js`には以下の最適化が適用されています：

- **静的エクスポート**: GitHub Pages対応の完全静的サイト生成
- **コンソール削除**: 本番環境でconsole.logを自動削除
- **パッケージ最適化**: lucide-react、Radix UIコンポーネントの最適化インポート
- **トレイリングスラッシュ**: 静的ホスティング向けURL設定

### ビルドサイズ

- **初回ロードJS**: 約113KB（gzip圧縮前）
- **CSSファイル**: 約15KB
- **総出力サイズ**: 約1.2MB（画像含む）

### パフォーマンス最適化

1. **コード分割**: Next.jsが自動的にページとコンポーネントを分割
2. **CSS最適化**: Tailwind CSSの未使用スタイルを自動削除
3. **画像最適化**: WebP形式の使用を推奨
4. **遅延読み込み**: 必要に応じて動的インポートを使用可能

## デプロイ

このプロジェクトは静的サイトとしてエクスポートされ、GitHub PagesまたはVercelにデプロイできます。

### GitHub Pagesへのデプロイ

```bash
# 静的ファイルの生成
npm run build

# outディレクトリに静的ファイルが生成されます
# GitHub Pagesの設定でoutディレクトリを公開ディレクトリに指定
```

### Vercelへのデプロイ

Vercelを使用する場合、`next.config.js`の`output: 'export'`を削除することで、
Next.jsの全機能（画像最適化、ISR等）を活用できます。

```bash
# Vercel CLIでデプロイ
vercel

# または、GitHubリポジトリをVercelに接続して自動デプロイ
```

## プロジェクト構造

```
/app                    # Next.js App Router
  layout.tsx           # ルートレイアウト
  page.tsx             # ホームページ
  globals.css          # グローバルスタイル

/components            # Reactコンポーネント
  /ui                  # UIプリミティブ
  Header.tsx           # ヘッダーコンポーネント
  Profile.tsx          # プロフィールセクション
  Links.tsx            # 外部リンク
  Footer.tsx           # フッター

/types                 # TypeScript型定義
/data                  # 静的データ
/lib                   # ユーティリティ関数
/public               # 静的アセット
  /images             # 画像ファイル
```

## ライセンス

© 2024 WONQ株式会社