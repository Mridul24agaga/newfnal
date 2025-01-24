interface BacklinkCardProps {
    domain: string
    rating: number
    backlinks: string
    dofollow: number
    tiltDirection?: "left" | "right"
  }
  
  export function BacklinkCard({ domain, rating, backlinks, dofollow, tiltDirection }: BacklinkCardProps) {
    return (
      <div
        className={`bg-white rounded-lg p-6 relative w-full max-w-md transform transition-transform hover:scale-[1.02] border-2 border-gray-200 ${
          tiltDirection === "left" ? "-rotate-12" : tiltDirection === "right" ? "rotate-12" : ""
        }`}
      >
        <div className="absolute -right-1 -top-1">
          <div className="bg-[#F36516] text-[10px] text-white px-2 py-0.5 rounded-full transform rotate-12">PRO</div>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-lg">Backlink profile for {domain}</h4>
            <p className="text-gray-500 text-sm">Domain including subdomains. One link per domain</p>
          </div>
  
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Domain Rating</p>
              <div className="flex items-center gap-2">
                <div className="relative w-12 h-12">
                  <svg viewBox="0 0 36 36" className="w-12 h-12 transform -rotate-90">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="2.5"
                      className="stroke-[#FFE5D3]"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F36516"
                      strokeWidth="2.5"
                      strokeDasharray="75, 100"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold">{rating}</span>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Backlinks</p>
              <p className="text-3xl font-bold">{backlinks}</p>
              <p className="text-sm text-gray-500">{dofollow}% dofollow</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  