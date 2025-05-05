"use client"

import { Check, X } from "lucide-react"

interface PricingProps {
  uniqueId: string
}

export function PricingSection({ uniqueId }: PricingProps) {
  const plans = [
    {
      name: "Pro",
      description: "Perfect for small businesses and startups",
      price: "87",
      originalPrice: "265",
      discount: "67% off",
      features: [
        { text: "50 Backlink Submissions", included: true },
        { text: "Hand Picked Listings", included: true },
        { text: "Priority Email Support", included: true },
        { text: "Paid Platform List", included: false },
        { text: "SEO report", included: false },
        { text: "Landing page report", included: false },
        { text: "Personal Recommendation for SEO", included: false },
        { text: "Blogs: 0", included: false },
      ],
      popular: false,
      paypalLink: "https://www.paypal.com/ncp/payment/L45V8DSQVT3N6",
    },
    {
      name: "Advanced",
      description: "Ideal for growing businesses",
      price: "127",
      originalPrice: "385",
      discount: "67% off",
      features: [
        { text: "100 Backlink Submissions", included: true },
        { text: "25 Paid Platform List", included: true },
        { text: "Basic SEO report", included: true },
        { text: "Hand Picked Listings", included: true },
        { text: "Priority Email Support", included: true },
        { text: "Landing page report", included: false },
        { text: "Personal Recommendation for SEO", included: false },
        { text: "Blogs: 0", included: false },
      ],
      popular: false,
      paypalLink: "https://www.paypal.com/ncp/payment/CMM6QF99TTNEY",
    },
    {
      name: "Business",
      description: "For businesses seeking enhanced performance",
      price: "187",
      originalPrice: "567",
      discount: "67% off",
      features: [
        { text: "200 Backlink Submissions", included: true },
        { text: "50 Paid Platform List", included: true },
        { text: "Basic SEO report", included: true },
        { text: "Basic Landing page report", included: true },
        { text: "Personal Recommendation for SEO", included: true },
        { text: "Hand Picked Listings", included: true },
        { text: "Priority Email Support", included: true },
        { text: "Blogs: 0", included: false },
      ],
      popular: true,
      paypalLink: "https://www.paypal.com/ncp/payment/VK6EF5V9RT5V8",
    },
    {
      name: "Starter",
      description: "For businesses requiring maximum impact",
      price: "247",
      originalPrice: "750",
      discount: "67% off",
      features: [
        { text: "200 Backlink Submissions", included: true },
        { text: "75 Paid Platform List", included: true },
        { text: "Basic SEO report", included: true },
        { text: "Basic Landing page report", included: true },
        { text: "Personal Recommendation for SEO", included: true },
        { text: "Hand Picked Listings", included: true },
        { text: "Priority Email Support", included: true },
        { text: "5 Blogs", included: true },
      ],
      popular: false,
      paypalLink: "https://www.paypal.com/ncp/payment/9ALKHKQNNS6FU",
    },
  ]

  return (
    <section id={uniqueId} className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Choose Your Plan</h2>
        <p className="mt-4 text-xl text-gray-600">
          Boost your online presence with our tailored backlink submission packages
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4 max-w-[1400px] mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl transition-all duration-200 hover:shadow-lg ${
              plan.popular ? "shadow-lg ring-2 ring-[#EA580C]" : "border border-gray-200 hover:border-[#EA580C]/50"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-5 inset-x-0 flex justify-center">
                <div className="bg-[#EA580C] text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                  Most Popular
                </div>
              </div>
            )}
            <div className={`h-full flex flex-col ${plan.popular ? "bg-[#EA580C] rounded-2xl text-white" : ""}`}>
              <div className="p-6 pb-0">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className={`mt-2 ${plan.popular ? "text-white/90" : "text-gray-600"}`}>{plan.description}</p>
              </div>

              <div className="p-6 pb-0">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className={`ml-2 text-base ${plan.popular ? "text-white/90" : "text-gray-500"}`}>
                    / website
                  </span>
                </div>
                <div className={`mt-1 ${plan.popular ? "text-white/90" : "text-gray-500"}`}>
                  <span className="line-through">${plan.originalPrice}</span>
                  <span className="ml-2 font-medium">{plan.discount}</span>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className={`h-5 w-5 mr-3 ${plan.popular ? "text-white" : "text-[#F97316]"}`} />
                      ) : (
                        <X className={`h-5 w-5 mr-3 ${plan.popular ? "text-white" : "text-red-500"}`} />
                      )}
                      <span className={`text-[15px] ${plan.popular ? "text-white" : "text-gray-600"}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={plan.paypalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-3 px-6 rounded-xl text-base font-medium transition-colors ${
                    plan.popular
                      ? "bg-white text-[#EA580C] hover:bg-gray-50"
                      : "bg-[#EA580C] text-white hover:bg-[#EA580C]/90"
                  }`}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Offer - Solo-Founder Plan */}
      <div className="max-w-4xl mx-auto mt-20 mb-8">
        <div className="text-center mb-8">
          <span className="inline-block bg-[#EA580C] text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md">
            Special Offer
          </span>
        </div>

        <div className="bg-gradient-to-br from-[#EA580C]/5 to-[#EA580C]/20 rounded-3xl border-2 border-[#EA580C] shadow-xl overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">Solo-Founder Plan</h3>
                <p className="mt-3 text-lg text-gray-600">
                  Limited time offer. Perfect for solopreneurs and founders looking to scale quickly.
                </p>

                <div className="mt-6">
                  <div className="flex items-center">
                    <span className="text-5xl font-bold text-[#EA580C]">$1499</span>
                  </div>
                  <div className="mt-1 text-gray-600">
                    <span className="line-through">Original price: $2197 + $799 = $3996</span>
                  </div>
                  <div className="mt-1 font-semibold text-[#EA580C]">SAVE $2497</div>
                </div>

                <div className="mt-8">
                  <a
                    href="https://checkout.dodopayments.com/buy/pdt_CgE0m3XOryT3ujTl0pRjV?quantity=1&redirect_url=https://blogosocial.com%2Fafter-payment"
                    className="inline-block w-full md:w-auto text-center py-4 px-8 rounded-xl text-lg font-medium bg-[#EA580C] text-white hover:bg-[#EA580C]/90 transition-colors shadow-md"
                  >
                    Get Solo-Founder Plan
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Why Choose This Plan?</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-[#F97316] mt-0.5" />
                    <span className="text-[15px] text-gray-700">Complete solution for solo founders</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-[#F97316] mt-0.5" />
                    <span className="text-[15px] text-gray-700">62% discount on combined services</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-[#F97316] mt-0.5" />
                    <span className="text-[15px] text-gray-700">Combines content and directory services</span>
                  </li>
                </ul>

                <div className="mt-6 space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-[#F97316] mt-0.5" />
                    <span className="text-[15px] text-gray-700">200+ only high DA directory submissions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-[#F97316] mt-0.5" />
                    <span className="text-[15px] text-gray-700">X engagement from founders</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-[#F97316] mt-0.5" />
                    <span className="text-[15px] text-gray-700">30+ Paid directory list</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-[#F97316] mt-0.5" />
                    <span className="text-[15px] text-gray-700">SEO and landing page basic audit</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-[#F97316] mt-0.5" />
                    <span className="text-[15px] text-gray-700">60 blogs every month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-[#F97316] mt-0.5" />
                    <span className="text-[15px] text-gray-700">Dedicated manager support</span>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
