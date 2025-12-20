import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatsSummary from '@/components/StatsSummary';
import StartupCard from '@/components/StartupCard';
import StudioCard from '@/components/StudioCard';
import ReportCard from '@/components/ReportCard';

// モックデータ
const mockStatistics = {
  startupCount: 127,
  studioCount: 18,
  totalFunding: 850,
  exitCount: 12,
};

const mockStartups = [
  {
    id: '1',
    name: 'タイミー',
    studio: 'AND ON',
    category: 'HR Tech',
    stage: 'IPO',
    funding: 183,
    description: 'スキマバイトアプリ',
    exit: 'IPO',
  },
  {
    id: '2',
    name: 'RURA',
    studio: 'Gaiax',
    category: 'Prop Tech',
    stage: 'Series A',
    funding: 15,
    description: '空き家・空き地の管理・活用',
    exit: null,
  },
  {
    id: '3',
    name: 'NOVASTO',
    studio: 'Scrum Ventures',
    category: 'Fin Tech',
    stage: 'Series B',
    funding: 42,
    description: '企業向け財務管理 SaaS',
    exit: null,
  },
  {
    id: '4',
    name: 'EduLink',
    studio: 'AND ON',
    category: 'Ed Tech',
    stage: 'Seed',
    funding: 8,
    description: 'オンライン教育プラットフォーム',
    exit: null,
  },
];

const mockStudios = [
  {
    id: '1',
    name: 'Gaiax',
    type: '独立系',
    startupCount: 12,
    exitCount: 2,
    totalFunding: 50,
    description: 'ソーシャルメディア・シェアリングエコノミー領域',
  },
  {
    id: '2',
    name: 'AND ON',
    type: '独立系',
    startupCount: 8,
    exitCount: 1,
    totalFunding: 200,
    description: 'HR Tech、Ed Tech 領域',
  },
  {
    id: '3',
    name: 'Scrum Ventures',
    type: 'VC系',
    startupCount: 15,
    exitCount: 3,
    totalFunding: 120,
    description: 'Fin Tech、SaaS 領域',
  },
  {
    id: '4',
    name: 'Tokyo Tech Ventures',
    type: '大学系',
    startupCount: 6,
    exitCount: 1,
    totalFunding: 35,
    description: '東京工業大学発のディープテック',
  },
];

const mockReports = [
  {
    id: '1',
    title: 'スタートアップスタジオの現状 2024',
    date: '2024-12-01',
    description: '日本と海外のスタートアップスタジオ業界を徹底分析',
  },
  {
    id: '2',
    title: 'スタジオ発スタートアップの成長分析',
    date: '2024-06-15',
    description: 'スタジオから生まれたスタートアップの成長パターン',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-1">
        {/* メインビジュアル */}
        <section className="bg-gradient-to-br from-[#6B4C9A] to-[#4A3570] text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                スタートアップスタジオ協会
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                日本のスタートアップスタジオ業界の発展を目指し、情報発信・交流・政策提言を行っています
              </p>
            </div>
            <StatsSummary stats={mockStatistics} />
          </div>
        </section>

        {/* スタートアップDB セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                🚀 スタートアップDB
              </h2>
              <Link href="/startups">
                <a className="text-[#6B4C9A] hover:text-[#4A3570] font-semibold flex items-center">
                  すべて見る
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockStartups.slice(0, 4).map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          </div>
        </section>

        {/* スタジオ一覧 セクション */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                🏢 スタジオ一覧
              </h2>
              <Link href="/studios">
                <a className="text-[#2E7D32] hover:text-[#1b5e20] font-semibold flex items-center">
                  すべて見る
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockStudios.slice(0, 4).map((studio) => (
                <StudioCard key={studio.id} studio={studio} />
              ))}
            </div>
          </div>
        </section>

        {/* レポート セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                📊 レポート
              </h2>
              <Link href="/reports">
                <a className="text-[#1565C0] hover:text-[#0d47a1] font-semibold flex items-center">
                  すべて見る
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
