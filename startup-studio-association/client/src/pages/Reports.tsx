import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReportCard from '@/components/ReportCard';

// モックデータ
const mockReports = [
  {
    id: '1',
    title: 'スタートアップスタジオの現状 2024',
    date: '2024-12-01',
    description: '日本と海外のスタートアップスタジオ業界を徹底分析。市場規模、トレンド、課題を網羅的に調査しました。',
  },
  {
    id: '2',
    title: 'スタジオ発スタートアップの成長分析',
    date: '2024-06-15',
    description: 'スタジオから生まれたスタートアップの成長パターンと成功要因を分析。データに基づいた知見を提供します。',
  },
  {
    id: '3',
    title: '2024年 スタートアップスタジオ白書',
    date: '2024-01-20',
    description: '日本国内のスタートアップスタジオの実態調査。参加企業数、資金調達額、業界動向を詳細に報告。',
  },
  {
    id: '4',
    title: 'グローバルスタジオトレンドレポート',
    date: '2023-11-10',
    description: '世界のスタートアップスタジオの最新トレンド。シリコンバレー、ヨーロッパ、アジアの動向を比較分析。',
  },
];

export default function Reports() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-1">
        {/* ヘッダー部分 */}
        <section className="bg-gradient-to-br from-[#1565C0] to-[#0D47A1] text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <Link href="/">
              <a className="text-white/80 hover:text-white mb-4 inline-flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                ホームに戻る
              </a>
            </Link>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                レポート
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                スタートアップスタジオ協会が発行する調査レポート
              </p>
            </div>
          </div>
        </section>

        {/* レポート一覧 */}
        <section className="py-12">
          <div className="container mx-auto px-4">
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
