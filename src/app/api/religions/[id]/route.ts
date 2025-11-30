import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Religion, Book, Video, Practice, Sect, Scholar } from '@/lib/mongodb-models'
import mongoose from 'mongoose'

// GET /api/religions/[id] - Get single religion with all related content
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params
    
    // --- SAFETY CHECK ---
    if (!id || id === 'undefined' || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid Religion ID provided' },
        { status: 400 }
      )
    }

    // 1. Fetch the Religion document
    const religion = await Religion.findById(id)
      .populate({
        path: 'books',
        options: { sort: { rating: -1 } }
      })
      .populate({
        path: 'videos',
        options: { sort: { rating: -1 } }
      })
      .populate({
        path: 'practices',
        options: { sort: { rating: -1 } }
      })
      .lean()

    if (!religion) {
      return NextResponse.json(
        { error: 'Religion not found' },
        { status: 404 }
      )
    }

    // 2. Manually fetch Sects (Reverse Lookup)
    // UPDATED: We use $or to check BOTH 'religion' and 'religionId' fields.
    // This fixes the issue if your database schema uses a different name than expected.
    const sects = await Sect.find({ 
      $or: [
        { religion: id },
        { religionId: id }
      ]
    })
      .populate('scholars') 
      .lean()

    // Debug log to help you verify data is actually being found
    console.log(`[API] Fetching Religion: ${religion.name} (${id})`)
    console.log(`[API] Found ${sects.length} sects associated with this religion.`)

    // 3. Attach the fetched sects to the religion object
    // @ts-ignore
    religion.sects = sects

    return NextResponse.json(religion)

  } catch (error) {
    console.error('Error fetching religion:', error)
    return NextResponse.json(
      { error: 'Failed to fetch religion' },
      { status: 500 }
    )
  }
}

// PUT /api/religions/[id] - Update religion
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params

    if (!id || id === 'undefined' || !mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: 'Invalid Religion ID provided' },
          { status: 400 }
        )
      }

    const body = await request.json()
    
    const religion = await Religion.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )

    if (!religion) {
      return NextResponse.json(
        { error: 'Religion not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(religion)
  } catch (error) {
    console.error('Error updating religion:', error)
    return NextResponse.json(
      { error: 'Failed to update religion' },
      { status: 500 }
    )
  }
}