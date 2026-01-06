import { NextResponse } from 'next/server'
import { developerDepartment } from '@/lib/departments'

/**
 * GET /api/departments/developer
 * Get Frontend Developer Department report and status
 */
export async function GET() {
  try {
    const status = developerDepartment.getStatus()
    const report = await developerDepartment.getReport()
    
    return NextResponse.json({
      success: true,
      department: {
        id: 'developer',
        name: 'Frontend Developer',
        description: 'Handles React components, TypeScript, Next.js pages, and client-side code',
      },
      status,
      report,
      timestamp: Date.now(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

