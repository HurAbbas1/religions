import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

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
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API Key is missing' },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    
    // ✅ FIX: Using a valid model name from your list
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const finalPrompt = `${SYSTEM_PROMPT}\n\nUser Question: ${message}\n\nAnswer:`

    const result = await model.generateContent(finalPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ response: text })

  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process your request' },
      { status: 500 }
    )
  }
}