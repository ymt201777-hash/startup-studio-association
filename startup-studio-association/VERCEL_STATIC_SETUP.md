# Vercel 静的サイト（フロントエンドのみ）セットアップガイド

このプロジェクトは Vercel 向けに **静的サイト（フロントエンドのみ）** として最適化されました。

## 🔧 修正内容

以下の修正を行いました：

### 1. `vercel.json` を削除

Vercel のランタイムエラーを回避するため、設定ファイルを削除しました。

### 2. `api/index.ts` を削除

サーバーサイド機能を削除し、フロントエンドのみの構成にしました。

### 3. `package.json` を簡略化

- サーバーサイドの依存関係（Express、tRPC、Drizzle など）を削除
- Vite ベースの静的サイト用に最適化
- ビルドコマンドを簡略化

### 4. `vite.config.ts` を簡略化

- Manus ランタイムプラグインを削除
- 静的サイト用の設定に変更

---

## 🚀 Vercel へのデプロイ手順

### Step 1: GitHub にプッシュ

```bash
cd startup-studio-association

# 修正を確認
git status

# コミット
git add .
git commit -m "refactor: 静的サイト化（Vercel 対応）"

# プッシュ
git push origin main
```

### Step 2: Vercel で再デプロイ

1. [Vercel ダッシュボード](https://vercel.com/dashboard) にアクセス
2. `startup-studio-association` プロジェクトを開く
3. 「Deployments」タブを確認
4. 最新のデプロイが自動的に開始されているはず
5. デプロイ完了を待つ（1-3 分）

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
- [ ] モバイル表示が正常

---

## 📝 このプロジェクトの構成

### 静的サイト版（現在）

```
startup-studio-association/
├── client/              ← React フロントエンド
│   ├── src/
│   │   ├── pages/       ← ページコンポーネント
│   │   ├── components/  ← UI コンポーネント
│   │   └── App.tsx      ← ルーター設定
│   └── public/          ← 静的ファイル
├── shared/              ← 共有ファイル
├── vite.config.ts       ← Vite 設定
├── package.json         ← 依存関係
└── dist/                ← ビルド出力（Vercel が提供）
```

### 特徴

- ✅ **フロントエンドのみ** - React + Tailwind CSS
- ✅ **SPA（Single Page Application）** - クライアントサイドルーティング
- ✅ **高速ビルド** - Vite による高速化
- ✅ **Vercel 最適化** - 静的ホスティングに対応

---

## 🎯 今後の拡張について

### Notion API を使用したい場合

このバージョンはフロントエンドのみのため、Notion API は使用できません。

**Notion API を使用したい場合は、以下のオプションがあります：**

#### オプション 1: Vercel Functions を使用（推奨）

- Vercel の Serverless Functions で API を実装
- フロントエンドから API を呼び出す

#### オプション 2: 外部 API サーバーを使用

- 別途 Node.js サーバーを立ち上げ
- フロントエンドから API を呼び出す

#### オプション 3: Manus ホスティングを使用

- Manus の組み込みホスティングで完全なスタック対応
- サーバーサイド機能をそのまま使用可能

---

## 📦 ビルド出力

Vercel は以下のコマンドでビルドを実行します：

```bash
pnpm install
pnpm build
```

ビルド出力は `dist/` ディレクトリに生成され、Vercel が自動的に提供します。

---

## 🆘 デプロイが失敗する場合

### エラー: "Cannot find module"

**原因**: 依存関係が不足している可能性

**解決方法**:

1. ローカルで `pnpm install` を実行
2. `pnpm build` でビルドが成功するか確認
3. GitHub にプッシュ
4. Vercel で再デプロイ

### エラー: "Build failed"

**原因**: ビルドコマンドが失敗している可能性

**解決方法**:

1. ローカルで以下を実行：
   ```bash
   pnpm install
   pnpm build
   ```
2. エラーメッセージを確認
3. 修正して GitHub にプッシュ

### ページが表示されない

**原因**: ビルドは成功したが、ルーティングが正常に機能していない

**解決方法**:

1. ブラウザの開発者ツール（F12）を開く
2. コンソールでエラーを確認
3. 必要に応じて修正

---

## 📝 次のステップ

1. ✅ GitHub にプッシュ
2. ✅ Vercel で再デプロイ
3. ✅ サイトが表示されるか確認
4. ➡️  カスタムドメインを設定（オプション）
5. ➡️  Notion API が必要な場合は別途実装

---

**デプロイが完了したら、サイトの URL を確認してください！**
