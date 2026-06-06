import Link from "next/link";
import { College } from "../types/college";
import api from "../services/axios";
import { useCompareStore } from "../store/compareStore";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CollegeCard({ college }: { college: College }) {
  const addCollege = useCompareStore((state) => state.addCollege);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await api.post("/saved", { collegeId: college.id });
      toast.success("College saved successfully!");
    } catch (error) {
      toast.error("Failed to save college");
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    addCollege(college);
    toast.success("Added to compare!");
  };

  return (
    <Link href={`/colleges/${college.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100 group-hover:border-indigo-200 group-hover:-translate-y-1">
        
        {/* Image Section */}
        <div className="relative h-48 w-full bg-gray-200">
          {college.image ? (
            <img
              src={college.image}
              alt={college.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-indigo-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
            <span className="text-yellow-500 text-sm">★</span> {college.rating}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-3 line-clamp-2">
            {college.name}
          </h2>
          
          <div className="text-sm text-gray-600 mb-6 flex-grow space-y-3">
            <p className="flex items-start">
              <svg className="w-4 h-4 mr-2 text-indigo-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="line-clamp-1">{college.location}</span>
            </p>
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="font-semibold text-gray-700">₹{college.fees.toLocaleString()}</span> / year
            </p>
          </div>

          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
            <button
              onClick={handleSave}
              className="flex-1 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 text-center"
            >
              Save
            </button>
            <button
              onClick={handleCompare}
              className="flex-1 bg-gray-50 border border-gray-200 hover:bg-gray-800 hover:text-white hover:border-gray-800 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 text-center"
            >
              Compare
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
