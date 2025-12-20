import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StartupCard from '@/components/StartupCard';

// モックデータ
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
  {
    id: '5',
    name: 'CloudSync',
    studio: 'Tokyo Tech Ventures',
    category: 'Cloud',
    stage: 'Series A',
    funding: 25,
    description: 'クラウドストレージソリューション',
    exit: null,
  },
];

export default function Startups() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStudio, setSelectedStudio] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStage, setSelectedStage] = useState('');

  // ユニークなスタジオ、カテゴリーのリストを取得
  const studios = useMemo(() => {
    return Array.from(new Set(mockStartups.map(s => s.studio))).sort();
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(mockStartups.map(s => s.category))).sort();
  }, []);

  const stages = ['Seed', 'Pre-Series A', 'Series A', 'Series B', 'Series C+', 'IPO', 'M&A'];

  // フィルタリング
  const filteredStartups = useMemo(() => {
    return mockStartups.filter(startup => {
      const matchesKeyword = startup.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                            startup.description.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchesStudio = !selectedStudio || startup.studio === selectedStudio;
      const matchesCategory = !selectedCategory || startup.category === selectedCategory;
      const matchesStage = !selectedStage || startup.stage === selectedStage;

      return matchesKeyword && matchesStudio && matchesCategory && matchesStage;
    });
  }, [searchKeyword, selectedStudio, selectedCategory, selectedStage]);

  const handleReset = () => {
    setSearchKeyword('');
    setSelectedStudio('');
    setSelectedCategory('');
    setSelectedStage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />

      <main className="flex-1">
        {/* ヘッダー */}
        <section className="bg-gradient-to-br from-[#6B4C9A] to-[#4A3570] text-white py-12">
          <div className="container mx-auto px-4">
            <Link href="/">
              <a className="text-white/80 hover:text-white mb-4 inline-flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                ホームに戻る
              </a>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold">スタートアップDB</h1>
            <p className="text-white/80 mt-2">日本のスタートアップスタジオから生まれた企業たち</p>
          </div>
        </section>

        {/* フィルター */}
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* キーワード検索 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  キーワード検索
                </label>
                <input
                  type="text"
                  placeholder="企業名や説明で検索"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4C9A] focus:border-transparent"
                />
              </div>

              {/* スタジオ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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

              {/* カテゴリー */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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

              {/* リセット */}
              <div className="flex items-end">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  リセット
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 検索結果 */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <p className="text-gray-600 mb-8">
              {filteredStartups.length} 件のスタートアップが見つかりました
            </p>
            
            {filteredStartups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStartups.map((startup) => (
                  <StartupCard key={startup.id} startup={startup} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">検索条件に合致するスタートアップが見つかりません</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
