import { getPokemonList } from "@/lib/pokemon-api";
import PokemonCard from "./PokemonCard";
import LoadMoreButton from "./LoadMoreButton";
import ErrorDisplay from "./ErrorDisplay";

interface PokemonGridProps {
  limit?: number;
  offset?: number;
}

export default async function PokemonGrid({
  limit = 20,
  offset = 0,
}: PokemonGridProps) {
  const pokemonList = await getPokemonList(limit, offset);

  if (!pokemonList) {
    return <ErrorDisplay />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemonList.results.map((pokemon, index) => {
          const id = offset + index + 1; // Calculate correct Pokemon ID
          return (
            <PokemonCard
              key={pokemon.name}
              pokemon={{
                id,
                name: pokemon.name,
                sprites: {
                  front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                  other: {
                    "official-artwork": {
                      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                    },
                  },
                },
                types: [], // We'll load this on the detail page
              }}
            />
          );
        })}
      </div>

      {pokemonList.results.length === limit && (
        <LoadMoreButton currentOffset={offset} limit={limit} />
      )}
    </div>
  );
}
