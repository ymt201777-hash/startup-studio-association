import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Users, Rocket, Lightbulb, Globe, ExternalLink, ArrowRight, Database, FileText, Search, MapPin, Building2 } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // GitHubの public フォルダに配置された画像パス
  const logoUrl = "/logo.png";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Data Sections ---
  const startups = [
    { id: 1, name: "TRUSTDOCK", studio: "Gaiax", industry: "eKYC / 本人確認", url: "#" },
    { id: 2, name: "ADDRESS", studio: "Gaiax", industry: "多拠点居住シェア", url: "#" },
    { id: 3, name: "U-Motion", studio: "Sun*", industry: "畜産DX / IoT", url: "#" },
    { id: 4, name: "J-Coin Pay", studio: "Blue Lab", industry: "キャッシュレス決済", url: "#" },
    { id: 5, name: "ROBOT PAYMENT", studio: "Blue Lab", industry: "決済・請求管理", url: "#" },
  ];

  const featuredStudios = [
    { 
      id: 1, 
      name: "Gaiax Startup Studio", 
      location: "東京都千代田区", 
      category: "ソーシャル・Web3",
      description: "日本を代表するスタートアップスタジオの一つ。シェアリングエコノミーやDAOなど次世代の社会構造を作る起業家を支援。"
    },
    { 
      id: 2, 
      name: "Sun* Startup Studio", 
      location: "東京都千代田区", 
      category: "デジタル・グローバル",
      description: "テック領域に強みを持ち、プロダクト開発からビジネス成長までをワンストップで伴走するスタジオ。"
    },
    { 
      id: 3, 
      name: "Blue Lab", 
      location: "東京都港区", 
      category: "FinTech・事業承継",
      description: "みずほフィナンシャルグループから生まれた、金融領域を中心とした新規事業創出スタジオ。"
    },
    { 
      id: 4, 
      name: "ReGACY Innovation Group", 
      location: "東京都千代田区", 
      category: "共創型インキュベーション",
      description: "大企業とスタートアップの共創を通じて、産業構造を変革するイノベーションを生み出す。"
    }
  ];

  const memberStudios = [
    { name: "Beyond Next Ventures", category: "DeepTech" },
    { name: "Quantum", category: "Corporate Studio" },
    { name: "DNX Ventures", category: "SaaS / B2B" },
    { name: "Spiral Innovation Partners", category: "X-Tech" },
    { name: "DMM Startup Studio", category: "General" },
    { name: "Archetype", category: "B2B Tech" },
    { name: "Incubate Fund", category: "Seed / General" },
    { name: "One Capital", category: "SaaS" },
  ];

  const reports = [
    { 
      id: 1, 
      title: "スタートアップスタジオ白書 2024", 
      date: "2024.03.15", 
      type: "Whitepaper",
      description: "国内のスタートアップスタジオの現状と今後の展望をまとめた最新レポート。"
    },
    { 
      id: 2, 
      title: "海外スタートアップスタジオ事例調査（米国・欧州編）", 
      date: "2024.01.10", 
      type: "Research",
      description: "AtomicやRocket Internetなど、世界的な成功を収めるスタジオのモデルを分析。"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* 1. Header */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <img 
                src={logoUrl} 
                alt="Startup Studio Association" 
                className="h-10 md:h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden font-black text-xl tracking-tighter text-blue-600">
                STARTUP STUDIO ASSOCIATION
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['Database', 'Studios', 'Reports'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold hover:text-blue-600 transition-colors">
                {item === 'Database' ? 'スタートアップ一覧' : 
                 item === 'Studios' ? 'スタジオ一覧' : 'レポート'}
              </a>
            ))}
            <a href="#database" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20">
              スタートアップを探す
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* 2. Hero Section - Refined for "Information Hub" positioning */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 bg-[#111827] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.15] tracking-tight">
              スタートアップスタジオの<br />
              <span className="text-blue-400">すべてがここに集まる</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed font-medium">
              国内外のスタートアップスタジオ・スタートアップ情報を網羅。<br />
              業界の「今」を知るための、唯一無二の情報ハブ。
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#database" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30">
                スタートアップを探す <ArrowRight size={20} />
              </a>
              <a href="#reports" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
                最新レポートを見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Startup Database Section (Priority #1) */}
      <section id="database" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-3 flex items-center justify-center md:justify-start gap-4">
                <Database className="text-blue-400" size={36} /> Startup Archive
              </h2>
              <p className="text-gray-400 font-medium">スタジオから創出された事業・企業データベース。国内外の成功事例を網羅。</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="事業名・スタジオ名で検索" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          
          <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="py-6 px-8 text-gray-400 font-bold text-xs uppercase tracking-widest">Startup Name</th>
                  <th className="py-6 px-8 text-gray-400 font-bold text-xs uppercase tracking-widest">Studio</th>
                  <th className="py-6 px-8 text-gray-400 font-bold text-xs uppercase tracking-widest">Industry</th>
                  <th className="py-6 px-8"></th>
                </tr>
              </thead>
              <tbody>
                {startups.map(startup => (
                  <tr key={startup.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                    <td className="py-7 px-8 font-black text-lg">{startup.name}</td>
                    <td className="py-7 px-8 text-gray-300 font-medium">{startup.studio}</td>
                    <td className="py-7 px-8">
                      <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-500/20">{startup.industry}</span>
                    </td>
                    <td className="py-7 px-8 text-right">
                      <ExternalLink size={18} className="inline-block text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center">
            <button className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
              すべてのデータを閲覧する (1,000+ 件)
            </button>
          </div>
        </div>
      </section>

      {/* 4. Featured Studios Section (Priority #2) */}
      <section id="studios" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-black mb-4 flex items-center gap-3">
              <Rocket className="text-blue-600" /> Member Studios
            </h2>
            <p className="text-slate-500 text-lg">業界をリードする国内の主要スタートアップスタジオ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {featuredStudios.map(studio => (
              <div key={studio.id} className="group border border-slate-200 p-8 rounded-3xl hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center font-black text-blue-600 text-xl">
                    {studio.name.charAt(0)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {studio.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{studio.name}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                  <MapPin size={16} /> {studio.location}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{studio.description}</p>
              </div>
            ))}
          </div>

          {/* Member Directory */}
          <div className="bg-slate-50 rounded-[2.5rem] p-10 md:p-16 border border-slate-100">
            <div className="flex items-center gap-4 mb-10">
              <Building2 className="text-blue-600" size={32} />
              <h3 className="text-2xl font-black">Studio Directory</h3>
              <div className="h-px flex-grow bg-slate-200 ml-4"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
              {memberStudios.map((member, i) => (
                <div key={i} className="group cursor-pointer">
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">{member.name}</h4>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{member.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Reports Section (Priority #3) */}
      <section id="reports" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-4">
              <FileText className="text-blue-600" size={32} /> Reports & Insights
            </h2>
            <p className="text-slate-500 font-medium">調査から得られた、業界の最新トレンドと知見を提供します。</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {reports.map(report => (
              <div key={report.id} className="flex flex-col p-8 rounded-3xl border border-slate-200 hover:border-blue-500 transition-all bg-white group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                    {report.type}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">{report.date}</span>
                </div>
                <h3 className="text-xl font-black mb-4 group-hover:text-blue-600 transition-colors leading-tight">{report.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{report.description}</p>
                <button className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl font-bold group-hover:bg-blue-600 transition-all">
                  資料を閲覧する <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Minimalistic approach to Association info */}
      <footer className="py-20 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <img src={logoUrl} alt="Logo" className="h-10 mb-6" />
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
                一般社団法人スタートアップスタジオ協会は、スタートアップスタジオの普及と、次世代のエコシステム構築を目指す情報プラットフォームです。
              </p>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Contents</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li><a href="#database" className="hover:text-blue-600 transition-colors">スタートアップ一覧</a></li>
                <li><a href="#studios" className="hover:text-blue-600 transition-colors">スタジオ一覧</a></li>
                <li><a href="#reports" className="hover:text-blue-600 transition-colors">レポート・資料室</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Association</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">協会概要</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">会員制度・入会案内</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 gap-6">
            <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">
              © 2025 一般社団法人スタートアップスタジオ協会
            </p>
            <div className="flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
