import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReportCard from '@/components/ReportCard';
import { trpc } from '@/lib/trpc';

export default function Reports() {
  const { data: reports } = trpc.notion.reports.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-1">
        {/* ヘッダー部分 */}
        <section className="bg-gradient-to-br from-[#1565C0] to-[#0D47A1] text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
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
            <div className="max-w-4xl mx-auto space-y-6">
              {reports?.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
            {(!reports || reports.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  レポート情報を読み込んでいます...
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
