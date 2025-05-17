"use client"

import { ChartViewer } from "@/components/chart-viewer"
import { PodcastPlayer } from "@/components/podcast-player"
import { TableOfContents } from "@/components/table-of-contents"
import { useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/use-mobile"

export function AnatomyTab() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [readabilityData, setReadabilityData] = useState<any>(null)
  const [quadrantData, setQuadrantData] = useState<any>(null)
  const [readingTimeData, setReadingTimeData] = useState<any>(null)
  const [pronounStyleData, setPronounStyleData] = useState<any>(null)
  const [chapterCountData, setChapterCountData] = useState<any>(null)
  const [ratingCountData, setRatingCountData] = useState<any>(null)
  const [moodDistributionData, setMoodDistributionData] = useState<any>(null)
  const [structureApprovalData, setStructureApprovalData] = useState<any>(null)
  const [characterFeaturesData, setCharacterFeaturesData] = useState<any>(null)
  const [temporalEngagementData, setTemporalEngagementData] = useState<any>(null)
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
    {
      id: "spine-story",
      title: "The Spine of the Story",
    },
    {
      id: "flow-fiction",
      title: "The Flow of Fiction",
    },
  ]

  // Directly embed the temporal engagement data to avoid loading issues
  const embeddedTemporalEngagementData = {
    data: [
      {
        hovertemplate:
          "=%{x}\u003cbr\u003eAvg. Rating Count=%{marker.color}\u003cbr\u003erating_count_label=%{text}\u003cextra\u003e\u003c\u002fextra\u003e",
        legendgroup: "",
        marker: {
          color: [9000, 8000, 7000, 5000],
          coloraxis: "coloraxis",
          pattern: {
            shape: "",
          },
        },
        name: "",
        orientation: "v",
        showlegend: false,
        text: ["40k", "34k", "27k", "11k"],
        textposition: "outside",
        x: [
          "Low Motion & High Action",
          "High Motion & High Action",
          "High Motion & Low Action",
          "Low Motion & Low Action",
        ],
        xaxis: "x",
        y: [9000, 8000, 7000, 5000],
        yaxis: "y",
        type: "bar",
        cliponaxis: false,
      },
    ],
    layout: {
      xaxis: {
        anchor: "y",
        domain: [0.0, 1.0],
        title: {
          text: "",
        },
        showticklabels: true,
        tickfont: {
          color: "#e4e4e7",
        },
      },
      yaxis: {
        anchor: "x",
        domain: [0.0, 1.0],
        title: {
          text: "",
        },
        showticklabels: false,
        showgrid: false,
      },
      coloraxis: {
        colorbar: {
          title: {
            text: "Avg. Rating Count",
          },
        },
        colorscale: [
          [0.0, "#dcd7fa"],
          [0.5, "#b29ef2"],
          [1.0, "#8b5cf6"],
        ],
        showscale: false,
      },
      legend: {
        tracegroupgap: 0,
      },
      margin: {
        t: 60,
      },
      barmode: "relative",
      font: {
        size: 13,
        color: "#e4e4e7",
      },
      title: {
        text: "Reader Engagement by Narrative Dynamics",
        font: {
          color: "#e4e4e7",
          size: 16,
        },
      },
      paper_bgcolor: "rgba(39, 39, 42, 0.8)",
      plot_bgcolor: "rgba(39, 39, 42, 0.8)",
    },
  }

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
          moodDistributionResponse,
          structureApprovalResponse,
          characterFeaturesResponse,
        ] = await Promise.all([
          fetch("/data/charts/readability_flesch_kincaid.json"),
          fetch("/data/charts/readability_quadrant_chart.json"),
          fetch("/data/charts/average_reading_time_by_genre.json"),
          fetch("/data/charts/character_pronoun_style.json"),
          fetch("/data/charts/character_chapter_count_by_focus.json"),
          fetch("/data/charts/character_rating_count_by_focus.json"),
          fetch("/data/charts/character_mood_distribution.json"),
          fetch("/data/charts/structure_approval_engagement.json"),
          fetch("/data/charts/character_related_features.json"),
        ])

        // Check responses
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
        if (!moodDistributionResponse.ok) {
          throw new Error(`Failed to load mood distribution chart data: ${moodDistributionResponse.statusText}`)
        }
        if (!structureApprovalResponse.ok) {
          throw new Error(`Failed to load structure approval chart data: ${structureApprovalResponse.statusText}`)
        }
        if (!characterFeaturesResponse.ok) {
          throw new Error(`Failed to load character features chart data: ${characterFeaturesResponse.statusText}`)
        }

        // Parse JSON responses
        const readabilityData = await readabilityResponse.json()
        const quadrantData = await quadrantResponse.json()
        const readingTimeData = await readingTimeResponse.json()
        const pronounStyleData = await pronounStyleResponse.json()
        const chapterCountData = await chapterCountResponse.json()
        const ratingCountData = await ratingCountResponse.json()
        const moodDistributionData = await moodDistributionResponse.json()
        const structureApprovalData = await structureApprovalResponse.json()
        const characterFeaturesData = await characterFeaturesResponse.json()

        // Set state for existing data
        setReadabilityData(readabilityData)
        setQuadrantData(quadrantData)
        setReadingTimeData(readingTimeData)
        setPronounStyleData(pronounStyleData)
        setChapterCountData(chapterCountData)
        setRatingCountData(ratingCountData)
        setMoodDistributionData(moodDistributionData)
        setStructureApprovalData(structureApprovalData)
        setCharacterFeaturesData(characterFeaturesData)

        // Use the embedded temporal engagement data
        setTemporalEngagementData(embeddedTemporalEngagementData)

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
        <h1
          id="introduction"
          className={`${isMobile ? "text-2xl" : "text-3xl md:text-4xl"} font-bold mb-6 text-white leading-tight scroll-mt-32`}
        >
          The Bestseller's Blueprint: Unveiling the Secrets Behind Today's Most Captivating Stories
        </h1>

        <div className="prose prose-invert max-w-none">
          <p className={`${isMobile ? "text-base" : "text-lg"} text-white mb-6`}>
            What truly makes a book a bestseller? This project is designed to peel back the layers of 2024's most
            talked-about fiction, venturing beyond simple plot summaries. A unique analytical framework has been
            developed, enabling the examination of everything from the subtle dance of narrative tension and the rhythm
            of emotional journeys to the very structure of sentences and the sensory worlds painted by authors. Through
            a combination of deep textual analysis and real reader perceptions from StoryGraph, a quest is undertaken to
            decode the "DNA" of bestselling narratives. This exploration focuses on data-driven patterns and artistic
            choices that appear to transform a good story into an unforgettable, chart-topping experience.
          </p>

          {/* Podcast Player */}
          <PodcastPlayer
            spotifyUrl="https://open.spotify.com/episode/0VUkAMSWPEDEjaGNjG1vGC?si=a9h0mEtVRCWiQ4LnLdf8TA"
            className="my-8"
          />

          <h2
            id="open-door"
            className={`${isMobile ? "text-xl" : "text-xl md:text-2xl"} font-semibold mt-10 mb-4 text-white scroll-mt-32`}
          >
            The Open Door: How Bestsellers Make Complex Stories Approachable
          </h2>

          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-4 italic`}>
            Captivating stories often begin by ensuring their complex narratives are made approachable.
          </p>

          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-6`}>
            Most bestselling books are written at a readability level between 4th and 5th grade, indicating that clear,
            accessible language is a defining trait of commercial literary success. This suggests that authors aiming
            for mass appeal tend to favor simplicity over complexity, making their narratives more digestible for a
            wider audience. The relatively narrow spread also implies a strategic alignment with the cognitive comfort
            zone of the general readership, where comprehension flows effortlessly without compromising narrative depth.
          </p>

          {/* First Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : readabilityData ? (
            <div className="mb-6">
              <ChartViewer chartData={readabilityData} height={isMobile ? 300 : 400} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Second paragraph */}
          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-6`}>
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
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : quadrantData ? (
            <div className="mb-6">
              <ChartViewer chartData={quadrantData} height={isMobile ? 350 : 450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Third paragraph */}
          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-6`}>
            Genres like Fantasy and Romance require significantly more reading time than the overall average of 9.5h,
            indicating their tendency toward longer or denser narratives. In contrast, Drama, Mystery, and Thriller fall
            well below the average, suggesting relatively shorter or more accessible content.
          </p>

          {/* Third Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : readingTimeData ? (
            <div className="mb-6">
              <ChartViewer chartData={readingTimeData} height={isMobile ? 350 : 450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Fourth section - Character and Narrative */}
          <h2
            id="cast-canvas"
            className={`${isMobile ? "text-xl" : "text-xl md:text-2xl"} font-semibold mt-10 mb-4 text-white scroll-mt-32`}
          >
            The Cast and the Canvas: How Bestsellers Populate Rich Worlds with Resonant Characters
          </h2>

          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-4 italic`}>
            Once approachability is established, attention shifts to the resonant characters and rich worlds presented.
          </p>

          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-6`}>
            A pronounced tendency has been observed among recent bestselling novels to foreground key characterological
            dimensions such as strong character development, affective appeal, diversity within the cast, and the
            explicit narrative integration of character flaws. The prevalence of affirmative responses across all these
            axes suggests a market-driven prioritization of multidimensional, relatable, and psychologically complex
            protagonists. Ambiguity or absence of these features is notably rare, indicating a clear alignment between
            commercial literary success and the systematic incorporation of deep character work. These findings
            underscore the extent to which contemporary fiction is structured around inclusivity and emotional
            resonance, with robust character construction serving as a critical vector for reader engagement and broader
            market viability.
          </p>

          {/* Character Related Features Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : characterFeaturesData ? (
            <div className="mb-6">
              <ChartViewer chartData={characterFeaturesData} height={isMobile ? 350 : 450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Fourth Chart */}
          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-6`}>
            Narrative perspective choices in bestselling fiction suggest a strategic balance between intimacy and
            breadth. The dominance of "External Observer" and "Mixed Voice" styles points to a tendency among popular
            authors to maintain a certain emotional distance while offering selective interiority when needed. This
            hybrid approach may serve dual purposes: preserving narrative momentum while still enabling character-driven
            resonance. The lower prevalence of "Omniscient Narrator" implies a shift away from all-knowing perspectives
            toward more grounded, humanized storytelling. In essence, bestselling narratives appear to favor a
            controlled proximity - close enough for empathy, distant enough for scale.
          </p>

          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : pronounStyleData ? (
            <div className="mb-6">
              <ChartViewer chartData={pronounStyleData} height={isMobile ? 350 : 450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Fifth paragraph - Chapter Count by Narrative Focus */}
          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-6`}>
            Books with a plot driven narrative focus tend to have significantly more chapters on average than those with
            character driven or mixed structures. This suggests that plot-oriented stories may rely on frequent
            structural breaks - such as cliffhangers or pacing pivots - to sustain momentum and keep readers engaged. In
            contrast, character-focused narratives might favor longer, more immersive chapters to allow deeper
            psychological or emotional development within each section.
          </p>

          {/* Fifth Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : chapterCountData ? (
            <div className="mb-6">
              <ChartViewer chartData={chapterCountData} height={isMobile ? 350 : 450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Sixth paragraph - Rating Count by Narrative Focus */}
          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-6`}>
            Character-driven novels generate substantially higher reader engagement - measured by median rating counts -
            than mixed or plot-driven narratives. This pattern implies that when a story leans into the inner lives and
            relationships of its characters, readers feel more compelled to respond and discuss, whereas purely
            plot-focused works may maintain momentum but sacrifice the deeper personal connection that drives ongoing
            interaction. In fact, among bestsellers, no books are perceived by readers as slow-paced; over 80% fall into
            the medium pace category. This underscores a critical balance: while pacing sustains attention, it's the
            emotional depth, especially through strong character development and the presence of distinctly loveable
            personalities, that cultivates reader loyalty and repeat engagement. In the attention economy, momentum may
            open the door, but it's emotional anchoring that makes readers stay.
          </p>

          {/* Sixth Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : ratingCountData ? (
            <div className="mb-6">
              <ChartViewer chartData={ratingCountData} height={isMobile ? 350 : 450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* Seventh paragraph - Mood Distribution by Narrative Focus */}
          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-6`}>
            This mood segmentation reveals a clear psychological divergence in how readers experience different
            narrative structures. Character-Driven stories evoke strong emotional and hopeful responses, suggesting
            readers engage empathetically and seek inner transformation. Mixed narratives strike a balance between
            affect and action, indicating versatility in appealing to varied reader preferences. Plot-Driven stories, on
            the other hand, register minimal emotional depth, emphasizing external tension and adventure. This skew
            toward surface-level intensity may explain their broader commercial utility but potentially lower long-term
            resonance. These patterns underscore how narrative focus doesn't just guide storytelling—it actively shapes
            emotional investment and reader satisfaction.
          </p>

          {/* Seventh Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : moodDistributionData ? (
            <div className="mb-6">
              <ChartViewer chartData={moodDistributionData} height={isMobile ? 400 : 500} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* New Section - The Spine of the Story */}
          <h2
            id="spine-story"
            className={`${isMobile ? "text-xl" : "text-xl md:text-2xl"} font-semibold mt-10 mb-4 text-white scroll-mt-32`}
          >
            The Spine of the Story: How Narrative Structure Shapes Reader Engagement
          </h2>

          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-4 italic`}>
            Populating worlds with resonant characters necessitates a narrative structure to effectively shape reader
            engagement.
          </p>

          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-6`}>
            Fragmented narrative structures - stories that break away from strict chronological order and follow a less
            predictable, non-linear flow - performed significantly better in reader approval and engagement than their
            linear counterparts. Among them, fragmented stories told through a single, consistent point of view stood
            out as the most favored. This indicates that readers respond most positively when narrative unpredictability
            is combined with emotional stability. While linear and single-perspective formats remain the most commonly
            used, their lower ratings suggest that familiarity in form does not guarantee satisfaction. The data points
            to a core reader preference: keep the voice steady so I can stay connected, but let the structure surprise
            me so I don't get bored.
          </p>

          {/* New Chart - Structure Approval Engagement */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Error: {error}</p>
            </div>
          ) : structureApprovalData ? (
            <div className="mb-6">
              <ChartViewer chartData={structureApprovalData} height={450} />
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">No chart data available</p>
            </div>
          )}

          {/* New Section - The Flow of Fiction */}
          <h2
            id="flow-fiction"
            className={`${isMobile ? "text-xl" : "text-xl md:text-2xl"} font-semibold mt-10 mb-4 text-white scroll-mt-32`}
          >
            The Flow of Fiction: How Structural Tempo Patterns Define Story Identity
          </h2>

          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-4 italic`}>
            Narrative structure shaping engagement often utilizes distinct structural tempo patterns defining overall
            story identity.
          </p>

          <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-300 mb-6`}>
            Reader engagement does not scale linearly with narrative intensity or volume, it scales with narrative
            precision. Stories that deliver dramatic developments through controlled, measured pacing (low motion, high
            action) achieve the highest engagement per book and per word, indicating that readers respond more to
            structural focus than surface activity. In contrast, narratives lacking both momentum and consequential
            events (low motion, low action) yield the lowest return on attention, even when extended in length. This
            reveals a core principle of narrative efficiency: tension -not turbulence- sustains interest. While
            high-motion formats tend to generate broader reach through volume and visibility, it is the strategic timing
            and clarity of narrative impact that most effectively drive reader response.
          </p>

          {/* Temporal Reader Engagement Chart */}
          {isLoading ? (
            <div className="bg-zinc-800 p-4 rounded-lg h-[300px] flex items-center justify-center mb-6">
              <p className="text-zinc-400">Loading chart data...</p>
            </div>
          ) : (
            <div className="mb-6">
              <ChartViewer chartData={embeddedTemporalEngagementData} height={isMobile ? 350 : 450} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
