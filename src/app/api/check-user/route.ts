// TEMPORARY: Check if user exists (REMOVE IN PRODUCTION!)
import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/Prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email parameter required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true, // Check if password exists
      }
    })

    if (!user) {
      return NextResponse.json({ 
        exists: false, 
        message: 'User not found in database' 
      })
    }

    return NextResponse.json({ 
      exists: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        hasPassword: !!user.password
      }
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
