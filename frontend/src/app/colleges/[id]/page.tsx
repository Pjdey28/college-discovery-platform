"use client";

import { useParams } from "next/navigation";

import { useQuery }
from "@tanstack/react-query";

import Navbar
from "../../../components/Navbar";

import {
  getCollegeById,
} from "../../../services/collegeService";
import PlacementStats from "../../../components/PlacementStats";
export default function CollegeDetail() {

  const params = useParams();

  const { data, isLoading } =
    useQuery({
      queryKey: [
        "college",
        params.id,
      ],

      queryFn: () =>
        getCollegeById(
          params.id as string
        ),
    });

  if (isLoading)
    return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-4">
          {data.name}
        </h1>

        <p>
          {data.description}
        </p>

        <div className="mt-6">

          <h2 className="text-2xl font-bold">
            Details
          </h2>

          <p>
            Location:
            {data.location}
          </p>

          <p>
            Fees:
            ₹{data.fees}
          </p>

          <p>
            Rating:
            {data.rating}
          </p>
        <PlacementStats
 placement={
  data.placement
 }
/>
        </div>

      </div>
    </>
  );
}