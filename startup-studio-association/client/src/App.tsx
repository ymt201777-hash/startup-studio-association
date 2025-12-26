import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, Rocket, ExternalLink, ArrowRight, Database, FileText, Search, MapPin, Building2, Filter, TrendingUp, Trophy, DollarSign, Download, Users } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('top'); // 'top', 'studios', 'startups'

  // --- Filter States ---
  const [studioTypeFilter, setStudioTypeFilter] = useState('すべて');
  const [startupIndustryFilter, setStartupIndustryFilter] = useState('すべて');
  const [startupStageFilter, setStartupStageFilter] = useState('すべて');

  const logoUrl = "/logo.png";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Data Sections ---
  const startups = [
    { id: 1, name: "TRUSTDOCK", studio: "Gaiax", industry: "SaaS", stage: "シリーズB以降", funding: "25億円", exitStatus: "未", url: "#" },
    { id: 2, name: "ADDRESS", studio: "Gaiax", industry: "その他", stage: "シリーズA", funding: "12億円", exitStatus: "未", url: "#" },
    { id: 3, name: "U-Motion", studio: "Sun*", industry: "AI", stage: "Exit済（IPO / M&A）", funding: "N/A", exitStatus: "M&A済", url: "#" },
    { id: 4, name: "J-Coin Pay", studio: "Blue Lab", industry: "Fintech", stage: "シリーズB以降", funding: "N/A", exitStatus: "未", url: "#" },
    { id: 5, name: "ROBOT PAYMENT", studio: "Blue Lab", industry: "Fintech", stage: "Exit済（IPO / M&A）", funding: "N/A", exitStatus: "IPO済", url: "#" },
    { id: 6, name: "MediTech", studio: "University Studio", industry: "ヘルスケア", stage: "シード", funding: "5,000万円", exitStatus: "未", url: "#" },
  ];

  const featuredStudios = [
    { 
      id: 1, name: "Gaiax Startup Studio", location: "東京都千代田区", type: "独立系",
      category: "ソーシャル・Web3", startupCount: 15, exitCount: 3,
      description: "シェアリングエコノミーやDAOなど次世代の社会構造を作る起業家を支援。"
    },
    { 
      id: 2, name: "Sun* Startup Studio", location: "東京都千代田区", type: "独立系",
      category: "デジタル・グローバル", startupCount: 20, exitCount: 5,
      description: "テック領域に強みを持ち、プロダクト開発からビジネス成長までを伴走。"
    },
    { 
      id: 3, name: "Blue Lab", location: "東京都港区", type: "大企業系",
      category: "FinTech・事業承継", startupCount: 8, exitCount: 1,
      description: "みずほFGから生まれた、金融領域を中心とした新規事業創出スタジオ。"
    },
    { 
      id: 4, name: "ReGACY Innovation Group", location: "東京都千代田区", type: "独立系",
      category: "共創型インキュベーション", startupCount: 12, exitCount: 2,
      description: "大企業とスタートアップの共創を通じて、産業構造を変革する。"
    },
    { 
      id: 5, name: "Beyond Next Ventures", location: "東京都中央区", type: "VC系",
      category: "DeepTech", startupCount: 30, exitCount: 4,
      description: "大学発ベンチャーや技術系スタートアップの事業化に特化。"
    },
    {   
      id: 6, name: "地域創生スタジオ", location: "福岡県福岡市", type: "自治体連携",
      category: "地方創生・社会課題", startupCount: 5, exitCount: 0,
      description: "自治体と連携し、地域課題を解決するスタートアップを創出。"
    }
  ];

  const reports = [
    { title: "スタートアップスタジオ白書 2024", date: "2024.01", type: "PDF", size: "4.2MB" },
    { title: "海外スタートアップスタジオ事例調査", date: "2023.11", type: "Whitepaper", size: "2.8MB" },
    { title: "スタジオモデルの経済波及効果分析", date: "2023.08", type: "Report", size: "1.5MB" },
  ];

  const filteredStudios = featuredStudios.filter(s => studioTypeFilter === 'すべて' || s.type === studioTypeFilter);
  const filteredStartups = startups.filter(s => 
    (startupIndustryFilter === 'すべて' || s.industry === startupIndustryFilter) &&
    (startupStageFilter === 'すべて' || s.stage === startupStageFilter)
  );

  // --- Components ---
  const Tag = ({ children, color = "blue" }) => {
    const colors = {
      blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      pink: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${colors[color] || colors.blue}`}>
        {children}
      </span>
    );
  };

  const Carousel = ({ title, icon: Icon, items, renderItem, onSeeAll }) => {
    const scrollRef = useRef(null);
    const scroll = (direction) => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
        scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
    };

    return (
      <div className="py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Icon className="text-blue-500" /> {title}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onSeeAll()} className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 group transition-all">
              すべて見る <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('left')} className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={() => scroll('right')} className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2"
        >
          {items.map((item, idx) => (
            <div key={idx} className="min-w-[280px] md:min-w-[320px] transition-transform hover:-translate-y-1">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* 1. Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || viewMode !== 'top' ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('top')}>
            <img src={logoUrl} alt="Logo" className="h-10 md:h-12 w-auto object-contain" />
            <span className="hidden lg:block font-black text-xl tracking-tighter text-blue-600 uppercase">Startup Studio Association</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setViewMode('startups')} className={`text-sm font-bold transition-colors ${viewMode === 'startups' ? 'text-blue-600' : 'hover:text-blue-600'}`}>スタートアップ一覧</button>
            <button onClick={() => setViewMode('studios')} className={`text-sm font-bold transition-colors ${viewMode === 'studios' ? 'text-blue-600' : 'hover:text-blue-600'}`}>スタジオ一覧</button>
            <a href="#" className="text-sm font-bold hover:text-blue-600">レポート</a>
            <button onClick={() => setViewMode('startups')} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20">
              スタートアップを探す
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu /></button>
        </div>
      </nav>

      {viewMode === 'top' && (
        <>
          {/* 2. Hero Section */}
          <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 bg-[#111827] text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.15] tracking-tight">
                  スタートアップスタジオの<br /><span className="text-blue-400">すべてがここに集まる</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed font-medium">業界の「今」を知るための、唯一無二の情報ハブ。</p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setViewMode('startups')} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30">
                    データベースを見る <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2.1 Stats Section (New Integrated) */}
          <section className="bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "国内スタジオ数", value: "30+", unit: "社", icon: Building2 },
                  { label: "輩出スタートアップ数", value: "150+", unit: "社", icon: Rocket },
                  { label: "累計調達額", value: "450+", unit: "億円", icon: DollarSign },
                  { label: "Exit実績", value: "24", unit: "件", icon: Trophy },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon size={16} className="text-blue-500" />
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                      <span className="text-sm font-bold text-slate-500">{stat.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Top Page Carousels */}
          <div className="max-w-7xl mx-auto px-6 py-12">
            <Carousel 
              title="Featured Studios" 
              icon={Rocket} 
              items={featuredStudios}
              onSeeAll={() => setViewMode('studios')}
              renderItem={(studio) => (
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center font-black text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">{studio.name.charAt(0)}</div>
                    <Tag color="blue">{studio.type}</Tag>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{studio.name}</h3>
                  <div className="flex gap-4 mt-auto pt-4 border-t border-slate-50">
                    <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Startups</p><p className="font-black text-blue-600">{studio.startupCount}</p></div>
                    <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Exits</p><p className="font-black text-emerald-500">{studio.exitCount}</p></div>
                  </div>
                </div>
              )}
            />

            <Carousel 
              title="Startup Archive" 
              icon={Database} 
              items={startups}
              onSeeAll={() => setViewMode('startups')}
              renderItem={(startup) => (
                <div className="bg-slate-900 text-white p-6 rounded-2xl hover:bg-slate-800 transition-all cursor-pointer h-full flex flex-col border border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <Tag color="purple">{startup.industry}</Tag>
                    <Tag color="orange">{startup.stage.split('（')[0]}</Tag>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{startup.name}</h3>
                  <p className="text-xs text-gray-500 font-bold">from {startup.studio}</p>
                  <div className="mt-6 flex items-center justify-between text-[10px] font-black uppercase text-gray-400">
                    <span className="flex items-center gap-1"><DollarSign size={10} /> {startup.funding}</span>
                    <ExternalLink size={14} />
                  </div>
                </div>
              )}
            />

            {/* 3.1 Reports Section (Restored) */}
            <div className="py-16">
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-black flex items-center gap-3">
                  <FileText className="text-blue-500" /> Reports & Insights
                </h2>
                <a href="#" className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 group">
                  レポート一覧 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reports.map((report, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-500 hover:bg-white hover:shadow-lg transition-all cursor-pointer flex flex-col group">
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-2 py-1 bg-white rounded text-[10px] font-black text-slate-400 border border-slate-100 uppercase">{report.type}</span>
                      <span className="text-[10px] font-bold text-slate-400">{report.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-6 flex-grow">{report.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400">{report.size}</span>
                      <div className="flex items-center gap-2 text-blue-600 group-hover:gap-3 transition-all">
                        <span className="text-xs font-black">Download</span>
                        <Download size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3.2 Member Directory Section (Restored) */}
            <div className="py-16 border-t border-slate-100 mt-8">
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-black flex items-center gap-3">
                  <Users className="text-blue-500" /> Member Directory
                </h2>
                <button onClick={() => setViewMode('studios')} className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 group">
                  加盟スタジオ一覧 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-start opacity-60">
                {featuredStudios.concat(featuredStudios).map((studio, idx) => (
                  <div key={idx} className="flex items-center gap-3 hover:opacity-100 transition-opacity cursor-default grayscale hover:grayscale-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-lg flex items-center justify-center font-black text-slate-400 text-xs border border-slate-200">{studio.name.charAt(0)}</div>
                    <span className="text-xs font-bold text-slate-600 hidden md:inline">{studio.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {viewMode === 'studios' && (
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black mb-2 tracking-tight">Studio Directory</h2>
              <p className="text-slate-500 font-medium tracking-tight">加盟スタジオの詳細情報と実績一覧</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['すべて', '独立系', '大企業系', 'VC系', '大学系', '自治体連携'].map(t => (
                <button 
                  key={t}
                  onClick={() => setStudioTypeFilter(t)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${studioTypeFilter === t ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudios.map(studio => (
              <div key={studio.id} className="group bg-white border border-slate-200 rounded-3xl p-8 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center font-black text-blue-600 text-2xl border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">{studio.name.charAt(0)}</div>
                  <div className="flex flex-col items-end gap-2">
                    <Tag color="blue">{studio.type}</Tag>
                    <Tag color="purple">{studio.category}</Tag>
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-blue-600 transition-colors">{studio.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-3">{studio.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1 tracking-widest"><TrendingUp size={12}/> Startups</p>
                    <p className="text-xl font-black text-slate-900">{studio.startupCount}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1 tracking-widest"><Trophy size={12}/> Exit実績</p>
                    <p className="text-xl font-black text-emerald-600">{studio.exitCount}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                  <MapPin size={14} /> {studio.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'startups' && (
        <div className="bg-slate-900 min-h-screen text-white pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-4xl font-black mb-4 flex items-center gap-4">
                <Database className="text-blue-400" size={40} /> Startup Archive
              </h2>
              <div className="flex flex-wrap gap-8 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">領域別フィルタ</p>
                  <div className="flex flex-wrap gap-2">
                    {['すべて', 'SaaS', 'ヘルスケア', 'Fintech', 'AI', 'その他'].map(i => (
                      <button key={i} onClick={() => setStartupIndustryFilter(i)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${startupIndustryFilter === i ? 'bg-blue-600 border-blue-600' : 'border-white/20 text-gray-400 hover:border-white/40'}`}>{i}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">ステージ別フィルタ</p>
                  <div className="flex flex-wrap gap-2">
                    {['すべて', 'シード', 'シリーズA', 'シリーズB以降', 'Exit済（IPO / M&A）'].map(s => (
                      <button key={s} onClick={() => setStartupStageFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${startupStageFilter === s ? 'bg-orange-600 border-orange-600' : 'border-white/20 text-gray-400 hover:border-white/40'}`}>{s.split('（')[0]}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStartups.map(startup => (
                <div key={startup.id} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.08] transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <Tag color="purple">{startup.industry}</Tag>
                    <Tag color="orange">{startup.stage}</Tag>
                  </div>
                  <h3 className="text-2xl font-black mb-1 group-hover:text-blue-400 transition-colors">{startup.name}</h3>
                  <p className="text-blue-500 text-sm font-bold mb-8 uppercase tracking-tight">from {startup.studio}</p>
                  
                  <div className="space-y-4 border-t border-white/5 pt-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-bold flex items-center gap-2 tracking-tight"><DollarSign size={16}/> 累計調達額</span>
                      <span className="font-black text-blue-400">{startup.funding}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-bold flex items-center gap-2 tracking-tight"><Trophy size={16}/> Exit状況</span>
                      <span className={`font-black ${startup.exitStatus !== '未' ? 'text-emerald-400' : 'text-gray-600'}`}>{startup.exitStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-20 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-sm text-center md:text-left">
              <img src={logoUrl} alt="Logo" className="h-10 mb-6 mx-auto md:mx-0" />
              <p className="text-slate-500 text-sm font-medium leading-relaxed">一般社団法人スタートアップスタジオ協会は、業界の情報を集約し、挑戦を加速させるプラットフォームです。</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="#" className="hover:text-blue-600 transition-colors underline decoration-slate-200 underline-offset-4">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors underline decoration-slate-200 underline-offset-4">Terms of Use</a>
              <a href="#" className="hover:text-blue-600 transition-colors underline decoration-slate-200 underline-offset-4">Contact</a>
            </div>
          </div>
          <div className="pt-8 mt-12 border-t border-slate-50 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">© 2025 STARTUP STUDIO ASSOCIATION</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
