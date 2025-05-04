import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const shipmentId = url.searchParams.get("shipmentId")

    const supabase = createServerClient()

    let query = supabase.from("documents").select("*")

    if (shipmentId) {
      query = query.eq("shipment_id", shipmentId)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const documentData = await req.json()

    const requiredFields = ["shipment_id", "type", "file_path", "file_name"]
    for (const field of requiredFields) {
      if (!documentData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const supabase = createServerClient()

    const { data, error } = await supabase.from("documents").insert(documentData).select()

    if (error) {
      throw error
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error creating document:", error)
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 })
  }
}
