export default function PlacementStats({ placement }: any) {
  if (!placement) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
        Placement Records
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Highest Package
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-600">
            ₹{Math.round(placement.highestPackage)} <span className="text-sm font-medium text-gray-500">LPA</span>
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Average Package
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-600">
            ₹{Math.round(placement.averagePackage)} <span className="text-sm font-medium text-gray-500">LPA</span>
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Placement Rate
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-600">
            {Math.round(placement.placementRate)}%
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Top Recruiters
          </p>
          <h2 className="text-lg font-bold text-indigo-600 mt-1 line-clamp-2">
            {Array.isArray(placement.recruiters) ? placement.recruiters.join(", ") : placement.recruiters}
          </h2>
        </div>
      </div>
    </div>
  );
}
