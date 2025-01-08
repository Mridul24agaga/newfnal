interface CircularProgressProps {
    value: number;
    label: string;
    color: string;
  }
  
  export function CircularProgress({ value, label, color }: CircularProgressProps) {
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeDasharray={`${value}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
            {value}
          </div>
        </div>
        <span className="mt-2 text-sm font-medium text-gray-600">{label}</span>
      </div>
    )
  }
  
  