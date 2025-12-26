import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, Rocket, ExternalLink, ArrowRight, Database, FileText, Search, MapPin, Building2, Filter, TrendingUp, Trophy, DollarSign, Download, Users } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('top'); // 'top', 'studios', 'startups', 'studioDetail', 'startupDetail'
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);

  // --- Filter States ---
  const [studioTypeFilter, setStudioTypeFilter] = useState('すべて');
  const [startupIndustryFilter, setStartupIndustryFilter] = useState('すべて');
  const [startupStageFilter, setStartupStageFilter] = useState('すべて');

  const logoUrl = "/logo.png";

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0";
    document.getElementsByTagName('head')[0].appendChild(meta);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Extended Data ---
  const featuredStudios = [
    { 
      id: 1, 
      name: "Gaiax Startup Studio", 
      location: "東京都千代田区", 
      type: "独立系",
      category: "ソーシャル・Web3", 
      startupCount: 15, 
      exitCount: 3,
      description: "シェアリングエコノミーやDAOなど次世代の社会構造を作る起業家を支援。",
      founded: "2015年",
      fullDescription: "ガイアックスは「人と人をつなげる」をミッションに、シェアリングエコノミーやDAO、Web3領域で次世代の社会構造を作る起業家を支援しています。起業家の発掘から事業開発、資金調達まで一気通貫でサポート。これまでに15社以上のスタートアップを輩出し、3社がExitを達成しています。",
      website: "https://www.gaiax.co.jp/",
      logoUrl: "/logos/gaiax.png"
    },
    { 
      id: 2, 
      name: "Sun* Startup Studio", 
      location: "東京都千代田区", 
      type: "独立系",
      category: "デジタル・グローバル", 
      startupCount: 20, 
      exitCount: 5,
      description: "テック領域に強みを持ち、プロダクト開発からビジネス成長までを伴走。",
      founded: "2012年",
      fullDescription: "Sun*は「誰もが価値創造に夢中になれる世界」をビジョンに、デジタル・クリエイティブスタジオとして事業を展開。ベトナムを中心としたグローバル開発体制を強みに、プロダクト開発からビジネス成長まで伴走支援を行っています。",
      website: "https://sun-asterisk.com/",
      logoUrl: "/logos/sun.png"
    },
    { 
      id: 3, 
      name: "Blue Lab", 
      location: "東京都港区", 
      type: "大企業系",
      category: "FinTech・事業承継", 
      startupCount: 8, 
      exitCount: 1,
      description: "みずほFGから生まれた、金融領域を中心とした新規事業創出スタジオ。",
      founded: "2019年",
      fullDescription: "Blue Labはみずほフィナンシャルグループから生まれたスタートアップスタジオです。金融領域を中心に、フィンテックや事業承継など社会課題の解決に取り組むスタートアップを創出・支援しています。",
      website: "https://bluelab.co.jp/",
      logoUrl: "/logos/bluelab.png"
    },
    { 
      id: 4, 
      name: "ReGACY Innovation Group", 
      location: "東京都千代田区", 
      type: "独立系",
      category: "共創型インキュベーション", 
      startupCount: 12, 
      exitCount: 2,
      description: "大企業とスタートアップの共創を通じて、産業構造を変革する。",
      founded: "2018年",
      fullDescription: "ReGACY Innovation Groupは、大企業とスタートアップの共創を通じて産業構造を変革することを目指しています。独自の共創型インキュベーションモデルで、新規事業の立ち上げから成長まで支援します。",
      website: "https://regacy-innovation.com/",
      logoUrl: "/logos/regacy.png"
    },
    { 
      id: 5, 
      name: "Beyond Next Ventures", 
      location: "東京都中央区", 
      type: "VC系",
      category: "DeepTech", 
      startupCount: 30, 
      exitCount: 4,
      description: "大学発ベンチャーや技術系スタートアップの事業化に特化。",
      founded: "2014年",
      fullDescription: "Beyond Next Venturesは、大学発ベンチャーや技術系スタートアップの事業化に特化したVCです。投資だけでなく、経営人材の紹介や事業開発支援など、ハンズオンでの支援を強みとしています。",
      website: "https://beyondnextventures.com/",
      logoUrl: "/logos/beyond.png"
    },
    { 
      id: 6, 
      name: "地域創生スタジオ", 
      location: "福岡県福岡市", 
      type: "自治体連携",
      category: "地方創生・社会課題", 
      startupCount: 5, 
      exitCount: 0,
      description: "自治体と連携し、地域課題を解決するスタートアップを創出。",
      founded: "2021年",
      fullDescription: "地域創生スタジオは、福岡市と連携して地域課題を解決するスタートアップを創出しています。地方創生や社会課題解決をテーマに、地域に根ざした事業開発を支援します。",
      website: "#",
      logoUrl: "/logos/chiiki.png"
    }
  ];

  const startups = [
    { 
      id: 1, 
      name: "TRUSTDOCK", 
      studio: "Gaiax", 
      studioId: 1,
      industry: "SaaS", 
      stage: "シリーズB以降", 
      funding: "25億円", 
      exitStatus: "未", 
      url: "https://trustdock.io/",
      founded: "2017年",
      description: "本人確認のデジタル化を推進するeKYCサービスを提供。",
      fullDescription: "TRUSTDOCKは、オンラインでの本人確認（eKYC）サービスを提供するスタートアップです。金融機関やシェアリングエコノミー事業者向けに、APIベースの本人確認ソリューションを展開。犯罪収益移転防止法に対応した安全・安心な本人確認を実現しています。",
      logoUrl: "/logos/trustdock.png"
    },
    { 
      id: 2, 
      name: "ADDRESS", 
      studio: "Gaiax", 
      studioId: 1,
      industry: "その他", 
      stage: "シリーズA", 
      funding: "12億円", 
      exitStatus: "未", 
      url: "https://address.love/",
      founded: "2018年",
      description: "月額制の多拠点居住サービスを提供。",
      fullDescription: "ADDRESSは、月額制で全国の拠点に住み放題になる多拠点居住サービスを提供しています。空き家問題の解決と新しいライフスタイルの提案を両立し、地方創生にも貢献しています。",
      logoUrl: "/logos/address.png"
    },
    { 
      id: 3, 
      name: "U-Motion", 
      studio: "Sun*", 
      studioId: 2,
      industry: "AI", 
      stage: "Exit済（IPO / M&A）", 
      funding: "N/A", 
      exitStatus: "M&A済", 
      url: "#",
      founded: "2016年",
      description: "畜産業向けAIソリューションを提供。",
      fullDescription: "U-Motionは、畜産業向けのAIソリューションを提供していたスタートアップです。牛の行動データをAIで解析し、発情検知や健康管理を効率化するサービスを展開。デザミス社にM&Aされました。",
      logoUrl: "/logos/umotion.png"
    },
    { 
      id: 4, 
      name: "J-Coin Pay", 
      studio: "Blue Lab", 
      studioId: 3,
      industry: "Fintech", 
      stage: "シリーズB以降", 
      funding: "N/A", 
      exitStatus: "未", 
      url: "https://j-coin.jp/",
      founded: "2019年",
      description: "みずほ銀行が提供するスマホ決済サービス。",
      fullDescription: "J-Coin Payは、みずほ銀行が提供するスマートフォン決済サービスです。銀行口座と直結した送金・決済機能を提供し、キャッシュレス社会の実現に貢献しています。",
      logoUrl: "/logos/jcoin.png"
    },
    { 
      id: 5, 
      name: "ROBOT PAYMENT", 
      studio: "Blue Lab", 
      studioId: 3,
      industry: "Fintech", 
      stage: "Exit済（IPO / M&A）", 
      funding: "N/A", 
      exitStatus: "IPO済", 
      url: "https://www.robotpayment.co.jp/",
      founded: "2000年",
      description: "請求管理・決済代行サービスを提供。",
      fullDescription: "ROBOT PAYMENTは、請求管理ロボ「請求管理ロボ」や決済代行サービスを提供するフィンテック企業です。2021年に東証マザーズ（現グロース）に上場しました。",
      logoUrl: "/logos/robotpayment.png"
    },
    { 
      id: 6, 
      name: "MediTech", 
      studio: "University Studio", 
      studioId: 5,
      industry: "ヘルスケア", 
      stage: "シード", 
      funding: "5,000万円", 
      exitStatus: "未", 
      url: "#",
      founded: "2023年",
      description: "大学発の医療AIスタートアップ。",
      fullDescription: "MediTechは、大学の研究成果を活用した医療AIスタートアップです。画像診断支援AIの開発を進めており、医療現場の効率化と診断精度の向上を目指しています。",
      logoUrl: "/logos/meditech.png"
    },
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
      green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold border ${colors[color] || colors.blue} tracking-wider whitespace-nowrap`}>
        {children}
      </span>
    );
  };

  const Carousel = ({ titleNode, items, renderItem, onSeeAll }) => {
    const scrollRef = useRef(null);
    const scroll = (direction) => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
        scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
    };

    return (
      <div className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-10 gap-6">
          {titleNode}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
            <button onClick={() => onSeeAll()} className="text-[10px] md:text-xs font-black text-gray-400 hover:text-white flex items-center gap-1 group transition-all tracking-widest uppercase">
              VIEW ALL <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="hidden md:flex gap-3">
              <button onClick={() => scroll('left')} className="p-2 lg:p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white"><ChevronLeft size={18} /></button>
              <button onClick={() => scroll('right')} className="p-2 lg:p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-6 -mx-6 px-6"
        >
          {items.map((item, idx) => (
            <div key={idx} className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] lg:min-w-[380px] transition-all hover:-translate-y-2 duration-500">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 font-sans selection:bg-blue-500/30 tracking-tight overflow-x-hidden">
      {/* 1. Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || viewMode !== 'top' ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 py-3 md:py-4' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => {setViewMode('top'); window.scrollTo(0,0)}}>
            <div className="p-1 bg-white rounded-lg group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-white/10">
              <img src={logoUrl} alt="Logo" className="h-6 sm:h-8 md:h-10 w-auto object-contain" />
            </div>
            <span className="hidden sm:block font-black text-sm md:text-lg lg:text-xl tracking-tighter text-white uppercase group-hover:text-blue-400 transition-colors">Startup Studio Association</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
            <button onClick={() => {setViewMode('startups'); window.scrollTo(0,0)}} className={`text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'startups' || viewMode === 'startupDetail' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Startups</button>
            <button onClick={() => {setViewMode('studios'); window.scrollTo(0,0)}} className={`text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'studios' || viewMode === 'studioDetail' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Studios</button>
            <a href="#" className="text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors">Reports</a>
            <button onClick={() => {setViewMode('startups'); window.scrollTo(0,0)}} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 lg:px-6 py-2 rounded-full text-[10px] lg:text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-blue-500/20 border border-white/10">
              Find Ventures
            </button>
          </div>

          <button className="md:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0f]/95 backdrop-blur-3xl border-b border-white/5 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
            <button onClick={() => {setViewMode('startups'); setIsMobileMenuOpen(false); window.scrollTo(0,0)}} className="text-xs font-black uppercase tracking-widest text-left text-gray-400 border-b border-white/5 pb-2">Startups</button>
            <button onClick={() => {setViewMode('studios'); setIsMobileMenuOpen(false); window.scrollTo(0,0)}} className="text-xs font-black uppercase tracking-widest text-left text-gray-400 border-b border-white/5 pb-2">Studios</button>
            <button className="text-xs font-black uppercase tracking-widest text-left text-gray-400 border-b border-white/5 pb-2">Reports</button>
            <button onClick={() => {setViewMode('startups'); setIsMobileMenuOpen(false); window.scrollTo(0,0)}} className="bg-blue-600 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest text-center">Find Ventures</button>
          </div>
        )}
      </nav>

      {viewMode === 'top' && (
        <>
          <section className="relative pt-32 sm:pt-40 md:pt-48 lg:pt-64 pb-20 sm:pb-28 md:pb-32 lg:pb-52 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] md:h-[600px] bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center md:text-left">
              <div className="max-w-4xl mx-auto md:mx-0">
                <Tag color="purple">NEXT GENERATION ECOSYSTEM</Tag>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mt-6 md:mt-8 mb-8 md:mb-10 leading-[1.1] md:leading-[1.05] tracking-tighter text-white">
                  スタートアップスタジオの<br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">すべてがここに集まる</span>
                </h1>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-10 md:mb-14 leading-relaxed font-medium max-w-2xl tracking-wide">
                  業界の「今」を知るための、唯一無二の情報ハブ。
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 md:gap-6">
                  <button onClick={() => {setViewMode('startups'); window.scrollTo(0,0)}} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 border border-white/10 uppercase tracking-wider">
                    Explore Database <ArrowRight size={20} />
                  </button>
                  <button onClick={() => {setViewMode('studios'); window.scrollTo(0,0)}} className="bg-white/5 backdrop-blur-lg text-white border border-white/10 px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg hover:bg-white/10 transition-all uppercase tracking-wider">
                    Member Studios
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-10 -mt-6 sm:-mt-10 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12">
                {[
                  { label: "Studios", value: "30+", unit: "社", icon: Building2, color: "text-blue-400" },
                  { label: "Ventures", value: "150+", unit: "社", icon: Rocket, color: "text-purple-400" },
                  { label: "Funding", value: "450+", unit: "億円", icon: DollarSign, color: "text-yellow-400" },
                  { label: "Exits", value: "24", unit: "件", icon: Trophy, color: "text-red-400" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center md:items-start group">
                    <div className="flex items-center gap-2 mb-2 sm:mb-4">
                      <div className={`p-1 rounded-md bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}><stat.icon size={12} /></div>
                      <span className="text-[8px] sm:text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em]">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">{stat.value}</span>
                      <span className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-500">{stat.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative">
            {/* 1. Featured Studios */}
            <Carousel 
              titleNode={
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2">注目のスタジオ</p>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                    FEATURED<br/>
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">STUDIOS</span>
                  </h2>
                </div>
              }
              items={featuredStudios}
              onSeeAll={() => {setViewMode('studios'); window.scrollTo(0,0)}}
              renderItem={(studio) => (
                <div 
                  onClick={() => { setSelectedStudio(studio); setViewMode('studioDetail'); window.scrollTo(0,0) }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:border-blue-500/50 hover:bg-white/[0.08] transition-all cursor-pointer h-full flex flex-col group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-white text-base md:text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-500">{studio.name.charAt(0)}</div>
                    <Tag color="blue">{studio.type}</Tag>
                  </div>
                  <h3 className="font-black text-base sm:text-lg md:text-xl mb-2 md:mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-1 tracking-tight">{studio.name}</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 line-clamp-2 md:line-clamp-3">{studio.description}</p>
                  <div className="flex gap-4 md:gap-8 mt-auto pt-4 md:pt-6 border-t border-white/5">
                    <div><p className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Startups</p><p className="font-black text-white text-base md:text-lg">{studio.startupCount}</p></div>
                    <div><p className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Exits</p><p className="font-black text-emerald-400 text-base md:text-lg">{studio.exitCount}</p></div>
                  </div>
                </div>
              )}
            />

            {/* 2. Startup Archive */}
            <Carousel 
              titleNode={
                <div>
                  <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-2">スタートアップ一覧</p>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                    STARTUP<br/>
                    <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">ARCHIVE</span>
                  </h2>
                </div>
              }
              items={startups}
              onSeeAll={() => {setViewMode('startups'); window.scrollTo(0,0)}}
              renderItem={(startup) => (
                <div 
                  onClick={() => { setSelectedStartup(startup); setViewMode('startupDetail'); window.scrollTo(0,0) }}
                  className="bg-[#1a1a24] border border-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:border-purple-500/50 hover:bg-[#1e1e2d] transition-all cursor-pointer h-full flex flex-col group shadow-xl"
                >
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <Tag color="purple">{startup.industry}</Tag>
                    <Tag color="yellow">{startup.stage.split('（')[0]}</Tag>
                  </div>
                  <h3 className="font-black text-lg sm:text-xl md:text-2xl mb-2 text-white group-hover:text-purple-400 transition-colors tracking-tight">{startup.name}</h3>
                  <p className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest">from {startup.studio}</p>
                  <div className="mt-8 md:mt-10 flex items-center justify-between text-[10px] font-black uppercase text-gray-400 pt-4 md:pt-6 border-t border-white/5">
                    <span className="flex items-center gap-2 text-blue-400 font-black tracking-widest"><DollarSign size={14} className="text-blue-500" /> {startup.funding}</span>
                    <div className="p-2 bg-white/5 rounded-full group-hover:bg-purple-500/20 transition-colors"><ExternalLink size={14} /></div>
                  </div>
                </div>
              )}
            />

            {/* 3. Reports & Insights */}
            <div className="py-12 md:py-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
                <div>
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.4em] mb-2">レポート・インサイト</p>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                    REPORTS &<br/>
                    <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">INSIGHTS</span>
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {reports.map((report, idx) => (
                  <div key={idx} className="bg-white/[0.03] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-red-500/30 hover:bg-white/[0.06] transition-all cursor-pointer flex flex-col group">
                    <div className="flex justify-between items-center mb-6">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] md:text-[10px] font-black text-gray-400 border border-white/10 uppercase tracking-widest">{report.type}</span>
                      <span className="text-[8px] md:text-[10px] font-bold text-gray-500 tracking-widest uppercase">{report.date}</span>
                    </div>
                    <h3 className="font-black text-base sm:text-lg text-white mb-6 md:mb-8 flex-grow leading-snug tracking-tight">{report.title}</h3>
                    <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-white/5">
                      <span className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">{report.size}</span>
                      <div className="flex items-center gap-2 text-red-400">
                        <span className="text-[10px] font-black uppercase tracking-widest">Download</span>
                        <div className="p-2 bg-red-500/10 rounded-lg"><Download size={16} /></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {viewMode === 'studios' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-20 md:pb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10 mb-12 md:mb-20">
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2">スタジオ一覧</p>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                STUDIO<br/>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DIRECTORY</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {['すべて', '独立系', '大企業系', 'VC系', '大学系', '自治体連携'].map(t => (
                <button 
                  key={t}
                  onClick={() => setStudioTypeFilter(t)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${studioTypeFilter === t ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {filteredStudios.map(studio => (
              <div 
                key={studio.id} 
                onClick={() => { setSelectedStudio(studio); setViewMode('studioDetail'); window.scrollTo(0,0) }}
                className="group bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 hover:border-blue-500/50 hover:bg-white/[0.06] transition-all duration-500 flex flex-col cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-blue-400 text-xl md:text-2xl border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">{studio.name.charAt(0)}</div>
                  <Tag color="blue">{studio.type}</Tag>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-4 text-white group-hover:text-blue-400 transition-colors tracking-tight">{studio.name}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8 md:mb-10 line-clamp-3">{studio.description}</p>
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10 mt-auto">
                  <div className="bg-white/5 p-4 md:p-5 rounded-xl md:rounded-3xl border border-white/5 text-center">
                    <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Startups</p>
                    <p className="text-lg md:text-2xl font-black text-white">{studio.startupCount}</p>
                  </div>
                  <div className="bg-white/5 p-4 md:p-5 rounded-xl md:rounded-3xl border border-white/5 text-center">
                    <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Exits</p>
                    <p className="text-lg md:text-2xl font-black text-emerald-400">{studio.exitCount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest mt-auto">
                  <MapPin size={14} className="text-blue-500" /> {studio.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'startups' && (
        <div className="bg-[#0a0a0f] min-h-screen text-white pt-32 sm:pt-40 pb-20 md:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-12 md:mb-20">
              <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-2">スタートアップ一覧</p>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-10">
                STARTUP<br/>
                <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">ARCHIVE</span>
              </h2>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white/5 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-white/10 backdrop-blur-3xl">
                <div className="flex-1 space-y-4">
                  <p className="text-[9px] md:text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">Industry</p>
                  <div className="flex flex-wrap gap-2">
                    {['すべて', 'SaaS', 'ヘルスケア', 'Fintech', 'AI', 'その他'].map(i => (
                      <button key={i} onClick={() => setStartupIndustryFilter(i)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${startupIndustryFilter === i ? 'bg-purple-600 border-purple-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>{i}</button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-[9px] md:text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">Stage</p>
                  <div className="flex flex-wrap gap-2">
                    {['すべて', 'シード', 'シリーズA', 'シリーズB以降', 'Exit済（IPO / M&A）'].map(s => (
                      <button key={s} onClick={() => setStartupStageFilter(s)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${startupStageFilter === s ? 'bg-orange-600 border-orange-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>{s.split('（')[0]}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {filteredStartups.map(startup => (
                <div 
                  key={startup.id} 
                  onClick={() => { setSelectedStartup(startup); setViewMode('startupDetail'); window.scrollTo(0,0) }}
                  className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-[3rem] hover:bg-white/[0.08] transition-all group cursor-pointer shadow-xl"
                >
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <Tag color="purple">{startup.industry}</Tag>
                    <Tag color="yellow">{startup.stage.split('（')[0]}</Tag>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 group-hover:text-purple-400 transition-colors tracking-tight">{startup.name}</h3>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">from {startup.studio}</p>
                  <div className="space-y-4 border-t border-white/5 pt-6">
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><DollarSign size={14} className="text-yellow-400"/> Funding</span>
                      <span className="font-black text-white text-sm md:text-lg">{startup.funding}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Studio Detail View */}
      {viewMode === 'studioDetail' && selectedStudio && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-20 md:pb-32 animate-in">
          <button 
            onClick={() => {setViewMode('studios'); window.scrollTo(0,0)}} 
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-sm font-bold transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> スタジオ一覧に戻る
          </button>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center font-black text-white text-4xl md:text-5xl shadow-xl shadow-blue-500/20">
                {selectedStudio.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Tag color="blue">{selectedStudio.type}</Tag>
                  <Tag color="purple">{selectedStudio.category}</Tag>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">{selectedStudio.name}</h1>
                <p className="text-gray-400 flex items-center gap-2 text-sm md:text-base font-medium">
                  <MapPin size={18} className="text-blue-400" /> {selectedStudio.location}
                  <span className="text-gray-700 mx-2">•</span>
                  設立 {selectedStudio.founded}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Startups", value: selectedStudio.startupCount, color: "text-white" },
              { label: "Exits", value: selectedStudio.exitCount, color: "text-emerald-400" },
              { label: "Type", value: selectedStudio.type, color: "text-blue-400", isText: true },
              { label: "Founded", value: selectedStudio.founded, color: "text-purple-400", isText: true },
            ].map((box, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{box.label}</p>
                <p className={`font-black ${box.isText ? 'text-lg' : 'text-3xl'} ${box.color}`}>{box.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 mb-8">
            <h2 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div> About
            </h2>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg font-medium">{selectedStudio.fullDescription}</p>
            {selectedStudio.website !== "#" && (
              <a href={selectedStudio.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-black text-sm uppercase tracking-widest border-b border-blue-400/30 pb-1">
                Official Website <ExternalLink size={14} />
              </a>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
            <h2 className="text-xl md:text-2xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div> 輩出スタートアップ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {startups.filter(s => s.studioId === selectedStudio.id).map(startup => (
                <div 
                  key={startup.id}
                  onClick={() => { setSelectedStartup(startup); setViewMode('startupDetail'); window.scrollTo(0,0) }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 hover:bg-white/[0.08] cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Tag color="purple">{startup.industry}</Tag>
                    <Tag color="yellow">{startup.stage.split('（')[0]}</Tag>
                  </div>
                  <h3 className="font-black text-white text-lg mb-2 group-hover:text-purple-400 transition-colors tracking-tight">{startup.name}</h3>
                  <p className="text-gray-500 text-xs md:text-sm font-medium line-clamp-2">{startup.description}</p>
                </div>
              ))}
              {startups.filter(s => s.studioId === selectedStudio.id).length === 0 && (
                <p className="text-gray-500 text-sm font-medium italic">登録されているスタートアップはありません。</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Startup Detail View */}
      {viewMode === 'startupDetail' && selectedStartup && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-20 md:pb-32 animate-in">
          <button 
            onClick={() => {setViewMode('startups'); window.scrollTo(0,0)}} 
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-sm font-bold transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> スタートアップ一覧に戻る
          </button>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full"></div>
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-500 to-red-500 rounded-3xl flex items-center justify-center font-black text-white text-4xl md:text-5xl shadow-xl shadow-purple-500/20">
                {selectedStartup.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Tag color="purple">{selectedStartup.industry}</Tag>
                  <Tag color="yellow">{selectedStartup.stage}</Tag>
                  {selectedStartup.exitStatus !== '未' && <Tag color="green">{selectedStartup.exitStatus}</Tag>}
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">{selectedStartup.name}</h1>
                <p className="text-gray-400 text-sm md:text-base font-medium">
                  <span 
                    className="text-blue-400 cursor-pointer hover:underline font-black"
                    onClick={() => {
                      const studio = featuredStudios.find(s => s.id === selectedStartup.studioId);
                      if(studio) { setSelectedStudio(studio); setViewMode('studioDetail'); window.scrollTo(0,0) }
                    }}
                  >
                    {selectedStartup.studio}
                  </span> から輩出
                  <span className="text-gray-700 mx-2">•</span>
                  設立 {selectedStartup.founded}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Funding</p>
              <p className="text-2xl font-black text-blue-400">{selectedStartup.funding}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Stage</p>
              <p className="text-lg font-black text-purple-400">{selectedStartup.stage.split('（')[0]}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors col-span-2 md:col-span-1">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Exit Status</p>
              <p className={`text-lg font-black ${selectedStartup.exitStatus !== '未' ? 'text-emerald-400' : 'text-gray-600'}`}>{selectedStartup.exitStatus}</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 mb-8">
            <h2 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-3">
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div> About
            </h2>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg font-medium">{selectedStartup.fullDescription}</p>
            {selectedStartup.url !== "#" && (
              <a href={selectedStartup.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-black text-sm uppercase tracking-widest border-b border-blue-400/30 pb-1">
                Official Website <ExternalLink size={14} />
              </a>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
            <h2 className="text-xl md:text-2xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div> 出身スタジオ
            </h2>
            {(() => {
              const studio = featuredStudios.find(s => s.id === selectedStartup.studioId);
              return studio ? (
                <div 
                  onClick={() => { setSelectedStudio(studio); setViewMode('studioDetail'); window.scrollTo(0,0) }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-blue-500/50 hover:bg-white/[0.08] cursor-pointer transition-all flex items-center gap-6 group"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center font-black text-white text-2xl md:text-3xl shadow-lg">
                    {studio.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg md:text-xl mb-2 group-hover:text-blue-400 transition-colors tracking-tight">{studio.name}</h3>
                    <p className="text-gray-500 text-xs md:text-sm font-medium line-clamp-1">{studio.description}</p>
                  </div>
                  <ChevronRight size={20} className="ml-auto text-gray-700 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">スタジオ情報が見つかりません。</p>
              );
            })()}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-16 md:py-24 border-t border-white/5 bg-[#08080c] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="p-1 bg-white rounded-lg"><img src={logoUrl} alt="Logo" className="h-6 md:h-8" /></div>
                <span className="font-black text-white uppercase tracking-tighter text-base md:text-xl">Startup Studio Association</span>
              </div>
              <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm font-medium leading-relaxed tracking-wide">業界の情報を集約し、次世代の挑戦を加速させる。<br />日本最大のスタートアップスタジオ・プラットフォーム。</p>
            </div>
            <div className="flex flex-wrap gap-6 sm:gap-10 lg:gap-16 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-red-400 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="pt-8 md:pt-12 mt-12 md:mt-20 border-t border-white/5 text-center">
            <p className="text-[8px] md:text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] md:tracking-[0.5em]">© 2025 STARTUP STUDIO ASSOCIATION / ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default App;
