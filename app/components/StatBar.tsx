import type { LucideIcon } from "lucide-react"

interface StatBarProps {
  name: string
  value: number
  icon: LucideIcon
}

export default function StatBar({ name, value, icon: Icon }: StatBarProps) {
  const percentage = Math.min((value / 255) * 100, 100) // Max stat is usually around 255

  return (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-white" />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-white text-sm capitalize font-medium">{name.replace("-", " ")}</span>
          <span className="text-white/80 text-sm font-bold">{value}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
