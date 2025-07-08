"use client"

import { useRouter } from "next/navigation"

interface LoadMoreButtonProps {
  currentOffset: number
  limit: number
}

export default function LoadMoreButton({ currentOffset, limit }: LoadMoreButtonProps) {
  const router = useRouter()

  const handleLoadMore = () => {
    const newOffset = currentOffset + limit
    const url = new URL(window.location.href)
    url.searchParams.set("offset", newOffset.toString())
    router.push(url.pathname + url.search)
  }

  return (
    <div className="text-center">
      <button
        onClick={handleLoadMore}
        className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full transition-colors font-medium backdrop-blur-md"
      >
        Load More Pokémon
      </button>
    </div>
  )
}
