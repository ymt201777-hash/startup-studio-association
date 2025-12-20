import StageBadge from './StageBadge';

interface StartupCardProps {
  startup: {
    id: string;
    name: string;
    studio: string;
    category: string;
    year: number;
    funding: number;
    stage: 'Seed' | 'Pre-Series A' | 'Series A' | 'Series B' | 'Series C+' | 'IPO' | 'M&A';
    description: string;
    exit?: 'IPO' | 'M&A' | null;
  };
}

export default function StartupCard({ startup }: StartupCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900">{startup.name}</h3>
        {startup.exit && (
          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
            {startup.exit}
          </span>
        )}
      </div>
      <div className="mb-3">
        <StageBadge stage={startup.stage} />
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-semibold mr-2">出身スタジオ:</span>
          <span>{startup.studio}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-semibold mr-2">領域:</span>
          <span>{startup.category}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-semibold mr-2">設立年:</span>
          <span>{startup.year}年</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-semibold mr-2">累計調達額:</span>
          <span>{startup.funding}億円</span>
        </div>
      </div>
      <p className="text-sm text-gray-700 line-clamp-2">{startup.description}</p>
    </div>
  );
}
