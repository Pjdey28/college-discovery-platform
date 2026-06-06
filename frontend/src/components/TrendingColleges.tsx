"use client";

import { useQuery }
from "@tanstack/react-query";

import CollegeCard
from "./CollegeCard";

import {
 getTrendingColleges
}
from "../services/collegeService";

export default function TrendingColleges(){

 const { data }
 =
 useQuery({

  queryKey:[
   "trending"
  ],

  queryFn:
  getTrendingColleges
 });

 return(

  <div
  className="mt-16"
  >

   <h2
   className="
   text-3xl
   font-bold
   mb-6
   "
   >
    Trending Colleges
   </h2>

   <div
   className="
   grid
   md:grid-cols-3
   gap-6
   "
   >

    {data?.map(
      (college:any)=>(
        <CollegeCard
        key={college.id}
        college={college}
        />
      )
    )}

   </div>

  </div>
 );
}