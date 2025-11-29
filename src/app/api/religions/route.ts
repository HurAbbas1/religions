import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Religion, Sect, Scholar, Book, Video, Practice } from '@/lib/mongodb-models'

// GET /api/religions - Get all religions with pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const sortBy = searchParams.get('sortBy') || 'name'
    const sortOrder = searchParams.get('sortOrder') || 'asc'
    
    // Build query
    const query: any = {}
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    // Build sort
    const sort: any = {}
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1
    
    // Get religions with pagination
    const religions = await Religion.find(query)
      .populate('sects')
      .populate('scholars')
      .populate('books')
      .populate('videos')
      .populate('practices')
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit)
    
    // Get total count for pagination
    const total = await Religion.countDocuments(query)
    
    return NextResponse.json({
      religions,
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
    console.error('Error fetching religions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch religions' },
      { status: 500 }
    )
  }
}

// POST /api/religions - Create new religion
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const religion = await Religion.create(body)
    
    return NextResponse.json(religion, { status: 201 })
  } catch (error) {
    console.error('Error creating religion:', error)
    return NextResponse.json(
      { error: 'Failed to create religion' },
      { status: 500 }
    )
  }
}