import Link from "next/link";
import Navbar from "../components/Navbar";
import DashboardStat from '../components/DashboardStat';
import TrendingColleges from "../components/TrendingColleges";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-white border-b border-gray-200">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            College Discovery Platform
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Find the right college for your future with our comprehensive database, student reviews, and placement records.
          </p>
          <Link
            href="/colleges"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all text-lg"
          >
            Explore Colleges
          </Link>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <DashboardStat title="Colleges" value="300+" />
            <DashboardStat title="Students" value="50K+" />
            <DashboardStat title="Reviews" value="10K+" />
            <DashboardStat title="Placement Records" value="100%" />
          </div>
        </div>

        {/* Trending Section */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <TrendingColleges />
        </div>
      </main>
    </>
  );
}
