import { NextResponse } from 'next/server'
import { departmentManager } from '@/lib/departments'

/**
 * GET /api/departments
 * 
 * INTERNAL DEVELOPMENT TOOL - Returns status of all departments
 * Used for monitoring the automated department system during development.
 * 
 * Usage:
 *   GET /api/departments - Get all departments status
 *   GET /api/departments?department=developer - Get specific department
 * 
 * Note: This endpoint is disabled in production for security.
 */
export async function GET(request: Request) {
  // Disable in production - development tool only
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is disabled in production' },
      { status: 403 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get('department') as 'developer' | 'design' | 'management' | null

    if (department) {
      // Get specific department report
      const report = await departmentManager.getDepartmentReport(department)
      return NextResponse.json({
        success: true,
        department,
        data: report,
      })
    } else {
      // Get all departments status
      const status = departmentManager.getAllStatus()
      return NextResponse.json({
        success: true,
        data: status,
      })
    }
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

