import Link from "next/link";
import { College } from "../types/college";
import api from "../services/axios";
import {
 useCompareStore
}
from "../store/compareStore";
export default function CollegeCard({
  college,
}: {
  college: College;
}) {
    const addCollege =
useCompareStore(
 state =>
 state.addCollege
);

  return (
    <Link
      href={`/colleges/${college.id}`}
    >
      <div
        className="
        border
        rounded-xl
        p-4
        shadow-sm
        hover:shadow-lg
        transition
        bg-white
      "
      >
        <h2
          className="
          text-xl
          font-bold
          mb-2
        "
        >
          {college.name}
        </h2>

        <p>{college.location}</p>

        <p>
          Fees:
          ₹
          {college.fees.toLocaleString()}
        </p>

        <p>
          Rating:
          {college.rating}
        </p>
        <button
onClick={async(e)=>{

 e.preventDefault();

 await api.post(
  "/saved",
  {
   collegeId:
   college.id
  }
 );
}}
className="
mt-3
bg-black
text-white
px-3
py-1
rounded
"
>
Save
</button>
<button
onClick={(e)=>{

 e.preventDefault();

 addCollege(college);

}}
className="
mt-2
ml-2
bg-blue-600
text-white
px-3
py-1
rounded
"
>
Compare
</button>
      </div>

    </Link>
  );
}