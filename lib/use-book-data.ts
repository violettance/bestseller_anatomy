"use client"

import { useState, useEffect } from "react"
import { fetchAllBookData } from "./supabase-service"
import { mockBookMetrics, mockChapterMetrics } from "./mock-book-data"

export function useBookData(bookTitle: string | null, isUploaded = false) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [bookMetrics, setBookMetrics] = useState(mockBookMetrics)
  const [chapterMetrics, setChapterMetrics] = useState(mockChapterMetrics)
  const [isUsingMockData, setIsUsingMockData] = useState(true)

  useEffect(() => {
    // Eğer kitap yüklenmemişse mock data kullan
    if (!isUploaded || !bookTitle) {
      setIsUsingMockData(true)
      return
    }

    // Kitap yüklendiyse gerçek verileri çek
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data = await fetchAllBookData(bookTitle)

        // Veri başarıyla çekildiyse state'leri güncelle
        setBookMetrics(data.bookMetrics)
        setChapterMetrics(data.chapterMetrics)
        setIsUsingMockData(false)
      } catch (err) {
        console.error("Error fetching book data:", err)
        setError(err instanceof Error ? err : new Error("Failed to fetch book data"))
        // Hata durumunda mock data'ya geri dön
        setIsUsingMockData(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [bookTitle, isUploaded])

  // Dönüş değerleri
  return {
    isLoading,
    error,
    bookMetrics,
    chapterMetrics,
    isUsingMockData,
  }
}
