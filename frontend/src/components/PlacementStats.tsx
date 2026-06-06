export default function PlacementStats({
 placement
}:any){

 if(!placement)
 return null;

 return(

  <div
  className="
  grid
  md:grid-cols-4
  gap-4
  mt-8
  "
  >

   <div
   className="
   border
   rounded-xl
   p-5
   "
   >
    <p>
      Highest Package
    </p>

    <h2
    className="
    text-3xl
    font-bold
    "
    >
      ₹
      {
       placement.highestPackage
      }
      LPA
    </h2>
   </div>

   <div
   className="
   border
   rounded-xl
   p-5
   "
   >
    <p>
      Average Package
    </p>

    <h2
    className="
    text-3xl
    font-bold
    "
    >
      ₹
      {
       placement.averagePackage
      }
      LPA
    </h2>
   </div>

   <div
   className="
   border
   rounded-xl
   p-5
   "
   >
    <p>
      Placement Rate
    </p>

    <h2
    className="
    text-3xl
    font-bold
    "
    >
      {
       placement.placementRate
      }
      %
    </h2>
   </div>

   <div
   className="
   border
   rounded-xl
   p-5
   "
   >
    <p>
      Recruiters
    </p>

    <h2
    className="
    text-lg
    font-semibold
    "
    >
      {
       placement.recruiters
      }
    </h2>
   </div>

  </div>
 );
}