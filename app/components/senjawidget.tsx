'use client'

import Script from 'next/script'

export default function SenjaWidget() {
  return (
    <section className="bg-white py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        
        
      </div>
      <Script
          src="https://widget.senja.io/widget/7bf7ed8c-e190-427e-b4db-74c1a2958766/platform.js"
          strategy="afterInteractive"
        />
    </section>
  )
}

