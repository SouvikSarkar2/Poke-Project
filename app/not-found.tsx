import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center">
        <div className="text-9xl font-bold text-white/20 mb-4">404</div>
        <h1 className="text-4xl font-bold text-white mb-4">Pokémon Not Found</h1>
        <p className="text-white/80 mb-8 text-lg">The Pokémon you're looking for seems to have escaped!</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Explorer
        </Link>
      </div>
    </div>
  )
}
