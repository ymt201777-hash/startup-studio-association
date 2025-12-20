import { Client } from '@notionhq/client';
import type { Startup, Studio, Report, Statistics } from '../../shared/notion-types';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Notion Database IDs (環境変数から取得)
const STARTUPS_DB_ID = process.env.NOTION_STARTUPS_DB_ID || '';
const STUDIOS_DB_ID = process.env.NOTION_STUDIOS_DB_ID || '';
const REPORTS_DB_ID = process.env.NOTION_REPORTS_DB_ID || '';

// Helper function to extract text from Notion rich text
function extractText(richText: any[]): string {
  if (!richText || richText.length === 0) return '';
  return richText.map((text: any) => text.plain_text).join('');
}

// Helper function to extract number
function extractNumber(number: any): number {
  return number || 0;
}

// Helper function to extract select
function extractSelect(select: any): string {
  return select?.name || '';
}

// Helper function to extract date
function extractDate(date: any): string {
  return date?.start || '';
}

// Helper function to extract file URL
function extractFileUrl(files: any[]): string {
  if (!files || files.length === 0) return '';
  const file = files[0];
  return file.file?.url || file.external?.url || '';
}

// スタートアップデータの取得
export async function getStartups(): Promise<Startup[]> {
  if (!STARTUPS_DB_ID) {
    console.warn('NOTION_STARTUPS_DB_ID is not set, returning mock data');
    return getMockStartups();
  }

  try {
    const response = await (notion.databases as any).query({
      database_id: STARTUPS_DB_ID,
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        name: extractText(props['企業名']?.title || []),
        studio: extractSelect(props['出身スタジオ']?.select),
        category: extractSelect(props['領域']?.select),
        year: extractNumber(props['設立年']?.number),
        funding: extractNumber(props['調達額']?.number),
        stage: extractSelect(props['ステージ']?.select) as Startup['stage'],
        description: extractText(props['説明']?.rich_text || []),
        exit: extractSelect(props['Exit']?.select) as Startup['exit'],
      };
    });
  } catch (error) {
    console.error('Error fetching startups from Notion:', error);
    return getMockStartups();
  }
}

// スタジオデータの取得
export async function getStudios(): Promise<Studio[]> {
  if (!STUDIOS_DB_ID) {
    console.warn('NOTION_STUDIOS_DB_ID is not set, returning mock data');
    return getMockStudios();
  }

  try {
    const response = await (notion.databases as any).query({
      database_id: STUDIOS_DB_ID,
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        name: extractText(props['スタジオ名']?.title || []),
        type: extractSelect(props['タイプ']?.select) as Studio['type'],
        startupCount: extractNumber(props['創出企業数']?.number),
        exitCount: extractNumber(props['Exit数']?.number),
        totalFunding: extractNumber(props['累計調達額']?.number),
        description: extractText(props['説明']?.rich_text || []),
      };
    });
  } catch (error) {
    console.error('Error fetching studios from Notion:', error);
    return getMockStudios();
  }
}

// レポートデータの取得
export async function getReports(): Promise<Report[]> {
  if (!REPORTS_DB_ID) {
    console.warn('NOTION_REPORTS_DB_ID is not set, returning mock data');
    return getMockReports();
  }

  try {
    const response = await (notion.databases as any).query({
      database_id: REPORTS_DB_ID,
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: extractText(props['タイトル']?.title || []),
        date: extractDate(props['発行日']?.date),
        description: extractText(props['説明']?.rich_text || []),
        pdfUrl: extractFileUrl(props['PDFファイル']?.files || []),
      };
    });
  } catch (error) {
    console.error('Error fetching reports from Notion:', error);
    return getMockReports();
  }
}

// 統計データの計算
export async function getStatistics(): Promise<Statistics> {
  const startups = await getStartups();
  const studios = await getStudios();

  const exitCount = startups.filter(s => s.exit === 'IPO' || s.exit === 'M&A').length;
  const totalFunding = startups.reduce((sum, s) => sum + s.funding, 0);

  return {
    startupCount: startups.length,
    studioCount: studios.length,
    totalFunding: Math.round(totalFunding),
    exitCount,
  };
}

// モックデータ（Notion未設定時のフォールバック）
function getMockStartups(): Startup[] {
  return [
    {
      id: '1',
      name: 'タイミー',
      studio: 'AND ON',
      category: 'HR Tech',
      year: 2018,
      funding: 183,
      stage: 'IPO',
      description: 'スキマバイトアプリ。働きたい時間と働いて欲しい時間をマッチング。',
      exit: 'IPO',
    },
    {
      id: '2',
      name: 'RURA',
      studio: 'Gaiax',
      category: 'Prop Tech',
      year: 2020,
      funding: 15,
      stage: 'Series A',
      description: '空き家・空き地の管理・活用プラットフォーム。',
      exit: null,
    },
    {
      id: '3',
      name: 'NOVASTO',
      studio: 'Scrum Ventures',
      category: 'Fin Tech',
      year: 2019,
      funding: 42,
      stage: 'Series B',
      description: '企業向け財務管理SaaS。CFO業務を効率化。',
      exit: null,
    },
    {
      id: '4',
      name: 'EduLink',
      studio: 'AND ON',
      category: 'Ed Tech',
      year: 2021,
      funding: 8,
      stage: 'Seed',
      description: 'オンライン教育プラットフォーム。個別最適化された学習体験を提供。',
      exit: null,
    },
  ];
}

function getMockStudios(): Studio[] {
  return [
    {
      id: '1',
      name: 'Gaiax',
      type: '独立系',
      startupCount: 12,
      exitCount: 2,
      totalFunding: 50,
      description: 'ソーシャルメディア・シェアリングエコノミー領域を中心に多数のスタートアップを創出。',
    },
    {
      id: '2',
      name: 'AND ON',
      type: '独立系',
      startupCount: 8,
      exitCount: 1,
      totalFunding: 200,
      description: 'HR Tech、Ed Tech領域を中心にスタートアップを創出。',
    },
    {
      id: '3',
      name: 'Scrum Ventures',
      type: 'VC系',
      startupCount: 15,
      exitCount: 3,
      totalFunding: 120,
      description: 'Fin Tech、SaaS領域を中心に投資とスタジオ機能を提供。',
    },
    {
      id: '4',
      name: 'Tokyo Tech Ventures',
      type: '大学系',
      startupCount: 6,
      exitCount: 1,
      totalFunding: 35,
      description: '東京工業大学発のディープテックスタートアップを創出。',
    },
  ];
}

function getMockReports(): Report[] {
  return [
    {
      id: '1',
      title: 'スタートアップスタジオの現状 2024',
      date: '2024-12-01',
      description: '日本と海外のスタートアップスタジオ業界を徹底分析。スタジオ数、実績、トレンドを網羅。',
      pdfUrl: '/reports/studio-report-2024.pdf',
    },
    {
      id: '2',
      title: 'スタジオ発スタートアップの成長分析',
      date: '2024-06-15',
      description: 'スタジオから生まれたスタートアップの成長パターンと成功要因を分析。',
      pdfUrl: '/reports/startup-growth-analysis.pdf',
    },
  ];
}
