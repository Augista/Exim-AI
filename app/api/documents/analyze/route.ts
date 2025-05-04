import { type NextRequest, NextResponse } from "next/server"
import { analyzeDocument } from "@/lib/gemini"

export async function POST(req: NextRequest) {
  try {
    const { documentType, documentContent } = await req.json()

    if (!documentType || !documentContent) {
      return NextResponse.json({ error: "Document type and content are required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 })
    }

    const analysis = await analyzeDocument(documentType, documentContent)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error in document analysis API route:", error)
    return NextResponse.json({ error: "Failed to analyze document" }, { status: 500 })
  }
}
