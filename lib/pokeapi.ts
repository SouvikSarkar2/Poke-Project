export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

/**
 * GET https://pokeapi.co/api/v2/pokemon?limit=151
 * Gracefully handles the 429 “Too Many Requests” text response
 */
export async function getPokemonList(limit = 151, offset = 0): Promise<PokemonListResponse | null> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    { next: { revalidate: 3600 } }, // ISR -- revalidate once an hour
  )

  // Bail out early on any non-200 status
  if (!res.ok) {
    console.error(`[getPokemonList] PokeAPI responded with ${res.status}: ${await res.text()}`)
    return null
  }

  const contentType = res.headers.get("content-type")

  // Make sure the payload is JSON before calling .json()
  if (contentType && contentType.includes("application/json")) {
    return (await res.json()) as PokemonListResponse
  }

  // Anything else (HTML/text) → probably a rate-limit page
  console.error(`[getPokemonList] Unexpected content-type ${contentType}. Probably rate-limited.`)
  return null
}
