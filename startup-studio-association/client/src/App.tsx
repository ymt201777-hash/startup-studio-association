import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, Rocket, ExternalLink, ArrowRight, Database, FileText, Search, MapPin, Building2, Filter, TrendingUp, Trophy, DollarSign, Download, Users, BarChart3, Target, Clock, Percent, ClipboardList } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('top'); // 'top', 'studios', 'startups', 'studioDetail', 'startupDetail', 'comparison', 'hearing'
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);

  // --- Filter States ---
  const [studioTypeFilter, setStudioTypeFilter] = useState('すべて');
  const [startupIndustryFilter, setStartupIndustryFilter] = useState('すべて');
  const [startupStageFilter, setStartupStageFilter] = useState('すべて');

  // --- Comparison View States ---
  const [comparisonRegion, setComparisonRegion] = useState('global'); // 'global' or 'japan'
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

  // ============================================
  // 比較データ（リサーチ結果）
  // ============================================
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

  // 時系列データ
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

  // ヒアリング項目
  const hearingItems = [
    { category: "基本情報", items: ["スタジオ名", "設立年月", "注力領域"] },
    { category: "支援スタートアップごと", items: [
      "スタートアップ名", "設立年月", "現在のシリーズ",
      "Seed調達時期・金額", "Series A調達時期・金額", "Series B調達時期・金額",
      "Exit有無・時期・種類"
    ]},
    { category: "集計用", items: ["累計支援スタートアップ数", "うちシリーズA到達数", "うちExit数"] }
  ];

  // --- Extended Data（リサーチ結果を反映） ---
  const featuredStudios = [
    { 
      id: 1, 
      name: "Gaiax STARTUP STUDIO", 
      location: "東京都千代田区", 
      type: "独立系",
      category: "ソーシャル・Web3", 
      startupCount: 70, 
      exitCount: 5,
      description: "日本最大級のスタートアップスタジオ。タイミー、Photosynth、TRUSTDOCK等を輩出。IPO5社達成。",
      founded: "2015年",
      fullDescription: "ガイアックスは「人と人をつなげる」をミッションに、シェアリングエコノミーやDAO、Web3領域で次世代の社会構造を作る起業家を支援しています。70社以上を投資・育成し、タイミー（2024年IPO、時価総額約1,760億円）、Photosynth（2021年IPO）、adish（2020年IPO）、PIXTA（2015年IPO）、AppBank（2015年IPO）の5社がIPOを達成。TRUSTDOCK、ADDressなど成長企業も多数輩出。ファウンダーの8割が学生〜新卒3年目の若手起業家です。",
      website: "https://gaiax-startup-studio.com/",
      logoUrl: "/logos/gaiax.png"
    },
    { 
      id: 2, 
      name: "quantum", 
      location: "東京都港区", 
      type: "大企業系",
      category: "クリエイティブ・全領域", 
      startupCount: 100, 
      exitCount: 0,
      description: "博報堂グループのクリエイティビティを軸に新規事業を連続創出。アジア初のGSSN加盟スタジオ。",
      founded: "2016年",
      fullDescription: "QUANTUMは博報堂の100%子会社として、クリエイティビティと実装力を武器に新規事業を連続創出するスタートアップスタジオです。ヘルスケア、モビリティ、D2Cなど全領域で75-100社超との事業開発実績があり、2019年にアジア初のGSSN（Global Startup Studio Network）加盟スタジオとなりました。walkey（朝日インテックJV）、WOTA（水循環技術）などを輩出。2024年には東京工業大学「Tokyo Tech Startup Studio」構築支援も開始。",
      website: "https://www.quantum.ne.jp/",
      logoUrl: "/logos/quantum.png"
    },
    { 
      id: 3, 
      name: "Sun Asterisk", 
      location: "東京都千代田区", 
      type: "独立系",
      category: "DX・プロダクト開発", 
      startupCount: 600, 
      exitCount: 0,
      description: "1,500名規模のエンジニア・デザイナー集団。600社以上の支援実績、東証プライム上場。",
      founded: "2019年（スタジオ本格開始）",
      fullDescription: "Sun Asteriskは、1,500名規模のエンジニア・デザイナー集団を擁するスタートアップスタジオです。600社以上の支援実績、850以上のプロダクト開発実績を持ち、ZENKIGEN（HARUTAKA）、グロービス学び放題、マネーフォワードなどを支援。2020年に東証プライム上場を果たし、2024年12月期売上高は約136億円。ベトナム中心に4カ国展開。",
      website: "https://sun-asterisk.com/",
      logoUrl: "/logos/sunasterisk.png"
    },
    { 
      id: 4, 
      name: "デライト・ベンチャーズ", 
      location: "東京都渋谷区", 
      type: "VC系",
      category: "シード・アーリー", 
      startupCount: 14, 
      exitCount: 0,
      description: "DeNA発のVC+ベンチャービルダー。ファンド総額265億円、VC62社+VB14社以上の実績。",
      founded: "2019年",
      fullDescription: "デライト・ベンチャーズは、DeNA創業者の南場智子氏が設立した独立系VC。投資事業（62社+）とベンチャービルダー事業（14社+）を両輪で展開し、ファンド総額265億円を運用。本業を継続しながら起業準備ができる環境を提供し、immediaなどを輩出。「ユニコーン輩出VC」を目指しています。",
      website: "https://www.delight-ventures.com/",
      logoUrl: "/logos/delight.png"
    },
    { 
      id: 5, 
      name: "Studio ENTRE", 
      location: "東京都渋谷区", 
      type: "独立系",
      category: "エンターテインメント", 
      startupCount: 3, 
      exitCount: 0,
      description: "エンタメ業界特化のバーティカル型スタジオ。400名超コミュニティ運営、TOKYO SUTEAM採択。",
      founded: "2020年",
      fullDescription: "Studio ENTREは、エンターテインメント業界（音楽、映像、出版、ファッション）に特化したバーティカル型スタートアップスタジオです。400名超のコミュニティを運営し、最大500万円/半年以内の仮説検証を提供。FAVER（ライブ配信）、.mura（音楽NFT）、muvicaなどを輩出。2024年にはTOKYO SUTEAM協定事業者採択、神戸市インキュベーション事業採択。",
      website: "https://entre.studio/",
      logoUrl: "/logos/entre.png"
    },
    { 
      id: 6, 
      name: "STUDIO ZERO", 
      location: "東京都品川区", 
      type: "大企業系",
      category: "大企業共創・DX", 
      startupCount: 0, 
      exitCount: 0,
      description: "東証グロース上場のPlaidが運営。大企業・行政との事業共創・伴走支援に特化。",
      founded: "2021年",
      fullDescription: "STUDIO ZEROは、東証グロース上場の株式会社プレイドが運営するスタートアップスタジオです。KARTEで培ったCXナレッジを活用し、大企業・行政との事業共創・伴走支援に特化。.me（三井物産JV）、JTBパブリッシング、各自治体との共創実績があり、「PLAID Accel」で新規事業開発を伴走支援しています。",
      website: "https://zero.plaid.co.jp/",
      logoUrl: "/logos/studiozero.png"
    },
    { 
      id: 7, 
      name: "みらい創造機構", 
      location: "東京都港区", 
      type: "大学系",
      category: "ディープテック", 
      startupCount: 44, 
      exitCount: 3,
      description: "東京工業大学関連VC。44社投資実績、上場3社達成。みらいスタジオをカーブアウト。",
      founded: "2016年",
      fullDescription: "みらい創造機構は、東京工業大学と連携したベンチャーキャピタルです。44社への投資実績があり、3社の上場を達成。2022年にはスタートアップスタジオ「みらいスタジオ」をカーブアウトし、高専生エンジニアコミュニティを強みにディープテック領域での起業前段階からの伴走支援を行っています。",
      website: "https://miraisozo.co.jp/",
      logoUrl: "/logos/miraisozo.png"
    },
    { 
      id: 8, 
      name: "NOW", 
      location: "東京都渋谷区", 
      type: "VC系",
      category: "シード・アーリー", 
      startupCount: 81, 
      exitCount: 0,
      description: "連続起業家・家入一真氏設立。81社以上に投資、シード・アーリー中心のマルチステージ投資。",
      founded: "2018年",
      fullDescription: "NOWは、連続起業家・家入一真氏が設立したシードVC兼スタートアップスタジオです。1号・2号ファンド合計で81社以上に投資（2022年2月時点）。Nulab、リチカ、食べチョク、シャトルペイなどを支援。起業家育成機能を持ち、「孤独や責任...起業家を守る場所に」というビジョンを掲げています。",
      website: "https://now.vc/",
      logoUrl: "/logos/now.png"
    },
    { 
      id: 9, 
      name: "XTech", 
      location: "東京都中央区", 
      type: "独立系",
      category: "既存産業×テクノロジー", 
      startupCount: 12, 
      exitCount: 2,
      description: "新規事業成功経験者が集結。12社以上を輩出、投資先から複数IPO達成。",
      founded: "2018年",
      fullDescription: "XTechは、新規事業成功経験者が集結したスタートアップスタジオです。既存産業×テクノロジー（AI、IoT、ブロックチェーン、5G）で多発的にスタートアップを創出。イークラウド、クロスマート、withwork/XTalent、Radiotalkなど12社以上を輩出し、投資先ではスペースマーケット、ベースフードなど複数社がIPOを達成しています。",
      website: "https://xtech-corp.co.jp/",
      logoUrl: "/logos/xtech.png"
    },
    { 
      id: 10, 
      name: "Creww Studio", 
      location: "東京都目黒区", 
      type: "独立系",
      category: "オープンイノベーション", 
      startupCount: 20, 
      exitCount: 0,
      description: "4,000社のオープンイノベーション支援実績を活用したスタートアップスタジオ。",
      founded: "2018年",
      fullDescription: "Creww Studioは、4,000社以上のオープンイノベーション支援実績を持つCrewwが運営するスタートアップスタジオです。大企業との共創ノウハウを活かし、10-20社のスタートアップを創出。スタートアップスタジオ協会の理事企業として業界発展にも貢献しています。",
      website: "https://creww.me/",
      logoUrl: "/logos/creww.png"
    },
    { 
      id: 11, 
      name: "Spirete", 
      location: "東京都渋谷区", 
      type: "独立系",
      category: "大企業人材×研究シーズ", 
      startupCount: 10, 
      exitCount: 0,
      description: "大企業人材と研究機関シーズを組み合わせたスタートアップ創出モデル。",
      founded: "2020年",
      fullDescription: "Spireteは、大企業人材と研究機関のシーズを組み合わせてスタートアップを創出するスタートアップスタジオです。5-10社のスタートアップを創出し、大企業の優秀な人材が起業にチャレンジできる環境を提供しています。",
      website: "https://spirete.com/",
      logoUrl: "/logos/spirete.png"
    },
    { 
      id: 12, 
      name: "01Booster Studio", 
      location: "東京都千代田区", 
      type: "独立系",
      category: "建設・不動産", 
      startupCount: 0, 
      exitCount: 0,
      description: "建設・不動産領域に特化したバーティカル型スタートアップスタジオ。",
      founded: "2022年",
      fullDescription: "01Booster Studioは、ゼロワンブースターが運営する建設・不動産領域に特化したバーティカル型スタートアップスタジオです。TIB STUDIO支援事業者としても参画し、業界特化の深い知見を活かしたスタートアップ創出を行っています。",
      website: "https://01booster.co.jp/",
      logoUrl: "/logos/01booster.png"
    },
    { 
      id: 13, 
      name: "ボーダレス・ジャパン", 
      location: "福岡県福岡市", 
      type: "独立系",
      category: "ソーシャルビジネス", 
      startupCount: 50, 
      exitCount: 0,
      description: "「SWITCH to HOPE」をパーパスに、ソーシャルビジネスのみを創出。13ヵ国50事業以上展開。",
      founded: "2007年",
      fullDescription: "ボーダレス・ジャパンは、ソーシャルビジネスのみを創出するスタートアップスタジオです。「SWITCH to HOPE」をパーパスに、貧困、環境、教育、多文化共生などの社会課題解決に取り組む起業家を支援。独自の「恩送り資金」システムで13ヵ国に50以上の事業を展開しています。",
      website: "https://www.borderless-japan.com/",
      logoUrl: "/logos/borderless.png"
    },
    { 
      id: 14, 
      name: "NEC X", 
      location: "米国パロアルト", 
      type: "大企業系",
      category: "AI・セキュリティ", 
      startupCount: 20, 
      exitCount: 0,
      description: "NECの125年の技術力と45,000件以上の特許を活用し、シリコンバレーでスタートアップを創出。",
      founded: "2018年",
      fullDescription: "NEC Xは、日本電気（NEC）の100%子会社としてシリコンバレーで運営されるスタートアップスタジオです。NECの125年の技術力と45,000件以上の特許を活用し、AI、セキュリティ、顔認証などの先端技術領域で20件以上の事業を創出。2025年夏には東京スタジオも開設予定です。",
      website: "https://www.nec-x.com/",
      logoUrl: "/logos/necx.png"
    },
    { 
      id: 15, 
      name: "Moon Creative Lab", 
      location: "東京都港区", 
      type: "大企業系",
      category: "ヘルスケア・EdTech", 
      startupCount: 54, 
      exitCount: 0,
      description: "三井物産グループ45,000人からアイデアを公募し、54件を採用・育成。",
      founded: "2018年",
      fullDescription: "Moon Creative Labは、三井物産の100%子会社として運営されるベンチャースタジオです。グループ45,000人からアイデアを公募し、459件の応募から54のアイデアを採用・育成。ヘルスケア、EdTech、子育て、サステナビリティなどHuman-Centeredな領域で事業創造と人材育成を推進しています。",
      website: "https://www.mooncreativelab.com/ja",
      logoUrl: "/logos/moon.png"
    },
    { 
      id: 16, 
      name: "POLAR SHORTCUT", 
      location: "北海道札幌市", 
      type: "独立系",
      category: "北海道特化・農水産DX", 
      startupCount: 8, 
      exitCount: 0,
      description: "北海道特化のシードVC兼スタートアップスタジオ。共同創業型投資モデルで8社創出。",
      founded: "2020年",
      fullDescription: "POLAR SHORTCUTは、北海道に特化したシードVC兼スタートアップスタジオです。農水産業DX、宇宙ビジネス、フードテック、メディカルなど北海道の産業特性を活かした領域で、共同創業型投資モデルにより事業企画から立ち上げまで伴走支援。2023年末時点で8社を創出しています。",
      website: "https://corp.polarshortcut.jp/",
      logoUrl: "/logos/polar.png"
    },
    { 
      id: 17, 
      name: "Mistletoe", 
      location: "東京都千代田区", 
      type: "独立系",
      category: "社会課題解決・AI", 
      startupCount: 200, 
      exitCount: 0,
      description: "孫泰蔵氏設立。世界16カ国、200社以上のスタートアップを支援するコレクティブ・インパクト・コミュニティ。",
      founded: "2013年",
      fullDescription: "Mistletoeは、孫泰蔵氏が設立したコレクティブ・インパクト・コミュニティです。食糧、少子高齢化、ロジスティクスなどの社会課題解決をテーマに、AI、ロボティクス、教育、ヘルスケア領域で世界16カ国、200社以上のスタートアップを支援。複数の起業家の社会的インパクトを結集させる独自のモデルを展開しています。",
      website: "https://mistletoe.co/",
      logoUrl: "/logos/mistletoe.png"
    },
    { 
      id: 18, 
      name: "BLUEPRINT Founders", 
      location: "東京都港区", 
      type: "独立系",
      category: "DX・バーティカルSaaS", 
      startupCount: 4, 
      exitCount: 2,
      description: "「起業を標準化させる」をミッションに17.8億円調達。2社の株式売却実績あり。",
      founded: "2021年",
      fullDescription: "BLUEPRINT Foundersは、「起業を標準化させる」をミッションにDX・バーティカルSaaSに特化したスタートアップスタジオです。2022年に17.8億円を調達し、Archi Village、Fact Baseなど4社以上を創出。建材業界、製造業図面管理などの領域で、100社上場を目指しています。2社の株式売却実績あり。",
      website: "https://blueprint-holdings.net/",
      logoUrl: "/logos/blueprint.png"
    },
    { 
      id: 19, 
      name: "Algomatic", 
      location: "東京都港区", 
      type: "大企業系",
      category: "生成AI", 
      startupCount: 0, 
      exitCount: 0,
      description: "DMM.comから20億円投資。カンパニー制で生成AI事業を同時多発的に立ち上げ。",
      founded: "2023年",
      fullDescription: "Algomaticは、DMM.comから20億円の投資を受けて設立された生成AI特化型スタートアップスタジオです。「AI革命で人々を幸せにする」をミッションに、カンパニー制で同時多発的にLLM・AIエージェント関連の事業を立ち上げています。",
      website: "https://algomatic.jp/",
      logoUrl: "/logos/algomatic.png"
    }
  ];

  // スタートアップデータ（リサーチ結果を反映）
  const startups = [
    { 
      id: 1, 
      name: "タイミー", 
      studio: "Gaiax", 
      studioId: 1,
      industry: "HR Tech", 
      stage: "Exit済（IPO）", 
      funding: "403億円", 
      exitStatus: "IPO済（2024年）", 
      url: "https://timee.co.jp/",
      founded: "2017年",
      description: "スキマバイトマッチングサービス。ワーカー数1,000万人突破。",
      fullDescription: "タイミーは、スキマ時間で働けるバイトマッチングサービスを提供するスタートアップです。2024年7月に東証グロースに上場し、IPO時時価総額は約1,760億円。累計調達額は約403億円で、ワーカー数は1,000万人を突破しています。Gaiaxのシード投資先から大きく成長した代表的な成功事例です。",
      logoUrl: "/logos/timee.png",
      timeToSeriesA: "ヒアリング予定"
    },
    { 
      id: 2, 
      name: "Photosynth", 
      studio: "Gaiax", 
      studioId: 1,
      industry: "IoT", 
      stage: "Exit済（IPO）", 
      funding: "数十億円", 
      exitStatus: "IPO済（2021年）", 
      url: "https://photosynth.co.jp/",
      founded: "2014年",
      description: "IoTスマートロック「Akerun」を開発・提供。",
      fullDescription: "Photosynthは、IoTスマートロック「Akerun」を開発・提供するスタートアップです。2021年に東証グロースに上場。オフィスや施設のセキュリティ・入退室管理をスマート化し、数千社以上に導入されています。Gaiax投資先から成長した成功事例の一つです。",
      logoUrl: "/logos/photosynth.png",
      timeToSeriesA: "ヒアリング予定"
    },
    { 
      id: 3, 
      name: "TRUSTDOCK", 
      studio: "Gaiax", 
      studioId: 1,
      industry: "SaaS", 
      stage: "シリーズB以降", 
      funding: "13億円+", 
      exitStatus: "未", 
      url: "https://trustdock.io/",
      founded: "2017年",
      description: "eKYC・本人確認SaaSを提供。犯罪収益移転防止法に対応。",
      fullDescription: "TRUSTDOCKは、オンラインでの本人確認（eKYC）サービスを提供するスタートアップです。金融機関やシェアリングエコノミー事業者向けに、APIベースの本人確認ソリューションを展開。犯罪収益移転防止法に対応した安全・安心な本人確認を実現。累計調達額は13億円以上です。",
      logoUrl: "/logos/trustdock.png",
      timeToSeriesA: "ヒアリング予定"
    },
    { 
      id: 4, 
      name: "ADDress", 
      studio: "Gaiax", 
      studioId: 1,
      industry: "シェアリング", 
      stage: "シリーズA+", 
      funding: "数億円", 
      exitStatus: "未", 
      url: "https://address.love/",
      founded: "2018年",
      description: "月額制の多拠点居住サービスを提供。空き家問題解決と新ライフスタイル提案。",
      fullDescription: "ADDRESSは、月額制で全国の拠点に住み放題になる多拠点居住サービスを提供しています。空き家問題の解決と新しいライフスタイルの提案を両立し、地方創生にも貢献。Gaiax投資先として成長を続けています。",
      logoUrl: "/logos/address.png",
      timeToSeriesA: "ヒアリング予定"
    },
    { 
      id: 5, 
      name: "adish", 
      studio: "Gaiax（カーブアウト）", 
      studioId: 1,
      industry: "SaaS", 
      stage: "Exit済（IPO）", 
      funding: "N/A", 
      exitStatus: "IPO済（2020年）", 
      url: "https://www.adish.co.jp/",
      founded: "2014年",
      description: "SNSモニタリング・カスタマーサクセスサービスを提供。",
      fullDescription: "adishは、SNSモニタリングやカスタマーサクセスサービスを提供するスタートアップです。2020年に東証グロースに上場。Gaiaxからカーブアウトして独立し、企業のSNS運用やカスタマーサポートを支援しています。",
      logoUrl: "/logos/adish.png",
      timeToSeriesA: "ヒアリング予定"
    },
    { 
      id: 6, 
      name: "WOTA", 
      studio: "quantum", 
      studioId: 2,
      industry: "クリーンテック", 
      stage: "シリーズB以降", 
      funding: "数十億円", 
      exitStatus: "未", 
      url: "https://wota.co.jp/",
      founded: "2014年",
      description: "水循環技術で世界の水問題解決を目指すディープテックスタートアップ。",
      fullDescription: "WOTAは、独自の水循環技術で世界の水問題解決を目指すディープテックスタートアップです。災害時の水供給や、水インフラのない地域での水利用を可能にする製品を開発。quantumの投資先として成長を続けています。",
      logoUrl: "/logos/wota.png",
      timeToSeriesA: "ヒアリング予定"
    },
    { 
      id: 7, 
      name: "クロスマート", 
      studio: "XTech", 
      studioId: 9,
      industry: "フードテック", 
      stage: "シリーズA+", 
      funding: "数億円", 
      exitStatus: "未", 
      url: "https://xmart.co.jp/",
      founded: "2018年",
      description: "飲食店向け仕入れ最適化サービスを提供。",
      fullDescription: "クロスマートは、飲食店向けの仕入れ最適化サービスを提供するスタートアップです。XTechが設立し、飲食業界のDXを推進。食材の仕入れコスト削減と業務効率化を支援しています。",
      logoUrl: "/logos/crossmart.png",
      timeToSeriesA: "ヒアリング予定"
    },
    { 
      id: 8, 
      name: "ZENKIGEN（HARUTAKA）", 
      studio: "Sun Asterisk", 
      studioId: 3,
      industry: "HR Tech", 
      stage: "シリーズB以降", 
      funding: "N/A", 
      exitStatus: "未", 
      url: "https://zenkigen.co.jp/",
      founded: "N/A",
      description: "WEB面接プラットフォーム「HARUTAKA」を提供。",
      fullDescription: "ZENKIGENは、WEB面接プラットフォーム「HARUTAKA」を提供するHR Techスタートアップです。Sun Asteriskの支援を受けて成長し、採用のDXを推進。AIを活用した面接支援機能も提供しています。",
      logoUrl: "/logos/zenkigen.png",
      timeToSeriesA: "ヒアリング予定"
    },
    { 
      id: 9, 
      name: "FAVER", 
      studio: "Studio ENTRE", 
      studioId: 5,
      industry: "エンタメ", 
      stage: "シード", 
      funding: "N/A", 
      exitStatus: "未", 
      url: "#",
      founded: "N/A",
      description: "ライブ動画配信サービスを提供。",
      fullDescription: "FAVERは、ライブ動画配信サービスを提供するエンタメスタートアップです。Studio ENTREが創出し、エンターテインメント業界のイノベーションを推進しています。",
      logoUrl: "/logos/faver.png",
      timeToSeriesA: "ヒアリング予定"
    },
    { 
      id: 10, 
      name: ".mura", 
      studio: "Studio ENTRE", 
      studioId: 5,
      industry: "Web3", 
      stage: "シード", 
      funding: "N/A", 
      exitStatus: "未", 
      url: "#",
      founded: "N/A",
      description: "音楽NFTマーケットプレイスを提供。",
      fullDescription: ".muraは、音楽NFTマーケットプレイスを提供するWeb3スタートアップです。Studio ENTREが創出し、アーティストとファンをつなぐ新しいプラットフォームを構築しています。",
      logoUrl: "/logos/mura.png",
      timeToSeriesA: "ヒアリング予定"
    }
  ];

  const reports = [
    { title: "スタートアップスタジオ市場 包括的データ集 2024", date: "2024.12", type: "データ集", size: "Excel/PDF" },
    { title: "グローバル vs 日本 比較レポート", date: "2024.12", type: "比較分析", size: "PDF" },
    { title: "スタジオ発スタートアップ 成功率分析", date: "2024.11", type: "分析レポート", size: "PDF" },
  ];

  const filteredStudios = featuredStudios.filter(s => studioTypeFilter === 'すべて' || s.type === studioTypeFilter);
  const filteredStartups = startups.filter(s => 
    (startupIndustryFilter === 'すべて' || s.industry === startupIndustryFilter) &&
    (startupStageFilter === 'すべて' || s.stage.includes(startupStageFilter))
  );

  const currentComparison = comparisonRegion === 'global' ? comparisonDataGlobal : comparisonDataJapan;
  const currentTimeline = timelineRegion === 'global' ? timelineDataGlobal : timelineDataJapan;
  const maxStudios = Math.max(...currentTimeline.map(d => d.studios));

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
            <button onClick={() => {setViewMode('comparison'); window.scrollTo(0,0)}} className={`text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'comparison' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Data</button>
            <button onClick={() => {setViewMode('startups'); window.scrollTo(0,0)}} className={`text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'startups' || viewMode === 'startupDetail' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Startups</button>
            <button onClick={() => {setViewMode('studios'); window.scrollTo(0,0)}} className={`text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'studios' || viewMode === 'studioDetail' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Studios</button>
            <button onClick={() => {setViewMode('hearing'); window.scrollTo(0,0)}} className={`text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase transition-colors ${viewMode === 'hearing' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Hearing</button>
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
            <button onClick={() => {setViewMode('hearing'); setIsMobileMenuOpen(false); window.scrollTo(0,0)}} className="text-xs font-black uppercase tracking-widest text-left text-gray-400 border-b border-white/5 pb-2">Hearing</button>
            <button onClick={() => {setViewMode('startups'); setIsMobileMenuOpen(false); window.scrollTo(0,0)}} className="bg-blue-600 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest text-center">Find Ventures</button>
          </div>
        )}
      </nav>

      {viewMode === 'top' && (
        <>
          {/* Hero Section - 8項目マトリクス */}
          <section className="relative pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-12 md:pb-16 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] md:h-[600px] bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
              {/* Tag */}
              <div className="text-center mb-2 md:mb-3">
                <Tag color="green">DATA-DRIVEN INSIGHTS</Tag>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-2 md:mb-3 leading-tight tracking-tighter text-white">
                スタートアップスタジオの<br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                  圧倒的スピード
                </span>
              </h1>
              
              <p className="text-gray-400 text-center text-xs sm:text-sm md:text-base mb-6 md:mb-8 max-w-xl mx-auto">
                データが証明する、スタジオモデルの優位性
              </p>

              {/* ★ 8項目マトリクス（タイトルなし・色分けのみ） */}
              
              {/* Row 1: 青（3列） */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
                {/* 1. スタジオ数 */}
                <div className="bg-[#12121a] border border-blue-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-blue-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">45</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-blue-400">社</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">スタジオ数</p>
                </div>

                {/* 2. スタジオ発スタートアップ数 */}
                <div className="bg-[#12121a] border border-blue-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-blue-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">200</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-blue-400">+社</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">輩出スタートアップ</p>
                </div>

                {/* 3. 投資運用額 */}
                <div className="bg-[#12121a] border border-blue-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-blue-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">700</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-blue-400">億円</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">投資運用額</p>
                </div>
              </div>

              {/* Row 2: 緑（3列） */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
                {/* 4. 初回調達までの期間 */}
                <div className="bg-[#12121a] border border-green-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-green-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">18</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-green-400">ヶ月</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">初回調達まで</p>
                </div>

                {/* 5. 調達金額（初回） */}
                <div className="bg-[#12121a] border border-green-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-green-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">1.5</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-green-400">億円</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">初回調達額</p>
                </div>

                {/* 6. 時価総額（初回調達時） */}
                <div className="bg-[#12121a] border border-green-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-green-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">10</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-green-400">億円</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">時価総額（初回時）</p>
                </div>
              </div>

              {/* Row 3: 紫（2列・中央寄せ） */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-md mx-auto mb-8 md:mb-10">
                {/* 7. 調達総額 */}
                <div className="bg-[#12121a] border border-purple-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-purple-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">500</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-purple-400">億円</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">調達総額</p>
                </div>

                {/* 8. 総時価総額 */}
                <div className="bg-[#12121a] border border-purple-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover:border-purple-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">3000</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-purple-400">億円</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400">総時価総額</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <button onClick={() => {setViewMode('comparison'); window.scrollTo(0,0)}} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-base hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 border border-white/10 uppercase tracking-wider">
                  View Data <BarChart3 size={18} />
                </button>
                <button onClick={() => {setViewMode('studios'); window.scrollTo(0,0)}} className="bg-white/5 backdrop-blur-lg text-white border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-base hover:bg-white/10 transition-all uppercase tracking-wider">
                  Member Studios
                </button>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative">
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
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2">注目のスタジオ</p>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                    FEATURED<br/>
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
                    <div><p className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Startups</p><p className="font-black text-white text-base md:text-lg">{studio.startupCount}</p></div>
                    <div><p className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Exits</p><p className="font-black text-emerald-400 text-base md:text-lg">{studio.exitCount}</p></div>
                  </div>
                </div>
              )}
            />

            {/* Startup Archive Carousel */}
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
                    <Tag color={startup.exitStatus.includes('IPO') ? 'green' : 'yellow'}>{startup.stage.split('（')[0]}</Tag>
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

            {/* Reports & Insights */}
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

      {/* Comparison / Data View - 新規追加 */}
      {viewMode === 'comparison' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-20 md:pb-32">
          <div className="mb-12 md:mb-20">
            <p className="text-[10px] font-black text-green-400 uppercase tracking-[0.4em] mb-2">データで見る</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
              COMPARISON<br/>
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">DATA</span>
            </h2>
            <p className="text-gray-400 max-w-2xl">
              スタートアップスタジオ発企業と従来型VC支援企業の比較データ。事実に基づく情報で「スタジオという選択肢」を検討いただけます。
            </p>
          </div>

          {/* 比較セクション */}
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
              {/* Header */}
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

          {/* 時系列セクション */}
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

            {/* Summary Stats */}
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

            {/* Chart */}
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
                    {data.label && (
                      <div className="text-[8px] text-gray-400 text-center hidden md:block">{data.label}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              出典: Big Venture Studio Research 2024, Enhance Ventures, スタートアップスタジオ協会
            </p>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-green-500/20 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">詳細データをダウンロード</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              比較データ、時系列データ、国内スタジオ一覧、スタジオ発スタートアップの詳細をExcelでダウンロードできます。
            </p>
            <button className="bg-white text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Download size={18} /> Download Excel
            </button>
          </div>
        </div>
      )}

      {/* Hearing Items Page - 新規追加 */}
      {viewMode === 'hearing' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-20 md:pb-32">
          <div className="mb-12 md:mb-16">
            <p className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.4em] mb-2">データ収集</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
              HEARING<br/>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">ITEMS</span>
            </h2>
            <p className="text-gray-400 max-w-2xl">
              各スタジオへのヒアリングで収集予定のデータ項目です。これにより「シリーズA到達期間」などの国内実データを取得します。
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {hearingItems.map((category, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-black text-blue-400 mb-6 flex items-center gap-3">
                  <ClipboardList size={20} />
                  {category.category}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black flex items-center justify-center">
                        {itemIdx + 1}
                      </span>
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="font-black text-white mb-4 flex items-center gap-2">
              <Target size={20} className="text-yellow-400" />
              これで出せるアウトプット
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> シリーズA到達までの平均期間（スタジオ発 vs VC支援）</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 年別の輩出スタートアップ数の推移</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 年別のスタジオ発調達額の推移</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 年別のExit件数の推移</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 領域別・シリーズ別の内訳</li>
            </ul>
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
                    {['すべて', 'SaaS', 'HR Tech', 'IoT', 'フードテック', 'シェアリング', 'Web3', 'エンタメ'].map(i => (
                      <button key={i} onClick={() => setStartupIndustryFilter(i)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${startupIndustryFilter === i ? 'bg-purple-600 border-purple-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>{i}</button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-[9px] md:text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">Stage</p>
                  <div className="flex flex-wrap gap-2">
                    {['すべて', 'シード', 'シリーズA', 'シリーズB', 'Exit済'].map(s => (
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
                    <Tag color={startup.exitStatus.includes('IPO') ? 'green' : 'yellow'}>{startup.stage.split('（')[0]}</Tag>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 group-hover:text-purple-400 transition-colors tracking-tight">{startup.name}</h3>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">from {startup.studio}</p>
                  <div className="space-y-4 border-t border-white/5 pt-6">
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><DollarSign size={14} className="text-yellow-400"/> Funding</span>
                      <span className="font-black text-white text-sm md:text-lg">{startup.funding}</span>
                    </div>
                    {startup.timeToSeriesA && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 font-black uppercase tracking-widest flex items-center gap-2"><Clock size={14} className="text-blue-400"/> Series A期間</span>
                        <span className={`font-bold ${startup.timeToSeriesA === 'ヒアリング予定' ? 'text-yellow-400' : 'text-white'}`}>{startup.timeToSeriesA}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ヒアリング予定の注記 */}
            <div className="mt-12 p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
              <h3 className="font-black text-yellow-400 mb-2 flex items-center gap-2">
                <ClipboardList size={18} /> データ収集中
              </h3>
              <p className="text-sm text-gray-400">
                シリーズA到達期間などの詳細データは、各スタジオへのヒアリングを通じて収集予定です。
                <button onClick={() => {setViewMode('hearing'); window.scrollTo(0,0)}} className="text-yellow-400 underline ml-2">ヒアリング項目を見る →</button>
              </p>
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
                    <Tag color={startup.exitStatus.includes('IPO') ? 'green' : 'yellow'}>{startup.stage.split('（')[0]}</Tag>
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
                  <Tag color={selectedStartup.exitStatus.includes('IPO') ? 'green' : 'yellow'}>{selectedStartup.stage}</Tag>
                  {selectedStartup.exitStatus.includes('IPO') && <Tag color="green">IPO済</Tag>}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Funding</p>
              <p className="text-xl md:text-2xl font-black text-blue-400">{selectedStartup.funding}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Stage</p>
              <p className="text-lg font-black text-purple-400">{selectedStartup.stage.split('（')[0]}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Exit Status</p>
              <p className={`text-lg font-black ${selectedStartup.exitStatus.includes('IPO') || selectedStartup.exitStatus.includes('M&A') ? 'text-emerald-400' : 'text-gray-600'}`}>{selectedStartup.exitStatus}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-colors">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Series A期間</p>
              <p className={`text-lg font-black ${selectedStartup.timeToSeriesA === 'ヒアリング予定' ? 'text-yellow-400' : 'text-white'}`}>{selectedStartup.timeToSeriesA || 'N/A'}</p>
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
              <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm font-medium leading-relaxed tracking-wide">データに基づく情報で、次世代の挑戦を加速させる。<br />日本最大のスタートアップスタジオ・プラットフォーム。</p>
            </div>
            <div className="flex flex-wrap gap-6 sm:gap-10 lg:gap-16 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-red-400 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="pt-8 md:pt-12 mt-12 md:mt-20 border-t border-white/5 text-center">
            <p className="text-[8px] md:text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] md:tracking-[0.5em]">© 2025 STARTUP STUDIO ASSOCIATION / ALL RIGHTS RESERVED.</p>
            <p className="text-[8px] text-gray-700 mt-2">データ出典: GSSN, Big Venture Studio Research 2024, INITIAL, 各社公式サイト</p>
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
