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
      red: "bg-red-500/10 text-red-400 border-red-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${colors[color] || colors.blue} tracking-wider`}>
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
      <div className="py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black flex items-center gap-3 text-white tracking-tight">
              <div className="p-2 bg-blue-500/20 rounded-lg"><Icon className="text-blue-400" size={24} /></div> {title}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onSeeAll()} className="text-sm font-bold text-gray-400 hover:text-white flex items-center gap-1 group transition-all tracking-widest">
              VIEW ALL <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="hidden md:flex gap-3">
              <button onClick={() => scroll('left')} className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white"><ChevronLeft size={20} /></button>
              <button onClick={() => scroll('right')} className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4"
        >
          {items.map((item, idx) => (
            <div key={idx} className="min-w-[300px] md:min-w-[360px] transition-all hover:-translate-y-2 duration-500">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 font-sans selection:bg-blue-500/30 tracking-tight">
      {/* 1. Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || viewMode !== 'top' ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setViewMode('top')}>
            <div className="p-1 bg-white rounded-lg group-hover:rotate-12 transition-transform duration-500">
              <img src={logoUrl} alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
            </div>
            <span className="hidden lg:block font-black text-xl tracking-tighter text-white uppercase group-hover:text-blue-400 transition-colors">Startup Studio Association</span>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <button onClick={() => setViewMode('startups')} className={`text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'startups' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Startups</button>
            <button onClick={() => setViewMode('studios')} className={`text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'studios' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Studios</button>
            <a href="#" className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors">Reports</a>
            <button onClick={() => setViewMode('startups')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20 border border-white/10">
              Find Ventures
            </button>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu /></button>
        </div>
      </nav>

      {viewMode === 'top' && (
        <>
          {/* 2. Hero Section */}
          <section className="relative pt-48 pb-32 md:pt-64 md:pb-52 overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
              <div className="max-w-4xl mx-auto md:mx-0">
                <Tag color="purple">NEXT GENERATION ECOSYSTEM</Tag>
                <h1 className="text-5xl md:text-8xl font-black mt-8 mb-10 leading-[1.05] tracking-tight text-white">
                  スタートアップスタジオの<br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">すべてがここに集まる</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-14 leading-relaxed font-medium max-w-2xl tracking-wide">
                  業界の「今」を知るための、唯一無二の情報ハブ。
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  <button onClick={() => setViewMode('startups')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3 border border-white/10 uppercase tracking-wider">
                    Explore Database <ArrowRight size={22} />
                  </button>
                  <button onClick={() => setViewMode('studios')} className="bg-white/5 backdrop-blur-lg text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all uppercase tracking-wider">
                    Member Studios
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2.1 Stats Section */}
          <section className="relative z-10 -mt-10 px-6">
            <div className="max-w-7xl mx-auto bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 md:p-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {[
                  { label: "Studios", value: "30+", unit: "社", icon: Building2, color: "text-blue-400" },
                  { label: "Ventures", value: "150+", unit: "社", icon: Rocket, color: "text-purple-400" },
                  { label: "Funding", value: "450+", unit: "億円", icon: DollarSign, color: "text-yellow-400" },
                  { label: "Exits", value: "24", unit: "件", icon: Trophy, color: "text-red-400" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center md:items-start group">
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`p-1.5 rounded-md bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}><stat.icon size={14} /></div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">{stat.value}</span>
                      <span className="text-sm font-bold text-gray-500">{stat.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Top Page Carousels */}
          <div className="max-w-7xl mx-auto px-6 py-20 relative">
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <Carousel 
              title="Featured Studios" 
              icon={Rocket} 
              items={featuredStudios}
              onSeeAll={() => setViewMode('studios')}
              renderItem={(studio) => (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:border-blue-500/50 hover:bg-white/[0.08] transition-all cursor-pointer h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">{studio.name.charAt(0)}</div>
                    <Tag color="blue">{studio.type}</Tag>
                  </div>
                  <h3 className="font-black text-xl mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-1 tracking-tight">{studio.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">{studio.description}</p>
                  <div className="flex gap-8 mt-auto pt-6 border-t border-white/5">
                    <div><p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Startups</p><p className="font-black text-white text-lg">{studio.startupCount}</p></div>
                    <div><p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Exits</p><p className="font-black text-emerald-400 text-lg">{studio.exitCount}</p></div>
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
                <div className="bg-[#1a1a24] border border-white/5 p-8 rounded-[2rem] hover:border-purple-500/50 hover:bg-[#1e1e2d] transition-all cursor-pointer h-full flex flex-col group shadow-xl">
                  <div className="flex justify-between items-start mb-8">
                    <Tag color="purple">{startup.industry}</Tag>
                    <Tag color="yellow">{startup.stage.split('（')[0]}</Tag>
                  </div>
                  <h3 className="font-black text-2xl mb-2 text-white group-hover:text-purple-400 transition-colors tracking-tight">{startup.name}</h3>
                  <p className="text-xs text-gray-500 font-black uppercase tracking-widest">from {startup.studio}</p>
                  <div className="mt-10 flex items-center justify-between text-xs font-black uppercase text-gray-400 pt-6 border-t border-white/5">
                    <span className="flex items-center gap-2 text-blue-400 font-black tracking-widest"><DollarSign size={14} className="text-blue-500" /> {startup.funding}</span>
                    <div className="p-2 bg-white/5 rounded-full group-hover:bg-purple-500/20 transition-colors"><ExternalLink size={16} /></div>
                  </div>
                </div>
              )}
            />

            {/* 3.1 Reports Section */}
            <div className="py-24">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <h2 className="text-3xl font-black flex items-center gap-4 text-white">
                  <div className="p-2 bg-red-500/20 rounded-lg"><FileText className="text-red-400" size={24} /></div> Reports & Insights
                </h2>
                <a href="#" className="text-sm font-bold text-gray-400 hover:text-white flex items-center gap-1 group transition-all tracking-[0.1em]">
                  VIEW REPORTS <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reports.map((report, idx) => (
                  <div key={idx} className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 hover:border-red-500/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-red-500/5 transition-all cursor-pointer flex flex-col group">
                    <div className="flex justify-between items-center mb-6">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-gray-400 border border-white/10 uppercase tracking-widest">{report.type}</span>
                      <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">{report.date}</span>
                    </div>
                    <h3 className="font-black text-lg text-white mb-8 flex-grow leading-snug tracking-tight">{report.title}</h3>
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{report.size}</span>
                      <div className="flex items-center gap-2 text-red-400 group-hover:gap-4 transition-all">
                        <span className="text-xs font-black uppercase tracking-widest">Download</span>
                        <div className="p-2 bg-red-500/10 rounded-lg"><Download size={18} /></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3.2 Member Directory Section */}
            <div className="py-24 border-t border-white/5 mt-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 text-center md:text-left">
                <h2 className="text-3xl font-black flex items-center justify-center md:justify-start gap-4 text-white">
                  <div className="p-2 bg-yellow-500/20 rounded-lg"><Users className="text-yellow-400" size={24} /></div> Member Directory
                </h2>
              </div>
              <div className="flex flex-wrap gap-6 md:gap-12 justify-center opacity-40 hover:opacity-100 transition-opacity duration-700">
                {featuredStudios.concat(featuredStudios).map((studio, idx) => (
                  <div key={idx} className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl flex items-center justify-center font-black text-white text-xs border border-white/10 group-hover:bg-white/10">{studio.name.charAt(0)}</div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hidden md:inline">{studio.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {viewMode === 'studios' && (
        <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div>
              <Tag color="blue">DATABASE</Tag>
              <h2 className="text-5xl font-black mt-4 mb-4 text-white tracking-tighter">Studio Directory</h2>
              <p className="text-gray-400 font-medium text-lg max-w-xl">加盟スタートアップスタジオの強みと実績を検索</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['すべて', '独立系', '大企業系', 'VC系', '大学系', '自治体連携'].map(t => (
                <button 
                  key={t}
                  onClick={() => setStudioTypeFilter(t)}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${studioTypeFilter === t ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredStudios.map(studio => (
              <div key={studio.id} className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 hover:border-blue-500/50 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center font-black text-blue-400 text-2xl border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">{studio.name.charAt(0)}</div>
                  <div className="flex flex-col items-end gap-2">
                    <Tag color="blue">{studio.type}</Tag>
                    <Tag color="purple">{studio.category}</Tag>
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 text-white group-hover:text-blue-400 transition-colors tracking-tight">{studio.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-10 line-clamp-3">{studio.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-10 mt-auto">
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/5 group-hover:bg-white/10 transition-colors">
                    <p className="text-[10px] font-black text-gray-500 uppercase mb-2 flex items-center gap-1 tracking-[0.2em]"><TrendingUp size={12} className="text-blue-400"/> Startups</p>
                    <p className="text-2xl font-black text-white">{studio.startupCount}</p>
                  </div>
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/5 group-hover:bg-white/10 transition-colors">
                    <p className="text-[10px] font-black text-gray-500 uppercase mb-2 flex items-center gap-1 tracking-[0.2em]"><Trophy size={12} className="text-red-400"/> Exits</p>
                    <p className="text-2xl font-black text-emerald-400">{studio.exitCount}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-500 text-xs font-black uppercase tracking-widest">
                  <MapPin size={14} className="text-blue-500" /> {studio.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'startups' && (
        <div className="bg-[#0a0a0f] min-h-screen text-white pt-40 pb-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20">
              <Tag color="red">ARCHIVE</Tag>
              <h2 className="text-5xl font-black mt-4 mb-10 flex items-center gap-6 tracking-tighter">
                Startup Archive
              </h2>
              <div className="flex flex-col md:flex-row gap-12 bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl shadow-2xl">
                <div className="flex-1 space-y-5">
                  <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">Industry Filter</p>
                  <div className="flex flex-wrap gap-3">
                    {['すべて', 'SaaS', 'ヘルスケア', 'Fintech', 'AI', 'その他'].map(i => (
                      <button key={i} onClick={() => setStartupIndustryFilter(i)} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${startupIndustryFilter === i ? 'bg-purple-600 border-purple-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>{i}</button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 space-y-5">
                  <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">Stage Filter</p>
                  <div className="flex flex-wrap gap-3">
                    {['すべて', 'シード', 'シリーズA', 'シリーズB以降', 'Exit済（IPO / M&A）'].map(s => (
                      <button key={s} onClick={() => setStartupStageFilter(s)} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${startupStageFilter === s ? 'bg-orange-600 border-orange-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>{s.split('（')[0]}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredStartups.map(startup => (
                <div key={startup.id} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/[0.08] transition-all group hover:-translate-y-2 duration-500 shadow-xl">
                  <div className="flex justify-between items-start mb-8">
                    <Tag color="purple">{startup.industry}</Tag>
                    <Tag color="yellow">{startup.stage}</Tag>
                  </div>
                  <h3 className="text-3xl font-black mb-2 group-hover:text-purple-400 transition-colors tracking-tight">{startup.name}</h3>
                  <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-10">from {startup.studio}</p>
                  
                  <div className="space-y-6 border-t border-white/5 pt-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><DollarSign size={16} className="text-yellow-400"/> Funding</span>
                      <span className="font-black text-white text-lg">{startup.funding}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><Trophy size={16} className="text-red-400"/> Exit Status</span>
                      <span className={`font-black uppercase tracking-widest text-xs px-3 py-1 rounded-full ${startup.exitStatus !== '未' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-600'}`}>{startup.exitStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-[#08080c] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-1 bg-white rounded-lg"><img src={logoUrl} alt="Logo" className="h-8" /></div>
                <span className="font-black text-white uppercase tracking-tighter text-xl">Startup Studio Association</span>
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed tracking-wide">業界の情報を集約し、次世代の挑戦を加速させる。<br />日本最大のスタートアップスタジオ・プラットフォーム。</p>
            </div>
            <div className="flex flex-wrap gap-8 md:gap-16 text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">
              <a href="#" className="hover:text-blue-400 transition-colors border-b border-transparent hover:border-blue-400 pb-1">Privacy Policy</a>
              <a href="#" className="hover:text-red-400 transition-colors border-b border-transparent hover:border-red-400 pb-1">Terms of Use</a>
              <a href="#" className="hover:text-yellow-400 transition-colors border-b border-transparent hover:border-yellow-400 pb-1">Contact</a>
            </div>
          </div>
          <div className="pt-12 mt-20 border-t border-white/5 text-center">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]">© 2025 STARTUP STUDIO ASSOCIATION / ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      {/* Custom Styles for Spline-like feel */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default App;
