import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Video } from '@/lib/mongodb-models'

// GET /api/videos - Get videos with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const religion = searchParams.get('religion') || ''
    const category = searchParams.get('category') || ''
    const difficulty = searchParams.get('difficulty') || ''
    const language = searchParams.get('language') || ''
    const sortBy = searchParams.get('sortBy') || 'rating'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    // Build query
    const query: any = {}
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { channel: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    if (religion) {
      query.religionId = religion
    }
    if (category) {
      query.category = category
    }
    if (difficulty) {
      query.difficulty = difficulty
    }
    if (language) {
      query.language = language
    }
    
    // Build sort
    const sort: any = {}
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1
    
    // Get videos with pagination
    const videos = await Video.find(query)
      .populate('religionId', 'name')
      .populate('sectId', 'name')
      .populate('scholarId', 'name')
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit)
    
    // Get total count for pagination
    const total = await Video.countDocuments(query)
    
    return NextResponse.json({
      videos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

// POST /api/videos - Create new video
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const video = await Video.create(body)
    
    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
}