"use client"

import { BarChart3, LineChart, PieChart, Activity, Clock, BookOpen, BookOpenText, PieChart as Donut } from "lucide-react"
import {
  mockSentimentData,
  mockTensionData,
  mockPaceData,
  mockSensoryData,
  mockStyleData,
  mockMetrics,
  mockBookTitle,
  mockActionData, // ✅ action density için
} from "@/lib/mock-book-data"

interface BookDashboardProps {
  bookTitle?: string
}

export function BookDashboard({ bookTitle = mockBookTitle }: BookDashboardProps) {
  const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "" }) => (
    <div className={`bg-zinc-800 rounded-xl p-6 shadow-[0_0_20px_8px_rgba(24,24,27,0.5)] h-full ${className}`}>{children}</div>
  )

const LineChartMock = ({
  data,
  dataKey,
  title,
  description,
  color = "#8b5cf6",
  variant = "bar", // default bar
}: any) => (
  <Card>
    <header className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>
      <LineChart className="h-5 w-5 text-zinc-400" />
    </header>

    <div className="h-48 w-full relative">
      {variant === "line" ? (
        <div className="h-full w-full relative">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              points={data
                .map((item: any, idx: number) => {
                  const x = (idx / (data.length - 1)) * 100;
                  const y = 100 - item[dataKey] * 100;
                  return `${x},${y}`;
                })
                .join(" ")}
            />
          </svg>
          <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-zinc-500 px-1">
            {data.map((item: any, idx: number) => (
              <span key={idx}>{item.chapter}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-end gap-[1px]">
          {data.map((item: any, idx: number) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
              <div
                className="w-full rounded-t"
                style={{ height: `${item[dataKey] * 100}%`, backgroundColor: color }}
              />
              <span className="text-[10px] text-zinc-500 mt-1">{item.chapter}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </Card>
)

  const MetricCard = ({ title, value, icon: Icon, unit }: any) => (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-zinc-400 text-sm">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-2">
            {value}
            {unit && <span className="text-sm text-zinc-400 ml-1">{unit}</span>}
          </h3>
        </div>
        <div className="p-3 rounded-full bg-[#8b5cf6]/10">
          <Icon className="h-6 w-6 text-[#8b5cf6]" />
        </div>
      </div>
    </Card>
  )

  const SensoryPie = ({ data }: any) => {
  const total = Object.values(data).reduce((sum: number, val: number) => sum + val, 0)
  let start = 0
  const colors = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"]

  return (
    <Card>
      <header className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Sensory Balance</h3>
          <p className="text-zinc-400 text-sm">Sensory distribution</p>
        </div>
        <Donut className="h-5 w-5 text-zinc-400" />
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Donut Chart */}
        <div className="w-60 h-60">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {Object.entries(data).map(([key, val], idx) => {
              const pct = val / total
              const angle = pct * 360
              const end = start + angle
              const large = angle > 180 ? 1 : 0
              const x1 = 50 + 40 * Math.cos((start * Math.PI) / 180)
              const y1 = 50 + 40 * Math.sin((start * Math.PI) / 180)
              const x2 = 50 + 40 * Math.cos((end * Math.PI) / 180)
              const y2 = 50 + 40 * Math.sin((end * Math.PI) / 180)
              const d = [`M50 50`, `L${x1} ${y1}`, `A40 40 0 ${large} 1 ${x2} ${y2}`, `Z`].join(" ")
              start = end
              return <path key={key} d={d} fill={colors[idx % colors.length]} />
            })}
            <circle cx="50" cy="50" r="25" fill="#1f1f1f" />
          </svg>
        </div>

        {/* Legend */}
        <ul className="space-y-2 text-xs text-zinc-400 capitalize">
          {Object.entries(data).map(([key, val], idx) => (
            <li key={key} className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[idx % colors.length] }} />
              {key} ({Math.round((val / total) * 100)}%)
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

  const Timeline = () => (
    <Card>
      <header className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Timeline</h3>
          <p className="text-zinc-400 text-sm">Major plot points</p>
        </div>
        <Activity className="h-5 w-5 text-zinc-400" />
      </header>

      <div className="relative flex flex-col items-start pl-6 gap-6 mt-6">
        {[
          { label: "First Incident", percent: 15 },
          { label: "Hero's Journey Truly Begins", percent: 20 },
          { label: "Major Turning Point", percent: 70 },
          { label: "Climax", percent: 80 },
        ].map(({ label, percent }, idx) => (
          <div key={idx} className="relative">
            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#8b5cf6] border-2 border-zinc-800" />
            <div className="ml-6 text-sm text-white font-medium">{label}</div>
            <div className="ml-6 text-xs text-zinc-400">{percent}%</div>
            {idx < 3 && <div className="absolute left-1.5 top-5 w-0.5 h-6 bg-zinc-600" />}
          </div>
        ))}
      </div>
    </Card>
  )

  return (
    <section className="w-full px-4 lg:px-6">
      <Card className="mb-6">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">{bookTitle}</h2>
          <p className="text-zinc-400">Analysis Results</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Readability Score" value={mockMetrics.readabilityScore} icon={BookOpen} unit="/100" />
          <MetricCard title="Word Count" value={mockMetrics.wordCount.toLocaleString()} icon={Activity} unit="words" />
          <MetricCard title="Avg. Chapter Length" value={mockMetrics.avgChapterLength.toLocaleString()} icon={BookOpenText} unit="words" />
          <MetricCard title="Estimated Reading Time" value={Math.floor(mockMetrics.estimatedReadTime / 60)} icon={Clock} unit="hours" />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <LineChartMock data={mockTensionData} dataKey="tension" title="Tension Arc" description="Tension score by chapter" />
        <LineChartMock data={mockSentimentData} dataKey="sentiment" title="Emotional Flow" description="Sentiment score by chapter" />
        <LineChartMock data={mockPaceData} dataKey="pace" title="Pacing Variation" description="Pace variance by chapter" />
        <LineChartMock data={mockActionData} dataKey="action" title="Action Density" description="Action score by chapter" variant="line" />
        <SensoryPie data={mockSensoryData} />
        <Timeline />
      </div>
    </section>
  )
}
