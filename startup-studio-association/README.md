# スタートアップスタジオ協会 - 情報発信サイト

日本のスタートアップスタジオ業界の発展を目指し、情報発信・交流・政策提言を行うスタートアップスタジオ協会の公式ウェブサイトです。

## 機能概要

### ページ構成

- **トップページ（/）**: 協会の概要と統計サマリー、各セクションのプレビュー
- **スタートアップDB（/startups）**: スタジオ発スタートアップの一覧とフィルター機能
- **スタジオ一覧（/studios）**: 日本で活動するスタートアップスタジオの紹介
- **レポート（/reports）**: 協会が発行する調査レポートの一覧

### 主な機能

- **Notion API連携**: Notionデータベースと連携し、コンテンツを簡単に更新可能
- **フィルター機能**: スタートアップDBでキーワード、スタジオ、領域、ステージでの絞り込み
- **レスポンシブデザイン**: PC、タブレット、スマートフォンに対応
- **ホバーアニメーション**: カードにマウスを乗せると浮き上がるエフェクト
- **ステージバッジ**: スタートアップのステージを色分けして表示

## 技術スタック

- **フレームワーク**: React + Vite
- **スタイリング**: Tailwind CSS
- **データ管理**: Notion API
- **ルーティング**: Wouter
- **状態管理**: React Hooks
- **API通信**: tRPC
- **テスト**: Vitest

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. Notion API の設定

詳細は [NOTION_SETUP.md](./NOTION_SETUP.md) を参照してください。

環境変数として以下を設定：

```
NOTION_API_KEY=your_notion_integration_token
NOTION_STARTUPS_DB_ID=your_startups_database_id
NOTION_STUDIOS_DB_ID=your_studios_database_id
NOTION_REPORTS_DB_ID=your_reports_database_id
```

### 3. 開発サーバーの起動

```bash
pnpm dev
```

サーバーは `http://localhost:3000` で起動します。

## プロジェクト構造

```
startup-studio-association/
├── client/
│   └── src/
│       ├── components/      # 再利用可能なコンポーネント
│       │   ├── Header.tsx
│       │   ├── Footer.tsx
│       │   ├── StatsSummary.tsx
│       │   ├── StartupCard.tsx
│       │   ├── StudioCard.tsx
│       │   ├── ReportCard.tsx
│       │   └── StageBadge.tsx
│       ├── pages/           # ページコンポーネント
│       │   ├── Home.tsx
│       │   ├── Startups.tsx
│       │   ├── Studios.tsx
│       │   └── Reports.tsx
│       └── App.tsx
├── server/
│   ├── lib/
│   │   └── notion.ts        # Notion API クライアント
│   └── routers.ts           # tRPC ルーター定義
├── shared/
│   └── notion-types.ts      # 型定義
├── NOTION_SETUP.md          # Notion設定ガイド
└── README.md
```

## データ型

### Startup（スタートアップ）

```typescript
interface Startup {
  id: string;
  name: string;
  studio: string;
  category: string;
  year: number;
  funding: number; // 億円
  stage: 'Seed' | 'Pre-Series A' | 'Series A' | 'Series B' | 'Series C+' | 'IPO' | 'M&A';
  description: string;
  exit?: 'IPO' | 'M&A' | null;
}
```

### Studio（スタジオ）

```typescript
interface Studio {
  id: string;
  name: string;
  type: '独立系' | '大企業系' | 'VC系' | '大学系';
  startupCount: number;
  exitCount: number;
  totalFunding: number; // 億円
  description: string;
}
```

### Report（レポート）

```typescript
interface Report {
  id: string;
  title: string;
  date: string;
  description: string;
  pdfUrl: string;
}
```

## テスト

```bash
pnpm test
```

Notion API連携のテストが含まれています。環境変数が設定されていない場合は、モックデータを使用してテストが実行されます。

## デプロイ

### Manusでのデプロイ

1. 管理画面右上の「Publish」ボタンをクリック
2. カスタムドメインの設定が可能
3. 環境変数（Notion API）は自動的に本番環境に反映されます

### 外部ホスティング（Vercel等）

Manusの組み込みホスティングの使用を推奨しますが、外部ホスティングを使用する場合：

1. リポジトリをGitHubにプッシュ
2. Vercelでプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

**注意**: 外部ホスティングでは互換性の問題が発生する可能性があります。

## カスタマイズ

### カラーパレット

`client/src/index.css` で定義されているカラーを変更できます：

- メインカラー: `#6B4C9A`（紫）
- サブカラー: `#2E7D32`（緑）、`#1565C0`（青）
- 背景: `#F8F9FA`

### ステージバッジの色

`client/src/components/StageBadge.tsx` で各ステージの色を変更できます。

## ライセンス

© 2024 スタートアップスタジオ協会

## サポート

問題が発生した場合は、[NOTION_SETUP.md](./NOTION_SETUP.md) のトラブルシューティングセクションを参照してください。
