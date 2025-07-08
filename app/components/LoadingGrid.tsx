export default function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 animate-pulse">
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-24 h-24 mx-auto mb-4" />
            <div className="bg-white/20 h-4 rounded mb-2" />
            <div className="bg-white/20 h-3 rounded w-16 mx-auto mb-3" />
            <div className="flex justify-center gap-1">
              <div className="bg-white/20 h-6 w-16 rounded-full" />
              <div className="bg-white/20 h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
