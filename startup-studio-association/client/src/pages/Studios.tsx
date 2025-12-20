import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StudioCard from '@/components/StudioCard';

// モックデータ
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
  {
    id: '5',
    name: 'Makoto Ventures',
    type: '独立系',
    startupCount: 10,
    exitCount: 2,
    totalFunding: 80,
    description: 'ハードウェア・ロボティクス領域',
  },
];

export default function Studios() {
  // 統計情報の計算
  const totalStartups = mockStudios.reduce((sum, s) => sum + s.startupCount, 0);
  const totalExits = mockStudios.reduce((sum, s) => sum + s.exitCount, 0);
  const totalFunding = mockStudios.reduce((sum, s) => sum + s.totalFunding, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-1">
        {/* ヘッダー部分 */}
        <section className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <Link href="/">
              <a className="text-white/80 hover:text-white mb-4 inline-flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                ホームに戻る
              </a>
            </Link>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                スタジオ一覧
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                日本で活動するスタートアップスタジオを紹介
              </p>
            </div>

            {/* 統計情報 */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{mockStudios.length}</div>
                <div className="text-white/80 text-sm md:text-base">スタジオ数</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{totalStartups}</div>
                <div className="text-white/80 text-sm md:text-base">創出企業数</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{totalExits}</div>
                <div className="text-white/80 text-sm md:text-base">Exit数</div>
              </div>
            </div>
          </div>
        </section>

        {/* スタジオ一覧 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockStudios.map((studio) => (
                <StudioCard key={studio.id} studio={studio} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
