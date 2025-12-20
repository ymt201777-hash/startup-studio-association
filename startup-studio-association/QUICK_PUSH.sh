#!/bin/bash

# GitHub へのプッシュスクリプト
# 使用方法: bash QUICK_PUSH.sh https://github.com/あなたのユーザー名/startup-studio-association.git

if [ -z "$1" ]; then
    echo "エラー: GitHub リポジトリ URL を指定してください"
    echo "使用方法: bash QUICK_PUSH.sh https://github.com/ユーザー名/startup-studio-association.git"
    exit 1
fi

REPO_URL=$1

echo "=========================================="
echo "GitHub へのプッシュを開始します"
echo "=========================================="
echo "リポジトリ URL: $REPO_URL"
echo ""

# リモートを設定
echo "1. リモートを設定中..."
git remote set-url origin "$REPO_URL"

# プッシュ
echo "2. プッシュ中..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✅ プッシュが完了しました！"
    echo "=========================================="
    echo ""
    echo "次のステップ:"
    echo "1. GitHub リポジトリを確認: $REPO_URL"
    echo "2. Vercel にデプロイ"
    echo "3. Notion データベースを作成"
    echo ""
else
    echo ""
    echo "=========================================="
    echo "❌ プッシュに失敗しました"
    echo "=========================================="
    echo ""
    echo "トラブルシューティング:"
    echo "1. GitHub URL が正しいか確認"
    echo "2. GitHub の認証情報を確認"
    echo "3. GITHUB_PUSH_GUIDE.md を参照"
    echo ""
    exit 1
fi
