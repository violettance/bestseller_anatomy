import { createClient } from "@supabase/supabase-js"

// Ortam değişkenlerini al
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Supabase client oluştur
const supabase = createClient(supabaseUrl, supabaseKey)

// Hem default hem named export yap
export default supabase
export { supabase }

/**
 * Supabase Storage'tan grafik datası çek
 * @param chartName Chart dosya adı (uzantısız)
 * @returns JSON formatında chart datası
 */
export async function fetchChartData(chartName: string) {
  try {
    console.log(`Fetching chart: ${chartName}.json`)
    const { data, error } = await supabase.storage
      .from("charts")
      .download(`${chartName}.json`)

    if (error) {
      console.error(`Error fetching ${chartName}.json:`, error)
      throw new Error(`Failed to fetch chart data: ${error.message}`)
    }

    const jsonText = await data.text()
    return JSON.parse(jsonText)
  } catch (error) {
    console.error(`Error loading chart data (${chartName}):`, error)
    throw error
  }
}

/**
 * Kitap dosyasını Supabase Storage'a yükler
 * @param fileName Yüklenecek dosya adı
 * @param file File nesnesi
 * @returns Upload sonucu
 */
export async function uploadBookFile(fileName: string, file: File) {
  try {
    // Public URL kontrolü yap
    const { error: policyError } = await supabase.storage
      .from("books")
      .getPublicUrl(fileName)

    if (policyError) {
      console.warn("Warning: No public URL. Check bucket policy.")
    }

    const { data, error } = await supabase.storage
      .from("books")
      .upload(fileName, file, {
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
