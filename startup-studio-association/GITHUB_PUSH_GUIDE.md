# GitHub へのプッシュ手順書

このガイドに従って、ソースコードを GitHub にプッシュしてください。

## 📋 事前準備

### Step 1: GitHub でリポジトリを作成

1. [GitHub](https://github.com/new) にアクセス
2. 以下の情報を入力：
   - **Repository name**: `startup-studio-association`
   - **Description**: `スタートアップスタジオ協会の情報発信サイト`
   - **Visibility**: `Public` を選択
3. 「Create repository」をクリック

### Step 2: リポジトリ URL をコピー

作成後、表示される HTTPS URL をコピーしてください。例：
```
https://github.com/あなたのユーザー名/startup-studio-association.git
```

---

## 🚀 プッシュコマンド

以下のコマンドをターミナルで実行してください。

### 方法 1: HTTPS（推奨・簡単）

```bash
cd /home/ubuntu/startup-studio-association

# リモートを設定
git remote set-url origin https://github.com/あなたのユーザー名/startup-studio-association.git

# プッシュ
git push -u origin main
```

初回実行時に GitHub のユーザー名とパスワード（またはトークン）を聞かれます。

### 方法 2: SSH（セキュア）

```bash
cd /home/ubuntu/startup-studio-association

# リモートを設定
git remote set-url origin git@github.com:あなたのユーザー名/startup-studio-association.git

# プッシュ
git push -u origin main
```

---

## 📦 ソースコード一式のダウンロード

### 方法 1: Git Clone（推奨）

GitHub にプッシュ後、別の場所でクローン：

```bash
git clone https://github.com/あなたのユーザー名/startup-studio-association.git
cd startup-studio-association
pnpm install
pnpm dev
```

### 方法 2: ZIP ダウンロード

1. GitHub リポジトリページを開く
2. 「Code」ボタンをクリック
3. 「Download ZIP」を選択
4. ダウンロード後、解凍

```bash
unzip startup-studio-association-main.zip
cd startup-studio-association-main
pnpm install
pnpm dev
```

---

## ✅ プッシュ完了確認

プッシュが完了したら、以下を確認してください：

1. **GitHub リポジトリページを開く**
2. **ファイルが表示されているか確認**
3. **以下のファイルが見えるはず：**
   - `README.md`
   - `NOTION_SETUP.md`
   - `CURSOR_SETUP.md`
   - `client/` フォルダ
   - `server/` フォルダ
   - `package.json`

---

## 🔑 GitHub Personal Access Token が必要な場合

HTTPS でプッシュする際、パスワードの代わりに Personal Access Token が必要な場合があります。

### Token を生成する

1. [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. 「Generate new token」をクリック
3. 以下を選択：
   - `repo` (すべてのチェック)
   - `workflow`
4. 「Generate token」をクリック
5. **トークンをコピー**（二度と表示されません）

### プッシュ時に使用

```bash
git push -u origin main
```

ユーザー名を聞かれたら：`あなたのGitHubユーザー名`
パスワードを聞かれたら：`生成したトークン`

---

## 🆘 トラブルシューティング

### エラー: "fatal: remote origin already exists"

```bash
# リモートを削除して再設定
git remote remove origin
git remote add origin https://github.com/あなたのユーザー名/startup-studio-association.git
git push -u origin main
```

### エラー: "Permission denied"

```bash
# SSH キーが設定されていない場合、HTTPS を使用
git remote set-url origin https://github.com/あなたのユーザー名/startup-studio-association.git
git push -u origin main
```

### エラー: "fatal: 'origin' does not appear to be a 'git' repository"

```bash
# プロジェクトディレクトリにいることを確認
cd /home/ubuntu/startup-studio-association
pwd  # 確認

# リモートを設定
git remote add origin https://github.com/あなたのユーザー名/startup-studio-association.git
git push -u origin main
```

---

## 📝 プッシュ後の確認事項

- [ ] GitHub リポジトリにファイルが表示されている
- [ ] README.md が表示されている
- [ ] `main` ブランチが表示されている
- [ ] コミット履歴が表示されている

---

## 🎯 次のステップ

プッシュ完了後：

1. **Vercel にデプロイ** → GitHub リポジトリと連携
2. **Cursor で開く** → GitHub から Clone
3. **Notion データベース作成** → API キー設定

---

**質問がある場合は、GitHub のリポジトリ URL をお知らせください！**
