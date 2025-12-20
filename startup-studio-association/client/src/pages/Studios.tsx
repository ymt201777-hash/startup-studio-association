import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StudioCard from '@/components/StudioCard';
import { trpc } from '@/lib/trpc';

export default function Studios() {
  const { data: studios } = trpc.notion.studios.useQuery();

  // 統計情報の計算
  const totalStartups = studios?.reduce((sum, s) => sum + s.startupCount, 0) || 0;
  const totalExits = studios?.reduce((sum, s) => sum + s.exitCount, 0) || 0;
  const totalFunding = studios?.reduce((sum, s) => sum + s.totalFunding, 0) || 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-1">
        {/* ヘッダー部分 */}
        <section className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                スタジオ一覧
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                日本で活動するスタートアップスタジオを紹介
              </p>
            </div>
            
            {/* 統計サマリー */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {studios?.length || 0}
                </div>
                <div className="text-sm md:text-base text-white/90">
                  スタジオ数
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {totalStartups}
                </div>
                <div className="text-sm md:text-base text-white/90">
                  創出企業数
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {totalExits}
                </div>
                <div className="text-sm md:text-base text-white/90">
                  Exit数
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {totalFunding}億円
                </div>
                <div className="text-sm md:text-base text-white/90">
                  累計調達額
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* カード一覧 */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {studios?.map((studio) => (
                <StudioCard key={studio.id} studio={studio} />
              ))}
            </div>
            {(!studios || studios.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  スタジオ情報を読み込んでいます...
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
