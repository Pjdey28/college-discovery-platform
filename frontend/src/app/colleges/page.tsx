"use client";

import { useState, useEffect } from "react";

import {
  useQuery,
} from "@tanstack/react-query";
import ReviewSection from "../../components/ReviewSection";
import CollegeCard
from "../../components/CollegeCard";

import Navbar
from "../../components/Navbar";

import {
  getColleges,
} from "../../services/collegeService";

export default function CollegesPage() {

  const [search, setSearch] =
    useState("");

  const [stateFilter,
    setStateFilter] =
    useState("");
const [minFees,setMinFees]=useState("");

const [maxFees,setMaxFees]=useState("");

const [rating,setRating]=useState("");
const [recentSearches,setRecentSearches]=useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const { data, isLoading } =
    useQuery({
      queryKey: [
        "colleges",
        search,
        stateFilter,
        minFees,
        maxFees,
        rating
      ],

     queryFn:()=>

 getColleges(

  search,

  stateFilter,

  Number(minFees),

  Number(maxFees),

  Number(rating)

 )
    });
const saveSearch =
(value:string)=>{

 const updated =

 [
  value,

  ...recentSearches
   .filter(
    item =>
    item !== value
   )
 ]

 .slice(0,5);

 setRecentSearches(
  updated
 );

 localStorage.setItem(
  "recentSearches",
  JSON.stringify(
   updated
  )
 );
};

  return (
    <>
      <Navbar />

      <div
        className="
        max-w-7xl
        mx-auto
        p-6
      "
      >

        <h1
          className="
          text-4xl
          font-bold
          mb-6
        "
        >
          Colleges
        </h1>

        <div
          className="
          flex
          gap-4
          mb-6
        "
        >

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search"
            className="
            border
            p-2
            rounded
            w-full
          "
          />
          <input
placeholder="Min Fees"
value={minFees}
onChange={(e)=>
 setMinFees(
  e.target.value
 )
}
className="
border
p-2
rounded
"
/>

<input
placeholder="Max Fees"
value={maxFees}
onChange={(e)=>
 setMaxFees(
  e.target.value
 )
}
className="
border
p-2
rounded
"
/>

<input
placeholder="Min Rating"
value={rating}
onChange={(e)=>
 setRating(
  e.target.value
 )
}
className="
border
p-2
rounded
"
/>

          <input
            value={stateFilter}
            onChange={(e) =>
              setStateFilter(
                e.target.value
              )
            }
            placeholder="State"
            className="
            border
            p-2
            rounded
          "
          />

        </div>
        <button
onClick={()=>
 saveSearch(search)
}
className="
bg-black
text-white
px-4
rounded
"
>
Save Search
</button>

        <div
          className="
          flex
          gap-2
          flex-wrap
          mb-4
          mt-4
          "
        >
          {recentSearches.map(
            (item) => (
              <button
                key={item}
                onClick={() =>
                  setSearch(item)
                }
                className="
                border
                px-3
                py-1
                rounded
                "
              >
                {item}
              </button>
            )
          )}
        </div>

        {isLoading &&
          <p>Loading...</p>}

        <div
          className="
          grid
          md:grid-cols-3
          gap-6
        "
        >
          {data?.map(
            (college: any) => (
              <CollegeCard
                key={college.id}
                college={college}
              />
            )
          )}
        </div>
        <ReviewSection
 collegeId={data.id}
/>

      </div>
    </>
  );
}