import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const religion = await db.religion.findUnique({
      where: { id },
      include: {
        sects: {
          include: {
            scholars: true
          }
        },
        rituals: true
      }
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