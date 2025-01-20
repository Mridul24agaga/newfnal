import React from 'react'
import Image from 'next/image'

export default function URLValidatorInfo() {
  return (
    <div className="mt-12 mb-24 border border-gray-200 rounded-lg p-8 bg-white max-w-3xl mx-auto">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Understanding URL Validation and Open Graph Data
        </h2>
        
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">What is URL Validation?</h3>
          <p className="text-gray-700 mb-4">
            URL validation is the process of verifying that a given URL is properly formatted and points to an accessible web resource. It's crucial for ensuring data integrity, improving user experience, and preventing errors in web applications.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Checks for proper URL syntax</li>
            <li>Verifies the existence of the domain</li>
            <li>Ensures the resource is accessible</li>
            <li>Helps prevent security vulnerabilities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">The Importance of Open Graph Data</h3>
          <p className="text-gray-700 mb-4">
            Open Graph (OG) is a protocol that enables any web page to become a rich object in a social graph. It's widely used by social media platforms to create informative previews when links are shared.
          </p>
          <div className="my-6">
            <Image
              src="/validate.png"
              alt="Example of Open Graph preview on social media"
              width={400}
              height={200}
              className="rounded-lg mx-auto"
            />
          </div>
          <p className="text-gray-700 mb-4">
            Key Open Graph properties include:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>og:title</strong> - The title of your page</li>
            <li><strong>og:type</strong> - The type of content (e.g., website, article)</li>
            <li><strong>og:image</strong> - An image URL to use in the preview</li>
            <li><strong>og:url</strong> - The canonical URL of your page</li>
            <li><strong>og:description</strong> - A brief description of the content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">How Our URL Validator Helps</h3>
          <p className="text-gray-700 mb-4">
            Our URL Validator tool combines URL validation with Open Graph data extraction:
          </p>
          <ol className="list-decimal pl-6 text-gray-700 space-y-2">
            <li>Enter a URL in the input field above</li>
            <li>We validate the URL structure and accessibility</li>
            <li>We fetch and display the Open Graph data for the URL</li>
            <li>You can review the OG data to ensure your links will appear correctly when shared</li>
          </ol>
          <p className="text-gray-700 mt-4">
            Use this tool to optimize your web pages for better visibility and engagement on social media platforms!
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            This professional-grade tool is provided free of charge. If you find it valuable, consider sharing it with your network!
          </p>
        </div>
      </div>
    </div>
  )
}

