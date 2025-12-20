# Vercel デプロイ修正ガイド

Vercel でサイトが正しく表示されない問題を修正しました。

## 🔧 修正内容

以下のファイルを追加・修正しました：

### 1. `vercel.json` - Vercel 設定ファイル（新規作成）

```json
{
  "version": 2,
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "env": {
    "NODE_ENV": "production"
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/index.js",
      "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 2. `api/index.ts` - Vercel Serverless Function（新規作成）

Express サーバーを Vercel Functions として動作させるエントリーポイント。

### 3. `vite.config.ts` - 修正

Vercel 環境では `vitePluginManusRuntime` を除外するように修正。

### 4. `package.json` - 修正

- `build` コマンドを簡略化
- `vercel-build` コマンドを追加
- Node.js エンジン指定を追加

---

## 🚀 Vercel へのデプロイ手順

### Step 1: 修正したコードを GitHub にプッシュ

```bash
cd /home/ubuntu/startup-studio-association

# 修正を確認
git status

# コミット
git add .
git commit -m "fix: Vercel デプロイ対応"

# プッシュ
git push origin main
```

### Step 2: Vercel で再デプロイ

1. [Vercel ダッシュボード](https://vercel.com/dashboard) にアクセス
2. `startup-studio-association` プロジェクトを開く
3. 「Deployments」タブを確認
4. 最新のデプロイが自動的に開始されているはず
5. デプロイ完了を待つ（2-5 分）

### Step 3: サイトを確認

```
https://startup-studio-association-1.vercel.app/
```

ページが正常に表示されるはずです。

---

## ✅ 確認項目

- [ ] ページが HTML として表示される（コードが表示されない）
- [ ] トップページが表示される
- [ ] ナビゲーションが機能する
- [ ] スタートアップ DB ページが表示される
- [ ] スタジオ一覧ページが表示される
- [ ] レポートページが表示される

---

## 🆘 まだ問題がある場合

### 問題 1: まだコードが表示される

**原因**: Vercel キャッシュが古い可能性

**解決方法**:

1. Vercel ダッシュボードで「Settings」→「Git」
2. 「Redeploy」をクリック
3. または、GitHub で新しいコミットをプッシュ

### 問題 2: "Cannot find module" エラー

**原因**: 依存関係が不足している可能性

**解決方法**:

1. ローカルで `pnpm install` を実行
2. `pnpm build` でビルドが成功するか確認
3. GitHub にプッシュ
4. Vercel で再デプロイ

### 問題 3: API エラー

**原因**: 環境変数が設定されていない可能性

**解決方法**:

1. Vercel ダッシュボード → Settings → Environment Variables
2. 以下を確認：
   - `NOTION_API_KEY`
   - `NOTION_STARTUPS_DB_ID`
   - `NOTION_STUDIOS_DB_ID`
   - `NOTION_REPORTS_DB_ID`

---

## 📝 修正の詳細

### なぜこの修正が必要だったのか？

元のプロジェクトは **Manus 内部ホスティング用** に設計されていました。Vercel でも動作させるには：

1. **Express サーバーを Vercel Functions として動作させる** 必要がある
2. **フロントエンド（React）とバックエンド（tRPC）を分離** する必要がある
3. **Vercel 固有の設定ファイル** が必要

この修正により、以下が実現されます：

- ✅ React フロントエンドが正常に表示される
- ✅ tRPC API が Vercel Functions として動作する
- ✅ Notion API 連携が機能する
- ✅ SPA（Single Page Application）として動作する

---

## 🔄 次のステップ

1. ✅ GitHub にプッシュ
2. ✅ Vercel で再デプロイ
3. ➡️  サイトが表示されるか確認
4. ➡️  Notion データベースを作成
5. ➡️  環境変数を設定して Notion API を有効化

---

**デプロイが完了したら、サイトの URL を確認してください！**
