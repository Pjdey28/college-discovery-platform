"use client";

import { useEffect } from "react";
import { useState } from "react";

import Navbar
from "../../components/Navbar";
import DiscussionCard
from "../../components/DiscussionCard";

import {
  getDiscussions,
  createDiscussion,
  addAnswer,
}
from "../../services/discussionService";

export default function DiscussionsPage() {

  const [title,setTitle] =
    useState("");

  const [content,setContent] =
    useState("");

  const [discussions,
    setDiscussions] =
    useState<any[]>([]);

  const loadDiscussions =
  async ()=>{

    const data =
      await getDiscussions();

    setDiscussions(data);
  };

  useEffect(()=>{
    loadDiscussions();
  },[]);

  const create =
  async ()=>{

    await createDiscussion(
      title,
      content
    );

    setTitle("");
    setContent("");

    loadDiscussions();
  };

  return(
    <>
      <Navbar/>

      <div
      className="
      max-w-6xl
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
          Discussions
        </h1>

        <div
        className="
        border
        rounded-xl
        p-6
        mb-8
        "
        >

          <input
          placeholder="Question Title"

          value={title}

          onChange={(e)=>
            setTitle(
              e.target.value
            )
          }

          className="
          border
          p-3
          w-full
          mb-4
          rounded
          "
          />

          <textarea
          placeholder="Question"

          value={content}

          onChange={(e)=>
            setContent(
              e.target.value
            )
          }

          className="
          border
          p-3
          w-full
          h-32
          rounded
          "
          />

          <button
          onClick={create}

          className="
          mt-4
          bg-black
          text-white
          px-4
          py-2
          rounded
          "
          >
            Post Question
          </button>

        </div>

        {
          discussions.map(
            (discussion)=>(
              <DiscussionCard
                key={
                  discussion.id
                }
                discussion={
                  discussion
                }
                reload={
                  loadDiscussions
                }
              />
            )
          )
        }

      </div>
    </>
  );
}