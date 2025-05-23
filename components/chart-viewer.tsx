"use client"

import dynamic from "next/dynamic"
import { useMediaQuery } from "@/hooks/use-mobile"

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

interface ChartViewerProps {
  chartData: any
  height?: number
  className?: string
}

export function ChartViewer({ chartData, height = 400, className = "" }: ChartViewerProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Safety check for null or undefined chart data
  if (!chartData || !chartData.data || !chartData.layout) {
    console.error("Invalid chart data provided to ChartViewer:", chartData)
    return (
      <div
        className={`bg-zinc-800 p-4 rounded-lg flex items-center justify-center ${className}`}
        style={{ height: `${height}px` }}
      >
        <p className="text-zinc-400">Chart data is invalid or incomplete</p>
      </div>
    )
  }

  // Create a deep copy of the chart data to avoid modifying the original
  const processedData = JSON.parse(JSON.stringify(chartData))

  // Check if this is a polar/spider chart
  const isSpiderChart = processedData.data?.some((d: any) => d.type === "scatterpolar")

  // Check if this is a timeline chart (based on title)
  const isTimelineChart =
    processedData.layout?.title?.text?.includes("Timeline") ||
    (typeof processedData.layout?.title === "string" && processedData.layout.title.includes("Timeline"))

  // Check if this is an emotional tone chart
  const isEmotionalToneByGenre =
    processedData.layout?.title?.text?.includes("Emotional Tone by Genre") ||
    (typeof processedData.layout?.title === "string" && processedData.layout.title.includes("Emotional Tone by Genre"))

  if (isMobile && isEmotionalToneByGenre) {
  return (
    <div
      className={`bg-zinc-800 p-4 rounded-lg flex items-center justify-center text-center ${className}`}
      style={{ height }}
    >
      <p className="text-zinc-400 text-sm md:text-base">
        This chart is not optimized for mobile view.<br />
        Please view it on a desktop device for the best experience.
      </p>
    </div>
  )
}

  const isEmotionalToneByNarrative =
    processedData.layout?.title?.text?.includes("Emotional Tone by Narrative") ||
    (typeof processedData.layout?.title === "string" &&
      processedData.layout.title.includes("Emotional Tone by Narrative"))

  // Apply consistent dark theme styling for all charts
  // Use the standard dark gray background for all charts
  processedData.layout.paper_bgcolor = "rgba(39, 39, 42, 0.8)"
  processedData.layout.plot_bgcolor = "rgba(39, 39, 42, 0.8)"

  processedData.layout.font = {
    ...processedData.layout.font,
    color: "#e4e4e7",
  }

  // Ensure title styling is consistent
  if (processedData.layout.title && typeof processedData.layout.title !== "object") {
    processedData.layout.title = {
      text: processedData.layout.title,
      font: {
        size: isMobile ? 14 : 16,
        color: "#e4e4e7",
      },
      x: 0.07,
    }
  } else if (processedData.layout.title) {
    processedData.layout.title = {
      ...processedData.layout.title,
      font: {
        ...(processedData.layout.title.font || {}),
        size: isMobile ? 14 : processedData.layout.title.font?.size || 16,
        color: "#e4e4e7",
      },
      x: processedData.layout.title.x || 0.07,
    }
  }

  // Style dropdown menus if present
  if (processedData.layout.updatemenus) {
    processedData.layout.updatemenus.forEach((menu: any) => {
      menu.bgcolor = "#27272a"
      menu.bordercolor = "#3f3f46"
      menu.font = { color: "#e4e4e7" }

      // Adjust position for mobile
      if (isMobile) {
        menu.y = 1.2
      }
    })
  }

  // Mobile-specific adjustments for Emotional Tone by Genre chart
  if (isMobile && isEmotionalToneByGenre) {
    // Remove top labels (Mild, Negative Intense, etc.)
    if (processedData.layout.annotations) {
      processedData.layout.annotations = processedData.layout.annotations.filter((annotation: any) => {
        // Keep annotations that are not at the top of the chart
        return !(annotation.y > 0.8 || annotation.text === "(+) Mild" || annotation.text === "Negative Intense")
      })
    }

    // Ensure colorbar is visible
    if (processedData.data && Array.isArray(processedData.data)) {
      processedData.data.forEach((trace: any) => {
        if (trace.type === "heatmap" || trace.type === "contour") {
          trace.showscale = true
          if (trace.colorbar) {
            trace.colorbar.thickness = 10
            trace.colorbar.len = 0.5
            trace.colorbar.x = 1.02
            trace.colorbar.xpad = 0
          }
        }
      })
    }

    // Adjust margins to accommodate colorbar
    processedData.layout.margin = {
      ...(processedData.layout.margin || {}),
      r: 50, // Increase right margin for colorbar
      t: 40, // Top margin
      l: 40, // Left margin
      b: 80, // Increase bottom margin for genre labels
    }
  }

  // Mobile-specific adjustments for Emotional Tone by Narrative Focus chart
  if (isMobile && isEmotionalToneByNarrative) {
    // Ensure colorbar is visible
    if (processedData.data && Array.isArray(processedData.data)) {
      processedData.data.forEach((trace: any) => {
        if (trace.type === "heatmap" || trace.type === "contour") {
          trace.showscale = true
          if (trace.colorbar) {
            trace.colorbar.thickness = 10
            trace.colorbar.len = 0.5
            trace.colorbar.x = 1.02
            trace.colorbar.xpad = 0
          }
        }
      })
    }

    // Adjust margins to accommodate colorbar
    processedData.layout.margin = {
      ...(processedData.layout.margin || {}),
      r: 50, // Increase right margin for colorbar
      t: 40, // Top margin
      l: 40, // Left margin
      b: 80, // Increase bottom margin for narrative focus labels
    }
  }

  // Style axis labels and grid lines
  if (processedData.layout.xaxis) {
    processedData.layout.xaxis = {
      ...processedData.layout.xaxis,
      gridcolor: "#3f3f46",
      linecolor: "#3f3f46",
      tickfont: {
        color: "#e4e4e7",
        size: isMobile ? 10 : 12,
      },
      title: {
        ...processedData.layout.xaxis.title,
        font: {
          color: "#e4e4e7",
          size: isMobile ? 12 : 14,
        },
      },
    }
  }

  if (processedData.layout.yaxis) {
    processedData.layout.yaxis = {
      ...processedData.layout.yaxis,
      gridcolor: "#3f3f46",
      linecolor: "#3f3f46",
      tickfont: {
        color: "#e4e4e7",
        size: isMobile ? 10 : 12,
      },
      title: {
        ...processedData.layout.yaxis.title,
        font: {
          color: "#e4e4e7",
          size: isMobile ? 12 : 14,
        },
      },
    }
  }

  // Style legend if present - HIDE ON MOBILE except for emotional tone charts
  if (processedData.layout.legend) {
    if (isMobile && !isEmotionalToneByGenre && !isEmotionalToneByNarrative) {
      // Hide legend completely on mobile for non-emotional tone charts
      processedData.layout.showlegend = false
    } else {
      processedData.layout.legend = {
        ...processedData.layout.legend,
        font: {
          color: "#e4e4e7",
          size: isMobile ? 10 : 12,
        },
        bgcolor: "rgba(39, 39, 42, 0.8)",
        bordercolor: "#3f3f46",
      }
    }
  }

  // Fix annotations if present
  if (processedData.layout.annotations) {
    processedData.layout.annotations = processedData.layout.annotations.map((annotation: any) => ({
      ...annotation,
      font: {
        ...annotation.font,
        // Make timeline annotations smaller on mobile
        size: isMobile && isTimelineChart ? 8 : annotation.font?.size || 12,
        color: "#e4e4e7",
      },
    }))
  }

  // Special handling for spider/radar charts
  if (isSpiderChart) {
    // Fix polar axis styling
    if (processedData.layout.polar) {
      processedData.layout.polar = {
        ...processedData.layout.polar,
        bgcolor: "rgba(39, 39, 42, 0.8)", // Match the standard dark gray
        angularaxis: {
          ...processedData.layout.polar.angularaxis,
          color: "#e4e4e7",
          gridcolor: "#3f3f46",
          linecolor: "#3f3f46",
          tickfont: {
            color: "#e4e4e7",
          },
        },
        radialaxis: {
          ...processedData.layout.polar.radialaxis,
          color: "#e4e4e7",
          gridcolor: "#3f3f46",
          linecolor: "#3f3f46",
          tickfont: {
            color: "#e4e4e7",
          },
        },
      }
    }

    // Ensure only one trace is visible at a time for dropdown selections
    if (processedData.data && Array.isArray(processedData.data)) {
      const firstVisibleIndex = processedData.data.findIndex((trace: any) => trace.visible === true)
      processedData.data.forEach((trace: any, index: number) => {
        // If no trace is visible, make the first one visible
        if (firstVisibleIndex === -1 && index === 0) {
          trace.visible = true
        } else if (firstVisibleIndex !== -1) {
          // Keep the currently visible trace visible, hide others
          trace.visible = index === firstVisibleIndex
        }

        // Ensure consistent styling
        if (trace.fillcolor) {
          trace.fillcolor = "rgba(139, 92, 246, 0.4)" // Consistent purple fill
        }
        if (trace.line) {
          trace.line.color = "#8b5cf6" // Consistent purple line
        }

        // Show colorbar on mobile for emotional tone charts, hide for others
        if (isMobile) {
          if (isEmotionalToneByGenre || isEmotionalToneByNarrative) {
            trace.showscale = true
          } else {
            trace.showscale = false
          }
        }
      })
    }
  }

  // Fix alignment issues by ensuring proper margins and container styling
  const chartMargins = {
    t: isMobile ? 50 : 40,
    r: isMobile ? 10 : 30, // Reduce right margin on mobile since we're hiding legends
    l: isMobile ? 40 : 50,
    b: isMobile ? 40 : 50,
  }

  // For emotional tone charts, use custom margins defined above
  if (isMobile && (isEmotionalToneByGenre || isEmotionalToneByNarrative)) {
    // Custom margins already set above
  } else {
    // Use default margins for other charts
    processedData.layout.margin = {
      ...(processedData.layout.margin || {}),
      ...chartMargins,
    }
  }

  // Adjust height for mobile
  const chartHeight = isMobile ? Math.min(height, 350) : height

  // For timeline charts on mobile, adjust the layout to prevent text overlap
  if (isMobile && isTimelineChart && processedData.layout.annotations) {
    // Reduce font size for all annotations
    processedData.layout.annotations.forEach((annotation: any) => {
      if (annotation.font) {
        annotation.font.size = 8 // Smaller font size
      }

      // Adjust y position to prevent overlap
      if (annotation.text && annotation.text.includes("Doorway")) {
        // Move doorway labels up a bit
        annotation.y = annotation.y + 0.05
      } else if (annotation.text && annotation.text.includes("Major")) {
        // Move midpoint label down a bit
        annotation.y = annotation.y - 0.05
      }
    })
  }

  try {
    return (
      <div className={`bg-zinc-800 p-4 rounded-lg ${className} overflow-hidden`}>
        <Plot
          data={processedData.data}
          layout={{
            ...processedData.layout,
            autosize: true,
            width: undefined, // Let it be responsive
            height: chartHeight,
          }}
          style={{ width: "100%", height: `${chartHeight}px` }}
          config={{
            responsive: true,
            displayModeBar: !isMobile, // Hide mode bar on mobile
          }}
        />
      </div>
    )
  } catch (error) {
    console.error("Error rendering chart:", error)
    return (
      <div
        className={`bg-zinc-800 p-4 rounded-lg flex items-center justify-center ${className}`}
        style={{ height: `${height}px` }}
      >
        <p className="text-zinc-400">Error rendering chart</p>
      </div>
    )
  }
}
