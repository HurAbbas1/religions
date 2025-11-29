import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function GET() {
  try {
    const uri = process.env.MONGODB_URI || ''
    
    console.log('Testing MongoDB connection...')
    console.log('URI exists:', !!uri)
    console.log('URI preview:', uri.substring(0, 20) + '...')
    
    if (!uri) {
      return NextResponse.json({ error: 'No MONGODB_URI found' }, { status: 500 })
    }
    
    await mongoose.connect(uri)
    
    const admin = mongoose.connection.db.admin()
    const info = await admin.serverInfo()
    
    return NextResponse.json({
      success: true,
      connected: mongoose.connection.readyState === 1,
      database: mongoose.connection.name,
      host: mongoose.connection.host,
      serverVersion: info.version
    })
  } catch (error) {
    console.error('Connection test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}