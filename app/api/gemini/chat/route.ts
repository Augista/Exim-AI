import { type NextRequest, NextResponse } from "next/server"
import { generateGeminiResponse } from "@/lib/gemini"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const { messages, userId } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Valid messages array is required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 })
    }

    const lastUserMessage = messages.filter((msg: any) => msg.role === "user").pop()?.content || ""

    const previousMessages = messages
      .slice(0, -1)
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    const prompt = `
      You are an AI assistant for an Export & Import business platform. Your task is to assist with logistics, documentation, market insights, 
      shipping logistics, customs regulations.
      You provide helpful, accurate, and concise responses without asking unnecessary follow-up questions.
      
      Previous conversation:
      ${previousMessages}
      
      User's question: ${lastUserMessage}
      
      Your responses must include factual, accurate data and references to credible sources, such as research papers, laws, or official regulations (with links)..
    `

    // Call the Gemini API
    const response = await generateGeminiResponse(prompt)

    if (userId) {
      try {
        const supabase = createServerClient()

        await supabase.from("ai_conversations").insert({
          user_id: userId,
          conversation_id: new Date().toISOString(),
          query: lastUserMessage,
          response: response,
        })
      } catch (dbError) {
        console.error("Error storing conversation:", dbError)
     
      }
    }

    return NextResponse.json({
      response: response.replace(/\*/g, '').trim(),
      model: "gemini-1.5-pro-001",
    })
  } catch (error) {
    console.error("Error in Gemini chat API route:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
