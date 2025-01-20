'use client'

import { Check } from 'lucide-react'

interface PricingProps {
  uniqueId: string
}

export function PricingSection({ uniqueId }: PricingProps) {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses and startups',
      price: '87',
      features: [
        '50 Directory Submissions',
        'Basic SEO Analysis',
        '7-Day Delivery',
        '24/7 Priority Support'
      ],
      popular: false,
      paypalLink: 'https://www.paypal.com/paypalme/youraccount/87usd'
    },
    {
      name: 'Growth',
      description: 'Ideal for growing businesses',
      price: '119',
      features: [
        '100 Directory Submissions',
        'Advanced Landing Page and SEO Analysis',
        '7-Day Delivery',
        '24/7 Priority Support'
      ],
      popular: true,
      paypalLink: 'https://www.paypal.com/paypalme/youraccount/119usd'
    },
    {
      name: 'Enterprise',
      description: 'For businesses requiring maximum impact',
      price: '147',
      features: [
        '200 Directory Submissions',
        'Advanced Landing Page and SEO Analysis',
        '7-Day Delivery',
        '24/7 Priority Support'
      ],
      popular: false,
      paypalLink: 'https://www.paypal.com/paypalme/youraccount/147usd'
    }
  ]

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`relative rounded-lg ${
              plan.popular 
                ? 'bg-[#EA580C]' 
                : 'bg-white border border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 right-6 bg-[#F97316] text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            <div className="p-8">
              <h3 className={`text-2xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`mt-2 text-base ${plan.popular ? 'text-white' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  ${plan.price}
                </span>
                <span className={`ml-1 text-base ${plan.popular ? 'text-white' : 'text-gray-500'}`}>
                  / website
                </span>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`h-5 w-5 ${plan.popular ? 'text-white' : 'text-[#F97316]'}`} />
                    <span className={`ml-3 text-base ${plan.popular ? 'text-white' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href={plan.paypalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-3 px-6 rounded-lg text-base font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-white text-[#EA580C] hover:bg-gray-50' 
                      : 'bg-[#EA580C] text-white hover:bg-[#E03D12]'
                  }`}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

