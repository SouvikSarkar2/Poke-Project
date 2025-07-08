import type { Pokemon, PokemonListResponse } from "./types"

const POKEMON_API_BASE = "https://pokeapi.co/api/v2"

export async function getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse | null> {
  try {
    const response = await fetch(`${POKEMON_API_BASE}/pokemon?limit=${limit}&offset=${offset}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error(`Pokemon API responded with ${response.status}`)
      return null
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Non-JSON response from Pokemon API")
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching Pokemon list:", error)
    return null
  }
}

export async function getPokemon(idOrName: string): Promise<Pokemon | null> {
  try {
    const response = await fetch(`${POKEMON_API_BASE}/pokemon/${idOrName}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return null
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching Pokemon:", error)
    return null
  }
}
