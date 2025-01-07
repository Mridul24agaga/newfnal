'use client'

interface ProgressCircleProps {
  percentage: number
  label: string
  color: string
}

export function ProgressCircle({ percentage, label, color }: ProgressCircleProps) {
  const circumference = 2 * Math.PI * 40 // radius = 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            className="stroke-gray-200"
            strokeWidth="8"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className={color}
            strokeWidth="8"
            strokeLinecap="round"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{percentage}</span>
        </div>
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  )
}

