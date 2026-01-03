import { NextResponse } from 'next/server'
import { departmentManager } from '@/lib/departments'

/**
 * GET /api/departments/reports
 * Get full reports from all departments
 */
export async function GET() {
  try {
    const reports = await departmentManager.getAllReports()
    return NextResponse.json({
      success: true,
      data: reports,
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

