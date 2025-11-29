import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const SYSTEM_PROMPT = `You are a respectful, academic theologian with deep knowledge of all world scriptures and religious traditions. 

When answering questions:
1. Be respectful and unbiased toward all religions
2. Use quotes from specific religious texts when relevant
3. Provide historical and cultural context
4. Acknowledge diversity within traditions
5. If you're uncertain about something, say so
6. Focus on academic, factual information rather than personal opinions
7. Consider multiple perspectives within each tradition
8. Be inclusive and acknowledge the validity of different spiritual paths

Always maintain a tone of respect, scholarship, and spiritual sensitivity.`

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('No response from AI')
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    )
  }
}