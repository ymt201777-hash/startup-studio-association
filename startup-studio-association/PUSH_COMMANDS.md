# GitHub へのプッシュコマンド

GitHub リポジトリを作成しました。以下のコマンドでソースコードをプッシュしてください。

## 📋 リポジトリ情報

- **リポジトリ URL**: https://github.com/ymt201777-hash/startup-studio-association.git
- **ユーザー名**: ymt201777-hash

---

## 🚀 プッシュコマンド

### Step 1: ソースコードを解凍

ZIP ファイルをダウンロードして解凍してください：

```bash
# ZIP ファイルを解凍
unzip startup-studio-association.zip

# プロジェクトディレクトリに移動
cd startup-studio-association
```

### Step 2: リモートを設定

```bash
# リモートを設定
git remote set-url origin https://github.com/ymt201777-hash/startup-studio-association.git

# 確認
git remote -v
```

出力例：
```
origin  https://github.com/ymt201777-hash/startup-studio-association.git (fetch)
origin  https://github.com/ymt201777-hash/startup-studio-association.git (push)
```

### Step 3: プッシュ

```bash
# メインブランチにプッシュ
git push -u origin main
```

初回実行時に GitHub の認証を求められます：

- **ユーザー名**: ymt201777-hash
- **パスワード**: GitHub Personal Access Token（またはパスワード）

---

## ✅ プッシュ完了確認

プッシュが完了したら、GitHub リポジトリを確認：

1. https://github.com/ymt201777-hash/startup-studio-association にアクセス
2. 以下のファイルが見えるか確認：
   - `README.md`
   - `package.json`
   - `client/` フォルダ
   - `server/` フォルダ
   - `NOTION_SETUP.md`
   - `VERCEL_DEPLOY.md`
   - `NOTION_DATABASE_SETUP.md`

---

## 🔑 認証エラーが出た場合

### 方法 1: Personal Access Token を使用（推奨）

1. [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens) にアクセス
2. 「Generate new token」をクリック
3. 以下を選択：
   - `repo` (すべてのチェック)
   - `workflow`
4. 「Generate token」をクリック
5. トークンをコピー

プッシュ時にパスワード欄にトークンを貼り付けてください。

### 方法 2: SSH キーを設定

```bash
# SSH キーを生成（未作成の場合）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 公開鍵をコピー
cat ~/.ssh/id_ed25519.pub
```

1. [GitHub Settings → SSH and GPG keys](https://github.com/settings/keys) にアクセス
2. 「New SSH key」をクリック
3. 公開鍵を貼り付け
4. 「Add SSH key」をクリック

その後、リモートを SSH に変更：

```bash
git remote set-url origin git@github.com:ymt201777-hash/startup-studio-association.git
git push -u origin main
```

---

## 📝 コマンド一覧（コピペ用）

```bash
# 1. プロジェクトディレクトリに移動
cd startup-studio-association

# 2. リモートを設定
git remote set-url origin https://github.com/ymt201777-hash/startup-studio-association.git

# 3. プッシュ
git push -u origin main
```

---

## 🆘 トラブルシューティング

### エラー: "fatal: remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/ymt201777-hash/startup-studio-association.git
git push -u origin main
```

### エラー: "fatal: 'origin' does not appear to be a 'git' repository"

```bash
# プロジェクトディレクトリにいることを確認
pwd

# リモートを確認
git remote -v

# リモートがない場合は追加
git remote add origin https://github.com/ymt201777-hash/startup-studio-association.git
git push -u origin main
```

### エラー: "Permission denied"

- Personal Access Token を使用してください
- または SSH キーを設定してください

---

## ✨ プッシュ完了後

1. GitHub リポジトリを確認
2. Vercel にデプロイ（VERCEL_DEPLOY.md を参照）
3. Notion データベースを作成（NOTION_DATABASE_SETUP.md を参照）

---

**プッシュ完了後、Vercel へのデプロイに進んでください！**
