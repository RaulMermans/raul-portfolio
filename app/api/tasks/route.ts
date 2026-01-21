import { NextRequest, NextResponse } from 'next/server'
import { orchestrateRequest, analyzeRequest, formatTaskAnalysis, DEPARTMENTS, type TaskAnalysis, type Task } from '@/lib/project-manager'
import { logger } from '@/lib/logger'

/**
 * Task Management API
 * 
 * INTERNAL DEVELOPMENT TOOL - Analyzes requests and breaks them into tasks
 * Used by the automated project manager system during development.
 * 
 * GET /api/tasks?q=request - Analyze a request and get task breakdown
 * POST /api/tasks - Create tasks from a request body
 * 
 * Note: This endpoint is disabled in production for security.
 */
export async function GET(request: NextRequest) {
  // Disable in production - development tool only
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is disabled in production' },
      { status: 403 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || searchParams.get('request')
    
    if (!query) {
      return NextResponse.json(
        { error: 'Missing query parameter. Use ?q=your+request or ?request=your+request' },
        { status: 400 }
      )
    }

    const analysis = analyzeRequest(query)
    
    return NextResponse.json({
      success: true,
      data: {
        analysis,
        formatted: formatTaskAnalysis(analysis),
        departments: analysis.departments.map(deptId => DEPARTMENTS[deptId]).filter(Boolean),
      },
    })
  } catch (error) {
    logger.error('Error analyzing request:', error)
    return NextResponse.json(
      { error: 'Failed to analyze request', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Disable in production - development tool only
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is disabled in production' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { request: requestText, tasks, department } = body

    if (requestText) {
      // Analyze new request
      const analysis = orchestrateRequest(requestText)
      
      return NextResponse.json({
        success: true,
        data: {
          analysis,
          formatted: formatTaskAnalysis(analysis),
          departments: analysis.departments.map(deptId => DEPARTMENTS[deptId]).filter(Boolean),
        },
      })
    }

    if (tasks && Array.isArray(tasks)) {
      // Return task assignments by department
      const assignments: Record<string, Task[]> = {}
      
      tasks.forEach((task: Task) => {
        if (task.department && task.department.length > 0) {
          task.department.forEach(deptId => {
            if (!assignments[deptId]) {
              assignments[deptId] = []
            }
            assignments[deptId].push(task)
          })
        }
      })

      return NextResponse.json({
        success: true,
        data: {
          assignments,
          departments: Object.keys(assignments).map(deptId => ({
            id: deptId,
            ...DEPARTMENTS[deptId],
            tasks: assignments[deptId],
          })),
        },
      })
    }

    if (department) {
      // Get tasks for specific department
      const deptInfo = DEPARTMENTS[department]
      if (!deptInfo) {
        return NextResponse.json(
          { error: `Department "${department}" not found` },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: {
          department: {
            id: department,
            ...deptInfo,
          },
        },
      })
    }

    return NextResponse.json(
      { error: 'Missing required fields. Provide "request", "tasks", or "department"' },
      { status: 400 }
    )
  } catch (error) {
    logger.error('Error processing task request:', error)
    return NextResponse.json(
      { error: 'Failed to process request', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

