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
    <div className="flex justify-end space-x-2">
      <Button
        variant={activeTab === "anatomy" ? "default" : "outline"}
        className={
          activeTab === "anatomy"
            ? "bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full"
            : "text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full"
        }
        onClick={() => onTabChange("anatomy")}
        size={isMobile ? "sm" : "default"}
      >
        <BookOpen className="h-4 w-4" />
        {!isMobile && <span className="ml-2">Anatomy of a Bestseller</span>}
      </Button>
      <Button
        variant={activeTab === "analyze" ? "default" : "outline"}
        className={
          activeTab === "analyze"
            ? "bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full"
            : "text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full"
        }
        onClick={() => onTabChange("analyze")}
        size={isMobile ? "sm" : "default"}
      >
        <BookPlus className="h-4 w-4" />
        {!isMobile && <span className="ml-2">Analyze My Book</span>}
      </Button>
      <Button
        variant="outline"
        className="text-zinc-400 cursor-not-allowed rounded-full"
        disabled
        size={isMobile ? "sm" : "default"}
      >
        <Clock className="h-4 w-4" />
        {!isMobile && <span className="ml-2">Coming Soon</span>}
      </Button>
    </div>
  )
}
