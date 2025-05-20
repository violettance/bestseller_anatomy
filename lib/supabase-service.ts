import { supabase } from "./supabase"

// Kitap başlığını Supabase formatına dönüştüren yardımcı fonksiyon
function formatBookTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Kitap metriklerini çekmek için fonksiyon
export async function fetchBookMetrics(bookTitle: string) {
  try {
    const formattedTitle = formatBookTitle(bookTitle)

    const { data, error } = await supabase.from("book_metrics").select("*").eq("book_title", formattedTitle).single()

    if (error) {
      console.error("Error fetching book metrics:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Failed to fetch book metrics:", error)
    throw error
  }
}

// Bölüm metriklerini çekmek için fonksiyon
export async function fetchChapterMetrics(bookTitle: string) {
  try {
    const formattedTitle = formatBookTitle(bookTitle)

    const { data, error } = await supabase
      .from("chapter_metrics")
      .select("*")
      .eq("book_title", formattedTitle)
      .order("chapter_number", { ascending: true })

    if (error) {
      console.error("Error fetching chapter metrics:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Failed to fetch chapter metrics:", error)
    throw error
  }
}

// Kitap ve bölüm metriklerini birlikte çekmek için fonksiyon
export async function fetchAllBookData(bookTitle: string) {
  try {
    const bookMetrics = await fetchBookMetrics(bookTitle)
    const chapterMetrics = await fetchChapterMetrics(bookTitle)

    return {
      bookMetrics,
      chapterMetrics,
    }
  } catch (error) {
    console.error("Failed to fetch all book data:", error)
    throw error
  }
}
