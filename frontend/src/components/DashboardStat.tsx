export default function DashboardStat({
 title,
 value
}:any){

 return(

  <div
  className="
  border
  rounded-xl
  p-6
  "
  >

   <p
   className="
   text-sm
   "
   >
    {title}
   </p>

   <h2
   className="
   text-4xl
   font-bold
   "
   >
    {value}
   </h2>

  </div>
 );
}