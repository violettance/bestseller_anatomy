"use client"

import { ChartViewer } from "@/components/chart-viewer"
import { TableOfContents } from "@/components/table-of-contents"
import { useEffect, useState } from "react"

export function AnatomyTab() {
  const [readabilityData, setReadabilityData] = useState<any>(null)
  const [quadrantData, setQuadrantData] = useState<any>(null)
  const [readingTimeData, setReadingTimeData] = useState<any>(null)
  const [pronounStyleData, setPronounStyleData] = useState<any>(null)
  const [chapterCountData, setChapterCountData] = useState<any>(null)
  const [ratingCountData, setRatingCountData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Define sections for the table of contents
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
    },
    {
      id: "open-door",
      title: "The Open Door",
    },
    {
      id: "cast-canvas",
      title: "The Cast and the Canvas",
    },
  ]

  useEffect(() => {
    // Load the chart data
    const loadChartData = async () => {
      try {
        // Load all chart data files
        const [
          readabilityResponse,
          quadrantResponse,
          readingTimeResponse,
          pronounStyleResponse,
          chapterCountResponse,
          ratingCountResponse,
        ] = await Promise.all([
          fetch("/data/charts/readability_flesch_kincaid.json"),
          fetch("/data/charts/readability_quadrant_chart.json"),
          fetch("/data/charts/average_reading_time_by_genre.json"),
          fetch("/data/charts/character_pronoun_style.json"),
          fetch("/data/charts/character_chapter_count_by_focus.json"),
          fetch("/data/charts/character_rating_count_by_focus.json"),
        ])

        if (!readabilityResponse.ok) {
          throw new Error(`Failed to load readability chart data: ${readabilityResponse.statusText}`)
        }

        if (!quadrantResponse.ok) {
          throw new Error(`Failed to load quadrant chart data: ${quadrantResponse.statusText}`)
        }

        if (!readingTimeResponse.ok) {
          throw new Error(`Failed to load reading time chart data: ${readingTimeResponse.statusText}`)
        }

        if (!pronounStyleResponse.ok) {
          throw new Error(`Failed to load pronoun style chart data: ${pronounStyleResponse.statusText}`)
        }

        if (!chapterCountResponse.ok) {
          throw new Error(`Failed to load chapter count chart data: ${chapterCountResponse.statusText}`)
        }

        if (!ratingCountResponse.ok) {
          throw new Error(`Failed to load rating count chart data: ${ratingCountResponse.statusText}`)
        }

        const readabilityData = await readabilityResponse.json()
        const quadrantData = await quadrantResponse.json()
        const readingTimeData = await readingTimeResponse.json()
        const pronounStyleData = await pronounStyleResponse.json()
        const chapterCountData = await chapterCountResponse.json()
        const ratingCountData = await ratingCountResponse.json()

        setReadabilityData(readabilityData)
        setQuadrantData(quadrantData)
        setReadingTimeData(readingTimeData)
        setPronounStyleData(pronounStyleData)
        setChapterCountData(chapterCountData)
        setRatingCountData(ratingCountData)
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
    <div className="relative">
      {/* Table of Contents */}
      <TableOfContents sections={sections} />

      {/* Main Content */}
      <div className="pt-4">
        <h1 id="introduction" className="text-3xl md:text-4xl font-bold mb-8 text-white leading-tight scroll-mt-32">
          The Bestseller's Blueprint: Unveiling the Secrets Behind Today's Most Captivating Stories
        </h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-white mb-8">
            What truly makes a book a bestseller? This project is designed to peel back the layers of 2024's most
            talked-about fiction, venturing beyond simple plot summaries. A unique analytical framework has been
            developed, enabling the examination of everything from the subtle dance of narrative tension and the rhythm
            of emotional journeys to the very structure of sentences and the sensory worlds painted by authors. Through
            a combination of deep textual analysis and real reader perceptions from StoryGraph, a quest is undertaken to
            decode the "DNA" of bestselling narratives. This exploration focuses on data-driven patterns and artistic
            choices that appear to transform a good story into an unforgettable, chart-topping experience.
          </p>

          <h2 id="open-door" className="text-xl md:text-2xl font-semibold mt-12 mb-6 text-white scroll-mt-32">
            The Open Door: How Bestsellers Make Complex Stories Approachable
          </h2>

          <p className="text-lg text-zinc-300 mb-8">
            Most bestselling books are written at a readability level between 4th and 5th grade, indicating that clear,
            accessible language is a defining trait of commercial literary success. This suggests that authors aiming
            for mass appeal tend to favor simplicity over complexity, making their narratives more digestible for a
            wider audience. The relatively narrow spread also implies a strategic alignment with the cognitive comfort
            zone of the general readership, where comprehension flows effortlessly without compromising narrative depth.
          </p>

          {/* First Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : readabilityData ? (
            <div className="mb-8">
              <ChartViewer chartData={readabilityData} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Second paragraph */}
          <p className="text-lg text-zinc-300 mb-8">
            The chart shows a clear trend: bestselling books overwhelmingly favor shorter texts written in simpler
            language. Two dominant clusters stand out - stories that are both easy to read and brief, and those that
            maintain moderate ease while still being concise. This pattern reveals something deeper than stylistic
            preference - it reflects an intentional calibration of cognitive effort. Authors and publishers seem to
            recognize that today's readers value clarity and pace; they want to engage emotionally without wading
            through dense or overly elaborate prose. In a saturated market, it's the stories that respect the reader's
            attention span—without sacrificing substance - that rise to the top.
          </p>

          {/* Second Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : quadrantData ? (
            <div className="mb-8">
              <ChartViewer chartData={quadrantData} height={450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Third paragraph */}
          <p className="text-lg text-zinc-300 mb-8">
            Genres like Fantasy, Historical Fiction, and Young Adult require significantly more reading time than the
            overall average of 9.57h, indicating their tendency toward longer or denser narratives. In contrast, Drama,
            Crime Fiction, and Magical Realism fall well below the average, suggesting relatively shorter or more
            accessible content.
          </p>

          {/* Third Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : readingTimeData ? (
            <div className="mb-8">
              <ChartViewer chartData={readingTimeData} height={450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Fourth section - Character and Narrative */}
          <h2 id="cast-canvas" className="text-xl md:text-2xl font-semibold mt-12 mb-6 text-white scroll-mt-32">
            The Cast and the Canvas: How Bestsellers Populate Rich Worlds with Resonant Characters
          </h2>

          <p className="text-lg text-zinc-300 mb-8">
            Narrative perspective choices in bestselling fiction suggest a strategic balance between intimacy and
            breadth. The dominance of "External Observer" and "Mixed Voice" styles points to a tendency among popular
            authors to maintain a certain emotional distance while offering selective interiority when needed. This
            hybrid approach may serve dual purposes: preserving narrative momentum while still enabling character-driven
            resonance. The lower prevalence of "Omniscient Narrator" implies a shift away from all-knowing perspectives
            toward more grounded, humanized storytelling. In essence, bestselling narratives appear to favor a
            controlled proximity - close enough for empathy, distant enough for scale.
          </p>

          {/* Fourth Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : pronounStyleData ? (
            <div className="mb-8">
              <ChartViewer chartData={pronounStyleData} height={450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Fifth paragraph - Chapter Count by Narrative Focus */}
          <p className="text-lg text-zinc-300 mb-8">
            Books with a plot driven narrative focus tend to have significantly more chapters on average than those with
            character driven or mixed structures. This suggests that plot-oriented stories may rely on frequent
            structural breaks - such as cliffhangers or pacing pivots - to sustain momentum and keep readers engaged. In
            contrast, character-focused narratives might favor longer, more immersive chapters to allow deeper
            psychological or emotional development within each section.
          </p>

          {/* Fifth Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : chapterCountData ? (
            <div className="mb-8">
              <ChartViewer chartData={chapterCountData} height={450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Sixth paragraph - Rating Count by Narrative Focus */}
          <p className="text-lg text-zinc-300 mb-8">
            Character-driven novels generate substantially higher reader engagement - measured by median rating counts
            than mixed or plot-driven narratives. This pattern implies that when a story leans into the inner lives and
            relationships of its characters, readers feel more compelled to respond and discuss, whereas purely
            plot-focused works may maintain momentum but sacrifice the deeper personal connection that drives ongoing
            interaction.
          </p>

          {/* Sixth Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : ratingCountData ? (
            <div className="mb-8">
              <ChartViewer chartData={ratingCountData} height={450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[400px] flex items-center justify-center mb-8">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
