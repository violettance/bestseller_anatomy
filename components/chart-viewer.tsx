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
  return (
    <div className={`bg-zinc-800 p-4 rounded-lg ${className}`}>
      <Plot
        data={chartData.data}
        layout={{
          ...chartData.layout,
          paper_bgcolor: "rgba(39, 39, 42, 0.8)",
          plot_bgcolor: "rgba(39, 39, 42, 0.8)",
          font: { color: "#e4e4e7" },
          margin: { t: 40, r: 20, l: 40, b: 40 },
          title: {
            text: chartData.layout.title.text,
            font: {
              size: 16,
              color: "#e4e4e7",
            },
          },
          autosize: true,
        }}
        style={{ width: "100%", height: `${height}px` }}
        config={{ responsive: true }}
      />
    </div>
  )
}
