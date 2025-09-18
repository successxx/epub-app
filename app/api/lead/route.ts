import { NextRequest, NextResponse } from "next/server"
import { createSupabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const supabase = createSupabaseAdmin()

    // Insert lead into the users table
    const { error } = await supabase
      .from("users")
      .upsert({
        email,
        created_at: new Date().toISOString()
      }, {
        onConflict: "email"
      })

    if (error) {
      console.error("Error saving lead:", error)
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead capture error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
