"use client";

import { useState } from "react";

import {
  useQuery,
} from "@tanstack/react-query";

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

  const { data, isLoading } =
    useQuery({
      queryKey: [
        "colleges",
        search,
        stateFilter,
      ],

      queryFn: () =>
        getColleges(
          search,
          stateFilter
        ),
    });

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

      </div>
    </>
  );
}