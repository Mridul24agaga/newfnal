import { Search } from "lucide-react"

interface DirectoryEntry {
  name: string
  category: string
  cost: string
}

export function DirectoryCard() {
  const directories: DirectoryEntry[] = [
    { name: "BetaList", category: "Startup Directory", cost: "Free" },
    { name: "Geekwire", category: "Startup News/Directory", cost: "Free" },
    { name: "AlternativeTo", category: "Software/Tool Directory", cost: "Free" },
    { name: "Stackshare", category: "Software/Tool Directory", cost: "Free" },
    { name: "Tool Pilot", category: "Software/Tool Directory", cost: "Free" },
    
  ]

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 flex flex-col">
      <h3 className="text-2xl sm:text-3xl font-bold mb-2">
        <span className="text-[#FF5C00]">20+ hours</span> → <span className="text-[#FF5C00]">20 minutes</span>
      </h3>
      <p className="text-gray-600 mb-6">
        Find high quality, relevant backlinks for your site and email asking for a backlink, all in one platform.
      </p>
      <div className="flex-grow">
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div className="text-gray-600">Name</div>
          <div className="text-gray-600">Category</div>
          <div className="text-gray-600">Cost</div>
        </div>
        <div className="space-y-3">
          {directories.map((entry, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <div className="text-[#FF5C00] hover:underline cursor-pointer">{entry.name}</div>
              <div className="text-gray-600">{entry.category}</div>
              <div className="text-gray-600">{entry.cost}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full mt-6 bg-[#FF5C00] text-white rounded-full py-3 px-4 font-medium flex items-center justify-center gap-2 hover:bg-[#E65500] transition-colors">
        <Search className="w-4 h-4" />
        Find Backlinks On Auto Pilot
      </button>
    </div>
  )
}

