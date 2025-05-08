"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Section {
  id: string
  title: string
}

interface TableOfContentsProps {
  sections: Section[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  // Start with the menu open by default
  const [isOpen, setIsOpen] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Scroll to section when clicked
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Set active section immediately when clicked
      setActiveSection(id)

      // Set flag to ignore scroll events during programmatic scrolling
      setIsProgrammaticScroll(true)

      // Perform the scroll
      element.scrollIntoView({ behavior: "smooth" })

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Reset the flag after scrolling animation is likely complete
      scrollTimeoutRef.current = setTimeout(() => {
        setIsProgrammaticScroll(false)
      }, 1000) // Adjust time based on your scroll animation duration
    }
  }

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Skip updating active section during programmatic scrolling
      if (isProgrammaticScroll) return

      const scrollPosition = window.scrollY + 150 // Offset for header

      // Find the current section by checking from bottom to top
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Initialize on mount if not already set
    if (!activeSection && !isProgrammaticScroll) {
      handleScroll()
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [sections, activeSection, isProgrammaticScroll])

  return (
    <div className="fixed left-6 top-32 z-50 md:left-12">
      <div className="flex">
        {/* Table of contents panel */}
        <div
          className={`bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl h-auto max-h-[80vh] overflow-y-auto transition-all duration-300 ease-in-out ${
            isOpen ? "w-72 opacity-100" : "w-0 opacity-0 invisible"
          }`}
        >
          <div className="p-5">
            <div className="flex justify-between items-center mb-4 border-b border-zinc-700 pb-3">
              <h3 className="text-lg font-semibold text-white">Table of Contents</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="hover:bg-zinc-700 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </Button>
            </div>
            <ul className="space-y-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left w-full px-4 py-2.5 rounded-md transition-colors ${
                      activeSection === section.id
                        ? "bg-[#8b5cf6] text-white font-medium"
                        : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
                    }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hamburger button - only shown when menu is closed */}
        {!isOpen && (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMenu}
            className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white rounded-lg h-12 w-12 shadow-lg ml-2"
          >
            <Menu size={20} />
          </Button>
        )}
      </div>
    </div>
  )
}
