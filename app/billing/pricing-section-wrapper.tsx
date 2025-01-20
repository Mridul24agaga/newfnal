"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { PricingSection } from "@/app/components/pricing-section"

export function PricingSectionWrapper() {
  const searchParams = useSearchParams()
  const [uniqueId, setUniqueId] = useState("")

  useEffect(() => {
    const id = searchParams.get("id")
    if (id) {
      setUniqueId(id)
    }
  }, [searchParams])

  return <PricingSection uniqueId={uniqueId} />
}

