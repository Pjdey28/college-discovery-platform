"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../../components/Navbar";
import ReviewSection from "../../../components/ReviewSection";
import { getCollegeById } from "../../../services/collegeService";
import PlacementStats from "../../../components/PlacementStats";

export default function CollegeDetail() {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["college", params.id],
    queryFn: () => getCollegeById(params.id as string),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-40 bg-gray-200 rounded-2xl"></div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-gray-500">College not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-8 shadow-sm">
          {/* Banner Image */}
          <div className="h-48 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
            {data.image && (
              <img src={data.image} alt={data.name} className="w-full h-full object-cover mix-blend-overlay opacity-50" />
            )}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur text-indigo-700 px-4 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2">
              <span className="text-yellow-500 text-lg">★</span> {data.rating} / 5.0
            </div>
          </div>

          <div className="p-8 relative">
            {/* Avatar or Logo Placeholder */}
            <div className="w-24 h-24 bg-white rounded-2xl shadow-md border-4 border-white absolute -top-12 flex items-center justify-center text-3xl font-bold text-indigo-600">
              {data.name.charAt(0)}
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                  {data.name}
                </h1>
                <p className="text-gray-600 leading-relaxed max-w-3xl text-lg">
                  {data.description || "No description provided for this college."}
                </p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-xl">
                <div className="bg-indigo-100 p-2 rounded-lg mr-4 text-indigo-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Location</p>
                  <span className="font-bold text-gray-900">{data.location}</span>
                </div>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-xl">
                <div className="bg-indigo-100 p-2 rounded-lg mr-4 text-indigo-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Annual Fees</p>
                  <span className="font-bold text-gray-900">₹{data.fees?.toLocaleString() || "N/A"} / year</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placements */}
        <PlacementStats placement={data.placement || (data.placements && data.placements[0])} />

        {/* Reviews */}
        <ReviewSection collegeId={data.id} />

      </main>
    </div>
  );
}
