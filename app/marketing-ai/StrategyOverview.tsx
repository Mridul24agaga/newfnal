interface AnalysisData {
    summary: string;
    modifications: string[];
  }
  
  interface StrategyOverviewProps {
    analysis: AnalysisData;
  }
  
  export default function StrategyOverview({ analysis }: StrategyOverviewProps) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Strategy Overview</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Analysis Summary</h3>
            <p className="text-gray-700">{analysis.summary}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Suggested Modifications</h3>
            <ul className="list-disc list-inside text-gray-700">
              {analysis.modifications.map((mod: string, index: number) => (
                <li key={index}>{mod}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  
  