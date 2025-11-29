import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Book } from '@/lib/mongodb-models'

// GET /api/books - Get books with pagination and filtering
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
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] }}
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
    
    // Get books with pagination
    const books = await Book.find(query)
      .populate('religionId', 'name')
      .populate('sectId', 'name')
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit)
    
    // Get total count for pagination
    const total = await Book.countDocuments(query)
    
    return NextResponse.json({
      books,
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
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}

// POST /api/books - Create new book
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const book = await Book.create(body)
    
    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    )
  }
}