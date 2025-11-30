import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Practice } from '@/lib/mongodb-models'

// GET /api/practices - Get practices with pagination and filtering
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
    const sortBy = searchParams.get('sortBy') || 'rating'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    // Build query
    const query: any = {}
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { instructions: { $regex: search, $options: 'i' } },
        { benefits: { $in: [new RegExp(search, 'i')] } },
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
    
    // Build sort
    const sort: any = {}
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1
    
    // Get practices with pagination
    const practices = await Practice.find(query)
      .populate('religionId', 'name')
      .populate('sectId', 'name')
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit)
    
    // Get total count for pagination
    const total = await Practice.countDocuments(query)
    
    return NextResponse.json({
      practices,
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
    console.error('Error fetching practices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch practices' },
      { status: 500 }
    )
  }
}

// POST /api/practices - Create new practice
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const practice = await Practice.create(body)
    
    return NextResponse.json(practice, { status: 201 })
  } catch (error) {
    console.error('Error creating practice:', error)
    return NextResponse.json(
      { error: 'Failed to create practice' },
      { status: 500 }
    )
  }
}