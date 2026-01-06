import { NextRequest, NextResponse } from 'next/server'
import { analyzeRequest, DEPARTMENTS, type Task } from '@/lib/project-manager'
import type { Department } from '@/lib/project-manager'
import { logger } from '@/lib/logger'

type DepartmentWithId = Department & { id: string }

/**
 * GET /api/departments/tasks - Get all tasks organized by department
 * POST /api/departments/tasks - Get tasks for specific departments
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const requestText = searchParams.get('request')
    
    if (!requestText) {
      // Return all departments info
      return NextResponse.json({
        success: true,
        data: {
          departments: Object.entries(DEPARTMENTS).map(([id, dept]) => ({
            id,
            ...dept,
          })),
        },
      })
    }

    // Analyze request and organize by department
    const analysis = analyzeRequest(requestText)
    const departmentTasks: Record<string, { department: DepartmentWithId; tasks: Task[] }> = {}

    analysis.tasks.forEach(task => {
      if (task.department && task.department.length > 0) {
        task.department.forEach(deptId => {
          if (!departmentTasks[deptId]) {
            departmentTasks[deptId] = {
              department: { id: deptId, ...DEPARTMENTS[deptId] },
              tasks: [],
            }
          }
          departmentTasks[deptId].tasks.push(task)
        })
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        request: requestText,
        analysis,
        departmentAssignments: Object.values(departmentTasks),
        summary: {
          totalTasks: analysis.tasks.length,
          departmentsInvolved: Object.keys(departmentTasks).length,
          complexity: analysis.complexity,
          estimatedTime: analysis.estimatedTime,
        },
      },
    })
  } catch (error) {
    logger.error('Error getting department tasks:', error)
    return NextResponse.json(
      { error: 'Failed to get department tasks', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { request: requestText, departments: departmentIds } = body

    if (!requestText) {
      return NextResponse.json(
        { error: 'Missing "request" field' },
        { status: 400 }
      )
    }

    const analysis = analyzeRequest(requestText)
    
    // Filter by specific departments if provided
    const filteredTasks = departmentIds && Array.isArray(departmentIds)
      ? analysis.tasks.filter(task => 
          task.department && task.department.some(dept => departmentIds.includes(dept))
        )
      : analysis.tasks

    // Organize by department
    const departmentTasks: Record<string, { department: DepartmentWithId; tasks: Task[] }> = {}

    filteredTasks.forEach(task => {
      if (task.department && task.department.length > 0) {
        task.department.forEach(deptId => {
          if (!departmentIds || departmentIds.includes(deptId)) {
            if (!departmentTasks[deptId]) {
              departmentTasks[deptId] = {
                department: { id: deptId, ...DEPARTMENTS[deptId] },
                tasks: [],
              }
            }
            departmentTasks[deptId].tasks.push(task)
          }
        })
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        request: requestText,
        departmentAssignments: Object.values(departmentTasks),
        summary: {
          totalTasks: filteredTasks.length,
          departmentsInvolved: Object.keys(departmentTasks).length,
          complexity: analysis.complexity,
          estimatedTime: analysis.estimatedTime,
        },
      },
    })
  } catch (error) {
    logger.error('Error processing department tasks:', error)
    return NextResponse.json(
      { error: 'Failed to process department tasks', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

