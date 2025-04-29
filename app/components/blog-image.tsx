"use client"

import { useState } from "react"
import Image from "next/image"

interface BlogImageProps {
  src: string
  alt: string
  fallbackSrc?: string
}

export default function BlogImage({ src, alt, fallbackSrc = "/writing-desk-inspiration.png" }: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
      onError={() => setImgSrc(fallbackSrc)}
    />
  )
}
