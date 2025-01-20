import Image from 'next/image'

export default function MetaDescriptionGeneratorInfo() {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div className="border border-gray-200 rounded-lg p-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Mastering Meta Descriptions for SEO Success
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            Meta descriptions are crucial for SEO and user engagement. They provide a brief summary of your page's content, appearing in search engine results. A well-crafted meta description can significantly improve click-through rates and drive more targeted traffic to your site.
          </p>
          <Image
            src="/meta.png"
            alt="Example of meta descriptions in search results"
            width={800}
            height={300}
            className="rounded-lg w-full"
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How to Use Our Meta Description Generator
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Input Your Content</h3>
              <p className="text-gray-800 text-lg leading-relaxed">
                Start by entering a brief description of your page content in the text area. Aim for 2-3 sentences that capture the essence of your page. Our AI will use this to generate optimized meta descriptions.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Generate Descriptions</h3>
              <p className="text-gray-800 text-lg leading-relaxed">
                Click the "Generate Descriptions" button. Our AI will analyze your input and create multiple meta description options, each optimized for SEO and user engagement.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Analyze and Choose</h3>
              <p className="text-gray-800 text-lg leading-relaxed">
                Review the generated descriptions. Each comes with scores for SEO, readability, engagement, and uniqueness. Choose the one that best fits your content and appeals to your target audience.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Implement and Monitor</h3>
              <p className="text-gray-800 text-lg leading-relaxed">
                Copy your chosen description and implement it on your website. Monitor its performance in search results and adjust as needed for optimal results.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Best Practices for Meta Descriptions
          </h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-800 text-lg">
            <li>Keep it between 150-160 characters to ensure it displays fully in search results.</li>
            <li>Include your primary keyword naturally within the description.</li>
            <li>Make it actionable by including a call to action when appropriate.</li>
            <li>Ensure it accurately summarizes the page content to meet user expectations.</li>
            <li>Avoid duplicate meta descriptions across your site; each should be unique.</li>
            <li>Use natural language and avoid keyword stuffing for better user experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Meta Descriptions Matter
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-800 text-lg leading-relaxed mb-4">
              While meta descriptions are not a direct ranking factor, they play a crucial role in your SEO strategy:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800">
              <li>Improve click-through rates from search results</li>
              <li>Provide a preview of your content to searchers</li>
              <li>Help search engines understand your page content</li>
              <li>Contribute to better user experience and site engagement</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

