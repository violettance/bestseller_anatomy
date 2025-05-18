"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Loader2, Upload } from "lucide-react"
import { uploadBookFile } from "@/lib/book-upload"
import { BookDashboard } from "@/components/book-dashboard"
import { mockBookTitle } from "@/lib/mock-book-data"

export function AnalyzeTab() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [bookTitle, setBookTitle] = useState("")
  const [status, setStatus] = useState<"idle" | "uploading" | "parsing" | "analyzing" | "completed" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [customBookTitle, setCustomBookTitle] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "text/plain" && !selectedFile.name.endsWith(".txt")) {
        setErrorMessage("Please upload a .txt file")
        setFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrorMessage("File size exceeds the maximum limit of 10MB")
        setFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }

      setFile(selectedFile)
      setErrorMessage("")
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(e.target.value)
  }

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file to upload")
      return
    }

    if (!bookTitle.trim()) {
      setErrorMessage("Please enter a book title")
      return
    }

    try {
      setStatus("uploading")
      setErrorMessage("")

      const safeFileName = bookTitle
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const fileName = `${safeFileName}.txt`

      await uploadBookFile(fileName, file)

      setStatus("parsing")
      await new Promise((r) => setTimeout(r, 1500))

      setStatus("analyzing")
      await new Promise((r) => setTimeout(r, 2000))

      setStatus("completed")
      setCustomBookTitle(bookTitle)
      setIsUploadModalOpen(false)

      resetForm()
    } catch (error: any) {
      console.error("Upload error:", error)
      setStatus("error")

      const detailedMessage =
        typeof error === "string"
          ? error
          : error?.message || error?.error_description || error?.msg || "An unknown error occurred."

      setErrorMessage(`Upload failed: ${detailedMessage}`)
    }
  }

  const resetForm = () => {
    setFile(null)
    setBookTitle("")
    setStatus("idle")
    setErrorMessage("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const openUploadModal = () => {
    setIsUploadModalOpen(true)
    resetForm()
  }

  const closeUploadModal = () => {
    setIsUploadModalOpen(false)
    resetForm()
  }

  return (
    <>
      <div className="absolute left-0 top-0 w-screen max-w-none px-0 mx-0 overflow-x-hidden py-6 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="bg-zinc-900 rounded-xl px-6 py-10 mt-16 mb-12 mx-6 shadow-lg border border-zinc-700 z-0">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Curious how your story holds up?
            </h2>
            <p className="text-zinc-300 mb-4 text-sm md:text-base">
              Upload your manuscript and get a chapter-by-chapter breakdown of emotional tone, pacing, and reader engagement.
            </p>
            <button
              onClick={openUploadModal}
              className="px-5 py-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-lg transition-colors flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Your Book
            </button>
          </div>
        </div>

        <div className="relative z-0 pointer-events-none">
          <BookDashboard bookTitle={customBookTitle || mockBookTitle} />
        </div>
      </div>

      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 pointer-events-auto">
          <div className="bg-zinc-900 rounded-xl p-6 shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Upload Your Book</h2>
              <button onClick={closeUploadModal} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <div className="mb-6 bg-zinc-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Guidelines for Upload:</h3>
              <ul className="text-zinc-300 list-disc pl-5 space-y-1">
                <li>File format: <code className="bg-zinc-700 px-1 rounded">.txt</code> only</li>
                <li>Maximum file size: <strong className="text-white">10MB</strong></li>
                <li>Chapters must be clearly separated using <strong className="text-white">"Chapter 1"</strong>, <strong className="text-white">"Chapter 2"</strong>, etc.</li>
                <li>Avoid page numbers, author names, or publishing info at the start or end.</li>
                <li>Plain text only, no formatting or special characters.</li>
              </ul>
              <p className="text-zinc-400 mt-3 text-sm">
                Proper formatting ensures accurate parsing and clean metric output.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="bookTitle" className="block text-zinc-300 mb-2">Book Title</label>
                <input
                  type="text"
                  id="bookTitle"
                  value={bookTitle}
                  onChange={handleTitleChange}
                  placeholder="Enter your book title"
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  disabled={status !== "idle" && status !== "error"}
                />
              </div>

              <div>
                <label htmlFor="fileUpload" className="block text-zinc-300 mb-2">Upload Manuscript (.txt only, max 10MB)</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="fileUpload"
                  accept=".txt"
                  onChange={handleFileChange}
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#8b5cf6] file:text-white hover:file:bg-[#7c3aed]"
                  disabled={status !== "idle" && status !== "error"}
                />
                {file && (
                  <p className="mt-2 text-sm text-zinc-400">
                    Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200">{errorMessage}</div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  {status !== "idle" && status !== "error" && status !== "completed" && (
                    <div className="flex items-center text-zinc-300">
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      <span className="capitalize">
                        {status === "uploading"
                          ? "Uploading..."
                          : status === "parsing"
                          ? "Parsing manuscript..."
                          : "Analyzing content..."}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={closeUploadModal}
                    className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={status !== "idle" && status !== "error"}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      status !== "idle" && status !== "error"
                        ? "bg-[#8b5cf6]/50 text-white/50 cursor-not-allowed"
                        : "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white"
                    }`}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
