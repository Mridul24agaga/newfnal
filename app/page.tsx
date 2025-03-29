import { Metadata } from 'next'
import Image from "next/image"
import Script from 'next/script'
import Hero from "@/app/components/Hero"
import TestimonialsSection from './components/testimonial'
import { DirectoriesSection } from './components/directories-section'
import ListingSection from './components/listing'
import BacklinkFeatures from './components/backlinkfeatures'
import WhyChooseSection from './components/whychooseus'
import ComparisonSection from './components/comparisonsection'
import TeamStats from './components/teamstats'
import FAQSection from './components/faq'
import EarlyBirdFooter from './components/cta'
import Footer from './components/footer'
import SenjaWidget from './components/senjawidget'
import Page from './components/backlink-build'
import SEOToolsDashboard from './components/seo-tools-dashboard'
import Testimonials from './components/testimonialcard'
import { PricingSection } from './components/pricing-section'
import CTASection from './components/cta-section'
import DirectoryListing from './components/directory-listing'
import CardGrid from './components/card-grid'

export const metadata: Metadata = {
  title: 'GetMoreBacklinks - Boost Your SEO with 500+ Directory Listings',
  description: 'List your website on 500+ directories to improve SEO, backlinks, ratings, and sales. Get instant traffic on your site, save days of manual work with just one click. Submit Your AI Startup To 100+ Plaƞorms In 7 Days',
  keywords: ['SEO', 'backlinks', 'directory listings', 'digital marketing', 'website promotion'],
  openGraph: {
    title: 'GetMoreBacklinks - Boost Your SEO with 500+ Directory Listings',
    description: 'List your website on 500+ directories to improve SEO, backlinks, ratings, and sales. Get instant traffic on your site, save days of manual work with just one click. Submit Your AI Startup To 100+ Plaƞorms In 7 Days',
    url: 'https://www.getmorebacklinks.org',
    siteName: 'GetMoreBacklinks',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'GetMoreBacklinks - Directory Listing Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GetMoreBacklinks - Boost Your SEO with 500+ Directory Listings',
    description: 'List your website on 500+ directories to improve SEO, backlinks, ratings, and sales. Get instant traffic on your site, save days of manual work with just one click. Submit Your AI Startup To 100+ Plaƞorms In 7 Days',
    images: ['/og.jpg'],
  },
  alternates: {
    canonical: 'https://www.getmorebacklinks.org',
    languages: {
      'en-US': 'https://www.getmorebacklinks.org',
    },
  },
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GetMoreBacklinks",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1000"
    },
    "description": "List your website on 500+ directories to improve SEO, backlinks, ratings, and sales.",
    "operatingSystem": "Web",
    "url": "https://www.getmorebacklinks.org",
    "author": {
      "@type": "Organization",
      "name": "GetMoreBacklinks",
      "url": "https://www.getmorebacklinks.org"
    },
    "sameAs": [
      "https://x.com/Innvisionagency",
      "https://www.linkedin.com/in/mridulthareja/"
    ]
  }

  return (
    <html lang="en">
      <body>
        <main>
          <Hero/>
          <Page/>
          <SEOToolsDashboard/>
          <DirectoryListing/>
          <CardGrid/>
          <PricingSection uniqueId="pricing" />
          <Testimonials/>
          <TeamStats/>
          <FAQSection/>
          <SenjaWidget/>

          <CTASection/>
         
          <Footer/>
        </main>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-VTWX7GVQ6X"/>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VTWX7GVQ6X');
          `}
        </Script>
        <Script async src="https://scripts.simpleanalyticscdn.com/latest.js"/>
      </body>
    </html>
  )
}

