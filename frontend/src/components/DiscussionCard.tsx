"use client";

import { useState }
from "react";

import {
 addAnswer
}
from "../services/discussionService";

export default function DiscussionCard({
 discussion,
 reload
}:any){

 const [answer,
 setAnswer]
 = useState("");

 const submit =
 async()=>{

  await addAnswer(
   discussion.id,
   answer
  );

  setAnswer("");

  reload();
 };

 return(

  <div
  className="
  border
  rounded-xl
  p-6
  mb-6
  "
  >

   <h2
   className="
   text-2xl
   font-bold
   "
   >
    {discussion.title}
   </h2>

   <p
   className="
   mt-2
   "
   >
    {discussion.content}
   </p>

   <div
   className="
   mt-4
   "
   >

    <h3
    className="
    font-semibold
    mb-2
    "
    >
      Answers
    </h3>

    {
      discussion.answers
      ?.map(
        (a:any)=>(
          <div
          key={a.id}
          className="
          border-l-4
          pl-4
          mb-2
          "
          >
            {a.content}
          </div>
        )
      )
    }

   </div>

   <div
   className="
   mt-4
   flex
   gap-2
   "
   >

    <input
    value={answer}

    onChange={(e)=>
      setAnswer(
        e.target.value
      )
    }

    placeholder="Answer"

    className="
    border
    p-2
    flex-1
    rounded
    "
    />

    <button
    onClick={submit}

    className="
    bg-black
    text-white
    px-4
    rounded
    "
    >
      Reply
    </button>

   </div>

  </div>
 );
}