'use server'

import { nanoid } from 'nanoid'

export async function createOrder(formData: FormData) {
  const websiteUrl = formData.get('websiteUrl') as string
  const orderId = nanoid(10) // Generate a unique 10-character ID
  
  // In a real app, you would save this to a database
  // For now, we'll just return the generated URL
  
  return {
    success: true,
    orderId,
    url: `/order/${orderId}`
  }
}

