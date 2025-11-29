import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const religion = searchParams.get('religion')
    const century = searchParams.get('century')
    const language = searchParams.get('language')

    const where: any = {}

    if (religion) {
      where.sect = {
        religion: {
          name: {
            contains: religion,
            mode: 'insensitive'
          }
        }
      }
    }

    if (century) {
      where.century = {
        contains: century,
        mode: 'insensitive'
      }
    }

    if (language) {
      where.language = {
        contains: language,
        mode: 'insensitive'
      }
    }

    const scholars = await db.scholar.findMany({
      where,
      include: {
        sect: {
          include: {
            religion: true
          }
        }
      },
      orderBy: {
        isUniversallyRespected: 'desc'
      }
    })

    return NextResponse.json(scholars)
  } catch (error) {
    console.error('Error fetching scholars:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scholars' },
      { status: 500 }
    )
  }
}