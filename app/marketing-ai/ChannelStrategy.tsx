interface Channel {
    name: string;
    timeline: string;
    cost: string;
    roi: string;
  }
  
  interface ChannelStrategyProps {
    channelStrategies: Channel[];
  }
  
  export default function ChannelStrategy({ channelStrategies }: ChannelStrategyProps) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Channel Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {channelStrategies.map((channel, index) => (
            <div key={index} className="border p-4 rounded shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{channel.name}</h3>
              <p><strong>Timeline:</strong> <span className="text-gray-700">{channel.timeline}</span></p>
              <p><strong>Cost:</strong> <span className="text-gray-700">{channel.cost}</span></p>
              <p><strong>Expected ROI:</strong> <span className="text-gray-700">{channel.roi}</span></p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  