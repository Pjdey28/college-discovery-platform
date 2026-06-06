"use client";

import Navbar
from "../../components/Navbar";

import {
 useCompareStore
}
from "../../store/compareStore";

export default function ComparePage(){

 const {
  colleges,
  removeCollege,
  clearCompare
 } =
 useCompareStore();

 return(
  <>
   <Navbar/>

   <div
   className="
   max-w-7xl
   mx-auto
   p-6
   "
   >

    <div
    className="
    flex
    justify-between
    mb-8
    "
    >

      <h1
      className="
      text-4xl
      font-bold
      "
      >
        Compare Colleges
      </h1>

      <button
      onClick={
       clearCompare
      }
      className="
      bg-red-600
      text-white
      px-4
      py-2
      rounded
      "
      >
       Clear
      </button>

    </div>

    {
      colleges.length===0
      &&
      (
        <p>
          No colleges selected.
        </p>
      )
    }

    <div
    className="
    grid
    md:grid-cols-3
    gap-6
    "
    >

      {
        colleges.map(
          (college)=>(
            <div
            key={college.id}

            className="
            border
            rounded-xl
            p-6
            "
            >

              <h2
              className="
              text-2xl
              font-bold
              "
              >
                {college.name}
              </h2>

              <p>
                {college.location}
              </p>

              <p>
                {college.state}
              </p>

              <p>
                Fees:
                ₹
                {college.fees}
              </p>

              <p>
                Rating:
                {college.rating}
              </p>

              <button
              onClick={()=>
               removeCollege(
                college.id
               )
              }

              className="
              mt-4
              bg-red-500
              text-white
              px-3
              py-1
              rounded
              "
              >
                Remove
              </button>

            </div>
          )
        )
      }

    </div>

   </div>
  </>
 )
}