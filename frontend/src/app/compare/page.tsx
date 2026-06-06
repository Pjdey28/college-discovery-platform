"use client";

import { useState } from "react";
import api from "../../services/axios";

export default function ComparePage() {

  const [ids, setIds] =
    useState("");

  const [data, setData] =
    useState([]);

  const compare = async () => {

    const res =
      await api.post(
        "/compare",
        {
          ids:
            ids
            .split(",")
            .map(
              (i) =>
                i.trim()
            ),
        }
      );

    setData(res.data);
  };

  return (
    <div className="p-6">

      <h1 className="text-4xl mb-4">
        Compare Colleges
      </h1>

      <input
        className="border p-2"
        placeholder="
        id1,id2,id3
        "
        value={ids}
        onChange={(e)=>
          setIds(
            e.target.value
          )
        }
      />

      <button
        className="
        bg-blue-500
        text-white
        p-2
        ml-2
        "
        onClick={compare}
      >
        Compare
      </button>

      <div className="mt-6">

        {data.map((c:any)=>(
          <div
            key={c.id}
            className="
            border
            p-4
            mb-2
            "
          >
            <h2>
              {c.name}
            </h2>

            <p>
              ₹{c.fees}
            </p>

            <p>
              {c.rating}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}