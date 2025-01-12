'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://btsviospebmgeezlwztr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c3Zpb3NwZWJtZ2Vlemx3enRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjkwODUsImV4cCI6MjA0OTE0NTA4NX0.V96q01xxjGM-rGh_CVgT7k3JoRjXyf6C-5KzL6TkmNw'

const supabase = createClient(supabaseUrl, supabaseKey)

export async function submitOnboardingForm(formData: FormData) {
  try {
    console.log('Submitting form data:', Object.fromEntries(formData))

    const { data, error } = await supabase
      .from('onboarding_form')
      .insert([
        {
          role: formData.get('role'),
          company_name: formData.get('companyName'),
          industry: formData.get('industry'),
          name: formData.get('name'),
          email: formData.get('email'),
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', JSON.stringify(error, null, 2))
      throw new Error(`Supabase error: ${error.message || 'Unknown error'}, Code: ${error.code}, Details: ${error.details}`)
    }

    if (!data) {
      throw new Error('No data returned from Supabase')
    }

    console.log('Form submitted successfully:', data)
    return data
  } catch (error) {
    console.error('Unexpected error:', error)
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error('An unexpected error occurred while submitting the form')
    }
  }
}

