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

  // Create a deep copy of the chart data to avoid modifying the original
  const processedData = JSON.parse(JSON.stringify(chartData))

  // Apply dark theme styling if not already present
  if (!processedData.layout.paper_bgcolor) {
    processedData.layout.paper_bgcolor = "rgba(39, 39, 42, 0.8)"
    processedData.layout.plot_bgcolor = "rgba(39, 39, 42, 0.8)"
  }

  if (!processedData.layout.font?.color) {
    processedData.layout.font = {
      ...processedData.layout.font,
      color: "#e4e4e7",
    }
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
        color: processedData.layout.title.font?.color || "#e4e4e7",
      },
      x: processedData.layout.title.x || 0.07,
    }
  }

  // Style dropdown menus if present
  if (processedData.layout.updatemenus) {
    processedData.layout.updatemenus.forEach((menu: any) => {
      if (!menu.bgcolor) {
        menu.bgcolor = "#27272a"
        menu.bordercolor = "#3f3f46"
        menu.font = { color: "#e4e4e7" }
      }

      // Adjust position for mobile
      if (isMobile) {
        menu.y = 1.2
      }
    })
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

  // Style legend if present
  if (processedData.layout.legend) {
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

  // Special handling for structure approval chart
  if (
    processedData.data &&
    (processedData.data.some((d: any) => d.type === "bar" && d.name === "Approval Rating") ||
      processedData.data.some((d: any) => d.type === "scatter" && d.mode === "markers") ||
      processedData.layout.title?.text?.includes("Narrative Structures"))
  ) {
    // This is the structure approval chart
    const chartHeight = isMobile ? 400 : height

    // For mobile, hide the legend and simplify the chart
    if (isMobile) {
      // Hide legend on mobile
      processedData.layout.showlegend = false

      // Simplify axis titles
      if (processedData.layout.xaxis && processedData.layout.xaxis.title) {
        processedData.layout.xaxis.title.text = "Approval"
      }

      if (processedData.layout.yaxis && processedData.layout.yaxis.title) {
        processedData.layout.yaxis.title.text = "Engagement"
      }

      // Reduce margins to give more space to the bubbles
      processedData.layout.margin = {
        t: 40,
        r: 10,
        l: 40,
        b: 40,
      }

      // Make bubbles more visible
      if (processedData.data) {
        processedData.data.forEach((trace: any) => {
          if (trace.mode === "markers") {
            // Ensure markers are visible
            trace.marker = {
              ...trace.marker,
              opacity: 0.8,
              line: {
                width: 1,
                color: "#fff",
              },
            }

            // Remove text labels on mobile
            trace.text = null
            trace.textposition = null
            trace.hoverinfo = "text"
            trace.hovertext = trace.name
          }
        })
      }
    }

    return (
      <div className={`bg-zinc-800 p-4 rounded-lg ${className}`}>
        <Plot
          data={processedData.data}
          layout={{
            ...processedData.layout,
            autosize: true,
            height: chartHeight,
            width: undefined, // Let it be responsive
          }}
          style={{ width: "100%", height: `${chartHeight}px` }}
          config={{
            responsive: true,
            displayModeBar: !isMobile,
          }}
        />
      </div>
    )
  }

  // Adjust height for mobile for other charts
  const chartHeight = isMobile ? Math.min(height, 350) : height

  return (
    <div className={`bg-zinc-800 p-4 rounded-lg ${className}`}>
      <Plot
        data={processedData.data}
        layout={{
          ...processedData.layout,
          autosize: true,
          margin: {
            ...(processedData.layout.margin || {}),
            t: isMobile ? 50 : 40,
            r: isMobile ? 15 : 20,
            l: isMobile ? 30 : 40,
            b: isMobile ? 30 : 40,
          },
          width: undefined, // Let it be responsive
        }}
        style={{ width: "100%", height: `${chartHeight}px` }}
        config={{
          responsive: true,
          displayModeBar: !isMobile, // Hide mode bar on mobile
        }}
      />
    </div>
  )
}
