"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CollegeCard from "../../components/CollegeCard";
import Navbar from "../../components/Navbar";
import { getColleges } from "../../services/collegeService";

export default function CollegesPage() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [minFees, setMinFees] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [rating, setRating] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["colleges", search, stateFilter, minFees, maxFees, rating],
    queryFn: () =>
      getColleges(
        search || undefined,
        stateFilter || undefined,
        minFees ? Number(minFees) : undefined,
        maxFees ? Number(maxFees) : undefined,
        rating ? Number(rating) : undefined
      ),
  });

  const saveSearch = (value: string) => {
    if (!value.trim()) return;
    const updated = [
      value,
      ...recentSearches.filter((item) => item !== value),
    ].slice(0, 5);

    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Explore Colleges
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Find the perfect institution using advanced filters and powerful search.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
            />
            <input
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              placeholder="State (e.g., NY)"
              className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
            />
            <input
              placeholder="Min Fees (₹)"
              type="number"
              value={minFees}
              onChange={(e) => setMinFees(e.target.value)}
              className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
            />
            <input
              placeholder="Max Fees (₹)"
              type="number"
              value={maxFees}
              onChange={(e) => setMaxFees(e.target.value)}
              className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
            />
            <input
              placeholder="Min Rating (1-5)"
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="flex gap-2 flex-wrap items-center flex-1">
              {recentSearches.length > 0 && (
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mr-2">Recent:</span>
              )}
              {recentSearches.map((item) => (
                <button
                  key={item}
                  onClick={() => setSearch(item)}
                  className="bg-white border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => saveSearch(search)}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-sm transition-colors whitespace-nowrap"
            >
              Save Search
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-72 rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <>
            {data?.length === 0 ? (
              <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl">
                <p className="text-lg text-gray-500">No colleges found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setStateFilter("");
                    setMinFees("");
                    setMaxFees("");
                    setRating("");
                  }}
                  className="mt-4 text-indigo-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.map((college: any) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
