import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import Footer from "../components/footer"

export const metadata: Metadata = {
  title: "Terms and Conditions | GetMoreBacklinks.org",
  description:
    "Read our Terms and Conditions to understand your rights and responsibilities when using GetMoreBacklinks.org services.",
  openGraph: {
    title: "Terms and Conditions | GetMoreBacklinks.org",
    description: "Understand your rights and responsibilities when using GetMoreBacklinks.org services.",
    url: "https://www.getmorebacklinks.org/terms-and-conditions",
    siteName: "GetMoreBacklinks.org",
    images: [
      {
        url: "https://www.getmorebacklinks.org/1.png",
        width: 1200,
        height: 630,
        alt: "GetMoreBacklinks.org Terms and Conditions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | GetMoreBacklinks.org",
    description: "Understand your rights and responsibilities when using GetMoreBacklinks.org services.",
    images: ["https://www.getmorebacklinks.org/1.png"],
  },
  alternates: {
    canonical: "https://www.getmorebacklinks.org/terms-and-conditions",
  },
}

export default function TermsAndConditions() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions | GetMoreBacklinks.org",
    description:
      "Read our Terms and Conditions to understand your rights and responsibilities when using GetMoreBacklinks.org services.",
    url: "https://www.getmorebacklinks.org/terms-and-conditions",
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: "GetMoreBacklinks.org",
      logo: {
        "@type": "ImageObject",
        url: "https://www.getmorebacklinks.org/logo.png",
      },
    },
    datePublished: "2024-12-01",
    dateModified: "2024-12-01",
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
       {/* Header */}
       <header className="border-b border-gray-200 relative bg-white z-10">
        <div className="container mx-auto px-4">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/getmorepacklinks.png"
                alt="getmorebacklinks"
                width={100}
                height={32}
                className="h-6 sm:h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/blogs"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/auth-form"
                className="text-xs sm:text-sm font-medium text-white bg-[#F36516] hover:bg-[#E55505] transition-colors px-4 py-2 rounded-full"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>


      <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-black">Terms and Conditions</h1>
              <p className="text-gray-600">Effective Date: December 1, 2024</p>
              <p className="text-gray-600">
                Owned and operated by MarkupX Brands Technologies Private Limited. Contact:{" "}
                <a href="mailto:founder@markupxbrands.com" className="text-orange-500 hover:underline">
                  founder@markupxbrands.com
                </a>
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing or using GetMoreBacklinks.org, you agree to comply with and be bound by these Terms and
                Conditions. If you do not agree, please refrain from using our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">2. Services Provided</h2>
              <p className="text-gray-700">
                GetMoreBacklinks.org offers directory submission services to improve your website's online visibility.
                Our services include submitting your website to quality directories and providing a detailed report as
                proof of submission. While we strive for accuracy and reliability, results may vary depending on the
                nature of your website, directories, and external factors like Google indexing.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                <p className="text-gray-700">
                  <strong>Indexing Disclaimer:</strong> Please note that Google indexing of submitted backlinks is
                  dependent on external factors and is not guaranteed as part of our service. Our role is to provide
                  directory submissions and proof of completion.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">3. User Responsibilities</h2>
              <p className="text-gray-700">
                Ensure that your submissions comply with legal, ethical, and regulatory standards. Provide accurate and
                up-to-date information. Do not misuse the service for spam, illegal, or malicious activities.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">4. Payment and Refund Policy</h2>
              <p className="text-gray-700">
                Payments must be made in advance to access our services. No refunds will be provided once the directory
                submission process has started. By using our services, you acknowledge and agree that the outcome,
                including Google indexing or ranking changes, is beyond our control and not guaranteed.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">5.Timeline for Results</h2>
              <p className="text-gray-700">
                After submission, users must wait 30–60 days for the full effects of the directory submission process.
                This is the average time it takes for search engines to crawl and recognize directory backlinks.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">6. Proof of Work</h2>
              <p className="text-gray-700">
                Upon completion of our services, we will provide a detailed report listing all the directories where
                your website was submitted. This report serves as proof that the agreed-upon service was delivered.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">7. Dispute Policy</h2>
              <p className="text-gray-700">
                Disputes regarding service delivery must be accompanied by specific evidence of non-performance.
              </p>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <strong>Our Work Guarantee:</strong> Our responsibility is limited to providing the directory
                  submission service as agreed. Proof of submission (the detailed report) serves as evidence of work
                  completion.
                </p>
                <p className="text-gray-700">
                  <strong>Indexing & Outcomes:</strong> Please understand that search engine indexing and the results of
                  directory submissions depend on external factors beyond our control, including search engine policies
                  and algorithms. These outcomes are not part of our service guarantee.
                </p>
                <div className="pl-4">
                  <p className="text-gray-700">
                    <strong>How We Handle Disputes:</strong>
                  </p>
                  <p className="text-gray-700">
                    We will provide all necessary proof (directory submission reports and records) to demonstrate
                    service delivery. If a dispute arises, customers must provide evidence that the agreed-upon service
                    was not performed.
                  </p>
                  <p className="text-gray-700">
                    <strong>Preventing Disputes:</strong> To avoid misunderstandings, please read these terms carefully
                    before using our services and contact us with any questions prior to placing an order.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">8. Data Security</h2>
              <p className="text-gray-700">
                We implement industry-standard security protocols to safeguard your information. However, no method is
                100% secure. You agree to use our services at your own risk.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">9.Third-Party Links</h2>
              <p className="text-gray-700">
                Our website may include links to third-party websites. We are not responsible for their content or
                privacy practices. We encourage you to review their terms and policies before interacting with them.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">10. Limitation of Liability</h2>
              <p className="text-gray-700">
                GetMoreBacklinks.org and MarkupX Brands Technologies Private Limited are not liable for any indirect,
                incidental, or consequential damages arising from service usage, or losses due to delays, errors, or
                omissions in the provided services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">11. Intellectual Property</h2>
              <p className="text-gray-700">
                All content on GetMoreBacklinks.org, including text, graphics, logos, and software, is owned by MarkupX
                Brands Technologies Private Limited and protected by applicable laws. You may not copy, reproduce, or
                distribute this content without prior permission.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">12. Modifications to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to update these terms at any time. Changes will be posted on this page, and
                continued use of the services constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-black">13. Contact Us</h2>
              <p className="text-gray-700">
                For any questions or concerns regarding these terms, contact us at{" "}
                <a href="mailto:founder@markupxbrands.com" className="text-orange-500 hover:underline">
                  founder@markupxbrands.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

