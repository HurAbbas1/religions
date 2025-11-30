import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Religion, Sect } from '@/lib/mongodb-models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const forceSeed = searchParams.get('seed') === 'true'

    // 1. Fetch current state
    const religions = await Religion.find({}, '_id name')
    const sects = await Sect.find({})

    const report = {
      message: "Database Status Report",
      totalReligions: religions.length,
      totalSects: sects.length,
      religionsFound: religions.map(r => ({ id: r._id.toString(), name: r.name })),
      sectsSample: sects.slice(0, 3), // Show first 3 for inspection
      orphanedSects: sects.filter(s => !s.religion && !s.religionId).length
    }

    // 2. AUTO-FIX: If religions exist but Sects are 0 (or forced via ?seed=true)
    if ((religions.length > 0 && sects.length === 0) || forceSeed) {
      const createdSects: string[] = []

      for (const religion of religions) {
        // Create 2 dummy sects for each religion found
        const sect1 = await Sect.create({
          name: `Orthodox ${religion.name}`,
          description: `The traditional branch of ${religion.name}, focusing on original texts and established practices.`,
          religionId: religion._id, // Set BOTH to ensure compatibility
          religion: religion._id,
          numberOfFollowers: 1000000,
          keyCharacteristics: "Adherence to tradition, rigorous study, communal worship.",
          scholars: [] // Empty array for now
        })

        const sect2 = await Sect.create({
          name: `Modern ${religion.name}`,
          description: `A contemporary interpretation of ${religion.name}, adapting to modern life while keeping core values.`,
          religionId: religion._id,
          religion: religion._id,
          numberOfFollowers: 500000,
          keyCharacteristics: "Flexibility, social justice focus, individual spirituality.",
          scholars: []
        })

        createdSects.push(sect1.name, sect2.name)
      }

      return NextResponse.json({
        ...report,
        status: "FIXED: Generated missing sects",
        generatedSects: createdSects
      })
    }

    // 3. Return report if data exists
    return NextResponse.json({
      ...report,
      status: sects.length > 0 ? "OK: Sects exist" : "ERROR: No Religions found to seed sects for."
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}