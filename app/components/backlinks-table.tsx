interface BacklinkEntry {
    name: string
    category: string
    cost: string
    url?: string
  }
  
  export function BacklinksTable() {
    const backlinks: BacklinkEntry[] = [
      { name: "BetaList", category: "Startup Directory", cost: "Free" },
      { name: "Geekwire", category: "Startup News/Directory", cost: "Free" },
      { name: "AlternativeTo", category: "Software/Tool Directory", cost: "Free" },
      { name: "ToolPilot", category: "Software/Tool Directory", cost: "Free" },
      { name: "GptForge", category: "Software/Tool Directory", cost: "Free" },
      { name: "ToolGuru", category: "Software/Tool Directory", cost: "Free" },


    ]
  
    return (
      <div className="w-full">
        <div className="grid grid-cols-3 gap-4 py-2 text-sm text-gray-600">
          <div>Name</div>
          <div>Category</div>
          <div>Cost</div>
        </div>
        <div>
          {backlinks.map((entry, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 py-2 text-sm">
              <div className="text-orange-500 hover:underline cursor-pointer">{entry.name}</div>
              <div className="text-gray-600">{entry.category}</div>
              <div className="text-gray-600">{entry.cost}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  