import { supabase } from "./supabase"

export async function uploadBookFile(fileName: string, file: File) {
  try {
    const { error: uploadError } = await supabase.storage.from("books").upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: "text/plain",
    });

    if (uploadError) {
      throw new Error(`Error uploading file: ${uploadError.message}`);
    }

    const bookTitle = fileName.replace(/\.txt$/i, "");
    console.log("📤 Triggering parse-book with book_title:", bookTitle);

    // ✅ Authorization için .env'deki anon key kullanılıyor
    const authHeader = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!authHeader) {
      throw new Error("Supabase anon key not found. Make sure NEXT_PUBLIC_SUPABASE_ANON_KEY is defined.");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authHeader}`
    };

    // 📦 parse-book çağrısı
    const parseResponse = await fetch("https://jgxwhdlwdvmzzcvxlgsc.supabase.co/functions/v1/parse-book", {
      method: "POST",
      headers,
      body: JSON.stringify({ book_title: bookTitle }),
    });

    if (!parseResponse.ok) {
      const errorText = await parseResponse.text();
      console.error("❌ parse-book failed:", errorText);
      throw new Error("Book parsing failed after upload.");
    }

    // 📊 analyze-book çağrısı
    const analyzeResponse = await fetch("https://jgxwhdlwdvmzzcvxlgsc.supabase.co/functions/v1/analyze-book", {
      method: "POST",
      headers,
      body: JSON.stringify({ book_title: bookTitle }),
    });

    if (!analyzeResponse.ok) {
      const errorText = await analyzeResponse.text();
      console.error("❌ analyze-book failed:", errorText);
      throw new Error("Book analysis failed after parsing.");
    }

    return { success: true };

  } catch (error) {
    console.error("🔥 Upload process failed:", error);
    throw error;
  }
}
