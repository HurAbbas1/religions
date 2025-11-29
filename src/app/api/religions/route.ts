import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const religions = await db.religion.findMany({
      include: {
        sects: {
          include: {
            scholars: true
          }
        },
        rituals: true
      },
      orderBy: {
        populationPercentage: 'desc'
      }
    })

    return NextResponse.json(religions)
  } catch (error) {
    console.error('Error fetching religions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch religions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const religion = await db.religion.create({
      data: body
    })

    return NextResponse.json(religion, { status: 201 })
  } catch (error) {
    console.error('Error creating religion:', error)
    return NextResponse.json(
      { error: 'Failed to create religion' },
      { status: 500 }
    )
  }
}