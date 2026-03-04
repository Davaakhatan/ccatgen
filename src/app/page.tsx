import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            CCAT-Style Cognitive Test
          </h1>
          <p className="text-lg text-gray-600">
            Practice cognitive ability assessments used in hiring
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 py-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-indigo-600">50</div>
            <div className="text-sm text-gray-500">Questions</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-indigo-600">15</div>
            <div className="text-sm text-gray-500">Minutes</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-indigo-600">3</div>
            <div className="text-sm text-gray-500">Categories</div>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-500">
          <p>Verbal &bull; Math & Logic &bull; Spatial Reasoning</p>
        </div>

        <Link
          href="/test/instructions"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Start Test
        </Link>

        <p className="text-xs text-gray-400">
          This is not an official CCAT product. For practice purposes only.
        </p>
      </div>
    </div>
  );
}
