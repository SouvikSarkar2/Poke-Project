import Image from "next/image"
import Link from "next/link"

interface SimplePokemon {
  id: number
  name: string
  sprites: {
    front_default: string
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  types?: Array<{
    type: {
      name: string
    }
  }>
}

interface PokemonCardProps {
  pokemon: SimplePokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group">
        <div className="text-center">
          <div className="bg-white/20 rounded-full p-4 mb-4 group-hover:bg-white/30 transition-colors">
            <Image
              src={pokemon.sprites.other["official-artwork"]?.front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              width={120}
              height={120}
              className="w-24 h-24 object-contain mx-auto"
              unoptimized
            />
          </div>

          <h3 className="text-lg font-bold text-white capitalize mb-2">{pokemon.name}</h3>
          <p className="text-white/60 text-sm mb-3">#{pokemon.id.toString().padStart(3, "0")}</p>
        </div>
      </div>
    </Link>
  )
}
