import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getStartups, getStudios, getReports, getStatistics } from "./lib/notion";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Notion API routes
  notion: router({
    startups: publicProcedure.query(async () => {
      const startups = await getStartups();
      return startups;
    }),
    studios: publicProcedure.query(async () => {
      const studios = await getStudios();
      return studios;
    }),
    reports: publicProcedure.query(async () => {
      const reports = await getReports();
      return reports;
    }),
    statistics: publicProcedure.query(async () => {
      const statistics = await getStatistics();
      return statistics;
    }),
  }),
});

export type AppRouter = typeof appRouter;
