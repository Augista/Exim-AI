import { type NextRequest, NextResponse } from "next/server"
import { estimateShippingCosts } from "@/lib/gemini"

export async function POST(req: NextRequest) {
  try {
    const { origin, destination, cargoType, weight, volume } = await req.json()

    if (!origin || !destination || !cargoType || !weight || !volume) {
      return NextResponse.json({ error: "All shipping parameters are required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 })
    }

    const estimate = await estimateShippingCosts(origin, destination, cargoType, weight, volume)

    return NextResponse.json(estimate)
  } catch (error) {
    console.error("Error in shipping estimate API route:", error)
    return NextResponse.json({ error: "Failed to estimate shipping costs" }, { status: 500 })
  }
}
