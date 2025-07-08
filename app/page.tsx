import { Suspense } from "react"
import PokemonGrid from "./components/PokemonGrid"
import SearchBar from "./components/SearchBar"
import LoadingGrid from "./components/LoadingGrid"

interface HomeProps {
  searchParams: {
    offset?: string
  }
}

export default function Home({ searchParams }: HomeProps) {
  const offset = Number.parseInt(searchParams.offset || "0", 10)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">Pokémon Explorer</h1>
          <p className="text-xl text-white/90 mb-8">Discover and explore the world of Pokémon</p>
          <SearchBar />
        </div>

        <Suspense fallback={<LoadingGrid />}>
          <PokemonGrid limit={20} offset={offset} />
        </Suspense>
      </div>
    </div>
  )
}
