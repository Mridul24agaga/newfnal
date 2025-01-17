import { NextResponse } from 'next/server'
import { JSDOM } from 'jsdom'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    const response = await fetch(url)
    const html = await response.text()

    const dom = new JSDOM(html)
    const document = dom.window.document

    const getMetaContent = (property: string) => {
      const meta = document.querySelector(`meta[property="og:${property}"]`)
      return meta ? meta.getAttribute('content') : undefined
    }

    const ogData = {
      title: getMetaContent('title'),
      description: getMetaContent('description'),
      url: getMetaContent('url'),
      siteName: getMetaContent('site_name'),
      locale: getMetaContent('locale'),
      image: getMetaContent('image'),
      imageWidth: getMetaContent('image:width'),
      imageHeight: getMetaContent('image:height'),
      imageAlt: getMetaContent('image:alt'),
      type: getMetaContent('type'),
    }

    return NextResponse.json(ogData)
  } catch (error) {
    console.error('Error validating Open Graph:', error)
    return NextResponse.json({ error: 'Failed to validate Open Graph data' }, { status: 500 })
  }
}

