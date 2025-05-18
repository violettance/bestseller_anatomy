import { supabase } from "./supabase"

export async function uploadBookFile(fileName: string, file: File) {
  try {
    // First check if the bucket exists and is accessible
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket("books")

    if (bucketError && bucketError.message.includes("does not exist")) {
      // Create the bucket if it doesn't exist
      const { error: createError } = await supabase.storage.createBucket("books", {
        public: true,
        fileSizeLimit: 5242880, // 5MB
      })

      if (createError) {
        throw new Error(`Error creating bucket: ${createError.message}`)
      }
    }

    // Set public policy for the bucket
    const { error: policyError } = await supabase.storage.from("books").getPublicUrl(fileName)

    if (policyError) {
      console.warn("Warning: Could not get public URL, might need to set bucket policy manually")
    }

    // Upload the file
    const { error: uploadError } = await supabase.storage.from("books").upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: "text/plain",
    })

    if (uploadError) {
      throw new Error(`Error uploading file: ${uploadError.message}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Upload error:", error)
    throw error
  }
}
