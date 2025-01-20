'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Alex Chen',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'After using the backlink directory, our Domain Rating jumped from 15 to 45 in just 3 months. The impact on our organic traffic has been phenomenal!',
    stats: 'DR 15 → 45'
  },
  {
    name: 'Sarah Williams',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'We got featured on 50+ high-authority websites thanks to the directory submissions. Our organic traffic increased by 300% and our DR went from 20 to 55.',
    stats: 'DR 20 → 55'
  },
  {
    name: 'Mike Peterson',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'The automated submission process got us listed on multiple DA90+ directories. Our backlink profile improved significantly, pushing our DR from 30 to 62.',
    stats: 'DR 30 → 62'
  },
  {
    name: 'Emily Rodriguez',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'Our startup gained instant credibility with listings on top-tier directories. We saw a 150% increase in referral traffic and our DR shot up from 10 to 40.',
    stats: 'DR 10 → 40'
  },
  {
    name: 'David Kim',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'The diversity of backlinks we gained was impressive. Our DR increased from 25 to 58, and we\'re now ranking for competitive keywords we couldn\'t touch before.',
    stats: 'DR 25 → 58'
  },
  {
    name: 'Lisa Thompson',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'The SEO boost from the directory submissions was immediate. Our organic search visibility improved by 200%, and our DR went from 18 to 52.',
    stats: 'DR 18 → 52'
  },
  {
    name: 'Ryan Gosling',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'We were struggling to improve our DR for months. After using this service, it jumped from 22 to 50 in just a few months. The ROI has been incredible.',
    stats: 'DR 22 → 50'
  },
  {
    name: 'Sophia Lee',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'Our e-commerce site\'s DR increased from 35 to 68 after comprehensive directory submissions. This led to a 250% boost in organic traffic and sales.',
    stats: 'DR 35 → 68'
  },
  {
    name: 'Tom Harris',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'The quality of backlinks we received was outstanding. Our DR shot up from 28 to 60, and we\'ve seen a significant improvement in our SERP positions.',
    stats: 'DR 28 → 60'
  },
  {
    name: 'Emma Watson',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'As a new SaaS startup, we needed to build our online presence quickly. This service helped us go from a DR of 1 to 38 in record time. Game-changer!',
    stats: 'DR 1 → 38'
  },
  {
    name: 'Chris Evans',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'The impact on our local SEO was tremendous. Our DR increased from 15 to 48, and we\'re now dominating local search results for our key services.',
    stats: 'DR 15 → 48'
  },
  {
    name: 'Olivia Martinez',
    avatar: '/placeholder.svg?height=80&width=80',
    rating: 5,
    comment: 'We were skeptical at first, but the results speak for themselves. Our DR went from 20 to 57, and our organic traffic has more than quadrupled.',
    stats: 'DR 20 → 57'
  }
]

export function WallOfLove() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Real Results: Skyrocketing Domain Ratings
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See how our clients dramatically improved their SEO with our backlink directory
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-600">
                    {testimonial.comment}
                  </p>
                  <div className="inline-flex px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {testimonial.stats}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

