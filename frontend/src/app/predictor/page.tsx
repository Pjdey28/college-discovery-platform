"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import { predictCollege } from "../../services/predictorService";
import Link from "next/link";

export default function PredictorPage() {
  const [rank, setRank] = useState("");
  const [exam, setExam] = useState("JEE");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!rank) return;
    try {
      setLoading(true);
      const data = await predictCollege(Number(rank), exam);
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            College Predictor
          </h1>
          <p className="mt-3 text-base text-gray-500 max-w-2xl mx-auto">
            Enter your exam rank to find colleges where you have a strong chance of admission based on past cutoff trends.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-10 shadow-sm flex flex-col md:flex-row gap-4 max-w-3xl mx-auto items-center">
          <select
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full md:w-1/4 border border-gray-300 bg-gray-50 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors font-medium text-sm text-gray-700"
          >
            <option value="JEE">JEE Main</option>
            <option value="NEET">NEET</option>
            <option value="GATE">GATE</option>
          </select>

          <input
            type="number"
            placeholder="Enter your Rank"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 bg-gray-50 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
          />

          <button
            onClick={handlePredict}
            disabled={loading || !rank}
            className="w-full md:w-1/4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3.5 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm text-sm"
          >
            {loading ? "Predicting..." : "Predict Now"}
          </button>
        </div>

        {results.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Predicted Colleges for Rank {rank}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((item) => (
                <Link href={`/colleges/${item.college.id}`} key={item.id} className="group block h-full">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 h-full flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-3 line-clamp-2">
                      {item.college.name}
                    </h3>
                    
                    <div className="text-sm text-gray-600 space-y-2 mb-6 flex-grow">
                      <p className="flex items-center">
                        <span className="font-semibold text-gray-700 w-24">Location:</span>
                        {item.college.location}
                      </p>
                      <p className="flex items-center">
                        <span className="font-semibold text-gray-700 w-24">Prev. Cutoff:</span>
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">{item.rank}</span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-semibold text-gray-700 w-24">Exam:</span>
                        {item.exam}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 text-indigo-600 font-semibold text-sm">
                      View College Details →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : rank && !loading && (
          <div className="text-center py-16 text-gray-500">
            Click predict to see your options.
          </div>
        )}
      </main>
    </div>
  );
}
