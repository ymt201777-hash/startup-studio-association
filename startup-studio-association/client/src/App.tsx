import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, Rocket, ExternalLink, ArrowRight, Database, FileText, Search, MapPin, Building2, Filter, TrendingUp, Trophy, DollarSign, Download, Users, BarChart3, Target, Clock, Percent, ClipboardList, Calendar, Zap, UserCheck, Mail } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('top');
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [studioTypeFilter, setStudioTypeFilter] = useState('すべて');
  const [startupIndustryFilter, setStartupIndustryFilter] = useState('すべて');
  const [startupStageFilter, setStartupStageFilter] = useState('すべて');
  const [comparisonRegion, setComparisonRegion] = useState('global');
  const [timelineRegion, setTimelineRegion] = useState('global');

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

  // 比較データ
  const comparisonDataGlobal = [
    { label: "シリーズA到達期間", studio: "25.2ヶ月", vc: "56ヶ月", diff: "55%短縮", source: "GSSN 2022" },
    { label: "Seed→Series A成功率", studio: "72%", vc: "42%", diff: "+30pt", source: "GSSN調査" },
    { label: "IRR（内部収益率）", studio: "53%", vc: "21.3%", diff: "2.5倍", source: "GSSN 2022" },
    { label: "Exit平均年数", studio: "3.85年", vc: "6.6年", diff: "33%短縮", source: "GSSN調査" },
    { label: "ユニコーン輩出率", studio: "5%", vc: "1%", diff: "5倍", source: "Idealab実績" },
    { label: "TVPI", studio: "5.8x", vc: "1.57x", diff: "3.7倍", source: "GSSN 2022" },
  ];

  const comparisonDataJapan = [
    { label: "シリーズA到達期間", studio: "24-30ヶ月", vc: "35ヶ月", diff: "約5-11ヶ月短縮", source: "INITIAL/GSSN参考" },
    { label: "シリーズA成功率", studio: "約72%", vc: "約48%", diff: "+30%", source: "みんなのスタートアップスタジオ" },
  ];

  const timelineDataGlobal = [
    { year: 2015, studios: 65, label: "黎明期" },
    { year: 2017, studios: 150, label: "" },
    { year: 2019, studios: 350, label: "GSSN設立" },
    { year: 2020, studios: 560, label: "過去最大純増" },
    { year: 2022, studios: 724, label: "" },
    { year: 2023, studios: 877, label: "" },
    { year: 2024, studios: 1107, label: "1,100社突破" }
  ];

  const timelineDataJapan = [
    { year: 2015, studios: 5, label: "黎明期" },
    { year: 2017, studios: 12, label: "書籍出版" },
    { year: 2019, studios: 22, label: "GSSN加盟" },
    { year: 2021, studios: 25, label: "協会設立" },
    { year: 2023, studios: 35, label: "東京都連携" },
    { year: 2024, studios: 45, label: "TIB STUDIO" }
  ];

  const hearingItems = [
    { category: "基本情報", items: ["スタジオ名", "設立年月", "注力領域"] },
    { category: "支援スタートアップごと", items: [
      "スタートアップ名", "設立年月", "現在のシリーズ",
      "Seed調達時期・金額", "Series A調達時期・金額", "Series B調達時期・金額",
      "Exit有無・時期・種類"
    ]},
    { category: "集計用", items: ["累計支援スタートアップ数", "うちシリーズA到達数", "うちExit数"] }
  ];

  // ★ 19スタジオのデータ（実データ）
  const featuredStudios = [
    { 
      id: 1, 
      name: "Gaiax スタートアップスタジオ", 
      location: "東京都千代田区", 
      type: "独立系",
      category: "シェアリングエコノミー、web3", 
      startupCount: 8, 
      exitCount: 5,
      description: "スタートアップスタジオ協会設立。シェアリングエコノミー・web3領域に強み。5社IPO達成。",
      founded: "2015年頃",
      fullDescription: "ガイアックスは「人と人をつなげる」をミッションに、シェアリングエコノミーやDAO、Web3領域で次世代の社会構造を作る起業家を支援しています。タイミー、Photosynth、アディッシュ、AppBank、ピクスタの5社がIPOを達成。スタートアップスタジオ協会を設立し、日本のスタジオエコシステムの発展を牽引しています。",
      website: "https://gaiax-startup-studio.com/",
      contact: "佐々木喜徳"
    },
    { 
      id: 2, 
      name: "デライト・ベンチャーズ", 
      location: "東京都渋谷区", 
      type: "VC系",
      category: "全般", 
      startupCount: 11, 
      exitCount: 0,
      description: "DeNA出資独立系VC。VC投資とベンチャービルダー事業の両輪で展開。ビルダーファンド累計30社以上。",
      founded: "2019年9月",
      fullDescription: "デライト・ベンチャーズは、DeNA創業者の南場智子氏が設立した独立系VC。投資事業とベンチャービルダー事業を両輪で展開。ファンド規模は1号100億円、2号150億円、ビルダーファンド2号15億円、3号50億円。immedio、スマート修繕、ハイヤールー等を輩出。",
      website: "https://delight-ventures.com/",
      contact: "永井"
    },
    { 
      id: 3, 
      name: "Studio ENTRE", 
      location: "東京都渋谷区", 
      type: "独立系",
      category: "エンターテインメント", 
      startupCount: 0, 
      exitCount: 0,
      description: "エンターテインメント業界特化のバーティカル型スタジオ。EIRプログラム運営。TOKYO SUTEAM採択。",
      founded: "2020年",
      fullDescription: "Studio ENTREは、エンターテインメント業界（音楽、映像、出版、ファッション）に特化したバーティカル型スタートアップスタジオです。ミクシィエンターテインメントファンドと連携し、エンタメ領域の起業家を支援しています。",
      website: "https://entre.studio/",
      contact: "中村"
    },
    { 
      id: 4, 
      name: "みらいスタジオ", 
      location: "東京都", 
      type: "大学系",
      category: "ディープテック", 
      startupCount: 0, 
      exitCount: 0,
      description: "東工大関連VC系。高専人材を強みにディープテック領域を支援。",
      founded: "2022年5月",
      fullDescription: "みらいスタジオは、東京工業大学関連VCのみらい創造機構からカーブアウトしたスタートアップスタジオです。高専キャリア研究所を子会社化し、高専生・OB/OGのエンジニアコミュニティを強みにディープテック領域の起業支援を行っています。",
      website: "https://miraistudio.co.jp/",
      contact: "兼城駿一郎"
    },
    { 
      id: 5, 
      name: "quantum", 
      location: "東京都港区", 
      type: "大企業系",
      category: "全般", 
      startupCount: 75, 
      exitCount: 0,
      description: "博報堂グループ。GSSN加盟（アジア初）。75社超との事業開発実績。",
      founded: "2016年4月",
      fullDescription: "QUANTUMは博報堂グループのスタートアップスタジオです。2019年にアジア初のGSSN（Global Startup Studio Network）加盟スタジオとなりました。75社超との事業開発実績があり、朝日インテックとのwalkey等を共同創業。年間40件のプロジェクトを稼働。",
      website: "https://quantum.ne.jp/",
      contact: "川下和彦"
    },
    { 
      id: 6, 
      name: "combo", 
      location: "東京都渋谷区", 
      type: "独立系",
      category: "全般", 
      startupCount: 0, 
      exitCount: 0,
      description: "PARTY母体。凸版印刷・Sun Asterisk等がパートナー。",
      founded: "2020年12月",
      fullDescription: "comboは、クリエイティブ集団PARTYを母体とするスタートアップスタジオです。凸版印刷、Sun Asterisk、ギークピクチュアズ、ベクトル等がパートナーとして参画。TheChainMuseum等を輩出しています。",
      website: "https://combo.jp/",
      contact: "中村洋基"
    },
    { 
      id: 7, 
      name: "ZERO1000 Ventures", 
      location: "東京都渋谷区", 
      type: "独立系",
      category: "全般", 
      startupCount: 1, 
      exitCount: 0,
      description: "Relicホールディングス運営。検証費用最大1,000万円提供。3,000社支援実績。",
      founded: "2023年1月",
      fullDescription: "ZERO1000 Venturesは、Relicホールディングスが運営するスタートアップスタジオです。「ゼロから1,000の事業を創る」をコンセプトに、検証費用最大1,000万円を提供。3,000社・15,000件以上の新規事業開発支援実績を持ちます。RUFUをカーブアウト。",
      website: "https://relic.co.jp/services/zero1000_ventures/",
      contact: "北嶋貴朗"
    },
    { 
      id: 8, 
      name: "Borderless", 
      location: "福岡県福岡市", 
      type: "独立系",
      category: "ソーシャルビジネス", 
      startupCount: 50, 
      exitCount: 0,
      description: "ソーシャルビジネス専門。世界14ヵ国で50以上の事業を展開。売上100億円。",
      founded: "2007年3月",
      fullDescription: "ボーダレス・ジャパンは、ソーシャルビジネスのみを創出するスタートアップスタジオです。貧困、環境、教育などの社会課題解決に取り組む起業家を支援し、世界14ヵ国で50以上の事業を展開。2024年度売上100億円を達成。ボーダレスアカデミー卒業生の1/3が起業。",
      website: "https://www.borderless-japan.com/",
      contact: "田口一成"
    },
    { 
      id: 9, 
      name: "NEC X", 
      location: "米国（2025年夏東京開設予定）", 
      type: "大企業系",
      category: "ディープテック", 
      startupCount: 5, 
      exitCount: 0,
      description: "NEC技術活用。Elev X! Ignite/Boostプログラム運営。20件以上の事業創出。",
      founded: "2018年7月",
      fullDescription: "NEC Xは、NECの100%子会社としてシリコンバレーで運営されるスタートアップスタジオです。NECの先端技術と特許を活用し、20件以上の事業を創出。Flyhound、QI、GPx、Verdi Expeditions、Multitude Insights等を輩出。2025年夏には東京スタジオも開設予定。",
      website: "https://jpn.nec.com/innovation/necx/index.html",
      contact: "松本眞太郎"
    },
    { 
      id: 10, 
      name: "moon creative lab", 
      location: "米国・東京", 
      type: "大企業系",
      category: "全般", 
      startupCount: 54, 
      exitCount: 0,
      description: "三井物産グループ。459件応募から54件を採用・育成。30万USドル出資。",
      founded: "2018年8月",
      fullDescription: "Moon Creative Labは、三井物産の100%子会社として運営されるベンチャースタジオです。グループ45,000人からアイデアを公募し、459件の応募から54のアイデアを採用・育成。SHE、e-dash、キャリウム等を輩出。30万USドル出資を含む支援を提供。",
      website: "https://www.mooncreativelab.com/ja",
      contact: "小野川貴"
    },
    { 
      id: 11, 
      name: "スタートアップファクトリー", 
      location: "東京都目黒区", 
      type: "独立系",
      category: "toC、コンテンツ", 
      startupCount: 17, 
      exitCount: 0,
      description: "放送作家鈴木おさむ氏GP。博報堂DYHD等がLP出資。投資先17社。",
      founded: "2024年",
      fullDescription: "スタートアップファクトリーは、放送作家・鈴木おさむ氏が32年間のエンタメ業界経験を基に立ち上げたVC/スタジオです。博報堂DYメディアパートナーズがLP出資し、toC向け・コンテンツ領域のスタートアップを支援。投資先17社。Castee等を支援。",
      website: "https://startupfactory.co.jp/",
      contact: "鈴木おさむ"
    },
    { 
      id: 12, 
      name: "Algomatic", 
      location: "東京都中央区", 
      type: "大企業系",
      category: "AI", 
      startupCount: 5, 
      exitCount: 0,
      description: "DMMから20億円投資。生成AI特化のスタートアップスタジオ。5事業同時展開。",
      founded: "2023年4月",
      fullDescription: "Algomaticは、DMM.comから20億円の投資を受けて設立された生成AI特化型スタートアップスタジオです。「AI革命で人々を幸せにする」をミッションに、シゴラクAI、にじボイス、リクルタAI、アポドリ、にじチャットの5事業を同時展開。",
      website: "https://algomatic.jp/",
      contact: "大野峻典"
    },
    { 
      id: 13, 
      name: "FoundX", 
      location: "東京都文京区", 
      type: "大学系",
      category: "全般", 
      startupCount: 0, 
      exitCount: 0,
      description: "東京大学運営。Non-equity無償プログラムを提供。9ヶ月支援。",
      founded: "2019年",
      fullDescription: "FoundXは、東京大学産学協創推進本部が運営するスタートアップ支援プログラムです。東大卒業生・研究者向けに、Non-equity（株式取得なし）で無償の9ヶ月プログラムを提供。三菱地所と連携し、最初の1億円調達までを支援しています。",
      website: "https://foundx.jp/",
      contact: "馬田隆明"
    },
    { 
      id: 14, 
      name: "ON & BOARD", 
      location: "", 
      type: "VC系",
      category: "全般", 
      startupCount: 0, 
      exitCount: 0,
      description: "DI投資部門出身。Out of BOUNDSプログラム運営。3ヶ月でMVP→資金調達。",
      founded: "2023年10月",
      fullDescription: "ON & BOARDは、DI（ドリームインキュベータ）投資部門出身メンバーが設立したVC兼スタートアップスタジオです。創業支援プログラム「Out of BOUNDS」を運営し、3ヶ月でMVP作成から資金調達を目指します。",
      website: "https://onboardvc.com/",
      contact: "下平将人"
    },
    { 
      id: 15, 
      name: "DNX Studio", 
      location: "東京都千代田区", 
      type: "VC系",
      category: "SaaS", 
      startupCount: 1, 
      exitCount: 0,
      description: "米Alloy Partners協働。B2B SaaS特化。最大5,000万円出資検討。第1期でダイリー創業。",
      founded: "2024年11月",
      fullDescription: "DNX Studioは、DNX Venturesが米国Alloy Partners（旧High Alpha Innovation）と協働で運営するB2B SaaS特化のスタートアップスタジオです。3〜6ヶ月の短期集中プログラムで、最大5,000万円の出資を検討。第1期でダイリー株式会社を創業。",
      website: "https://dnx.studio/",
      contact: "倉林陽"
    },
    { 
      id: 16, 
      name: "POLAR SHORTCUT", 
      location: "北海道", 
      type: "独立系",
      category: "地方創生", 
      startupCount: 0, 
      exitCount: 0,
      description: "北海道拠点。1件500万〜1,000万円出資。インキュベイトファンド参画。",
      founded: "2021年4月",
      fullDescription: "POLAR SHORTCUTは、北海道に特化したシードVC兼スタートアップスタジオです。「北海道のスタートアップビジネスの推進・育成を通じて、テクノロジーで地域社会をアップデートする」をミッションに、1件あたり500万〜1,000万円を出資しています。",
      website: "",
      contact: "大久保徳彦"
    },
    { 
      id: 17, 
      name: "XTech Startup Studio", 
      location: "東京都", 
      type: "独立系",
      category: "全般", 
      startupCount: 0, 
      exitCount: 0,
      description: "既存産業×テクノロジー。約50億円ファンド運営。M&A BASE、Radiotalk等輩出。",
      founded: "2018年1月",
      fullDescription: "XTech Startup Studioは、新規事業成功経験者が集結したスタートアップスタジオです。既存産業×テクノロジー（AI、IoT、ブロックチェーン、5G）で多発的にスタートアップを創出。M&A BASE、Radiotalk、クロスマート、イークラウド等を輩出。約50億円ファンド運営。",
      website: "https://xtech-corp.co.jp/",
      contact: "西條晋一"
    },
    { 
      id: 18, 
      name: "BLUEPRINT", 
      location: "東京都港区", 
      type: "独立系",
      category: "SaaS", 
      startupCount: 3, 
      exitCount: 0,
      description: "Vertical SaaS特化。2022年11月17.8億円調達。Fact Base ARR数十億円規模。",
      founded: "2022年2月",
      fullDescription: "BLUEPRINT Foundersは、「起業を標準化させる」をミッションにDX・バーティカルSaaSに特化したスタートアップスタジオです。2022年に17.8億円を調達。Archi Village、Fact Base、Transleadを輩出。Fact BaseはARR数十億円規模に成長。",
      website: "https://blueprint-holdings.net/",
      contact: "石井大智"
    },
    { 
      id: 19, 
      name: "Mistletoe", 
      location: "東京都千代田区", 
      type: "独立系",
      category: "全般", 
      startupCount: 170, 
      exitCount: 0,
      description: "孫泰蔵氏設立。世界15ヶ国170以上のスタートアップを支援。2023年The Edgeofへ。",
      founded: "2013年",
      fullDescription: "Mistletoeは、孫泰蔵氏が設立したコレクティブ・インパクト・コミュニティです。食糧、少子高齢化、ロジスティクスなどの社会課題解決をテーマに、世界15ヶ国、170以上のスタートアップを支援。インスタリム等を輩出。2023年にThe Edgeofとして再編。",
      website: "https://mistletoe.co/",
      contact: "孫泰蔵"
    }
  ];

  // ★ スタートアップデータ（実データ - 41社）
  const startups = [
    // Gaiax（8社）
    { 
      id: 1, 
      name: "タイミー", 
      studio: "Gaiax", 
      studioId: 1,
      industry: "HR Tech", 
      stage: "IPO済", 
      funding: "23億円+", 
      seedAmount: null,
      seriesAAmount: 3,
      seriesBAmount: 20,
      exitStatus: "IPO（2024年7月）", 
      exitValue: 1000,
      url: "https://timee.co.jp/",
      founded: "2017年8月",
      description: "スキマバイトマッチングサービス。ワーカー数1,000万人突破。",
      fullDescription: "タイミーは、スキマ時間で働けるバイトマッチングサービスを提供するスタートアップです。2024年7月に東証グロースに上場。IPO時時価総額は1,000億円超のユニコーン企業。"
    },
    { 
      id: 2, 
      name: "Photosynth", 
      studio: "Gaiax", 
      studioId: 1,
      industry: "IoT", 
      stage: "IPO済", 
      funding: "約70億円", 
      seedAmount: 4.5,
      seriesAAmount: 6.04,
      seriesBAmount: 35,
      exitStatus: "IPO（2021年11月）", 
      exitValue: 228.5,
      url: "https://photosynth.co.jp/",
      founded: "2014年9月",
      description: "IoTスマートロック「Akerun」を開発・提供。",
      fullDescription: "Photosynthは、IoTスマートロック「Akerun」を開発・提供するスタートアップです。2021年に東証マザーズに上場。累計調達約70億円。"
    },
    { 
      id: 3, 
      name: "TRUSTDOCK", 
      studio: "Gaiax", 
      studioId: 1,
      industry: "SaaS", 
      stage: "シリーズB", 
      funding: "28億円+", 
      seriesAAmount: 13,
      seriesBAmount: 15,
      exitStatus: "未", 
      url: "https://trustdock.io/",
      founded: "2017年11月",
      description: "eKYC・本人確認SaaSを提供。累計調達28億円+。",
      fullDescription: "TRUSTDOCKは、オンラインでの本人確認（eKYC）サービスを提供するスタートアップです。金融機関やシェアリングエコノミー事業者向けに展開。累計調達28億円以上。"
    },
    { 
      id: 4, 
      name: "アディッシュ", 
      studio: "Gaiax（カーブアウト）", 
      studioId: 1,
      industry: "SaaS", 
      stage: "IPO済", 
      funding: "1.55億円", 
      seriesAAmount: 1.55,
      exitStatus: "IPO（2020年3月）", 
      exitValue: 18.3,
      url: "https://www.adish.co.jp/",
      founded: "2014年10月",
      description: "SNSモニタリング・カスタマーサクセスサービスを提供。",
      fullDescription: "アディッシュは、SNSモニタリングやカスタマーサクセスサービスを提供するスタートアップです。2020年に東証マザーズに上場。Gaiaxからのカーブアウト企業。"
    },
    { 
      id: 5, 
      name: "AppBank", 
      studio: "Gaiax（卒業生創業）", 
      studioId: 1,
      industry: "メディア", 
      stage: "IPO済", 
      funding: "-", 
      exitStatus: "IPO（2015年10月）", 
      url: "#",
      founded: "2011年3月",
      description: "ゲームメディア運営。Gaiax卒業生が創業。",
      fullDescription: "AppBankは、ゲームメディアを運営するスタートアップです。2015年に上場。Gaiax卒業生が創業した企業。"
    },
    { 
      id: 6, 
      name: "ピクスタ", 
      studio: "Gaiax（卒業生創業）", 
      studioId: 1,
      industry: "メディア", 
      stage: "IPO済", 
      funding: "-", 
      exitStatus: "IPO（2015年9月）", 
      url: "https://pixta.jp/",
      founded: "2005年8月",
      description: "ストックフォトサービス「PIXTA」を運営。",
      fullDescription: "ピクスタは、ストックフォトサービス「PIXTA」を運営するスタートアップです。2015年に上場。Gaiax卒業生が創業した企業。"
    },
    { 
      id: 7, 
      name: "Techpit", 
      studio: "Gaiax", 
      studioId: 1,
      industry: "EdTech", 
      stage: "シリーズA", 
      funding: "0.3億円+", 
      seedAmount: 0.3,
      exitStatus: "未", 
      url: "https://techpit.jp/",
      founded: "2018年",
      description: "プログラミング学習教材プラットフォーム。",
      fullDescription: "Techpitは、プログラミング学習教材のプラットフォームを提供するスタートアップです。Seed 3,000万円調達。"
    },
    { 
      id: 8, 
      name: "シェアグリ", 
      studio: "Gaiax", 
      studioId: 1,
      industry: "シェアリング", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "2018年",
      description: "農業人材マッチングサービス。",
      fullDescription: "シェアグリは、農業人材マッチングサービスを提供するスタートアップです。シェアリングエコノミー領域で展開。"
    },
    
    // デライト・ベンチャーズ（11社）
    { 
      id: 9, 
      name: "immedio", 
      studio: "デライト・ベンチャーズ", 
      studioId: 2,
      industry: "SaaS", 
      stage: "Series A", 
      funding: "3.5億円", 
      seriesAAmount: 3.5,
      exitStatus: "未", 
      url: "#",
      founded: "2022年4月",
      description: "商談獲得自動化サービス。導入60社以上。",
      fullDescription: "immedioは、BtoBマーケティングの商談獲得を自動化するSaaSを提供。創業者は浜田英揮氏（元三井物産→bitFlyer→Sansan）。DNX Ventures、DEEPCORE、Sansan等から3.5億円調達。導入60社以上（Sansan、マネーフォワード、freee等）。"
    },
    { 
      id: 10, 
      name: "zooba", 
      studio: "デライト・ベンチャーズ", 
      studioId: 2,
      industry: "SaaS", 
      stage: "Seed", 
      funding: "1億円+", 
      seedAmount: 1,
      exitStatus: "未", 
      url: "#",
      founded: "2022年",
      description: "SaaS管理サービス・AIヘルプデスク。",
      fullDescription: "zoobaは、SaaSアカウント自動管理と社内問合せ窓口一元化を提供。創業者は名和彩音氏（元マイクロソフト→DeNA情シス）。Seed 1億円（デライト、ゼロイチキャピタル）、2025年1月HearstLabから追加調達。"
    },
    { 
      id: 11, 
      name: "スマート修繕", 
      studio: "デライト・ベンチャーズ", 
      studioId: 2,
      industry: "不動産Tech", 
      stage: "Seed", 
      funding: "1.5億円", 
      seedAmount: 1.5,
      exitStatus: "未", 
      url: "#",
      founded: "2022年1月",
      description: "マンション大規模修繕一括見積支援。B Dash Camp準優勝。",
      fullDescription: "スマート修繕は、マンション・ビル大規模修繕工事の一括見積支援サービス。創業者は豊田賢治郎氏（元旭化成→DeNA）。Seed 1.5億円調達。2024年12月単月問合せ総額数十億円。経団連入会（2025年3月）。B Dash Camp準優勝。"
    },
    { 
      id: 12, 
      name: "ハイヤールー（HireRoo）", 
      studio: "デライト・ベンチャーズ", 
      studioId: 2,
      industry: "HR Tech", 
      stage: "Series A", 
      funding: "5.3億円+", 
      seedAmount: 0.36,
      seriesAAmount: 3.13,
      exitStatus: "未", 
      url: "#",
      founded: "2020年12月",
      description: "エンジニア採用コーディング試験サービス。導入150社以上。",
      fullDescription: "HireRooは、エンジニア採用のコーディング試験サービス。創業者は葛岡宏祐氏（元DeNA AI→メルカリ）。累計5.3億円超調達。導入150社以上、累計選考数4万件超。GAFAの採用プロセスを低コストで導入可能。"
    },
    { 
      id: 13, 
      name: "ミライのゲンバ", 
      studio: "デライト・ベンチャーズ", 
      studioId: 2,
      industry: "製造業DX", 
      stage: "Seed", 
      funding: "1.74億円", 
      seedAmount: 1.74,
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "製造現場特化AI電子帳票システム「ミライのゲンバ帳票」。",
      fullDescription: "ミライのゲンバは、製造現場特化のAI電子帳票システムを提供。創業者は佐藤哲太氏。Seed 1.74億円（DNX Ventures、ANRI、ユナイテッド、三菱UFJキャピタル等）。PDFから自動で電子帳票作成、手書き文字自動テキスト化。"
    },
    { 
      id: 14, 
      name: "ソラメド", 
      studio: "デライト・ベンチャーズ", 
      studioId: 2,
      industry: "ヘルスケア", 
      stage: "Seed", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "急性期病院向け手術予定管理AI SaaS「オペプロ」。",
      fullDescription: "ソラメドは、急性期病院向け手術予定管理AI SaaS「オペプロ」を提供。手術室稼働率向上、手術予定フォーマット共通化・共有化、空き枠発見・再割当支援。実証実験で手術室稼働率改善効果を実現。"
    },
    { 
      id: 15, 
      name: "アメグミ", 
      studio: "デライト・ベンチャーズ", 
      studioId: 2,
      industry: "ハードウェア", 
      stage: "シリーズA", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "途上国向け格安スマホ。",
      fullDescription: "アメグミは、途上国向けの格安スマートフォンを提供するスタートアップです。"
    },
    { 
      id: 16, 
      name: "Nature", 
      studio: "デライト・ベンチャーズ", 
      studioId: 2,
      industry: "IoT", 
      stage: "シリーズB", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "2014年12月",
      description: "スマートリモコン「Nature Remo」を提供。",
      fullDescription: "Natureは、スマートリモコン「Nature Remo」を提供するIoTスタートアップです。"
    },
    { 
      id: 17, 
      name: "リーバー", 
      studio: "デライト・ベンチャーズ", 
      studioId: 2,
      industry: "ヘルスケア", 
      stage: "シリーズA", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "医師相談アプリを提供。",
      fullDescription: "リーバーは、医師相談アプリを提供するヘルスケアスタートアップです。"
    },
    { 
      id: 18, 
      name: "Sotas", 
      studio: "デライト・ベンチャーズ", 
      studioId: 2,
      industry: "化学", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "化学産業データベースを提供。",
      fullDescription: "Sotasは、化学産業向けのデータベースサービスを提供するスタートアップです。"
    },
    { 
      id: 19, 
      name: "woodstock.club", 
      studio: "デライト・ベンチャーズ", 
      studioId: 2,
      industry: "FinTech", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "Z世代向けSNS型投資アプリ。",
      fullDescription: "woodstock.clubは、Z世代向けのSNS型投資アプリを提供するFinTechスタートアップです。"
    },
    
    // NEC X（5社）
    { 
      id: 20, 
      name: "Flyhound", 
      studio: "NEC X", 
      studioId: 9,
      industry: "ドローン", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "ドローン遭難者捜索サービス。",
      fullDescription: "Flyhoundは、ドローンを活用した遭難者捜索サービスを提供。NEC Xから輩出。"
    },
    { 
      id: 21, 
      name: "QI（Qualitative Intelligence）", 
      studio: "NEC X", 
      studioId: 9,
      industry: "AI", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "AI×マーケティングサービス。",
      fullDescription: "QIは、AIを活用したマーケティングサービスを提供。NEC Xから輩出。"
    },
    { 
      id: 22, 
      name: "GPx", 
      studio: "NEC X", 
      studioId: 9,
      industry: "ヘルスケア", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "ウェアラブル遠隔モニタリング。",
      fullDescription: "GPxは、ウェアラブルデバイスを活用した遠隔モニタリングサービスを提供。NEC Xから輩出。"
    },
    { 
      id: 23, 
      name: "Verdi Expeditions", 
      studio: "NEC X", 
      studioId: 9,
      industry: "AgriTech", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "農業自動化ソリューション。",
      fullDescription: "Verdi Expeditionsは、農業自動化ソリューションを提供。NEC Xから輩出。"
    },
    { 
      id: 24, 
      name: "Multitude Insights", 
      studio: "NEC X", 
      studioId: 9,
      industry: "AI", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "AIパブリックセーフティ。",
      fullDescription: "Multitude Insightsは、AIを活用したパブリックセーフティソリューションを提供。NEC Xから輩出。"
    },
    
    // Algomatic（5社）
    { 
      id: 25, 
      name: "アポドリ", 
      studio: "Algomatic", 
      studioId: 12,
      industry: "AI", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "2023年",
      description: "営業AIエージェント。ARR1.1億円。",
      fullDescription: "アポドリは、営業活動を支援するAIエージェントを提供。ARR1.1億円を達成。Algomaticから輩出。"
    },
    { 
      id: 26, 
      name: "リクルタAI", 
      studio: "Algomatic", 
      studioId: 12,
      industry: "AI", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "2023年",
      description: "採用AIエージェント。",
      fullDescription: "リクルタAIは、採用活動を支援するAIエージェントを提供。Algomaticから輩出。"
    },
    { 
      id: 27, 
      name: "にじボイス", 
      studio: "Algomatic", 
      studioId: 12,
      industry: "AI", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "2023年",
      description: "音声生成AI。",
      fullDescription: "にじボイスは、音声生成AIサービスを提供。Algomaticから輩出。"
    },
    { 
      id: 28, 
      name: "にじチャット", 
      studio: "Algomatic", 
      studioId: 12,
      industry: "AI", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "2023年",
      description: "音声対話アプリ。",
      fullDescription: "にじチャットは、音声対話アプリを提供。Algomaticから輩出。"
    },
    { 
      id: 29, 
      name: "シゴラクAI", 
      studio: "Algomatic", 
      studioId: 12,
      industry: "AI", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "2023年",
      description: "ビジネス向けChatGPT。DMM20億出資。",
      fullDescription: "シゴラクAIは、ビジネス向けChatGPTサービスを提供。DMMから20億円出資を受けるAlgomaticから輩出。"
    },
    
    // Moon Creative Lab（3社）
    { 
      id: 30, 
      name: "SHE", 
      studio: "Moon Creative Lab", 
      studioId: 10,
      industry: "EdTech", 
      stage: "シリーズB", 
      funding: "12億円", 
      seriesBAmount: 12,
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "女性キャリアスクール「SHElikes」運営。",
      fullDescription: "SHEは、女性向けキャリアスクール「SHElikes」を運営。2025年2月に12億円のシリーズB調達。Moon Creative Labから出資。"
    },
    { 
      id: 31, 
      name: "e-dash", 
      studio: "Moon Creative Lab", 
      studioId: 10,
      industry: "GreenTech", 
      stage: "不明", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "GHG排出可視化サービス。三井物産連携。",
      fullDescription: "e-dashは、温室効果ガス（GHG）排出量の可視化サービスを提供。三井物産と連携。Moon Creative Labから輩出。"
    },
    { 
      id: 32, 
      name: "キャリウム", 
      studio: "Moon Creative Lab", 
      studioId: 10,
      industry: "HR Tech", 
      stage: "不明", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "キャリア戦略支援ツール。",
      fullDescription: "キャリウムは、キャリア戦略支援ツールを提供。Moon Creative Labから輩出。"
    },
    
    // BLUEPRINT（3社）
    { 
      id: 33, 
      name: "Archi Village", 
      studio: "BLUEPRINT", 
      studioId: 18,
      industry: "建設Tech", 
      stage: "シリーズA", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "2022年",
      description: "建材業界SaaS。",
      fullDescription: "Archi Villageは、建材業界向けSaaSを提供。BLUEPRINT Foundersから輩出。"
    },
    { 
      id: 34, 
      name: "Fact Base", 
      studio: "BLUEPRINT", 
      studioId: 18,
      industry: "製造業DX", 
      stage: "シリーズB", 
      funding: "14.5億円", 
      seriesBAmount: 14.5,
      exitStatus: "未", 
      url: "#",
      founded: "2022年",
      description: "町工場SaaS。ARR数十億円規模。",
      fullDescription: "Fact Baseは、町工場向けSaaSを提供。2024年に14.5億円のシリーズB調達。ARR数十億円規模に成長。BLUEPRINT Foundersから輩出。"
    },
    { 
      id: 35, 
      name: "Translead", 
      studio: "BLUEPRINT", 
      studioId: 18,
      industry: "SaaS", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "Vertical SaaS。",
      fullDescription: "Transleadは、Vertical SaaSを提供。BLUEPRINT Foundersから輩出。"
    },
    
    // その他スタジオ
    { 
      id: 36, 
      name: "walkey", 
      studio: "quantum", 
      studioId: 5,
      industry: "ヘルスケア", 
      stage: "不明", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "歩行支援デバイス。朝日インテック共同。",
      fullDescription: "walkeyは、歩行支援デバイスを提供。朝日インテックとquantumの共同創業。"
    },
    { 
      id: 37, 
      name: "ビジネスレザーファクトリー", 
      studio: "Borderless", 
      studioId: 8,
      industry: "ソーシャル", 
      stage: "不明", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "バングラデシュ貧困支援。",
      fullDescription: "ビジネスレザーファクトリーは、バングラデシュの貧困支援を目的としたソーシャルビジネス。ボーダレス・ジャパンから輩出。"
    },
    { 
      id: 38, 
      name: "Castee", 
      studio: "スタートアップファクトリー", 
      studioId: 11,
      industry: "エンタメ", 
      stage: "シリーズA", 
      funding: "7億円+", 
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "ソーシャルコラボサービス。累計7億円+調達。",
      fullDescription: "Casteeは、ソーシャルコラボサービスを提供。累計7億円以上調達。スタートアップファクトリーから支援。"
    },
    { 
      id: 39, 
      name: "インスタリム", 
      studio: "Mistletoe", 
      studioId: 19,
      industry: "ヘルスケア", 
      stage: "シリーズA", 
      funding: "2.4億円", 
      seriesAAmount: 2.4,
      exitStatus: "未", 
      url: "#",
      founded: "-",
      description: "3Dプリント義足。",
      fullDescription: "インスタリムは、3Dプリント技術を活用した義足を提供。2020年にシリーズA 2.4億円調達。Mistletoeから輩出。"
    },
    { 
      id: 40, 
      name: "RUFU", 
      studio: "ZERO1000 Ventures", 
      studioId: 7,
      industry: "マーケティング", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "2023年1月",
      description: "プロダクト伝播サービス。Relicカーブアウト。",
      fullDescription: "RUFUは、プロダクト伝播サービスを提供。Relicからのカーブアウト企業。ZERO1000 Venturesから輩出。"
    },
    { 
      id: 41, 
      name: "ダイリー", 
      studio: "DNX Studio", 
      studioId: 15,
      industry: "SaaS", 
      stage: "シード", 
      funding: "-", 
      exitStatus: "未", 
      url: "#",
      founded: "2024年",
      description: "DNX Studio第1期創業企業。",
      fullDescription: "ダイリーは、DNX Studio第1期で創業されたB2B SaaSスタートアップです。"
    }
  ];

  // ★ 実データから計算した集計値
  const totalStudios = featuredStudios.length; // 19
  const totalStartups = startups.length; // 41
  const totalExits = startups.filter(s => s.exitStatus && s.exitStatus.includes('IPO')).length; // 5
  const totalFunding = startups.reduce((sum, s) => sum + (s.seedAmount || 0) + (s.seriesAAmount || 0) + (s.seriesBAmount || 0), 0); // 約138.5億円
  const totalExitValue = startups.reduce((sum, s) => sum + (s.exitValue || 0), 0); // 約1,246.8億円

  const reports = [
    { title: "スタートアップスタジオ市場 包括的データ集 2024", date: "2024.12", type: "データ集", size: "Excel/PDF" },
    { title: "グローバル vs 日本 比較レポート", date: "2024.12", type: "比較分析", size: "PDF" },
    { title: "スタジオ発スタートアップ 成功率分析", date: "2024.11", type: "分析レポート", size: "PDF" },
  ];

  const eventParticipants = [
    { type: "シーズ側", description: "アイデアを持つ個人（事業会社社員、起業志望者など）" },
    { type: "支援側", description: "VC、スタートアップスタジオ、エンジェル投資家など" }
  ];

  const eventFormat = [
    { label: "形式", value: "オンライン（Zoom）" },
    { label: "1ミーティング", value: "20〜30分" },
    { label: "1人あたり", value: "5〜6枠程度" }
  ];

  const filteredStudios = featuredStudios.filter(s => studioTypeFilter === 'すべて' || s.type === studioTypeFilter);
  const filteredStartups = startups.filter(s => 
    (startupIndustryFilter === 'すべて' || s.industry === startupIndustryFilter) &&
    (startupStageFilter === 'すべて' || s.stage.includes(startupStageFilter))
  );

  const currentComparison = comparisonRegion === 'global' ? comparisonDataGlobal : comparisonDataJapan;
  const currentTimeline = timelineRegion === 'global' ? timelineDataGlobal : timelineDataJapan;
  const maxStudios = Math.max(...currentTimeline.map(d => d.studios));

  // 業種一覧を取得
  const industries = [...new Set(startups.map(s => s.industry))];

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
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || viewMode !== 'top' ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 py-3 md:py-4' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => {setViewMode('top'); window.scrollTo(0,0)}}>
            <div className="p-1 bg-white rounded-lg group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-white/10">
              <img src={logoUrl} alt="Logo" className="h-6 sm:h-8 md:h-10 w-auto object-contain" />
            </div>
            <span className="hidden sm:block font-black text-sm md:text-lg lg:text-xl tracking-tighter text-white uppercase group-hover:text-blue-400 transition-colors">Startup Studio Association</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
            <button onClick={() => {setViewMode('comparison'); window.scrollTo(0,0)}} className={`text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'comparison' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Data</button>
            <button onClick={() => {setViewMode('startups'); window.scrollTo(0,0)}} className={`text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'startups' || viewMode === 'startupDetail' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Startups</button>
            <button onClick={() => {setViewMode('studios'); window.scrollTo(0,0)}} className={`text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'studios' || viewMode === 'studioDetail' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Studios</button>
            <button onClick={() => {setViewMode('event'); window.scrollTo(0,0)}} className={`text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'event' ? 'text-orange-400' : 'text-gray-400 hover:text-white'}`}>Event</button>
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
            <button onClick={() => {setViewMode('comparison'); setIsMobileMenuOpen(false); window.scrollTo(0,0)}} className="text-xs font-black uppercase tracking-widest text-left text-gray-400 border-b border-white/5 pb-2">Data</button>
            <button onClick={() => {setViewMode('startups'); setIsMobileMenuOpen(false); window.scrollTo(0,0)}} className="text-xs font-black uppercase tracking-widest text-left text-gray-400 border-b border-white/5 pb-2">Startups</button>
            <button onClick={() => {setViewMode('studios'); setIsMobileMenuOpen(false); window.scrollTo(0,0)}} className="text-xs font-black uppercase tracking-widest text-left text-gray-400 border-b border-white/5 pb-2">Studios</button>
            <button onClick={() => {setViewMode('event'); setIsMobileMenuOpen(false); window.scrollTo(0,0)}} className="text-xs font-black uppercase tracking-widest text-left text-orange-400 border-b border-white/5 pb-2">Event</button>
            <button onClick={() => {setViewMode('startups'); setIsMobileMenuOpen(false); window.scrollTo(0,0)}} className="bg-blue-600 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest text-center">Find Ventures</button>
          </div>
        )}
      </nav>

      {viewMode === 'top' && (
        <>
          {/* Hero Section - 実データベース */}
          <section className="relative pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-12 md:pb-16 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] md:h-[600px] bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
              <div className="text-center mb-2 md:mb-3">
                <Tag color="green">REAL DATA FROM {totalStudios} STUDIOS</Tag>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-2 md:mb-3 leading-tight tracking-tighter text-white">
                スタートアップスタジオの<br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                  圧倒的スピード
                </span>
              </h1>
              
              <p className="text-gray-400 text-center text-xs sm:text-sm md:text-base mb-6 md:mb-8 max-w-xl mx-auto">
                データが証明する、スタジオモデルの優位性
              </p>

              {/* 8項目マトリクス - 実データ */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="bg-[#12121a] border border-blue-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-blue-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">{totalStudios}</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-blue-400">社</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">掲載スタジオ数</p>
                </div>

                <div className="bg-[#12121a] border border-blue-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-blue-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">{totalStartups}</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-blue-400">社</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">輩出スタートアップ</p>
                </div>

                <div className="bg-[#12121a] border border-blue-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-blue-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">{totalExits}</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-blue-400">社</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">IPO達成</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="bg-[#12121a] border border-green-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-green-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">9.4</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-green-400">億円</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">Seed調達総額</p>
                </div>

                <div className="bg-[#12121a] border border-green-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-green-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">32.6</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-green-400">億円</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">Series A調達総額</p>
                </div>

                <div className="bg-[#12121a] border border-green-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-green-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">96.5</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-green-400">億円</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">Series B調達総額</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-md mx-auto mb-8 md:mb-10">
                <div className="bg-[#12121a] border border-purple-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-purple-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">138</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-purple-400">億円</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">調達総額</p>
                </div>

                <div className="bg-[#12121a] border border-purple-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-purple-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">1,247</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-purple-400">億円</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">Exit時価総額</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <button onClick={() => {setViewMode('comparison'); window.scrollTo(0,0)}} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-base hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 border border-white/10 uppercase tracking-wider">
                  View Data <BarChart3 size={18} />
                </button>
                <button onClick={() => {setViewMode('studios'); window.scrollTo(0,0)}} className="bg-white/5 backdrop-blur-lg text-white border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-base hover:bg-white/10 transition-all uppercase tracking-wider">
                  {totalStudios} Studios
                </button>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative">
            {/* Event Banner */}
            <div className="mb-12 md:mb-20">
              <div 
                onClick={() => {setViewMode('event'); window.scrollTo(0,0)}}
                className="bg-gradient-to-r from-orange-500/20 via-red-500/20 to-purple-500/20 border border-orange-500/30 rounded-2xl md:rounded-3xl p-6 md:p-10 cursor-pointer hover:border-orange-400/50 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Tag color="orange">NEW EVENT</Tag>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Coming Soon</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">
                      シーズマッチングイベント
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">
                      アイデアを持つ個人と、投資・伴走したいVC/スタジオをマッチング
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-orange-400 uppercase tracking-widest">詳細を見る</span>
                    <div className="p-3 rounded-full bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                      <ArrowRight size={20} className="text-orange-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Comparison Preview */}
            <div className="py-12 md:py-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
                <div>
                  <p className="text-[10px] font-black text-green-400 uppercase tracking-[0.4em] mb-2">スタジオ vs VC</p>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                    COMPARISON<br/>
                    <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">DATA</span>
                  </h2>
                </div>
                <button onClick={() => {setViewMode('comparison'); window.scrollTo(0,0)}} className="text-[10px] md:text-xs font-black text-gray-400 hover:text-white flex items-center gap-1 group transition-all tracking-widest uppercase">
                  VIEW ALL DATA <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { label: "シリーズA到達", studio: "25.2ヶ月", vc: "56ヶ月", diff: "55%短縮", icon: Clock },
                  { label: "成功率", studio: "72%", vc: "42%", diff: "+30pt", icon: Target },
                  { label: "IRR", studio: "53%", vc: "21.3%", diff: "2.5倍", icon: TrendingUp },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-white/[0.08] transition-all group">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-green-500/10 text-green-400">
                        <item.icon size={20} />
                      </div>
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-gray-500 mb-1">STUDIO</p>
                        <p className="text-2xl md:text-3xl font-black text-blue-400">{item.studio}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-500 mb-1">VC</p>
                        <p className="text-lg md:text-xl font-bold text-gray-500">{item.vc}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-black">{item.diff}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Studios Carousel */}
            <Carousel 
              titleNode={
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2">掲載スタジオ</p>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                    {totalStudios}<br/>
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">STUDIOS</span>
                  </h2>
                </div>
              }
              items={featuredStudios.slice(0, 10)}
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
                    <div><p className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Startups</p><p className="font-black text-white text-base md:text-lg">{studio.startupCount || '-'}</p></div>
                    <div><p className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Exits</p><p className="font-black text-emerald-400 text-base md:text-lg">{studio.exitCount || '-'}</p></div>
                  </div>
                </div>
              )}
            />

            {/* Startup Archive Carousel */}
            <Carousel 
              titleNode={
                <div>
                  <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-2">輩出スタートアップ</p>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                    {totalStartups}<br/>
                    <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">STARTUPS</span>
                  </h2>
                </div>
              }
              items={startups.filter(s => s.exitStatus && s.exitStatus.includes('IPO')).concat(startups.filter(s => !s.exitStatus || !s.exitStatus.includes('IPO'))).slice(0, 15)}
              onSeeAll={() => {setViewMode('startups'); window.scrollTo(0,0)}}
              renderItem={(startup) => (
                <div 
                  onClick={() => { setSelectedStartup(startup); setViewMode('startupDetail'); window.scrollTo(0,0) }}
                  className="bg-[#1a1a24] border border-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:border-purple-500/50 hover:bg-[#1e1e2d] transition-all cursor-pointer h-full flex flex-col group shadow-xl"
                >
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <Tag color="purple">{startup.industry}</Tag>
                    <Tag color={startup.exitStatus && startup.exitStatus.includes('IPO') ? 'green' : 'yellow'}>{startup.stage.split('（')[0]}</Tag>
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

            {/* Reports */}
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

      {/* Event Page */}
      {viewMode === 'event' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-20 md:pb-32">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Tag color="orange">MATCHING EVENT</Tag>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4">
              シーズ<br/>
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 bg-clip-text text-transparent">マッチングイベント</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              〜 アイデアと支援者をつなぐ 〜
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-8 md:p-12 mb-8">
            <h2 className="text-xl md:text-2xl font-black text-white mb-6 flex items-center gap-3">
              <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
              イベント概要
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              アイデア/シーズを持つ個人と、投資・事業伴走したいVC/スタートアップスタジオをマッチングするオンラインイベント。
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-8 md:p-12 mb-8">
            <h2 className="text-xl md:text-2xl font-black text-white mb-8 flex items-center gap-3">
              <div className="w-1 h-6 bg-green-500 rounded-full"></div>
              参加者
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {eventParticipants.map((p, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${idx === 0 ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                      <UserCheck size={20} className={idx === 0 ? 'text-blue-400' : 'text-green-400'} />
                    </div>
                    <h3 className="font-black text-white text-lg">{p.type}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-8 md:p-12 mb-8">
            <h2 className="text-xl md:text-2xl font-black text-white mb-8 flex items-center gap-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              開催形式
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {eventFormat.map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{item.label}</p>
                  <p className="text-xl md:text-2xl font-black text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-purple-500/20 border border-orange-500/30 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center">
            <p className="text-xl md:text-2xl font-bold text-white mb-8">
              アイデアをお持ちの方も、支援したい方も。
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:-translate-y-1 transition-all inline-flex items-center gap-2">
              <ArrowRight size={18} /> エントリーはこちらから
            </button>
          </div>
        </div>
      )}

      {/* Comparison / Data View */}
      {viewMode === 'comparison' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-20 md:pb-32">
          <div className="mb-12 md:mb-20">
            <p className="text-[10px] font-black text-green-400 uppercase tracking-[0.4em] mb-2">データで見る</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
              COMPARISON<br/>
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">DATA</span>
            </h2>
          </div>

          {/* 実績サマリー */}
          <div className="mb-16 md:mb-24">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-8">日本スタジオ実績サマリー</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl md:text-4xl font-black text-blue-400">{totalStudios}</p>
                <p className="text-xs text-gray-400 mt-2">掲載スタジオ</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl md:text-4xl font-black text-purple-400">{totalStartups}</p>
                <p className="text-xs text-gray-400 mt-2">輩出スタートアップ</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl md:text-4xl font-black text-green-400">{totalExits}</p>
                <p className="text-xs text-gray-400 mt-2">IPO達成</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl md:text-4xl font-black text-yellow-400">1,247億</p>
                <p className="text-xs text-gray-400 mt-2">Exit時価総額</p>
              </div>
            </div>
          </div>

          <div className="mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">スタジオ vs VC 比較</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setComparisonRegion('global')}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${comparisonRegion === 'global' ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  Global
                </button>
                <button 
                  onClick={() => setComparisonRegion('japan')}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${comparisonRegion === 'japan' ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  Japan
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <div>指標</div>
                <div className="text-center">スタジオ発</div>
                <div className="text-center">従来型VC</div>
                <div className="text-center">差分</div>
                <div className="text-right">出典</div>
              </div>
              
              {currentComparison.map((item, idx) => (
                <div key={idx} className="grid md:grid-cols-5 gap-2 md:gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors">
                  <div className="font-bold text-white text-sm md:text-base mb-2 md:mb-0">{item.label}</div>
                  <div className="text-center">
                    <span className="text-blue-400 font-black text-lg md:text-xl">{item.studio}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-400 font-medium">{item.vc}</span>
                  </div>
                  <div className="text-center">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-black">{item.diff}</span>
                  </div>
                  <div className="text-right text-[10px] text-gray-500 font-medium">{item.source}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">スタジオ数の推移（2015-2024）</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setTimelineRegion('global')}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${timelineRegion === 'global' ? 'bg-purple-600 border-purple-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  Global
                </button>
                <button 
                  onClick={() => setTimelineRegion('japan')}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${timelineRegion === 'japan' ? 'bg-purple-600 border-purple-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  Japan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl md:text-4xl font-black text-purple-400">
                  {timelineRegion === 'global' ? '625%' : '約10倍'}
                </p>
                <p className="text-xs text-gray-400 mt-2">{timelineRegion === 'global' ? '7年間の成長率' : '10年間の成長'}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl md:text-4xl font-black text-blue-400">
                  {timelineRegion === 'global' ? '1,107' : '45'}社
                </p>
                <p className="text-xs text-gray-400 mt-2">2024年時点</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl md:text-4xl font-black text-green-400">
                  +{timelineRegion === 'global' ? '230' : '10'}社
                </p>
                <p className="text-xs text-gray-400 mt-2">2024年の純増</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">
              <div className="flex items-end justify-between gap-2 h-64">
                {currentTimeline.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-gray-400 font-bold">{data.studios}</div>
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(data.studios / maxStudios) * 100}%` }}
                    />
                    <div className="text-xs text-gray-500 font-medium">{data.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-green-500/20 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">詳細データをダウンロード</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              比較データ、時系列データ、国内スタジオ一覧をExcelでダウンロードできます。
            </p>
            <button className="bg-white text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Download size={18} /> Download Excel
            </button>
          </div>
        </div>
      )}

      {/* Studios View */}
      {viewMode === 'studios' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-20 md:pb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10 mb-12 md:mb-20">
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2">スタジオ一覧</p>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                STUDIO<br/>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DIRECTORY</span>
              </h2>
              <p className="text-gray-400 mt-4">{filteredStudios.length}社のスタジオを掲載</p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {['すべて', '独立系', '大企業系', 'VC系', '大学系'].map(t => (
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
                    <p className="text-lg md:text-2xl font-black text-white">{studio.startupCount || '-'}</p>
                  </div>
                  <div className="bg-white/5 p-4 md:p-5 rounded-xl md:rounded-3xl border border-white/5 text-center">
                    <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Exits</p>
                    <p className="text-lg md:text-2xl font-black text-emerald-400">{studio.exitCount || '-'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest mt-auto">
                  <MapPin size={14} className="text-blue-500" /> {studio.location || '未設定'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Startups View */}
      {viewMode === 'startups' && (
        <div className="bg-[#0a0a0f] min-h-screen text-white pt-32 sm:pt-40 pb-20 md:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-12 md:mb-20">
              <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-2">スタートアップ一覧</p>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
                STARTUP<br/>
                <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">ARCHIVE</span>
              </h2>
              <p className="text-gray-400">{filteredStartups.length}社のスタートアップを掲載</p>
              
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white/5 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-white/10 backdrop-blur-3xl mt-8">
                <div className="flex-1 space-y-4">
                  <p className="text-[9px] md:text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">Industry</p>
                  <div className="flex flex-wrap gap-2">
                    {['すべて', 'SaaS', 'HR Tech', 'AI', 'IoT', 'ヘルスケア'].map(i => (
                      <button key={i} onClick={() => setStartupIndustryFilter(i)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${startupIndustryFilter === i ? 'bg-purple-600 border-purple-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>{i}</button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-[9px] md:text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">Stage</p>
                  <div className="flex flex-wrap gap-2">
                    {['すべて', 'シード', 'シリーズA', 'シリーズB', 'IPO'].map(s => (
                      <button key={s} onClick={() => setStartupStageFilter(s)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${startupStageFilter === s ? 'bg-orange-600 border-orange-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>{s}</button>
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
                    <Tag color={startup.exitStatus && startup.exitStatus.includes('IPO') ? 'green' : 'yellow'}>{startup.stage.split('（')[0]}</Tag>
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

      {/* Studio Detail View */}
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
                  <MapPin size={18} className="text-blue-400" /> {selectedStudio.location || '未設定'}
                  <span className="text-gray-700 mx-2">•</span>
                  設立 {selectedStudio.founded}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Startups</p>
              <p className="font-black text-3xl text-white">{selectedStudio.startupCount || '-'}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Exits</p>
              <p className="font-black text-3xl text-emerald-400">{selectedStudio.exitCount || '-'}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Type</p>
              <p className="font-black text-lg text-blue-400">{selectedStudio.type}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Contact</p>
              <p className="font-black text-lg text-purple-400">{selectedStudio.contact || '-'}</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 mb-8">
            <h2 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div> About
            </h2>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg font-medium">{selectedStudio.fullDescription}</p>
            {selectedStudio.website && (
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
                    <Tag color={startup.exitStatus && startup.exitStatus.includes('IPO') ? 'green' : 'yellow'}>{startup.stage.split('（')[0]}</Tag>
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

      {/* Startup Detail View */}
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
                  <Tag color={selectedStartup.exitStatus && selectedStartup.exitStatus.includes('IPO') ? 'green' : 'yellow'}>{selectedStartup.stage}</Tag>
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
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Total Funding</p>
              <p className="text-xl md:text-2xl font-black text-blue-400">{selectedStartup.funding}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Stage</p>
              <p className="text-lg font-black text-purple-400">{selectedStartup.stage.split('（')[0]}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Founded</p>
              <p className="text-lg font-black text-white">{selectedStartup.founded || '-'}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Exit</p>
              <p className={`text-lg font-black ${selectedStartup.exitStatus && selectedStartup.exitStatus.includes('IPO') ? 'text-emerald-400' : 'text-gray-600'}`}>{selectedStartup.exitStatus || '未'}</p>
            </div>
          </div>

          {/* 調達ラウンド詳細 */}
          {(selectedStartup.seedAmount || selectedStartup.seriesAAmount || selectedStartup.seriesBAmount) && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 mb-8">
              <h2 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-3">
                <div className="w-1 h-6 bg-green-500 rounded-full"></div> 調達ラウンド
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {selectedStartup.seedAmount && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-[10px] font-black text-gray-500 uppercase mb-2">Seed</p>
                    <p className="text-xl font-black text-green-400">{selectedStartup.seedAmount}億円</p>
                  </div>
                )}
                {selectedStartup.seriesAAmount && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-[10px] font-black text-gray-500 uppercase mb-2">Series A</p>
                    <p className="text-xl font-black text-blue-400">{selectedStartup.seriesAAmount}億円</p>
                  </div>
                )}
                {selectedStartup.seriesBAmount && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-[10px] font-black text-gray-500 uppercase mb-2">Series B</p>
                    <p className="text-xl font-black text-purple-400">{selectedStartup.seriesBAmount}億円</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Exit情報 */}
          {selectedStartup.exitValue && (
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-8 md:p-10 mb-8">
              <h2 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-3">
                <Trophy size={24} className="text-green-400" /> Exit実績
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Exit時期</p>
                  <p className="text-lg font-black text-white">{selectedStartup.exitStatus}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-2">時価総額</p>
                  <p className="text-2xl font-black text-green-400">{selectedStartup.exitValue}億円</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
            <h2 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-3">
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div> About
            </h2>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg font-medium">{selectedStartup.fullDescription}</p>
            {selectedStartup.url && selectedStartup.url !== "#" && (
              <a href={selectedStartup.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-black text-sm uppercase tracking-widest border-b border-blue-400/30 pb-1">
                Official Website <ExternalLink size={14} />
              </a>
            )}
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
              <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm font-medium leading-relaxed tracking-wide">
                {totalStudios}スタジオ・{totalStartups}スタートアップの実データを公開。<br />
                日本のスタートアップスタジオ・エコシステムを可視化。
              </p>
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
        .animate-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
};

export default App;
