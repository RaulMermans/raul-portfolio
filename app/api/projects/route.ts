import { NextResponse } from 'next/server'
import type { Project } from '@/types'

// Example projects data - replace with your actual data source
const projects: Project[] = [
  {
    id: '1',
    title: 'Example Project',
    description: 'This is an example project description.',
    technologies: ['React', 'TypeScript', 'Next.js'],
    featured: true,
    date: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    // TODO: Replace with actual data fetching
    // This could be from a database, CMS, or external API
    
    return NextResponse.json(
      { 
        success: true, 
        data: projects 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Projects API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch projects' 
      },
      { status: 500 }
    )
  }
}

