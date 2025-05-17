import { createClient } from "@supabase/supabase-js"

// Check for environment variables with fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jgxwhdlwdvmzzcvxlgsc.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create Supabase client with error handling
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Disable session persistence for SSR
  },
})

/**
 * Fetch chart data from Supabase storage
 * @param chartName Chart file name (without extension)
 * @returns Chart data
 */
export async function fetchChartData(chartName: string) {
  try {
    console.log(`Fetching chart: ${chartName}.json`)

    // Check if Supabase client is properly initialized
    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase credentials are missing")
      throw new Error("Supabase configuration is incomplete")
    }

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
