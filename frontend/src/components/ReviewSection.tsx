"use client";

import { useEffect }
from "react";

import { useState }
from "react";

import api
from "../services/axios";

export default function ReviewSection({
 collegeId
}:{
 collegeId:string
}){

 const [reviews,
 setReviews]
 = useState<any[]>([]);

 const [comment,
 setComment]
 = useState("");

 const [rating,
 setRating]
 = useState(5);

 const load =
 async()=>{

  const res =
  await api.get(
   `/reviews/${collegeId}`
  );

  setReviews(
   res.data
  );
 };

 useEffect(()=>{
  load();
 },[]);

 const submit =
 async()=>{

  await api.post(
   "/reviews",
   {
    collegeId,
    comment,
    rating
   }
  );

  setComment("");

  load();
 };

 return(

  <div
  className="
  mt-12
  "
  >

   <h2
   className="
   text-2xl
   font-bold
   mb-4
   "
   >
    Reviews
   </h2>

   <textarea
   value={comment}

   onChange={(e)=>
   setComment(
    e.target.value
   )
   }

   className="
   border
   p-3
   w-full
   rounded
   "
   />

   <button
   onClick={submit}

   className="
   mt-3
   bg-black
   text-white
   px-4
   py-2
   rounded
   "
   >
    Submit Review
   </button>

   <div
   className="
   mt-6
   "
   >

    {
      reviews.map(
       (review)=>(
        <div
        key={review.id}

        className="
        border
        p-4
        mb-3
        rounded
        "
        >
          <p>
            ⭐
            {review.rating}
          </p>

          <p>
            {review.comment}
          </p>
        </div>
       )
      )
    }

   </div>

  </div>
 );
}