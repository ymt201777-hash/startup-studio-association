import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatsSummary from '@/components/StatsSummary';
import StartupCard from '@/components/StartupCard';
import StudioCard from '@/components/StudioCard';
import ReportCard from '@/components/ReportCard';
import { trpc } from '@/lib/trpc';

export default function Home() {
  const { data: statistics } = trpc.notion.statistics.useQuery();
  const { data: startups } = trpc.notion.startups.useQuery();
  const { data: studios } = trpc.notion.studios.useQuery();
  const { data: reports } = trpc.notion.reports.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-1">
        {/* メインビジュアル */}
        <section className="bg-gradient-to-br from-[#6B4C9A] to-[#4A3570] text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                スタートアップスタジオ協会
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                日本のスタートアップスタジオ業界の発展を目指し、情報発信・交流・政策提言を行っています
              </p>
            </div>
            {statistics && <StatsSummary stats={statistics} />}
          </div>
        </section>

        {/* スタートアップDB セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                🚀 スタートアップDB
              </h2>
              <Link href="/startups">
                <a className="text-[#6B4C9A] hover:text-[#4A3570] font-semibold flex items-center">
                  すべて見る
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {startups?.slice(0, 4).map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          </div>
        </section>

        {/* スタジオ一覧 セクション */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                🏢 スタジオ一覧
              </h2>
              <Link href="/studios">
                <a className="text-[#6B4C9A] hover:text-[#4A3570] font-semibold flex items-center">
                  すべて見る
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studios?.slice(0, 4).map((studio) => (
                <StudioCard key={studio.id} studio={studio} />
              ))}
            </div>
          </div>
        </section>

        {/* レポート セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                📊 レポート
              </h2>
              <Link href="/reports">
                <a className="text-[#6B4C9A] hover:text-[#4A3570] font-semibold flex items-center">
                  すべて見る
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports?.slice(0, 2).map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
