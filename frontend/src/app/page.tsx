import Link from "next/link";

import Navbar
from "../components/Navbar";
import DashboardStat from '../components/DashboardStat';
import TrendingColleges from "../components/TrendingColleges";
export default function Home() {

  return (
    <>
      <Navbar />

      <main
        className="
        flex
        flex-col
        items-center
        justify-center
        h-[80vh]
      "
      >

        <h1
          className="
          text-6xl
          font-bold
          mb-4
        "
        >
          College Discovery Platform
        </h1>

        <p
          className="
          text-gray-600
          mb-6
        "
        >
          Find the right college
        </p>

        <Link
          href="/colleges"
          className="
          px-6
          py-3
          bg-black
          text-white
          rounded-lg
        "
        >
          Explore Colleges
        </Link>
        <TrendingColleges/>
        <DashboardStat
 title="Colleges"
 value="300+"
/>

<DashboardStat
 title="Students"
 value="50K+"
/>

<DashboardStat
 title="Reviews"
 value="10K+"
/>

<DashboardStat
 title="Placement Records"
 value="100%"
/>

      </main>
    </>
  );
}