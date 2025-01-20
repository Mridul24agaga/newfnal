'use client'

export function DomainAuthorityCircle({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 16 // r=16
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-12 h-12 transform -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r="16"
          cx="24"
          cy="24"
        />
        <circle
          className="text-green-500"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="16"
          cx="24"
          cy="24"
        />
      </svg>
      <span className="absolute text-sm font-semibold">{score}</span>
    </div>
  )
}

