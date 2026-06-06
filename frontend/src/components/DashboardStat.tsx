export default function DashboardStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 border border-transparent rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <h2 className="text-4xl font-extrabold text-white mb-2 relative z-10">
        {value}
      </h2>
      <p className="text-sm font-semibold text-indigo-100 uppercase tracking-wider relative z-10">
        {title}
      </p>
    </div>
  );
}
