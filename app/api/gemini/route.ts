import { type NextRequest, NextResponse } from "next/server"
import { generateGeminiResponse } from "@/lib/gemini"

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 })
    }

    const text = await generateGeminiResponse(prompt)

    return NextResponse.json({
      text,
      model: "gemini-1.5-pro-001",
    })
  } catch (error) {
    console.error("Error in Gemini API route:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
