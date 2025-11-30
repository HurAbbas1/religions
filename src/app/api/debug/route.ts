import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Religion, Book, Video, Practice, Scholar } from '@/lib/mongodb-models'

export async function GET() {
  try {
    await connectDB()
    
    const counts = {
      religions: await Religion.countDocuments({}),
      books: await Book.countDocuments({}),
      videos: await Video.countDocuments({}),
      practices: await Practice.countDocuments({}),
      scholars: await Scholar.countDocuments({})
    }
    
    // Get sample data
    const sampleReligions = await Religion.find({}).limit(3).lean()
    const sampleBooks = await Book.find({}).limit(3).lean()
    const sampleVideos = await Video.find({}).limit(3).lean()
    
    return NextResponse.json({
      success: true,
      counts,
      samples: {
        religions: sampleReligions,
        books: sampleBooks,
        videos: sampleVideos
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}