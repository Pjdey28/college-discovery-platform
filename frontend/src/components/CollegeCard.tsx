import Link from "next/link";
import { College } from "../types/college";

export default function CollegeCard({
  college,
}: {
  college: College;
}) {

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
      </div>
    </Link>
  );
}