'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '../lib/supabase'
import { directories } from '../data/directories'

export async function saveSelections(selectedDirectories: number[], userName: string, websiteUrl: string) {
  try {
    const csvContent = [
      'Name,Category,User Name,Website URL,Price', // Updated header
      ...selectedDirectories.map(id => {
        const dir = directories.find(d => d.id === id)
        return dir ? `"${dir.name}","${dir.category}","${userName}","${websiteUrl}","$75"` : '' // Updated content
      })
    ].join('\n')

    const sanitizedName = userName.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const sanitizedUrl = websiteUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase()

    const filename = `${sanitizedName}_${sanitizedUrl}_${Date.now()}.csv`

    const { data, error: uploadError } = await supabase
      .storage
      .from('200')
      .upload(filename, csvContent, {
        contentType: 'text/csv',
      })

    if (uploadError) {
      throw new Error(`Failed to upload file: ${uploadError.message}`)
    }

    revalidatePath('/')

    return { success: true, message: 'Selections saved successfully!' }
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to save selections. Please try again.'
    }
  }
}

