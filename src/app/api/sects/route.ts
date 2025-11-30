import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Sect } from '@/lib/mongodb-models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const religionId = searchParams.get('religionId')
    const search = searchParams.get('search') || ''

    // Build Query
    const query: any = {}

    // 1. Filter by Religion (Crucial step)
    if (religionId) {
      // We check both fields to be safe, just like we did in the debug scripts
      query.$or = [
        { religion: religionId },
        { religionId: religionId }
      ]
    }

    // 2. Search Filter
    if (search) {
      const searchRegex = { $regex: search, $options: 'i' }
      // If we already have a religion filter, we need to AND it with the search
      if (query.$or) {
        query.$and = [
          { $or: query.$or }, // Keep the religion restriction
          {
            $or: [
              { name: searchRegex },
              { description: searchRegex },
              { keyCharacteristics: searchRegex }
            ]
          }
        ]
        delete query.$or // Remove the top-level $or since it's now inside $and
      } else {
        // Global search if no religion specified
        query.$or = [
          { name: searchRegex },
          { description: searchRegex },
          { keyCharacteristics: searchRegex }
        ]
      }
    }

    // 3. Execute Query
    const sects = await Sect.find(query)
      .populate('scholars') // Get the scholars for the modal/details
      .sort({ name: 1 })    // Alphabetical order

    return NextResponse.json(sects)

  } catch (error) {
    console.error('Error fetching sects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sects' },
      { status: 500 }
    )
  }
}