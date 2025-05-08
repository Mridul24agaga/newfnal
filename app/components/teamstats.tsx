import { ArrowUpRight } from 'lucide-react'
import TeamMembers from './team-members'

export default function TeamStats() {
  return (
    <div id="founders" className="bg-white py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-3xl p-6 sm:p-8 md:p-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300"></div>
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <h3 className="text-xs sm:text-sm font-semibold text-orange-500 mb-2 sm:mb-4 uppercase tracking-wider">Meet the Team</h3>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
              Built by Founders, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">for Founders</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-16 leading-relaxed">
              We've been in your shoes. We understand the challenges of scaling startups and
              the critical role of organic growth.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                { number: "15+", text: "Startups Scaled" },
                { number: "$10M+", text: "Revenue Generated for clients" },
                { number: "3", text: "Successful Exits" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-600">
                      {stat.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-orange-100 rounded-full -mr-16 sm:-mr-32 -mb-16 sm:-mb-32 opacity-50"></div>
          <div className="absolute top-1/2 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-orange-100 rounded-full -ml-8 sm:-ml-16 -mt-8 sm:-mt-16 opacity-50"></div>
        </div>

        {/* Team Members Section */}
        <TeamMembers />
      </div>
    </div>
  )
}

