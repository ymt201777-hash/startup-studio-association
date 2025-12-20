interface ReportCardProps {
  report: {
    id: string;
    title: string;
    date: string;
    description: string;
    pdfUrl: string;
  };
}

export default function ReportCard({ report }: ReportCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-16 h-16 bg-[#1565C0] rounded-lg flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {report.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{formatDate(report.date)}</p>
          <p className="text-sm text-gray-700 mb-4">{report.description}</p>
          <a
            href={report.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-[#1565C0] text-white text-sm font-semibold rounded-lg hover:bg-[#0D47A1] transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            ダウンロード
          </a>
        </div>
      </div>
    </div>
  );
}
