"use client"

import dynamic from "next/dynamic"

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

interface ChartViewerProps {
  chartData: any
  height?: number
  className?: string
}

export function ChartViewer({ chartData, height = 400, className = "" }: ChartViewerProps) {
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
        size: 16,
        color: "#e4e4e7",
      },
      x: 0.07,
    }
  } else if (processedData.layout.title) {
    processedData.layout.title = {
      ...processedData.layout.title,
      font: {
        ...(processedData.layout.title.font || {}),
        size: processedData.layout.title.font?.size || 16,
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
      },
      title: {
        ...processedData.layout.xaxis.title,
        font: {
          color: "#e4e4e7",
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
      },
      title: {
        ...processedData.layout.yaxis.title,
        font: {
          color: "#e4e4e7",
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
      },
      bgcolor: "rgba(39, 39, 42, 0.8)",
      bordercolor: "#3f3f46",
    }
  }

  return (
    <div className={`bg-zinc-800 p-4 rounded-lg ${className}`}>
      <Plot
        data={processedData.data}
        layout={{
          ...processedData.layout,
          autosize: true,
          margin: { ...(processedData.layout.margin || {}), t: 40, r: 20, l: 40, b: 40 },
        }}
        style={{ width: "100%", height: `${height}px` }}
        config={{ responsive: true }}
      />
    </div>
  )
}
