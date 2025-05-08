"use client"

import { useState } from "react"
import { NavTabs } from "@/components/nav-tabs"
import { AnatomyTab } from "@/components/tabs/anatomy-tab"
import { AnalyzeTab } from "@/components/tabs/analyze-tab"
import { ComingSoonTab } from "@/components/tabs/coming-soon-tab"

export default function Home() {
  const [activeTab, setActiveTab] = useState("anatomy")

  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-100">
      {/* Header */}
      <header className="container mx-auto py-4 px-4">
        <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </header>

      {/* Main Content */}
      <section className="container mx-auto py-8 px-4 max-w-4xl md:ml-80 lg:ml-96">
        {activeTab === "anatomy" && <AnatomyTab />}
        {activeTab === "analyze" && <AnalyzeTab />}
        {activeTab === "coming-soon" && <ComingSoonTab />}
      </section>
    </main>
  )
}
