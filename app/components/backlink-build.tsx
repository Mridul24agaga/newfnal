import Link from "next/link"
import Image from "next/image"

export default function Page() {
  const steps = [
    {
      number: "1",
      title: "Login and Explore Free SEO Tools",
      description: "Gain access to a suite of free SEO tools to kickstart your optimization journey.",
    },
    {
      number: "2",
      title: "Get Free Directory Lists",
      description: "Choose from our comprehensive directory list. Submit manually or use our automated submission option for faster results.",
    },
    {
      number: "3",
      title: "Fill Out the SaaS Form and Choose Expert Insights",
      description: "Our advanced contact finder locates accurate email addresses for your outreach targets.",
    },
    {
      number: "4",
      title: "Wait for 7 Days",
      description: "Allow us to process your data and deliver valuable insights tailored to your needs.",
    },
    {
      number: "5",
      title: "Act on Audit Insights",
      description: "Use the insights from our detailed audit report to refine your SEO strategy and achieve better results.",
    },
  ]

  return (
    <div  id="page" className="min-h-screen bg-white px-4 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#111827] rounded-[40px] p-8 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-white">
              Boost Your SEO with Getmorebacklinks in 5 easy steps
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
              Effortlessly enhance your SEO performance with GetMoreBacklinks. Follow these simple steps to improve your rankings and visibility online.
              </p>
              <div className="space-y-4">
                <Link
                  href="#"
                  className="inline-block bg-white hover:bg-gray-100 transition-colors px-6 py-3 rounded-lg font-semibold text-lg text-[#111827]"
                >
                  Get Started Now
                </Link>
                <p className="text-sm text-gray-400">Increase your backlinks and organic traffic by 300%</p>
              </div>
            </div>
            <div className="relative">
              <Image
                src={`/website.png`}
                alt="Abstract geometric shapes illustration"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="bg-gray-800 backdrop-blur-sm rounded-2xl p-6 space-y-3">
                <div className="bg-white text-[#111827] w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

