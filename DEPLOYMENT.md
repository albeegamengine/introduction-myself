# デプロイメントガイド

このドキュメントでは、麻生真介プロフィールページのデプロイ手順を詳しく説明します。

## 目次

1. [Vercel へのデプロイ（推奨）](#vercelへのデプロイ推奨)
2. [GitHub Pages へのデプロイ](#github-pagesへのデプロイ)
3. [環境変数の設定](#環境変数の設定)
4. [カスタムドメインの設定](#カスタムドメインの設定)
5. [デプロイ後の確認](#デプロイ後の確認)
6. [トラブルシューティング](#トラブルシューティング)

## Vercel へのデプロイ（推奨）

Vercel は、Next.js の開発元である Vercel 社が提供するホスティングプラットフォームです。Next.js との統合が最も優れており、以下のメリットがあります：

- 自動デプロイ（GitHub プッシュ時）
- プレビュー環境の自動生成（プルリクエスト時）
- エッジネットワークによる高速配信
- 無料 SSL 証明書
- 画像最適化（オプション）
- アナリティクス機能

### 前提条件

- GitHub アカウント
- Vercel アカウント（無料プランで十分）
- Node.js 20.x 以上

### ステップ 1: GitHub リポジトリの準備

```bash
# プロジェクトディレクトリに移動
cd iwashita-profile-page

# Gitリポジトリの初期化（まだの場合）
git init

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: Profile page for Naoto Iwashita"

# GitHubリポジトリを作成（GitHub CLIを使用する場合）
gh repo create iwashita-profile-page --public --source=. --remote=origin

# または、GitHubウェブサイトでリポジトリを作成してから
git remote add origin https://github.com/your-username/iwashita-profile-page.git

# リモートリポジトリにプッシュ
git push -u origin main
```

### ステップ 2: Vercel アカウントの作成

1. [Vercel](https://vercel.com/)にアクセス
2. 「Sign Up」をクリック
3. 「Continue with GitHub」を選択して GitHub アカウントで連携
4. 必要な権限を承認

### ステップ 3: プロジェクトのインポート

1. Vercel ダッシュボードで「Add New...」→「Project」をクリック
2. 「Import Git Repository」セクションで GitHub リポジトリを検索
3. `iwashita-profile-page`リポジトリを選択して「Import」をクリック

### ステップ 4: プロジェクト設定

Vercel が自動的に以下の設定を検出します：

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Install Command**: `npm install`
- **Node.js Version**: 20.x

設定を確認して「Deploy」をクリックします。

### ステップ 5: デプロイの完了

- ビルドログがリアルタイムで表示されます
- 数分でデプロイが完了します
- デプロイが成功すると、URL が発行されます（例: `https://iwashita-profile-page.vercel.app`）

### ステップ 6: 動作確認

発行された URL にアクセスして、以下を確認します：

- [ ] ページが正常に表示される
- [ ] プロフィール画像が表示される
- [ ] Lion AI と WONQ へのリンクが機能する
- [ ] レスポンシブデザインが機能する

## GitHub Pages へのデプロイ

GitHub Pages は、GitHub が提供する無料の静的サイトホスティングサービスです。

### 前提条件

- GitHub アカウント
- Node.js 20.x 以上

### ステップ 1: GitHub Actions ワークフローの作成

`.github/workflows/deploy.yml`を作成します：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### ステップ 2: GitHub Pages の有効化

1. GitHub リポジトリの「Settings」タブを開く
2. 左サイドバーの「Pages」をクリック
3. 「Source」で「GitHub Actions」を選択
4. 「Save」をクリック

### ステップ 3: デプロイ

```bash
# ワークフローファイルをコミット
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow for deployment"
git push origin main
```

GitHub Actions が自動的に実行され、数分後にサイトが公開されます。

### ステップ 4: URL の確認

- リポジトリの「Settings」→「Pages」で URL を確認
- 通常は`https://your-username.github.io/iwashita-profile-page/`

## 環境変数の設定

### Vercel での環境変数設定

1. Vercel ダッシュボードでプロジェクトを選択
2. 「Settings」タブをクリック
3. 左サイドバーの「Environment Variables」をクリック
4. 以下の環境変数を追加：

| 変数名                 | 値                                | 環境                             |
| ---------------------- | --------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` | Production, Preview, Development |

5. 「Save」をクリック
6. 再デプロイが必要な場合は「Deployments」タブから最新のデプロイを「Redeploy」

### ローカル開発での環境変数

`.env.local`ファイルを作成（`.env.example`をコピー）：

```bash
cp .env.example .env.local
```

`.env.local`を編集：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**注意**: `.env.local`は Git にコミットしないでください（`.gitignore`に含まれています）。

## カスタムドメインの設定

### Vercel でのカスタムドメイン設定

#### ステップ 1: ドメインの追加

1. Vercel ダッシュボードでプロジェクトを選択
2. 「Settings」タブをクリック
3. 左サイドバーの「Domains」をクリック
4. カスタムドメインを入力（例: `iwashita.example.com`）
5. 「Add」をクリック

#### ステップ 2: DNS レコードの設定

Vercel が推奨する DNS 設定が表示されます。ドメインレジストラ（お名前.com、ムームードメイン等）で以下のレコードを追加：

**オプション 1: A レコード（推奨）**

| タイプ | 名前 | 値          |
| ------ | ---- | ----------- |
| A      | @    | 76.76.21.21 |
| A      | www  | 76.76.21.21 |

**オプション 2: CNAME レコード**

| タイプ | 名前 | 値                   |
| ------ | ---- | -------------------- |
| CNAME  | @    | cname.vercel-dns.com |
| CNAME  | www  | cname.vercel-dns.com |

#### ステップ 3: SSL 証明書の発行

- DNS レコードが正しく設定されると、Vercel が自動的に SSL 証明書を発行します（Let's Encrypt）
- 通常、数分から数時間で完了します
- 証明書は自動的に更新されます

### GitHub Pages でのカスタムドメイン設定

1. リポジトリの「Settings」→「Pages」を開く
2. 「Custom domain」にドメインを入力（例: `iwashita.example.com`）
3. 「Save」をクリック
4. DNS レコードを設定：

| タイプ | 名前 | 値                      |
| ------ | ---- | ----------------------- |
| A      | @    | 185.199.108.153         |
| A      | @    | 185.199.109.153         |
| A      | @    | 185.199.110.153         |
| A      | @    | 185.199.111.153         |
| CNAME  | www  | your-username.github.io |

5. 「Enforce HTTPS」にチェックを入れる

## デプロイ後の確認

デプロイが完了したら、以下のチェックリストを確認してください：

### 基本機能

- [ ] ページが正常に表示される
- [ ] HTTPS でアクセスできる
- [ ] プロフィール画像が表示される
- [ ] 氏名、役職、会社名が表示される
- [ ] 経歴情報が表示される
- [ ] 専門分野が表示される

### リンク

- [ ] Lion AI リンクが機能する（https://www.lion-ai.co.jp/）
- [ ] WONQ リンクが機能する（https://linealbeegames4730.blogspot.com/）
- [ ] リンクが新しいタブで開く
- [ ] rel="noopener noreferrer"が設定されている

### レスポンシブデザイン

- [ ] モバイル（375px）で正常に表示される
- [ ] タブレット（768px）で正常に表示される
- [ ] デスクトップ（1024px 以上）で正常に表示される
- [ ] 画像が適切にリサイズされる

### SEO

- [ ] title タグが設定されている
- [ ] meta description が設定されている
- [ ] Open Graph タグが設定されている
- [ ] robots.txt が配信される
- [ ] sitemap.xml が配信される
- [ ] すべての画像に alt 属性がある

### パフォーマンス

- [ ] ページの読み込みが 3 秒以内
- [ ] 画像が最適化されている
- [ ] CSS が最小化されている
- [ ] JavaScript が最小化されている

### ブラウザ互換性

- [ ] Chrome（最新版）で動作する
- [ ] Firefox（最新版）で動作する
- [ ] Safari（最新版）で動作する
- [ ] Edge（最新版）で動作する

## トラブルシューティング

### ビルドエラー

#### エラー: "Module not found"

```bash
# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install

# ローカルでビルドを確認
npm run build
```

#### エラー: "Type error"

```bash
# TypeScriptの型チェック
npx tsc --noEmit

# 型定義の更新
npm install --save-dev @types/node @types/react @types/react-dom
```

### 画像が表示されない

#### 原因 1: 画像ファイルが存在しない

```bash
# 画像ファイルの確認
ls -la public/images/

# 画像ファイルを配置
cp /path/to/albee_icon.png public/images/albee_icon.png
```

#### 原因 2: 画像パスが間違っている

- 正しいパス: `/images/albee_icon.png`
- 間違ったパス: `./images/albee_icon.png`、`images/albee_icon.png`

#### 原因 3: 静的エクスポートモードでの画像最適化

静的エクスポートモード（`output: 'export'`）では、Next.js の画像最適化が無効化されています。`next.config.js`で`images.unoptimized: true`が設定されていることを確認してください。

### リンクが機能しない

#### 原因: 相対パスの問題

静的エクスポートモードでは、トレイリングスラッシュが必要な場合があります。`next.config.js`で`trailingSlash: true`が設定されていることを確認してください。

### 環境変数が反映されない

#### Vercel

1. 環境変数が正しく設定されているか確認
2. `NEXT_PUBLIC_`プレフィックスが付いているか確認（クライアントサイドで使用する場合）
3. 環境変数を変更した後、再デプロイが必要

```bash
# Vercel CLIで再デプロイ
vercel --prod
```

#### GitHub Pages

GitHub Pages では環境変数を直接設定できません。ビルド時に環境変数を埋め込む必要があります。

### デプロイが失敗する

#### Vercel

1. ビルドログを確認（Vercel ダッシュボード →「Deployments」→ 失敗したデプロイをクリック）
2. Node.js バージョンを確認（20.x 以上）
3. ローカルでビルドが成功するか確認

```bash
npm run build
```

#### GitHub Pages

1. GitHub Actions のログを確認（リポジトリ →「Actions」タブ）
2. ワークフローファイルの構文を確認
3. GitHub Pages が有効になっているか確認

### パフォーマンスが悪い

#### 画像の最適化

```bash
# WebP形式に変換（cwebpツールが必要）
cwebp -q 80 public/images/albee_icon.png -o public/images/profile.webp

# 画像サイズの縮小
# macOSの場合
sips -Z 800 public/images/albee_icon.png

# Linuxの場合（ImageMagickが必要）
convert public/images/albee_icon.png -resize 800x800 public/images/albee_icon.png
```

#### CSS の最適化

Tailwind CSS は自動的に未使用のスタイルを削除します。`tailwind.config.ts`の`content`設定が正しいことを確認してください。

#### JavaScript の最適化

Next.js は自動的にコード分割を行います。さらに最適化する場合は、動的インポートを使用してください：

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <p>Loading...</p>,
});
```

## サポート

問題が解決しない場合は、以下のリソースを参照してください：

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Vercel 公式ドキュメント](https://vercel.com/docs)
- [GitHub Pages 公式ドキュメント](https://docs.github.com/pages)
- [プロジェクトの GitHub リポジトリ](https://github.com/your-username/iwashita-profile-page)

## まとめ

このガイドでは、麻生真介プロフィールページを Vercel または GitHub Pages にデプロイする方法を説明しました。推奨されるデプロイ方法は Vercel です。Vercel を使用することで、自動デプロイ、プレビュー環境、エッジネットワーク配信などの高度な機能を利用できます。

デプロイ後は、必ず動作確認を行い、すべての機能が正常に動作することを確認してください。
