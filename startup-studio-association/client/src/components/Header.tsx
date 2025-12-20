import { Link } from 'wouter';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-bold text-[#6B4C9A] hover:opacity-80 transition-opacity">
              スタートアップスタジオ協会
            </a>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className="text-gray-700 hover:text-[#6B4C9A] transition-colors">
                ホーム
              </a>
            </Link>
            <Link href="/startups">
              <a className="text-gray-700 hover:text-[#6B4C9A] transition-colors">
                スタートアップDB
              </a>
            </Link>
            <Link href="/studios">
              <a className="text-gray-700 hover:text-[#6B4C9A] transition-colors">
                スタジオ一覧
              </a>
            </Link>
            <Link href="/reports">
              <a className="text-gray-700 hover:text-[#6B4C9A] transition-colors">
                レポート
              </a>
            </Link>
          </nav>
          {/* モバイルメニューボタン */}
          <button className="md:hidden text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
