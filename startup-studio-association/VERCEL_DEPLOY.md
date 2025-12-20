# Vercel へのデプロイ手順書

GitHub へのプッシュ完了後、このガイドに従って Vercel にデプロイしてください。

## 📋 事前準備

### Step 1: Vercel アカウントを作成（未作成の場合）

1. [Vercel 公式サイト](https://vercel.com) にアクセス
2. 「Sign Up」をクリック
3. GitHub アカウントで認証（推奨）
4. アカウント作成完了

---

## 🚀 Vercel へのデプロイ

### Step 1: Vercel ダッシュボードにアクセス

1. [Vercel ダッシュボード](https://vercel.com/dashboard) にログイン

### Step 2: 新しいプロジェクトを作成

1. 「Add New...」をクリック
2. 「Project」を選択

### Step 3: GitHub リポジトリを選択

1. 「Import Git Repository」をクリック
2. 「GitHub」を選択
3. GitHub の認証を求められたら、認証を完了
4. リポジトリ一覧から `startup-studio-association` を選択
5. 「Import」をクリック

### Step 4: プロジェクト設定

以下の設定を確認：

| 項目 | 設定値 |
|------|--------|
| **Framework Preset** | `Other` または自動検出 |
| **Root Directory** | `.` （ルートディレクトリ） |
| **Build Command** | `pnpm build` |
| **Output Directory** | `dist` |
| **Install Command** | `pnpm install` |

### Step 5: 環境変数を設定（重要）

1. 「Environment Variables」セクションを開く
2. 以下の環境変数を追加：

```
NOTION_API_KEY=your_notion_api_key
NOTION_STARTUPS_DB_ID=your_startups_db_id
NOTION_STUDIOS_DB_ID=your_studios_db_id
NOTION_REPORTS_DB_ID=your_reports_db_id
```

**注**: Notion データベース作成後に設定してください。現在は空のままでも OK です。

### Step 6: デプロイを開始

1. 「Deploy」をクリック
2. デプロイが開始されます（2-5 分程度）
3. 以下のような画面が表示されたら成功：

```
✓ Deployment completed
Your site is live at: https://startup-studio-association.vercel.app
```

---

## ✅ デプロイ完了確認

### デプロイ URL を確認

1. Vercel ダッシュボードでプロジェクトを開く
2. 「Deployments」タブを確認
3. 最新のデプロイが「Ready」状態か確認
4. URL をクリックしてサイトにアクセス

### サイトが正常に動作しているか確認

- [ ] トップページが表示される
- [ ] ナビゲーションが機能する
- [ ] スタートアップ DB ページが表示される
- [ ] スタジオ一覧ページが表示される
- [ ] レポートページが表示される

---

## 🔄 自動デプロイの設定

GitHub にプッシュすると、自動的に Vercel にデプロイされます。

### 確認方法

1. GitHub リポジトリに新しいコミットをプッシュ
2. Vercel ダッシュボードで自動デプロイが開始されるか確認
3. デプロイ完了後、サイトが更新されているか確認

---

## 🌐 カスタムドメインの設定（オプション）

### Step 1: ドメインを購入

- [Vercel Domains](https://vercel.com/domains)
- または他のドメインレジストラから購入

### Step 2: Vercel に追加

1. プロジェクト設定 → 「Domains」
2. 「Add Domain」をクリック
3. ドメイン名を入力
4. 指示に従ってセットアップ

---

## 🆘 トラブルシューティング

### デプロイが失敗する場合

1. **ビルドログを確認**
   - Vercel ダッシュボード → Deployments → 失敗したデプロイ
   - ログを確認してエラーを特定

2. **よくあるエラー**

   | エラー | 原因 | 解決方法 |
   |--------|------|--------|
   | `pnpm: not found` | pnpm がインストールされていない | Vercel 設定で `pnpm` を指定 |
   | `Build failed` | ビルドコマンドが失敗 | ローカルで `pnpm build` を実行して確認 |
   | `Module not found` | 依存関係が不足 | `pnpm install` を実行して確認 |

### サイトが表示されない場合

1. **デプロイが完了しているか確認**
   - Vercel ダッシュボードで「Ready」状態か確認

2. **ブラウザキャッシュをクリア**
   - Ctrl+Shift+Delete（Windows）
   - Cmd+Shift+Delete（Mac）

3. **URL が正しいか確認**
   - Vercel ダッシュボードから URL をコピーして開く

---

## 📊 デプロイ後の確認事項

- [ ] サイトが公開されている
- [ ] すべてのページが表示される
- [ ] モバイル表示が正常
- [ ] ナビゲーションが機能する
- [ ] Notion データベースが接続されている（環境変数設定後）

---

## 🔗 デプロイ URL

デプロイ完了後、以下の形式で URL が生成されます：

```
https://startup-studio-association.vercel.app
```

または、カスタムドメインを設定した場合：

```
https://your-custom-domain.com
```

---

## 📝 次のステップ

1. ✅ GitHub にプッシュ
2. ✅ Vercel にデプロイ
3. ➡️  Notion データベースを作成
4. ➡️  環境変数を設定して Notion API を有効化

---

**デプロイ URL を確認したら、Notion データベース作成に進んでください！**
