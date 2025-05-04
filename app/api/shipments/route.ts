import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("shipments")
      .select(`
        *,
        users (name, email),
        tracking (location, status, timestamp, notes)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching shipments:", error)
    return NextResponse.json({ error: "Failed to fetch shipments" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const shipmentData = await req.json()

    // Validate required fields
    const requiredFields = ["shipment_number", "user_id", "type", "status", "origin_country", "destination_country"]
    for (const field of requiredFields) {
      if (!shipmentData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const supabase = createServerClient()

    // Insert the new shipment
    const { data, error } = await supabase.from("shipments").insert(shipmentData).select()

    if (error) {
      throw error
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error creating shipment:", error)
    return NextResponse.json({ error: "Failed to create shipment" }, { status: 500 })
  }
}
