interface Projections {
    totalCost: string;
    timeline: string;
    expectedVisitors: string;
    expectedPayingUsers: string;
    expectedRevenue: string;
  }
  
  interface AnalysisResultProps {
    implementationSteps: string[];
    projections: Projections;
  }
  
  export default function AnalysisResult({ implementationSteps, projections }: AnalysisResultProps) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Implementation Steps</h3>
          <ol className="list-decimal list-inside text-gray-700">
            {implementationSteps.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Projections</h3>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Total Cost:</strong> <span className="text-gray-700">{projections.totalCost}</span></p>
            <p><strong>Timeline:</strong> <span className="text-gray-700">{projections.timeline}</span></p>
            <p><strong>Expected Visitors:</strong> <span className="text-gray-700">{projections.expectedVisitors}</span></p>
            <p><strong>Expected Paying Users:</strong> <span className="text-gray-700">{projections.expectedPayingUsers}</span></p>
            <p><strong>Expected Revenue:</strong> <span className="text-gray-700">{projections.expectedRevenue}</span></p>
          </div>
        </div>
      </div>
    )
  }
  
  