"use client"

import { ChartViewer } from "@/components/chart-viewer"
import { useEffect, useState } from "react"

export function AnatomyTab() {
  const [readabilityData, setReadabilityData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load the chart data
    const loadChartData = async () => {
      try {
        // Update the path to point to the public directory
        const response = await fetch("/data/charts/readability_flesch_kincaid.json")
        if (!response.ok) {
          throw new Error(`Failed to load chart data: ${response.statusText}`)
        }
        const data = await response.json()
        setReadabilityData(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load chart data:", error)
        setError(error instanceof Error ? error.message : "Unknown error")
        setIsLoading(false)
      }
    }

    loadChartData()
  }, [])

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
        The Bestseller's Blueprint: Unveiling the Secrets Behind Today's Most Captivating Stories
      </h1>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-white mb-6">
          What truly makes a book a bestseller? This project is designed to peel back the layers of 2024's most
          talked-about fiction, venturing beyond simple plot summaries. A unique analytical framework has been
          developed, enabling the examination of everything from the subtle dance of narrative tension and the rhythm of
          emotional journeys to the very structure of sentences and the sensory worlds painted by authors. Through a
          combination of deep textual analysis and real reader perceptions from StoryGraph, a quest is undertaken to
          decode the "DNA" of bestselling narratives. This exploration focuses on data-driven patterns and artistic
          choices that appear to transform a good story into an unforgettable, chart-topping experience.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-white">
          The Open Door: How Bestsellers Make Complex Stories Approachable
        </h2>

        <p className="text-lg text-zinc-300 mb-6">
          Most bestselling books are written at a readability level between 4th and 5th grade, indicating that clear,
          accessible language is a defining trait of commercial literary success. This suggests that authors aiming for
          mass appeal tend to favor simplicity over complexity, making their narratives more digestible for a wider
          audience. The relatively narrow spread also implies a strategic alignment with the cognitive comfort zone of
          the general readership, where comprehension flows effortlessly without compromising narrative depth.
        </p>

        {/* Chart with the same width as the text */}
        {isLoading ? (
          <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center">
            <p className="text-zinc-400">Loading chart data...</p>
          </div>
        ) : error ? (
          <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center">
            <p className="text-zinc-400">Error: {error}</p>
          </div>
        ) : readabilityData ? (
          <ChartViewer chartData={readabilityData} />
        ) : (
          <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center">
            <p className="text-zinc-400">No chart data available</p>
          </div>
        )}
      </div>
    </div>
  )
}
