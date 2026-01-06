import { NextResponse } from 'next/server'
import { designDepartment } from '@/lib/departments'

/**
 * GET /api/departments/designer
 * Get UX/UI Designer Department report and status
 */
export async function GET() {
  try {
    const status = designDepartment.getStatus()
    const report = await designDepartment.getReport()
    
    return NextResponse.json({
      success: true,
      department: {
        id: 'design',
        name: 'UX/UI Designer',
        description: 'Handles design, layout, styling, and user experience improvements',
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

