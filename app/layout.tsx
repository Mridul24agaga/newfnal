import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import "./globals.css"

export const metadata: Metadata = {
  title: "GetMoreBacklinks - Boost Your SEO with 500+ Directory Listings",
  description:
    "List your website on 500+ directories to improve SEO, backlinks, ratings, and sales. Get instant traffic on your site, save days of manual work with just one click. Submit Your AI Startup To 100+ Plaƞorms In 7 Days",
  keywords: ["SEO", "backlinks", "directory listings", "digital marketing", "website promotion"],
  openGraph: {
    title: "GetMoreBacklinks - Boost Your SEO with 500+ Directory Listings",
    description:
      "List your website on 500+ directories to improve SEO, backlinks, ratings, and sales. Get instant traffic on your site, save days of manual work with just one click. Submit Your AI Startup To 100+ Plaƞorms In 7 Days",
    url: "https://www.getmorebacklinks.org",
    siteName: "GetMoreBacklinks",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "GetMoreBacklinks - Directory Listing Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetMoreBacklinks - Boost Your SEO with 500+ Directory Listings",
    description:
      "List your website on 500+ directories to improve SEO, backlinks, ratings, and sales. Get instant traffic on your site, save days of manual work with just one click. Submit Your AI Startup To 100+ Plaƞorms In 7 Days",
    images: ["/og.jpg"],
  },
  alternates: {
    canonical: "https://www.getmorebacklinks.org",
    languages: {
      "en-US": "https://www.getmorebacklinks.org",
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Twitter UWT Script */}
        <Script id="twitter-uwt" strategy="afterInteractive">
          {`
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','pe5ir');
          `}
        </Script>

        {/* Twitter Conversion Tracking Event Code */}
        <Script id="twitter-conversion" strategy="afterInteractive">
          {`
            // Insert Twitter Event ID
            twq('event', 'tw-pe5ir-pe5is', {
              value: null, // use this to pass the value of the conversion (e.g. 5.00)
              currency: null, // use this to pass the currency of the conversion with an ISO 4217 code (e.g. 'USD')
              contents: [ // use this to pass an array of products or content
                  // add all items to the array
                  // use this for the first item
                  {
                    content_type: null,
                    content_id: null,
                    content_name: null,
                    content_price: null,
                    num_items: null,
                    content_group_id: null
                  },
                  // use this for the second item
                  {
                    content_type: null,
                    content_id: null,
                    content_name: null,
                    content_price: null,
                    num_items: null,
                    content_group_id: null
                  }], 
              conversion_id: null, // use this to pass a unique ID for the conversion event for deduplication (e.g. order id '1a2b3c')
              email_address: null, // use this to pass a user's email address
              phone_number: null // phone number in E164 standard
            });
          `}
        </Script>
      </head>
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  )
}

