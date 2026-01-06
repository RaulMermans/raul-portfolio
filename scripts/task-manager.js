#!/usr/bin/env node

/**
 * Task Manager CLI
 * 
 * Usage:
 *   node scripts/task-manager.js "fix images on case studies"
 *   node scripts/task-manager.js "fix images on case studies" --department design
 *   node scripts/task-manager.js --departments
 */

const { analyzeRequest, formatTaskAnalysis, DEPARTMENTS } = require('../lib/project-manager.ts')

const args = process.argv.slice(2)
const request = args.find(arg => !arg.startsWith('--'))
const showDepartments = args.includes('--departments') || args.includes('--depts')
const departmentFilter = args.find(arg => arg.startsWith('--department='))?.split('=')[1]

if (showDepartments) {
  console.log('\n📋 Available Departments:\n')
  Object.entries(DEPARTMENTS).forEach(([id, dept]) => {
    console.log(`  ${id.padEnd(15)} - ${dept.name}`)
    console.log(`  ${' '.repeat(17)}${dept.description}`)
    console.log(`  ${' '.repeat(17)}Capabilities: ${dept.capabilities.join(', ')}`)
    console.log()
  })
  process.exit(0)
}

if (!request) {
  console.log(`
📋 Task Manager

Usage:
  node scripts/task-manager.js "<request description>"
  node scripts/task-manager.js "<request>" --department=<dept-id>
  node scripts/task-manager.js --departments

Examples:
  node scripts/task-manager.js "fix images on case studies"
  node scripts/task-manager.js "add gallery section" --department=design
  node scripts/task-manager.js --departments
`)
  process.exit(1)
}

try {
  console.log(`\n🎯 Analyzing request: "${request}"\n`)
  
  const analysis = analyzeRequest(request)
  
  console.log(formatTaskAnalysis(analysis))
  
  if (departmentFilter) {
    const deptInfo = DEPARTMENTS[departmentFilter]
    if (!deptInfo) {
      console.error(`\n❌ Department "${departmentFilter}" not found. Use --departments to see available departments.`)
      process.exit(1)
    }
    
    const deptTasks = analysis.tasks.filter(task => 
      task.department && task.department.includes(departmentFilter)
    )
    
    if (deptTasks.length === 0) {
      console.log(`\n⚠️  No tasks assigned to "${departmentFilter}" department.`)
    } else {
      console.log(`\n📦 Tasks for ${deptInfo.name}:`)
      deptTasks.forEach((task, index) => {
        console.log(`  ${index + 1}. ${task.content}`)
        console.log(`     Status: ${task.status} | Priority: ${task.priority || 'N/A'} | Complexity: ${task.estimatedComplexity || 'N/A'}`)
      })
    }
  } else {
    // Show tasks organized by department
    const byDepartment = {}
    analysis.tasks.forEach(task => {
      if (task.department && task.department.length > 0) {
        task.department.forEach(deptId => {
          if (!byDepartment[deptId]) {
            byDepartment[deptId] = []
          }
          byDepartment[deptId].push(task)
        })
      }
    })
    
    if (Object.keys(byDepartment).length > 0) {
      console.log(`\n📦 Task Assignments by Department:\n`)
      Object.entries(byDepartment).forEach(([deptId, tasks]) => {
        const dept = DEPARTMENTS[deptId]
        console.log(`  ${dept?.name || deptId}:`)
        tasks.forEach((task, index) => {
          console.log(`    ${index + 1}. ${task.content}`)
          console.log(`       Status: ${task.status} | Priority: ${task.priority || 'N/A'}`)
        })
        console.log()
      })
    }
  }
  
  console.log(`\n✅ Analysis complete!\n`)
} catch (error) {
  console.error('\n❌ Error:', error.message)
  process.exit(1)
}

