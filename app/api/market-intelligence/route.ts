import { type NextRequest, NextResponse } from "next/server"
import { generateMarketIntelligence } from "@/lib/gemini"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const { country, productCategory } = await req.json()

    if (!country || !productCategory) {
      return NextResponse.json({ error: "Country and product category are required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 })
    }

    const intelligence = await generateMarketIntelligence(country, productCategory)

    try {
      const supabase = createServerClient()

      await supabase.from("market_intelligence").insert({
        country,
        product_category: productCategory,
        demand_trend: intelligence.demandTrend,
        price_trend: intelligence.priceTrend,
        regulatory_changes: intelligence.regulatoryChanges,
        opportunity_score: intelligence.opportunityScore,
        data_date: new Date().toISOString().split("T")[0],
      })
    } catch (dbError) {
      console.error("Error storing market intelligence:", dbError)
      // Continue even if storing fails
    }

    return NextResponse.json(intelligence)
  } catch (error) {
    console.error("Error in market intelligence API route:", error)
    return NextResponse.json({ error: "Failed to generate market intelligence" }, { status: 500 })
  }
}
