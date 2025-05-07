/**
 * Utility functions for working with chart data
 */

/**
 * Load chart data from a JSON file
 * @param path Path to the JSON file
 * @returns The chart data
 */
export async function loadChartData(path: string) {
  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Failed to load chart data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error loading chart data:", error)
    throw error
  }
}

/**
 * Apply dark theme styling to chart data
 * @param chartData The original chart data
 * @returns The chart data with dark theme styling
 */
export function applyDarkTheme(chartData: any) {
  return {
    ...chartData,
    layout: {
      ...chartData.layout,
      paper_bgcolor: "rgba(39, 39, 42, 0.8)",
      plot_bgcolor: "rgba(39, 39, 42, 0.8)",
      font: { color: "#e4e4e7" },
      title: {
        ...chartData.layout.title,
        font: {
          size: 16,
          color: "#e4e4e7",
        },
      },
    },
  }
}
