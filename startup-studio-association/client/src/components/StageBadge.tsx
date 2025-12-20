interface StageBadgeProps {
  stage: 'Seed' | 'Pre-Series A' | 'Series A' | 'Series B' | 'Series C+' | 'IPO' | 'M&A';
}

export default function StageBadge({ stage }: StageBadgeProps) {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Seed':
        return 'bg-blue-100 text-blue-800';
      case 'Pre-Series A':
        return 'bg-cyan-100 text-cyan-800';
      case 'Series A':
        return 'bg-green-100 text-green-800';
      case 'Series B':
        return 'bg-purple-100 text-purple-800';
      case 'Series C+':
        return 'bg-indigo-100 text-indigo-800';
      case 'IPO':
        return 'bg-yellow-100 text-yellow-800';
      case 'M&A':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStageColor(stage)}`}
    >
      {stage}
    </span>
  );
}
