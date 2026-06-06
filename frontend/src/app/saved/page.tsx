"use client";

import { useEffect } from "react";
import { useState } from "react";

import Navbar from "../../components/Navbar";

import api from "../../services/axios";

export default function SavedPage() {

  const [saved, setSaved] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchSaved();

  }, []);

  const fetchSaved =
    async () => {

      try {

        const res =
          await api.get(
            "/saved"
          );

        setSaved(
          res.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
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
          Saved Colleges
        </h1>

        {
          loading &&
          <p>
            Loading...
          </p>
        }

        <div
          className="
          grid
          md:grid-cols-3
          gap-6
          "
        >

          {
            saved.map(
              (item) => (

                <div
                  key={item.id}
                  className="
                  border
                  rounded-xl
                  p-4
                  "
                >

                  <h2
                    className="
                    text-xl
                    font-bold
                    "
                  >
                    {
                      item.college.name
                    }
                  </h2>

                  <p>
                    {
                      item.college.location
                    }
                  </p>

                  <p>
                    ₹
                    {
                      item.college.fees
                    }
                  </p>

                  <p>
                    Rating:
                    {
                      item.college.rating
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