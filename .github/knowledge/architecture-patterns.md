# アーキテクチャパターン

最終更新: 2026-01-28

## ディレクトリ構成

### バックエンド（Node.js/TypeScript）

```
src/
├── controllers/     # リクエスト処理
├── services/        # ビジネスロジック
├── repositories/    # データアクセス層
├── models/          # データモデル
├── middlewares/     # Express ミドルウェア
├── utils/           # ユーティリティ関数
├── config/          # 設定ファイル
├── types/           # 型定義
└── tests/           # テストコード
```

### フロントエンド（React/Next.js）

```
src/
├── app/             # Next.js App Router
│   ├── (auth)/      # 認証が必要なページ
│   └── api/         # API Routes
├── components/      # Reactコンポーネント
│   ├── ui/          # 汎用UIコンポーネント
│   ├── features/    # 機能別コンポーネント
│   └── layouts/     # レイアウト
├── hooks/           # カスタムフック
├── lib/             # ライブラリラッパー
├── services/        # API通信
├── stores/          # 状態管理（Zustand/Redux）
├── types/           # 型定義
└── utils/           # ユーティリティ
```

## レイヤードアーキテクチャ

### 責務の分離

```
Controller → Service → Repository → Database
    ↓          ↓           ↓
  HTTP      ビジネス    データ
  処理      ロジック    アクセス
```

### 実装例

```typescript
// ❌ NG: すべて1ファイルに
app.post("/users", async (req, res) => {
  const user = await db.query("INSERT INTO users...");
  await sendEmail(user.email);
  res.json(user);
});

// ✅ OK: レイヤー分離
// controllers/userController.ts
export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await userService.createUser(userData);
  res.status(201).json(user);
};

// services/userService.ts
export const createUser = async (userData: CreateUserDto) => {
  const user = await userRepository.create(userData);
  await emailService.sendWelcomeEmail(user.email);
  return user;
};

// repositories/userRepository.ts
export const create = async (userData: CreateUserDto) => {
  return await User.create(userData);
};
```

## 依存性注入（DI）

### 推奨パターン

```typescript
// ✅ コンストラクタインジェクション
class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
  ) {}

  async createUser(data: CreateUserDto) {
    const user = await this.userRepository.create(data);
    await this.emailService.send(user.email);
    return user;
  }
}

// テスト時にモック化が容易
const mockRepo = { create: jest.fn() };
const mockEmail = { send: jest.fn() };
const service = new UserService(mockRepo, mockEmail);
```

## エラーハンドリングパターン

### カスタムエラークラス

```typescript
// utils/errors.ts
export class ApplicationError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message, 404, "NOT_FOUND");
  }
}

export class ValidationError extends ApplicationError {
  constructor(
    message: string,
    public errors?: any,
  ) {
    super(message, 400, "VALIDATION_ERROR");
  }
}

// 使用例
if (!user) {
  throw new NotFoundError("ユーザーが見つかりません");
}
```

### グローバルエラーハンドラ

```typescript
// middlewares/errorHandler.ts
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
  }

  // 予期しないエラー
  logger.error("Unexpected error", { error: err });
  res.status(500).json({
    error: { message: "Internal Server Error" },
  });
};
```

## Repository パターン

### インターフェース定義

```typescript
// repositories/interfaces/IUserRepository.ts
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDto): Promise<User>;
  update(id: string, data: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
}

// repositories/UserRepository.ts
export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }
  // ... 他のメソッド実装
}
```

## Service パターン

### ビジネスロジックの集約

```typescript
// services/orderService.ts
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private inventoryService: InventoryService,
    private paymentService: PaymentService,
    private emailService: EmailService,
  ) {}

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    // 在庫チェック
    const available = await this.inventoryService.checkAvailability(
      orderData.items,
    );
    if (!available) {
      throw new ValidationError("在庫不足");
    }

    // 注文作成
    const order = await this.orderRepository.create(orderData);

    // 決済処理
    await this.paymentService.charge(
      order.totalAmount,
      orderData.paymentMethod,
    );

    // 在庫減算
    await this.inventoryService.decreaseStock(orderData.items);

    // 確認メール送信
    await this.emailService.sendOrderConfirmation(order);

    return order;
  }
}
```

## DTO（Data Transfer Object）

### 型安全なデータ転送

```typescript
// types/dtos/user.dto.ts
export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserDto {
  name?: string;
  avatar?: string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  // password は含めない（セキュリティ）
}

// services/userService.ts
export const toUserResponse = (user: User): UserResponseDto => ({
  id: user.id,
  email: user.email,
  name: user.name,
  createdAt: user.createdAt,
});
```

## React コンポーネント設計

### Container/Presentational パターン

```typescript
// ✅ Presentational（見た目のみ）
interface UserCardProps {
  user: User;
  onEdit: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => (
  <div className="card">
    <h3>{user.name}</h3>
    <p>{user.email}</p>
    <button onClick={onEdit}>編集</button>
  </div>
);

// ✅ Container（ロジック）
export const UserCardContainer: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: user, isLoading } = useUser(userId);
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <Spinner />;
  if (!user) return <NotFound />;

  return <UserCard user={user} onEdit={() => setIsEditing(true)} />;
};
```

### カスタムフック

```typescript
// hooks/useUser.ts
export const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getUser(userId);
        setUser(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, isLoading, error };
};
```

## API設計

### RESTful 原則

```
GET    /api/users          # ユーザー一覧
GET    /api/users/:id      # ユーザー詳細
POST   /api/users          # ユーザー作成
PUT    /api/users/:id      # ユーザー更新（全体）
PATCH  /api/users/:id      # ユーザー更新（部分）
DELETE /api/users/:id      # ユーザー削除

# ネストしたリソース
GET    /api/users/:id/orders    # 特定ユーザーの注文一覧
POST   /api/users/:id/orders    # 特定ユーザーの注文作成
```

### レスポンス形式統一

```typescript
// 成功レスポンス
{
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-28T10:00:00Z"
  }
}

// エラーレスポンス
{
  "error": {
    "message": "エラーメッセージ",
    "code": "ERROR_CODE",
    "details": { ... }
  }
}

// ページネーション
{
  "data": [...],
  "meta": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 100,
    "itemsPerPage": 10
  }
}
```

## 状態管理（Zustand例）

```typescript
// stores/userStore.ts
import create from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// コンポーネントで使用
const user = useUserStore((state) => state.user);
const setUser = useUserStore((state) => state.setUser);
```

## レビューチェックポイント

### 構造

- [ ] 適切なディレクトリ構成
- [ ] レイヤーの責務分離
- [ ] ファイル・クラスのサイズ（300行以下推奨）

### 設計

- [ ] 依存性注入の活用
- [ ] インターフェースの定義
- [ ] 単一責任の原則

### 実装

- [ ] DTOの使用
- [ ] エラーハンドリング
- [ ] 型安全性
