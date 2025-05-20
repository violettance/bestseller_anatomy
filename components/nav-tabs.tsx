"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, BookPlus, Clock } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

interface NavTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className={`flex ${isMobile ? "flex-col space-y-2" : "justify-end space-x-2"}`}>
      <Button
        variant={activeTab === "anatomy" ? "default" : "outline"}
        className={
          activeTab === "anatomy"
            ? "bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full"
            : "text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full"
        }
        onClick={() => onTabChange("anatomy")}
      >
        <BookOpen className="mr-2 h-4 w-4" />
        Anatomy of a Bestseller
      </Button>
      <Button
        variant={activeTab === "analyze" ? "default" : "outline"}
        className={
          activeTab === "analyze"
            ? "bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full"
            : "text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full"
        }
        onClick={() => onTabChange("analyze")}
      >
        <BookPlus className="mr-2 h-4 w-4" />
        Analyze My Book
      </Button>
      <Button variant="outline" className="text-zinc-400 cursor-not-allowed rounded-full" disabled>
        <Clock className="mr-2 h-4 w-4" />
        Coming Soon
      </Button>
    </div>
  )
}
