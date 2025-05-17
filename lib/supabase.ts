import { createClient } from "@supabase/supabase-js"

// Use environment variables without hardcoded fallbacks
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
