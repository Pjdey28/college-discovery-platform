"use client";

import { useQuery } from "@tanstack/react-query";
import CollegeCard from "./CollegeCard";
import { getTrendingColleges } from "../services/collegeService";

export default function TrendingColleges() {
  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrendingColleges
  });

  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
          Trending Colleges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-72 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Trending Colleges
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((college: any) => (
          <CollegeCard
            key={college.id}
            college={college}
          />
        ))}
      </div>
    </div>
  );
}
