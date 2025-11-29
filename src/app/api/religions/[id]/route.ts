import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Religion, Book, Video, Practice, Sect, Scholar } from '@/lib/mongodb-models'
import mongoose from 'mongoose' // <--- ADDED THIS IMPORT

// GET /api/religions/[id] - Get single religion with all related content
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params
    
    // --- START: SAFETY CHECK ---
    // If ID is missing, "undefined", or not a valid Mongo ID, stop here.
    if (!id || id === 'undefined' || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid Religion ID provided' },
        { status: 400 }
      )
    }
    // --- END: SAFETY CHECK ---

    const religion = await Religion.findById(id)
      .populate({
        path: 'sects',
        populate: {
          path: 'scholars',
          model: 'Scholar'
        }
      })
      .populate('scholars')
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

    if (!religion) {
      return NextResponse.json(
        { error: 'Religion not found' },
        { status: 404 }
      )
    }

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

    // --- START: SAFETY CHECK ---
    if (!id || id === 'undefined' || !mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: 'Invalid Religion ID provided' },
          { status: 400 }
        )
      }
    // --- END: SAFETY CHECK ---

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