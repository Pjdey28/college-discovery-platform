"use client";

import { useState } from "react";

import Navbar
from "../../components/Navbar";

import {
  predictCollege,
} from "../../services/predictorService";

export default function PredictorPage(){

  const [rank,setRank] =
    useState("");

  const [exam,setExam] =
    useState("JEE");

  const [results,setResults] =
    useState<any[]>([]);

  const handlePredict =
  async ()=>{

    const data =
      await predictCollege(
        Number(rank),
        exam
      );

    setResults(data);
  };

  return(
    <>
      <Navbar/>

      <div
      className="
      max-w-5xl
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
          College Predictor
        </h1>

        <div
        className="
        flex
        gap-4
        "
        >

          <select
          value={exam}
          onChange={(e)=>
            setExam(
              e.target.value
            )
          }
          className="
          border
          p-2
          rounded
          "
          >
            <option>
              JEE
            </option>

            <option>
              NEET
            </option>
          </select>

          <input
          type="number"
          placeholder="Rank"

          value={rank}

          onChange={(e)=>
            setRank(
              e.target.value
            )
          }

          className="
          border
          p-2
          rounded
          "
          />

          <button
          onClick={
            handlePredict
          }
          className="
          bg-black
          text-white
          px-4
          py-2
          rounded
          "
          >
            Predict
          </button>

        </div>

        <div className="mt-8">

          {
            results.map(
              (item)=>(
                <div
                key={item.id}
                className="
                border
                p-4
                rounded
                mb-3
                "
                >

                  <h2
                  className="
                  text-xl
                  font-semibold
                  "
                  >
                    {
                      item.college.name
                    }
                  </h2>

                  <p>
                    Rank:
                    {item.rank}
                  </p>

                  <p>
                    {
                      item.college.location
                    }
                  </p>

                </div>
              )
            )
          }

        </div>

      </div>
    </>
  );
}