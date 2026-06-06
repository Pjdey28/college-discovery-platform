"use client";

import Navbar from "../../components/Navbar";
import { useCompareStore } from "../../store/compareStore";
import Link from "next/link";

export default function ComparePage() {
  const { colleges, removeCollege, clearCompare } = useCompareStore();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Compare Colleges
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Analyze and compare your selected colleges side-by-side.
            </p>
          </div>

          {colleges.length > 0 && (
            <button
              onClick={clearCompare}
              className="bg-white border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {colleges.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges selected</h3>
            <p className="text-gray-500 mb-6">You haven't added any colleges to compare yet.</p>
            <Link
              href="/colleges"
              className="inline-flex bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-colors"
            >
              Explore Colleges
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {colleges.map((college) => (
              <div
                key={college.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative"
              >
                <button
                  onClick={() => removeCollege(college.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 rounded-full p-1.5"
                  title="Remove from comparison"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <h2 className="text-xl font-bold text-gray-900 mb-4 pr-8 line-clamp-2">
                  {college.name}
                </h2>
                
                <div className="space-y-4 flex-grow text-sm">
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs font-semibold mb-1">Location</p>
                    <p className="font-medium text-gray-900">{college.location}, {college.state}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs font-semibold mb-1">Fees</p>
                    <p className="font-medium text-gray-900">₹{college.fees.toLocaleString()} / year</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs font-semibold mb-1">Rating</p>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-bold text-xs">
                      {college.rating} / 5.0
                    </div>
                  </div>
                  
                  {college.placements && college.placements.length > 0 && (
                    <>
                      <div>
                        <p className="text-gray-500 uppercase tracking-wider text-xs font-semibold mb-1">Placement Rate</p>
                        <p className="font-medium text-gray-900">{college.placements[0].placementRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500 uppercase tracking-wider text-xs font-semibold mb-1">Highest Package</p>
                        <p className="font-medium text-gray-900">₹{college.placements[0].highestPackage.toLocaleString()}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link
                    href={`/colleges/${college.id}`}
                    className="block w-full text-center bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
