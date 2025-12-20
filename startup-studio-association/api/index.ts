/**
 * Vercel Serverless Function
 * Express サーバーを Vercel Functions として動作させる
 */

import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers";
import { createTRPCContext } from "../server/_core/context";
import { getSessionCookieOptions } from "../server/_core/cookies";
import { COOKIE_NAME } from "../shared/const";
import path from "path";

const app = express();

// ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静的ファイルの提供
const publicPath = path.join(__dirname, "../dist/public");
app.use(express.static(publicPath));

// tRPC ルーター
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  })
);

// OAuth コールバック
app.get("/api/oauth/callback", async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code || !state) {
      return res.status(400).json({ error: "Missing code or state" });
    }

    // OAuth トークン交換（SDK を使用）
    const { SDKServer } = await import("../server/_core/sdk");
    const sdk = new SDKServer();

    const tokenResponse = await sdk.exchangeCodeForToken(
      code as string,
      state as string
    );

    if (!tokenResponse.accessToken) {
      return res.status(400).json({ error: "Failed to get access token" });
    }

    // ユーザー情報取得
    const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

    // ユーザーをデータベースに保存
    const { upsertUser } = await import("../server/db");
    await upsertUser({
      openId: userInfo.openId,
      name: userInfo.name,
      email: userInfo.email,
      loginMethod: userInfo.loginMethod,
    });

    // セッションクッキーを設定
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, tokenResponse.accessToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });

    // リダイレクト
    const redirectUrl = state ? Buffer.from(state as string, "base64").toString() : "/";
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("[OAuth Callback Error]", error);
    res.status(500).json({ error: "OAuth callback failed" });
  }
});

// SPA フォールバック（すべての未マッチルートを index.html に）
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// エラーハンドリング
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("[Server Error]", err);
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal server error",
  });
});

export default app;
