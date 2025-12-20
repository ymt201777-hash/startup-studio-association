interface StatsSummaryProps {
  stats: {
    startupCount: number;
    studioCount: number;
    totalFunding: number;
    exitCount: number;
  };
}

export default function StatsSummary({ stats }: StatsSummaryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-white mb-2">
          {stats.startupCount}
        </div>
        <div className="text-sm md:text-base text-white/90">
          スタートアップ数
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-white mb-2">
          {stats.studioCount}
        </div>
        <div className="text-sm md:text-base text-white/90">
          スタジオ数
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-white mb-2">
          {stats.totalFunding}億円
        </div>
        <div className="text-sm md:text-base text-white/90">
          累計調達額
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-white mb-2">
          {stats.exitCount}
        </div>
        <div className="text-sm md:text-base text-white/90">
          Exit数
        </div>
      </div>
    </div>
  );
}
