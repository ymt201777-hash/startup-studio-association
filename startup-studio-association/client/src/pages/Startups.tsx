import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatsSummary from '@/components/StatsSummary';
import StartupCard from '@/components/StartupCard';
import { trpc } from '@/lib/trpc';

export default function Startups() {
  const { data: startups } = trpc.notion.startups.useQuery();
  const { data: statistics } = trpc.notion.statistics.useQuery();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStudio, setSelectedStudio] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStage, setSelectedStage] = useState('');

  // ユニークなスタジオ、カテゴリーのリストを取得
  const studios = useMemo(() => {
    if (!startups) return [];
    return Array.from(new Set(startups.map(s => s.studio))).sort();
  }, [startups]);

  const categories = useMemo(() => {
    if (!startups) return [];
    return Array.from(new Set(startups.map(s => s.category))).sort();
  }, [startups]);

  const stages = ['Seed', 'Pre-Series A', 'Series A', 'Series B', 'Series C+', 'IPO', 'M&A'];

  // フィルタリング
  const filteredStartups = useMemo(() => {
    if (!startups) return [];
    
    return startups.filter(startup => {
      const matchesKeyword = searchKeyword === '' || 
        startup.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        startup.description.toLowerCase().includes(searchKeyword.toLowerCase());
      
      const matchesStudio = selectedStudio === '' || startup.studio === selectedStudio;
      const matchesCategory = selectedCategory === '' || startup.category === selectedCategory;
      const matchesStage = selectedStage === '' || startup.stage === selectedStage;

      return matchesKeyword && matchesStudio && matchesCategory && matchesStage;
    });
  }, [startups, searchKeyword, selectedStudio, selectedCategory, selectedStage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-1">
        {/* ヘッダー部分 */}
        <section className="bg-gradient-to-br from-[#6B4C9A] to-[#4A3570] text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                スタジオ発スタートアップDB
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                日本のスタートアップスタジオから生まれた企業を網羅的に掲載
              </p>
            </div>
            {statistics && <StatsSummary stats={statistics} />}
          </div>
        </section>

        {/* フィルター部分 */}
        <section className="py-8 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* キーワード検索 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  キーワード検索
                </label>
                <input
                  type="text"
                  placeholder="企業名、説明文で検索"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4C9A] focus:border-transparent"
                />
              </div>

              {/* 出身スタジオ */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  出身スタジオ
                </label>
                <select
                  value={selectedStudio}
                  onChange={(e) => setSelectedStudio(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4C9A] focus:border-transparent"
                >
                  <option value="">すべて</option>
                  {studios.map(studio => (
                    <option key={studio} value={studio}>{studio}</option>
                  ))}
                </select>
              </div>

              {/* 領域 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  領域
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4C9A] focus:border-transparent"
                >
                  <option value="">すべて</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* ステージ */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ステージ
                </label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4C9A] focus:border-transparent"
                >
                  <option value="">すべて</option>
                  {stages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              {filteredStartups.length}件のスタートアップが見つかりました
            </div>
          </div>
        </section>

        {/* カード一覧 */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
            {filteredStartups.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  条件に一致するスタートアップが見つかりませんでした
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
