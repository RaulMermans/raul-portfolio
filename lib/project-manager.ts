/**
 * PROJECT MANAGER / TASK ORCHESTRATOR
 * 
 * Analyzes incoming requests, breaks them into actionable tasks,
 * identifies required tools/departments, and coordinates execution.
 */

export interface Task {
  id: string
  content: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  dependencies?: string[]
  department?: string[]
  priority?: 'high' | 'medium' | 'low'
  estimatedComplexity?: 'simple' | 'moderate' | 'complex'
}

export interface TaskAnalysis {
  tasks: Task[]
  departments: string[]
  estimatedTime?: string
  complexity: 'simple' | 'moderate' | 'complex'
}

export interface Department {
  name: string
  description: string
  capabilities: string[]
}

// Available departments and their capabilities
export const DEPARTMENTS: Record<string, Department> = {
  'design': {
    name: 'Design & UX/UI',
    description: 'Handles design, layout, styling, and user experience improvements',
    capabilities: ['CSS/styling', 'layout design', 'responsive design', 'UX improvements', 'visual design'],
  },
  'frontend': {
    name: 'Frontend Development',
    description: 'Handles React components, TypeScript, Next.js pages, and client-side code',
    capabilities: ['React components', 'TypeScript', 'Next.js pages', 'component architecture', 'client-side logic'],
  },
  'backend': {
    name: 'Backend & API',
    description: 'Handles API routes, server-side logic, and data management',
    capabilities: ['API routes', 'server logic', 'data management', 'routes', 'server-side'],
  },
  'optimization': {
    name: 'Performance & Optimization',
    description: 'Handles performance optimization, image optimization, caching, and speed improvements',
    capabilities: ['performance', 'optimization', 'images', 'caching', 'speed', 'load time'],
  },
  'content': {
    name: 'Content & Data',
    description: 'Handles content updates, data structures, and content management',
    capabilities: ['content updates', 'data structures', 'content management', 'text changes'],
  },
  'infrastructure': {
    name: 'Infrastructure & Config',
    description: 'Handles configuration, deployment, build setup, and infrastructure',
    capabilities: ['configuration', 'deployment', 'build setup', 'infrastructure', 'config files'],
  },
  'quality': {
    name: 'Quality Assurance',
    description: 'Handles testing, linting, error checking, and code quality',
    capabilities: ['testing', 'linting', 'error checking', 'code quality', 'validation'],
  },
  'documentation': {
    name: 'Documentation',
    description: 'Handles documentation, README files, and guides',
    capabilities: ['documentation', 'readme', 'guides', 'docs'],
  },
  'animation': {
    name: 'Animation & UI Expert',
    description: 'Specialized in award-winning animations, microinteractions, and Awwwards-level UI design',
    capabilities: ['animations', 'microinteractions', 'ui design', 'transitions', 'hover effects', 'scroll animations', 'award-winning design'],
  },
  'mobile': {
    name: 'Mobile Optimizer',
    description: 'Proactively monitors and optimizes mobile design, performance, and user experience',
    capabilities: ['mobile design', 'touch optimization', 'responsive design', 'mobile performance', 'viewport optimization', 'mobile UX', 'mobile bug fixes'],
  },
}

/**
 * Analyzes a request and breaks it down into actionable tasks
 */
export function analyzeRequest(request: string): TaskAnalysis {
  const requestLower = request.toLowerCase()
  const tasks: Task[] = []
  const departments = new Set<string>()
  let complexity: 'simple' | 'moderate' | 'complex' = 'simple'

  // Detect department needs based on keywords
  const departmentMatches: Record<string, number> = {}
  
  Object.entries(DEPARTMENTS).forEach(([key, dept]) => {
    const matches = dept.capabilities.filter(cap => 
      requestLower.includes(cap.toLowerCase())
    ).length
    if (matches > 0) {
      departmentMatches[key] = matches
      departments.add(key)
    }
  })

  // Analyze complexity
  const complexityIndicators = {
    complex: ['redesign', 'refactor', 'restructure', 'rebuild', 'complete', 'full', 'entire', 'all', 'everything'],
    moderate: ['create', 'add', 'implement', 'build', 'update', 'modify', 'change', 'improve'],
    simple: ['fix', 'update', 'change', 'adjust', 'modify', 'remove', 'delete'],
  }

  if (complexityIndicators.complex.some(word => requestLower.includes(word))) {
    complexity = 'complex'
  } else if (complexityIndicators.moderate.some(word => requestLower.includes(word))) {
    complexity = 'moderate'
  }

  // Break down common request patterns
  if (requestLower.includes('page') || requestLower.includes('landing')) {
    tasks.push({
      id: 'task-1',
      content: 'Analyze page requirements and structure',
      status: 'pending',
      department: Array.from(departments),
      priority: 'high',
      estimatedComplexity: 'moderate',
    })
    tasks.push({
      id: 'task-2',
      content: 'Create/update page component',
      status: 'pending',
      department: ['frontend'],
      dependencies: ['task-1'],
      priority: 'high',
      estimatedComplexity: complexity === 'complex' ? 'complex' : 'moderate',
    })
    tasks.push({
      id: 'task-3',
      content: 'Add/update styles and layout',
      status: 'pending',
      department: ['design'],
      dependencies: ['task-2'],
      priority: 'high',
      estimatedComplexity: 'moderate',
    })
    if (requestLower.includes('responsive') || requestLower.includes('mobile')) {
      tasks.push({
        id: 'task-4',
        content: 'Ensure responsive/mobile compatibility',
        status: 'pending',
        department: ['design', 'frontend'],
        dependencies: ['task-3'],
        priority: 'medium',
        estimatedComplexity: 'moderate',
      })
    }
  }

  if (requestLower.includes('component')) {
    tasks.push({
      id: 'task-comp-1',
      content: 'Create/update component structure',
      status: 'pending',
      department: ['frontend'],
      priority: 'high',
      estimatedComplexity: 'moderate',
    })
    tasks.push({
      id: 'task-comp-2',
      content: 'Add component styling',
      status: 'pending',
      department: ['design'],
      dependencies: ['task-comp-1'],
      priority: 'high',
      estimatedComplexity: 'simple',
    })
  }

  if (requestLower.includes('optimize') || requestLower.includes('performance') || requestLower.includes('speed')) {
    tasks.push({
      id: 'task-opt-1',
      content: 'Identify optimization opportunities',
      status: 'pending',
      department: ['optimization'],
      priority: 'high',
      estimatedComplexity: 'moderate',
    })
    tasks.push({
      id: 'task-opt-2',
      content: 'Implement optimizations',
      status: 'pending',
      department: ['optimization'],
      dependencies: ['task-opt-1'],
      priority: 'high',
      estimatedComplexity: 'moderate',
    })
  }

  // Mobile audit and optimization
  if (requestLower.includes('mobile') || requestLower.includes('audit') || 
      requestLower.includes('ux') || requestLower.includes('ui') || 
      requestLower.includes('performance') && requestLower.includes('improve')) {
    tasks.push({
      id: 'task-mobile-audit-1',
      content: 'Run mobile UX/UI and performance audit',
      status: 'pending',
      department: ['mobile', 'design', 'optimization'],
      priority: 'high',
      estimatedComplexity: 'moderate',
    })
    tasks.push({
      id: 'task-mobile-audit-2',
      content: 'Analyze audit results and generate recommendations',
      status: 'pending',
      department: ['mobile'],
      dependencies: ['task-mobile-audit-1'],
      priority: 'high',
      estimatedComplexity: 'simple',
    })
    tasks.push({
      id: 'task-mobile-audit-3',
      content: 'Implement mobile improvements',
      status: 'pending',
      department: ['mobile', 'design', 'frontend'],
      dependencies: ['task-mobile-audit-2'],
      priority: 'medium',
      estimatedComplexity: 'moderate',
    })
  }

  if (requestLower.includes('fix') || requestLower.includes('bug') || requestLower.includes('error')) {
    tasks.push({
      id: 'task-fix-1',
      content: 'Identify and diagnose issue',
      status: 'pending',
      department: ['quality', 'frontend'],
      priority: 'high',
      estimatedComplexity: 'simple',
    })
    tasks.push({
      id: 'task-fix-2',
      content: 'Implement fix',
      status: 'pending',
      department: Array.from(departments),
      dependencies: ['task-fix-1'],
      priority: 'high',
      estimatedComplexity: 'simple',
    })
  }

  if (requestLower.includes('deploy') || requestLower.includes('railway')) {
    tasks.push({
      id: 'task-deploy-1',
      content: 'Verify changes are ready',
      status: 'pending',
      department: ['quality'],
      priority: 'high',
      estimatedComplexity: 'simple',
    })
    tasks.push({
      id: 'task-deploy-2',
      content: 'Commit and push changes',
      status: 'pending',
      department: ['infrastructure'],
      dependencies: ['task-deploy-1'],
      priority: 'high',
      estimatedComplexity: 'simple',
    })
  }

  // If no specific patterns matched, create a general task
  if (tasks.length === 0) {
    tasks.push({
      id: 'task-general-1',
      content: request,
      status: 'pending',
      department: Array.from(departments).length > 0 ? Array.from(departments) : undefined,
      priority: 'medium',
      estimatedComplexity: complexity,
    })
  }

  // Add quality check task for complex requests
  if (complexity === 'complex' || tasks.length > 3) {
    tasks.push({
      id: 'task-qa-1',
      content: 'Review and verify implementation',
      status: 'pending',
      department: ['quality'],
      dependencies: tasks.slice(0, -1).map(t => t.id),
      priority: 'medium',
      estimatedComplexity: 'simple',
    })
  }

  return {
    tasks,
    departments: Array.from(departments),
    complexity,
    estimatedTime: estimateTime(complexity, tasks.length),
  }
}

/**
 * Estimates time based on complexity and task count
 */
function estimateTime(complexity: string, taskCount: number): string {
  const baseTime = complexity === 'complex' ? 30 : complexity === 'moderate' ? 15 : 5
  const totalMinutes = baseTime * taskCount
  if (totalMinutes < 60) {
    return `~${totalMinutes} minutes`
  }
  return `~${Math.round(totalMinutes / 60)} hours`
}

/**
 * Gets recommended departments for a request
 */
export function getRecommendedDepartments(request: string): Department[] {
  const analysis = analyzeRequest(request)
  return analysis.departments.map(dept => DEPARTMENTS[dept]).filter(Boolean)
}

/**
 * Formats task analysis for display
 */
export function formatTaskAnalysis(analysis: TaskAnalysis): string {
  let output = `📋 Task Analysis\n`
  output += `Complexity: ${analysis.complexity.toUpperCase()}\n`
  if (analysis.estimatedTime) {
    output += `Estimated Time: ${analysis.estimatedTime}\n`
  }
  output += `\nDepartments Involved:\n`
  analysis.departments.forEach(dept => {
    const deptInfo = DEPARTMENTS[dept]
    if (deptInfo) {
      output += `  • ${deptInfo.name}: ${deptInfo.description}\n`
    }
  })
  output += `\nTasks (${analysis.tasks.length}):\n`
  analysis.tasks.forEach((task, index) => {
    output += `  ${index + 1}. ${task.content}\n`
    if (task.department && task.department.length > 0) {
      output += `     → Departments: ${task.department.join(', ')}\n`
    }
    if (task.dependencies && task.dependencies.length > 0) {
      output += `     → Depends on: ${task.dependencies.join(', ')}\n`
    }
  })
  return output
}

/**
 * Main orchestrator function - analyzes request and provides task breakdown
 */
export function orchestrateRequest(request: string): TaskAnalysis {
  console.log('🎯 Project Manager: Analyzing request...')
  const analysis = analyzeRequest(request)
  console.log(formatTaskAnalysis(analysis))
  return analysis
}

