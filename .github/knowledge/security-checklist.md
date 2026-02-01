# セキュリティチェックリスト

最終更新: 2026-01-28

## 認証・認可

### 必須チェック項目

- [ ] **パスワード**: 最低8文字、複雑性要件あり
- [ ] **トークン**: JWT使用、有効期限15分（リフレッシュトークンは7日）
- [ ] **セッション**: HttpOnly, Secure, SameSite=Strict
- [ ] **権限チェック**: すべてのAPI呼び出しで実施

### 禁止事項

```typescript
// ❌ NG: クライアント側だけでの権限チェック
if (user.isAdmin) {
  showAdminPanel();
}

// ✅ OK: サーバー側で必ず検証
const data = await api.get("/admin/data"); // サーバーで権限チェック済み
```

## 入力値検証

### バリデーション必須項目

1. **すべてのユーザー入力**: フロント・バックエンド両方で検証
2. **ファイルアップロード**: 拡張子・MIME type・サイズチェック
3. **URL パラメータ**: 型チェック、範囲チェック

### SQLインジェクション対策

```typescript
// ❌ 絶対NG: 文字列連結
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ OK: プリペアドステートメント
const query = "SELECT * FROM users WHERE id = ?";
db.execute(query, [userId]);

// ✅ OK: ORMの使用
const user = await User.findByPk(userId);
```

### XSS対策

```typescript
// ❌ NG: 生のHTMLを直接挿入
element.innerHTML = userInput;

// ✅ OK: エスケープ処理
element.textContent = userInput;

// ✅ OK: サニタイズライブラリ使用
import DOMPurify from "dompurify";
element.innerHTML = DOMPurify.sanitize(userInput);
```

## API セキュリティ

### レート制限

- **認証API**: 5回/分
- **一般API**: 100回/分
- **アップロード**: 10回/時

```typescript
// ✅ Express例
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1分
  max: 100,
  message: "リクエストが多すぎます",
});

app.use("/api/", limiter);
```

### CORS設定

```typescript
// ❌ NG: すべて許可
app.use(cors({ origin: "*" }));

// ✅ OK: 許可リストで制限
app.use(
  cors({
    origin: ["https://example.com", "https://app.example.com"],
    credentials: true,
  }),
);
```

## 機密情報の扱い

### 環境変数

```bash
# ✅ .env ファイル（gitignoreに追加）
DATABASE_URL=postgresql://...
API_SECRET_KEY=xxx...
STRIPE_SECRET_KEY=sk_live_...

# ❌ コードにハードコード禁止
const apiKey = 'sk_live_xxx...'; // 絶対NG
```

### ログ出力

```typescript
// ❌ NG: 機密情報をログに出力
logger.info("User login", { password: user.password });

// ✅ OK: マスク処理
logger.info("User login", {
  email: user.email,
  passwordLength: user.password.length,
});
```

## データベース

### 暗号化必須項目

- パスワード: bcrypt（コスト係数10以上）
- 個人情報: AES-256
- クレジットカード: トークン化（Stripe等）

```typescript
// ✅ パスワードハッシュ化
import bcrypt from "bcrypt";

const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

### バックアップ

- **頻度**: 日次（自動）
- **保存期間**: 30日
- **暗号化**: 必須

## 依存関係管理

### 脆弱性スキャン

```bash
# 毎週実行
npm audit
npm audit fix

# または
yarn audit
```

### 許可されないパッケージ

- 3年以上更新されていないもの
- Critical脆弱性があるもの
- メンテナンス放棄されたもの

## HTTPS/TLS

### 必須設定

- TLS 1.2以上のみ許可
- 強力な暗号スイートのみ
- HSTS有効化

```typescript
// ✅ Express例
app.use((req, res, next) => {
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );
  next();
});
```

## エラーハンドリング

### 情報漏洩防止

```typescript
// ❌ NG: 詳細なエラーを外部公開
res.status(500).json({
  error: error.stack,
  query: sqlQuery,
});

// ✅ OK: 一般的なメッセージのみ
res.status(500).json({
  error: "Internal Server Error",
});

// サーバーログには詳細を記録
logger.error("Database error", {
  error: error.message,
  stack: error.stack,
  query: sqlQuery,
});
```

## ファイルアップロード

### チェック項目

```typescript
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// ✅ バリデーション
if (!ALLOWED_TYPES.includes(file.mimetype)) {
  throw new Error("許可されていないファイル形式");
}

if (file.size > MAX_SIZE) {
  throw new Error("ファイルサイズが大きすぎます");
}

// ファイル名のサニタイズ
const safeFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
```

## レビュー時の重点チェック

### Critical（修正必須）

- [ ] SQL インジェクション対策
- [ ] XSS対策
- [ ] 認証・認可の実装
- [ ] 機密情報のハードコード

### High（強く推奨）

- [ ] 入力値バリデーション
- [ ] エラーメッセージの適切な処理
- [ ] HTTPS強制
- [ ] レート制限

### Medium（推奨）

- [ ] CORS設定
- [ ] セキュリティヘッダー
- [ ] ログの適切な記録

## 参考資料

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- CWE/SANS Top 25: https://cwe.mitre.org/top25/
- 社内セキュリティガイドライン: [社内リンク]
