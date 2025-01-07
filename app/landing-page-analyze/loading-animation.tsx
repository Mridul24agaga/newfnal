export function LoadingAnimation() {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">Analyzing your landing page...</p>
          <p className="text-sm text-gray-500">This may take up to 7 minutes</p>
        </div>
      </div>
    )
  }
  
  