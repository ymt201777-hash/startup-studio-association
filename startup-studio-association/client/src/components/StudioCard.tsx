interface StudioCardProps {
  studio: {
    id: string;
    name: string;
    type: '独立系' | '大企業系' | 'VC系' | '大学系';
    startupCount: number;
    exitCount: number;
    totalFunding: number;
    description: string;
  };
}

export default function StudioCard({ studio }: StudioCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case '独立系':
        return 'bg-blue-100 text-blue-800';
      case '大企業系':
        return 'bg-green-100 text-green-800';
      case 'VC系':
        return 'bg-purple-100 text-purple-800';
      case '大学系':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform">
      <div className="mb-3">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{studio.name}</h3>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(studio.type)}`}
        >
          {studio.type}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#6B4C9A]">
            {studio.startupCount}
          </div>
          <div className="text-xs text-gray-600">創出企業数</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#6B4C9A]">
            {studio.exitCount}
          </div>
          <div className="text-xs text-gray-600">Exit数</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#6B4C9A]">
            {studio.totalFunding}
          </div>
          <div className="text-xs text-gray-600">累計調達額(億円)</div>
        </div>
      </div>
      <p className="text-sm text-gray-700 line-clamp-2">{studio.description}</p>
    </div>
  );
}
