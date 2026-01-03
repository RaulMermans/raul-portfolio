/**
 * Department Manager
 * Central coordinator for all departments
 * Provides unified access to department reports and status
 */

import { developerDepartment } from './developer-department'
import { designDepartment } from './design-department'
import { managementDepartment } from './management-department'

export interface DepartmentStatus {
  name: string
  healthy: boolean
  issues: number
  lastCheck: number
}

export interface AllDepartmentsReport {
  timestamp: number
  departments: {
    developer: DepartmentStatus
    design: DepartmentStatus
    management: DepartmentStatus
  }
  overall: {
    healthy: boolean
    totalIssues: number
  }
}

class DepartmentManager {
  /**
   * Get status of all departments
   */
  getAllStatus(): AllDepartmentsReport {
    const developer = developerDepartment.getStatus()
    const design = designDepartment.getStatus()
    const management = managementDepartment.getStatus()

    const totalIssues = developer.issues + design.issues + management.issues

    return {
      timestamp: Date.now(),
      departments: {
        developer: {
          name: 'Developer',
          ...developer,
        },
        design: {
          name: 'Design',
          ...design,
        },
        management: {
          name: 'Management',
          ...management,
        },
      },
      overall: {
        healthy: totalIssues === 0,
        totalIssues,
      },
    }
  }

  /**
   * Get full reports from all departments
   */
  async getAllReports() {
    const [developer, design, management] = await Promise.all([
      developerDepartment.getReport(),
      designDepartment.getReport(),
      managementDepartment.getReport(),
    ])

    return {
      timestamp: Date.now(),
      developer,
      design,
      management,
    }
  }

  /**
   * Get report from a specific department
   */
  async getDepartmentReport(department: 'developer' | 'design' | 'management') {
    switch (department) {
      case 'developer':
        return developerDepartment.getReport()
      case 'design':
        return designDepartment.getReport()
      case 'management':
        return managementDepartment.getReport()
      default:
        throw new Error(`Unknown department: ${department}`)
    }
  }
}

export const departmentManager = new DepartmentManager()

// Export individual departments for direct access if needed
export { developerDepartment, designDepartment, managementDepartment }

