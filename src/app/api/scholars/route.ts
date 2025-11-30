import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Scholar } from '@/lib/mongodb-models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const religion = searchParams.get('religion')
    const century = searchParams.get('century')
    const language = searchParams.get('language')

    const pipeline: any[] = []

    pipeline.push({
      $lookup: {
        from: 'sects', 
        localField: 'sect',
        foreignField: '_id',
        as: 'sectData'
      }
    })
    pipeline.push({ $unwind: { path: '$sectData', preserveNullAndEmptyArrays: true } })

    pipeline.push({
      $lookup: {
        from: 'religions',
        localField: 'sectData.religion',
        foreignField: '_id',
        as: 'religionData'
      }
    })
    pipeline.push({ $unwind: { path: '$religionData', preserveNullAndEmptyArrays: true } })

    const matchStage: any = {}
    if (century) matchStage.century = { $regex: century, $options: 'i' }
    if (language) matchStage.language = { $regex: language, $options: 'i' }
    if (religion) matchStage['religionData.name'] = { $regex: religion, $options: 'i' }

    pipeline.push({ $match: matchStage })

    pipeline.push({
      $sort: { isUniversallyRespected: -1 } 
    })

    pipeline.push({
      $project: {
        name: 1,
        century: 1,
        language: 1,
        isUniversallyRespected: 1,
        image: 1,
        // --- ADDED MISSING FIELDS ---
        era: 1,
        majorWorks: 1,
        // --------------------------
        sect: {
          _id: '$sectData._id',
          name: '$sectData.name', 
          religion: '$religionData'
        }
      }
    })

    const scholars = await Scholar.aggregate(pipeline)

    return NextResponse.json(scholars)
    
  } catch (error) {
    console.error('Error fetching scholars:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scholars' },
      { status: 500 }
    )
  }
}