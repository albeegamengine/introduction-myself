# コーディング規約

最終更新: 2026-01-28

## 命名規則

### 変数名

- **キャメルケース** を使用: `userId`, `isActive`
- **boolean型** は `is`, `has`, `should` で始める: `isValid`, `hasPermission`
- **定数** は `UPPER_SNAKE_CASE`: `MAX_RETRY_COUNT`, `API_ENDPOINT`

### 関数名

- **動詞で始める**: `getUserData()`, `calculateTotal()`, `validateInput()`
- **1つの責務のみ**: 1関数は1つのことだけを行う
- **長さは気にしない**: 明確さを優先、`get()` より `getUserById()` が良い

### クラス名

- **パスカルケース**: `UserService`, `OrderRepository`
- **名詞で命名**: 動作ではなく概念を表す

## 禁止事項

### 絶対に使わないもの

- `var` キーワード（JavaScript/TypeScript）→ `const` または `let` を使用
- `eval()` 関数 → セキュリティリスク
- マジックナンバー → 定数化必須

  ```typescript
  // ❌ NG
  if (user.age > 20) {
  }

  // ✅ OK
  const ADULT_AGE = 20;
  if (user.age > ADULT_AGE) {
  }
  ```

### 非推奨

- `console.log()` での本番デバッグ → ロガーライブラリを使用
- `setTimeout()` の乱用 → Promise/async-awaitを優先
- 深いネスト（3階層以上）→ 早期リターンやガード節で対応

## コメント規約

### 必須コメント

- **公開API** には必ずJSDoc/TSDocを記述
- **複雑なロジック** には「なぜそうしたか」を記述
- **一時的な対応** には `TODO:` または `FIXME:` を付ける

### 不要なコメント

```typescript
// ❌ コードを読めばわかることは書かない
let count = 0; // カウンターを0で初期化

// ✅ 意図や理由を書く
let count = 0; // 再試行回数。3回失敗でタイムアウト扱い
```

## エラーハンドリング

### 基本方針

- **すべての外部API呼び出し** はtry-catchで囲む
- **エラーメッセージ** は具体的に（ユーザーに見せる場合は一般化）
- **エラーログ** には必ずコンテキスト情報を含める

```typescript
// ✅ 推奨パターン
try {
  const data = await fetchUserData(userId);
  return data;
} catch (error) {
  logger.error("ユーザーデータ取得失敗", {
    userId,
    error: error.message,
    stack: error.stack,
  });
  throw new ApplicationError("ユーザー情報の取得に失敗しました");
}
```

## パフォーマンス

### 必ず守ること

- **N+1クエリ問題** を避ける → バッチ取得やJOINを活用
- **大量データ** はページネーション必須
- **重い処理** は非同期化またはバックグラウンドジョブ化

### 最適化の優先順位

1. データベースクエリの最適化
2. 不要なレンダリングの削減（React等）
3. メモ化・キャッシング
4. アルゴリズムの改善

## テスト

### 必須カバレッジ

- **ビジネスロジック**: 80%以上
- **ユーティリティ関数**: 90%以上
- **API エンドポイント**: 主要パスは100%

### テストの粒度

- **単体テスト**: 関数・メソッド単位
- **結合テスト**: モジュール間の連携
- **E2Eテスト**: 重要なユーザーフロー

```typescript
// ✅ 良いテスト
describe("calculateDiscount", () => {
  it("会員ユーザーには10%割引を適用する", () => {
    const result = calculateDiscount(1000, { isMember: true });
    expect(result).toBe(900);
  });

  it("非会員ユーザーには割引なし", () => {
    const result = calculateDiscount(1000, { isMember: false });
    expect(result).toBe(1000);
  });
});
```

## Git運用

### コミットメッセージ

```
<type>: <subject>

<body>

<footer>
```

**Type一覧:**

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `refactor`: リファクタリング
- `test`: テスト追加・修正
- `chore`: ビルド・ツール関連

**例:**

```
feat: ユーザー検索機能を追加

- 名前での部分一致検索に対応
- ページネーション実装（20件/page）
- 検索履歴を LocalStorage に保存

Closes #123
```

### ブランチ戦略

- `main`: 本番環境と同期
- `develop`: 開発の最新
- `feature/xxx`: 機能開発
- `hotfix/xxx`: 緊急修正

## レビューで特に見るポイント

1. **セキュリティ**: SQL injection, XSS, CSRF対策
2. **パフォーマンス**: 無駄なループ、N+1クエリ
3. **可読性**: ネストの深さ、関数の長さ
4. **テスト**: エッジケースのカバー
5. **規約準拠**: この文書のルール遵守
