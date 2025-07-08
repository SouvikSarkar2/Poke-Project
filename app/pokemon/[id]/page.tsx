import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, Shield, Zap, Sword } from "lucide-react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  return { title: `Pokémon | ${params.id}` };
}

async function getPokemon(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: { revalidate: 3600 },
  });

  // Return null for any non-OK status (404, 429, …)
  if (!res.ok) return null;

  return res.json();
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

const statIcons = {
  hp: Heart,
  attack: Sword,
  defense: Shield,
  "special-attack": Zap,
  "special-defense": Shield,
  speed: Zap,
};

export default async function PokemonPage({
  params,
}: {
  params: { id: string };
}) {
  const pokemon = await getPokemon(params.id);

  // If the API didn't find it → trigger the app/not-found.tsx UI
  if (!pokemon) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Explorer
        </Link>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pokemon Image */}
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-8 mb-6">
                <Image
                  src={
                    pokemon.sprites.other["official-artwork"]?.front_default ||
                    pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                  width={300}
                  height={300}
                  className="w-64 h-64 object-contain"
                  unoptimized
                />
              </div>
              <h1 className="text-4xl font-bold text-white capitalize mb-2">
                {pokemon.name}
              </h1>
              <p className="text-white/80 text-lg">
                #{pokemon.id.toString().padStart(3, "0")}
              </p>
            </div>

            {/* Pokemon Info */}
            <div className="space-y-6">
              {/* Types */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Type</h2>
                <div className="flex gap-2">
                  {pokemon.types.map((type: any) => (
                    <span
                      key={type.type.name}
                      className={`${
                        typeColors[type.type.name] || "bg-gray-400"
                      } text-white px-3 py-1 rounded-full font-medium capitalize`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Physical Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-1">Height</h3>
                  <p className="text-white/80">{pokemon.height / 10} m</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-1">Weight</h3>
                  <p className="text-white/80">{pokemon.weight / 10} kg</p>
                </div>
              </div>

              {/* Abilities */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Abilities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability: any) => (
                    <span
                      key={ability.ability.name}
                      className="bg-white/20 text-white px-3 py-1 rounded-full text-sm capitalize"
                    >
                      {ability.ability.name.replace("-", " ")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Base Stats */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Base Stats
                </h2>
                <div className="space-y-3">
                  {pokemon.stats.map((stat: any) => {
                    const IconComponent =
                      statIcons[stat.stat.name as keyof typeof statIcons] ||
                      Heart;
                    const percentage = Math.min(
                      (stat.base_stat / 255) * 100,
                      100
                    );

                    return (
                      <div
                        key={stat.stat.name}
                        className="flex items-center gap-3"
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm capitalize font-medium">
                              {stat.stat.name.replace("-", " ")}
                            </span>
                            <span className="text-white/80 text-sm font-bold">
                              {stat.base_stat}
                            </span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Moves */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Moves</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-40 overflow-y-auto">
              {pokemon.moves.slice(0, 20).map((move: any) => (
                <span
                  key={move.move.name}
                  className="bg-white/10 text-white px-3 py-1 rounded-lg text-sm capitalize text-center"
                >
                  {move.move.name.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
