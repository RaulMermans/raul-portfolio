import { NextResponse } from 'next/server'
import { departmentManager } from '@/lib/departments'

/**
 * GET /api/departments
 * Get status of all departments
 */
export async function GET(request: Request) {
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

