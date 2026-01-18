# 要件定義書

## はじめに

本プロジェクトは、WONQ 株式会社のシステムエンジニア(SE)であるalbeeの複数のプロフィールページを GitHub Pages（.github.io ドメイン）で公開するものです。
現在の単一ページ（https://albeegamengine.github.io/introduction-myself/）を拡張し、用途別に以下の2つのページを提供します：

1. **趣味・個人開発用プロフィールページ** (`/hobby` パス)
2. **転職活動用プロフィールページ** (`/career` パス)

主な目的は、それぞれの用途に最適化されたプロフェッショナルなプロフィールページを通じて、適切な被リンクを獲得することです。

## 用語集

- **Profile Page（プロフィールページ）**: albeeの経歴、実績、専門分野などを紹介する Web ページ
- **Hobby Profile Page（趣味用プロフィールページ）**: 個人開発、趣味、技術的な興味に焦点を当てたプロフィールページ（`/hobby` パス）
- **Career Profile Page（転職活動用プロフィールページ）**: 職歴、スキル、転職に関連する情報に焦点を当てたプロフィールページ（`/career` パス）
- **GitHub Pages**: GitHub が提供する静的サイトホスティングサービス
- **Backlink（被リンク）**: 他の Web サイトから自サイトへのリンク
- **WONQ**: albeeが勤務している株式会社
- **Blogger**: 被リンク先の Web サイト（https://linealbeegames4730.blogspot.com/）
- **YouTube Channel**: 被リンク先の YouTube チャンネル（https://www.YouTube.com/@albeegamengine）
- **Path-based Routing**: URL のパス部分を使用してページを分ける仕組み
- **Favicon**: ブラウザのタブやブックマークに表示される小さなアイコン画像

## 要件

### 要件 1

**ユーザーストーリー:** Web 訪問者として、albeeの基本情報を用途別に閲覧したい。そうすることで、albeeの背景と専門性を適切な文脈で理解できる。

#### 受入基準

1. WHEN 訪問者が Hobby Profile Page (`/hobby`) にアクセスする THEN Profile Page SHALL 個人開発・趣味に焦点を当てたalbeeの情報を表示する
2. WHEN 訪問者が Career Profile Page (`/career`) にアクセスする THEN Profile Page SHALL 転職活動に関連するalbeeの職歴・スキル情報を表示する
3. WHEN 訪問者がいずれかの Profile Page を閲覧する THEN Profile Page SHALL albeeの氏名を表示する
4. WHEN 訪問者がいずれかの Profile Page を閲覧する THEN Profile Page SHALL albeeのプロフィール写真または画像を表示する
5. WHEN 訪問者が Hobby Profile Page を閲覧する THEN Profile Page SHALL 個人開発プロジェクト、技術的興味、趣味に関する情報を表示する
6. WHEN 訪問者が Career Profile Page を閲覧する THEN Profile Page SHALL 職歴、業務経験、転職に関連するスキルを表示する

### 要件 2

**ユーザーストーリー:** SEO 担当者として、用途に応じた適切な被リンクを設置したい。そうすることで、各ページの目的に合った SEO 評価を向上させることができる。

#### 受入基準

1. WHEN 訪問者が Hobby Profile Page を閲覧する THEN Profile Page SHALL https://linealbeegames4730.blogspot.com/ へのハイパーリンクを含む
2. WHEN 訪問者が Hobby Profile Page を閲覧する THEN Profile Page SHALL https://www.YouTube.com/@albeegamengine へのハイパーリンクを含む
3. WHEN 訪問者が Career Profile Page を閲覧する THEN Profile Page SHALL 転職活動に関連する外部リンク（LinkedIn、GitHub等）を含む
4. WHEN 訪問者がいずれかのページでリンクをクリックする THEN Profile Page SHALL 訪問者を適切な外部サイトへ遷移させる
5. WHEN 検索エンジンクローラーがいずれかの Profile Page をクロールする THEN Profile Page SHALL 外部リンクを HTML 内に通常のアンカータグとして含む（JavaScript による動的生成ではない）
6. WHEN 外部リンクが表示される THEN Profile Page SHALL リンクに適切なコンテキスト（説明文や関連情報）を提供する

### 要件 3

**ユーザーストーリー:** プロジェクト管理者として、複数のプロフィールページを GitHub Pages で公開したい。そうすることで、無料で信頼性の高いホスティング環境を利用できる。

#### 受入基準

1. WHEN GitHub リポジトリに Profile Page のファイルがプッシュされる THEN GitHub Pages SHALL 両方の Profile Page を.github.io ドメインで公開する
2. WHEN 訪問者が `/hobby` パスにアクセスする THEN GitHub Pages SHALL Hobby Profile Page を表示する
3. WHEN 訪問者が `/career` パスにアクセスする THEN GitHub Pages SHALL Career Profile Page を表示する
4. WHEN Profile Page が GitHub Pages で公開される THEN Profile Page SHALL HTTPS プロトコルでアクセス可能である
5. WHEN Profile Page のファイルが更新される THEN GitHub Pages SHALL 更新内容を自動的に反映する

### 要件 4

**ユーザーストーリー:** Web 訪問者として、モバイルデバイスでも両方のプロフィールページを快適に閲覧したい。そうすることで、どのデバイスからでも情報にアクセスできる。

#### 受入基準

1. WHEN 訪問者がモバイルデバイスでいずれかの Profile Page にアクセスする THEN Profile Page SHALL 画面サイズに応じて適切にレイアウトを調整する
2. WHEN 訪問者がタブレットデバイスでいずれかの Profile Page にアクセスする THEN Profile Page SHALL 読みやすいフォントサイズとレイアウトを提供する
3. WHEN 訪問者がデスクトップブラウザでいずれかの Profile Page にアクセスする THEN Profile Page SHALL 画面幅を効果的に活用したレイアウトを表示する
4. WHEN いずれかの Profile Page が異なる画面サイズで表示される THEN Profile Page SHALL すべてのコンテンツを適切に表示する

### 要件 5

**ユーザーストーリー:** Web 訪問者として、視覚的に魅力的で読みやすいデザインの両方のページを閲覧したい。そうすることで、快適なユーザー体験を得られる。

#### 受入基準

1. WHEN 訪問者がいずれかの Profile Page を閲覧する THEN Profile Page SHALL 統一されたカラースキームを使用する
2. WHEN 訪問者がいずれかの Profile Page を閲覧する THEN Profile Page SHALL 読みやすいタイポグラフィを使用する
3. WHEN 訪問者がいずれかの Profile Page を閲覧する THEN Profile Page SHALL 適切な余白とスペーシングを持つレイアウトを提供する
4. WHEN 訪問者がいずれかの Profile Page を閲覧する THEN Profile Page SHALL プロフェッショナルで洗練された外観を提供する
5. WHEN 訪問者が Hobby Profile Page を閲覧する THEN Profile Page SHALL 創造性と技術的興味を表現するデザイン要素を含む
6. WHEN 訪問者が Career Profile Page を閲覧する THEN Profile Page SHALL プロフェッショナルで信頼性を重視したデザイン要素を含む

### 要件 6

**ユーザーストーリー:** Web 訪問者として、ページ間のナビゲーションを行いたい。そうすることで、趣味用と転職活動用の情報を必要に応じて切り替えて閲覧できる。

#### 受入基準

1. WHEN 訪問者がいずれかの Profile Page を閲覧する THEN Profile Page SHALL 他のプロフィールページへのナビゲーションリンクを含む
2. WHEN 訪問者が Hobby Profile Page のナビゲーションリンクをクリックする THEN Profile Page SHALL 訪問者を Career Profile Page へ遷移させる
3. WHEN 訪問者が Career Profile Page のナビゲーションリンクをクリックする THEN Profile Page SHALL 訪問者を Hobby Profile Page へ遷移させる
4. WHEN ナビゲーションリンクが表示される THEN Profile Page SHALL リンクが何のページかを明示する

### 要件 7

**ユーザーストーリー:** 検索エンジン最適化担当者として、両方のページが検索エンジンに適切にインデックスされることを確認したい。そうすることで、オーガニック検索からの流入を獲得できる。

#### 受入基準

1. WHEN いずれかの Profile Page の HTML が生成される THEN Profile Page SHALL 適切な title タグを含む
2. WHEN いずれかの Profile Page の HTML が生成される THEN Profile Page SHALL meta description タグを含む
3. WHEN いずれかの Profile Page の HTML が生成される THEN Profile Page SHALL セマンティックな HTML タグ（header、main、footer 等）を使用する
4. WHEN 画像が表示される THEN Profile Page SHALL すべての画像に適切な alt 属性を設定する
5. WHEN Hobby Profile Page の HTML が生成される THEN Profile Page SHALL 個人開発・趣味に関連するキーワードを含む
6. WHEN Career Profile Page の HTML が生成される THEN Profile Page SHALL 転職・キャリアに関連するキーワードを含む
7. WHEN いずれかの Profile Page が表示される THEN Profile Page SHALL ファビコンとして `/images/albee_icon.png` を使用する

### 要件 8

**ユーザーストーリー:** Web 訪問者として、現在のプロフィールページからスムーズに新しいページ構造に移行したい。そうすることで、既存のブックマークやリンクが無効になることを避けられる。

#### 受入基準

1. WHEN 訪問者がルートパス (`/`) にアクセスする THEN Profile Page SHALL デフォルトページまたはページ選択画面を表示する
2. WHEN 訪問者が既存の URL にアクセスする THEN Profile Page SHALL 適切なリダイレクトまたは案内を提供する
3. WHEN 検索エンジンが既存の URL をクロールする THEN Profile Page SHALL 適切な HTTP ステータスコード（301 リダイレクトまたは 200 OK）を返す
