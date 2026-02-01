# AI Code Review セットアップガイド

Gemini APIを使用したGitHub Actions自動コードレビューシステム

## 📋 目次

1. [初期セットアップ](#初期セットアップ)
2. [ナレッジベースの配置](#ナレッジベースの配置)
3. [運用方法](#運用方法)
4. [カスタマイズ](#カスタマイズ)

## 🚀 初期セットアップ

### 1. Gemini API キーの取得

1. [Google AI Studio](https://makersuite.google.com/app/apikey) にアクセス
2. 「Create API Key」をクリック
3. APIキーをコピー

**無料枠:**

- 1日あたり1,500リクエスト
- 1分あたり15リクエスト
- 十分なプロジェクト規模: 中小規模なら余裕

### 2. GitHub Secretsにキーを登録

1. リポジトリの `Settings` → `Secrets and variables` → `Actions`
2. `New repository secret` をクリック
3. 以下を登録:
   - Name: `GEMINI_API_KEY`
   - Secret: 取得したAPIキー

### 3. ワークフローファイルを配置

```bash
# リポジトリのルートで実行
mkdir -p .github/workflows
```

`code-review.yml` を `.github/workflows/` に配置

### 4. ナレッジベースディレクトリの作成

```bash
mkdir -p .github/knowledge
```

## 📚 ナレッジベースの配置

### ディレクトリ構成

```
.github/
├── workflows/
│   └── code-review.yml
└── knowledge/
    ├── coding-standards.md       # コーディング規約
    ├── security-checklist.md     # セキュリティ
    ├── architecture-patterns.md  # アーキテクチャ
    ├── team-conventions.md       # チーム独自ルール（追加可）
    └── past-reviews/             # レビュー履歴（自動生成）
```

### 提供されているナレッジベース

1. **coding-standards.md** - 基本的なコーディング規約
   - 命名規則
   - 禁止事項
   - コメント規約
   - エラーハンドリング
   - テスト規約

2. **security-checklist.md** - セキュリティチェックリスト
   - 認証・認可
   - SQLインジェクション対策
   - XSS対策
   - API セキュリティ
   - 機密情報の扱い

3. **architecture-patterns.md** - アーキテクチャパターン
   - ディレクトリ構成
   - レイヤードアーキテクチャ
   - Repository/Service パターン
   - React コンポーネント設計

### カスタマイズ方法

#### プロジェクト固有のルールを追加

```bash
# チーム独自の規約ファイルを作成
touch .github/knowledge/team-conventions.md
```

例:

```markdown
# チーム独自規約

## 使用ライブラリ

- 状態管理: Zustand（Reduxは使わない）
- HTTP Client: Axios（fetchは非推奨）
- UI: shadcn/ui + Tailwind CSS

## プロジェクト固有ルール

- APIエンドポイントは `/api/v1/` プレフィックス必須
- 環境変数は `.env.local` に記載
- すべてのAPIレスポンスは `ResponseWrapper<T>` 型を使用
```

## 🔄 運用方法

### 基本フロー

1. **Pull Request作成**

   ```bash
   git checkout -b feature/new-feature
   git commit -m "feat: 新機能追加"
   git push origin feature/new-feature
   ```

2. **自動レビュー実行**
   - PRを作成すると自動でGitHub Actionsが起動
   - 2-3分でレビューコメントが投稿される

3. **レビュー結果の確認**
   - PRページにAIのコメントが表示される
   - 改善提案を確認して修正

4. **継続的改善**
   - AIが指摘できなかった項目を `.github/knowledge/*.md` に追記
   - 次回から同様の問題を検出可能に

### ナレッジベースの育成サイクル

```
┌─────────────────┐
│  PR作成         │
└────────┬────────┘
         ↓
┌─────────────────┐
│  AIレビュー     │
└────────┬────────┘
         ↓
┌─────────────────┐
│  人間レビュー   │ → 「この指摘が欲しかった」
└────────┬────────┘
         ↓
┌─────────────────┐
│ ナレッジ追記    │ → .mdファイルに追加
└────────┬────────┘
         ↓
┌─────────────────┐
│ 次回から検出    │ ✅
└─────────────────┘
```

### 実際の追記例

**Before:** AIが気づかなかった

```typescript
// PRで書かれたコード
const apiUrl = "http://api.example.com"; // HTTPになっている
```

**レビュー後:** ナレッジに追加

```markdown
# security-checklist.md に追記

## API通信

### 必須事項

- すべてのAPI通信はHTTPS必須
- 開発環境でもHTTPは使用禁止（localhostを除く）
```

**Next time:** 自動検出される！

## ⚙️ カスタマイズ

### レビュー頻度の調整

```yaml
# 特定のファイルだけレビュー
on:
  pull_request:
    paths:
      - "src/**"
      - "!src/**/*.test.ts" # テストファイルは除外
```

### レビューの厳しさ調整

`code-review.yml` のプロンプト部分を編集:

```python
# 厳しめ
prompt = f"""
あなたは厳格なシニアエンジニアです。
些細な問題も見逃さず、すべて指摘してください。
"""

# 優しめ
prompt = f"""
あなたは親切なメンターです。
重大な問題のみ指摘し、良い点も積極的に評価してください。
"""
```

### 特定の言語・フレームワークに特化

```bash
# React専用のナレッジを追加
touch .github/knowledge/react-best-practices.md
```

```markdown
# React Best Practices

## Hooks ルール

- useEffectの依存配列は必ず正確に
- カスタムフックは `use` で始める
- 条件付きフックは禁止

## パフォーマンス

- 重い計算は useMemo
- コールバックは useCallback
- リストには必ずkey
```

## 🔍 トラブルシューティング

### AIがレビューしない

**確認事項:**

1. GEMINI_API_KEY が正しく設定されているか
2. GitHub Actionsが有効になっているか
3. ワークファイルの構文エラーがないか

```bash
# Actions ログを確認
# GitHub UI: Actions タブ → 該当ワークフロー → ログ確認
```

### APIレート制限エラー

**対策:**

- 大きなPRは分割する
- diff.txtを50,000文字に制限済み（コード内）
- 必要に応じて制限を調整

### レビュー品質が低い

**改善方法:**

1. ナレッジベースに具体例を追加
2. プロンプトを調整（厳しさ・観点）
3. 過去のレビュー履歴をナレッジ化

## 📊 費用試算

### Gemini API（無料枠）

- **制限**: 1日1,500リクエスト
- **想定**: 1PR = 1リクエスト
- **結論**: 1日50PR程度まで完全無料

### GitHub Actions（無料枠）

- **制限**: パブリック無制限、プライベート2,000分/月
- **想定**: 1レビュー = 2分
- **結論**: 月1,000PR程度まで無料

## 🎯 運用のコツ

### 1. 段階的な導入

```
Week 1: セキュリティのみチェック
Week 2: コーディング規約追加
Week 3: アーキテクチャパターン追加
Week 4: チーム独自ルール追加
```

### 2. チームでナレッジ育成

- 週1回: レビュー結果を振り返り
- 気づきをナレッジに追記
- 3ヶ月で精度大幅向上

### 3. 人間レビューとの併用

- AIレビュー: 基本的なチェック
- 人間レビュー: ビジネスロジック・設計判断

## 📝 ライセンス

このセットアップガイドとナレッジベースはMITライセンスです。
自由に改変・利用してください。

## 🤝 コントリビューション

ナレッジベースの改善提案は歓迎です！

- Issue: バグ報告・機能要望
- PR: ナレッジの追加・修正

---

**Happy Coding! 🚀**
