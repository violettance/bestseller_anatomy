import { createClient } from "@supabase/supabase-js"

// Use environment variables with fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Fetch chart data from Supabase storage
 * @param chartName Chart file name (without extension)
 * @returns Chart data
 */
export async function fetchChartData(chartName: string) {
  try {
    console.log(`Fetching chart: ${chartName}.json`)
    const { data, error } = await supabase.storage.from("charts").download(`/${chartName}.json`)

    if (error) {
      console.error(`Error fetching ${chartName}.json:`, error)
      throw new Error(`Failed to fetch chart data: ${error.message}`)
    }

    // Convert data to JSON
    const jsonData = await data.text()
    return JSON.parse(jsonData)
  } catch (error) {
    console.error(`Error loading chart data (${chartName}):`, error)
    throw error
  }
}

/**
 * Upload a book file to Supabase storage
 * @param fileName File name
 * @param file File to upload
 * @returns Upload result
 */
export async function uploadBookFile(fileName: string, file: File) {
  try {
    // First, make the bucket public if it's not already
    const { error: policyError } = await supabase.storage.from("books").getPublicUrl(fileName)

    // Upload with public read access
    const { data, error } = await supabase.storage.from("books").upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: "text/plain",
    })

    if (error) {
      console.error(`Error uploading ${fileName}:`, error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Upload error:", error)
    throw error
  }
}
