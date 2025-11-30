import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function GET() {
  try {
    const uri = process.env.MONGODB_URI || ''
    
    console.log('Testing MongoDB connection...')
    console.log('URI exists:', !!uri)
    
    // Safety check: ensure URI is long enough before substring to avoid errors
    if (uri && uri.length > 20) {
        console.log('URI preview:', uri.substring(0, 20) + '...')
    }
    
    if (!uri) {
      return NextResponse.json({ error: 'No MONGODB_URI found' }, { status: 500 })
    }
    
    // Connect to mongoose
    await mongoose.connect(uri);

    // FIX 1: Ensure .db is not undefined
    if (!mongoose.connection.db) {
        throw new Error('MongoDB connection failed: db is undefined');
    }

    const dbInstance = mongoose.connection.db;

    // FIX 2: Define 'info' before using it
    // We get the admin interface to check server status
    const admin = dbInstance.admin();
    const info = await admin.serverStatus();
    
    return NextResponse.json({
      success: true,
      connected: mongoose.connection.readyState === 1,
      database: mongoose.connection.name,
      host: mongoose.connection.host,
      serverVersion: info.version // Now 'info' is defined and safe to use
    })

  } catch (error) {
    console.error('Connection test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}