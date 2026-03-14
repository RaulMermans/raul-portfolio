# 📋 Project Manager System

The Project Manager system analyzes incoming requests, breaks them down into actionable tasks, and delegates them to appropriate departments.

## Features

- **Automatic Task Breakdown**: Analyzes requests and creates structured tasks
- **Department Assignment**: Automatically assigns tasks to relevant departments
- **Priority Management**: Assigns priorities based on task complexity
- **Dependency Tracking**: Tracks task dependencies for proper execution order

## Available Departments

- **design** - Design & UX/UI
- **frontend** - Frontend Development (React, TypeScript, Next.js)
- **backend** - Backend & API Development
- **optimization** - Performance & Optimization
- **content** - Content & Data Management
- **infrastructure** - Infrastructure & Configuration
- **quality** - Quality Assurance & Testing
- **documentation** - Documentation
- **animation** - Animation & UI Expert
- **mobile** - Mobile Optimization

## API Endpoints

### GET /api/tasks?q=<request>

Analyze a request and get task breakdown.

**Example:**
```bash
curl "http://localhost:3000/api/tasks?q=fix%20images%20on%20case%20studies"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "analysis": {
      "tasks": [...],
      "departments": ["frontend", "design"],
      "complexity": "moderate",
      "estimatedTime": "~15 minutes"
    },
    "formatted": "Task Analysis\n...",
    "departments": [...]
  }
}
```

### POST /api/departments/tasks

Get tasks organized by department.

**Request:**
```json
{
  "request": "fix images on case studies and add section titles"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "request": "fix images on case studies and add section titles",
    "departmentAssignments": [
      {
        "department": {
          "id": "frontend",
          "name": "Frontend Development",
          "description": "...",
          "capabilities": [...]
        },
        "tasks": [...]
      }
    ],
    "summary": {
      "totalTasks": 5,
      "departmentsInvolved": 2,
      "complexity": "moderate",
      "estimatedTime": "~15 minutes"
    }
  }
}
```

### GET /api/departments/tasks?request=<request>

Get all departments or analyze a request and organize by department.

**Example:**
```bash
# Get all departments
curl "http://localhost:3000/api/departments/tasks"

# Analyze request
curl "http://localhost:3000/api/departments/tasks?request=optimize%20images"
```

## Usage in Code

```typescript
import { orchestrateRequest, analyzeRequest } from '@/lib/project-manager'

// Analyze a request
const analysis = orchestrateRequest('fix images on case studies')

// Get tasks for a specific department
const frontendTasks = analysis.tasks.filter(
  task => task.department?.includes('frontend')
)
```

## Task Structure

```typescript
interface Task {
  id: string
  content: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  dependencies?: string[]
  department?: string[]
  priority?: 'high' | 'medium' | 'low'
  estimatedComplexity?: 'simple' | 'moderate' | 'complex'
}
```

## Example Workflow

1. **Receive Request**: "Fix images on case studies and add section titles"

2. **Analyze**: System breaks down into tasks:
   - Task 1: Fix image paths (frontend)
   - Task 2: Add section titles (frontend, design)
   - Task 3: Update gallery styling (design)

3. **Assign to Departments**:
   - Frontend: Tasks 1, 2
   - Design: Tasks 2, 3

4. **Execute**: Departments work on their assigned tasks

5. **Track Progress**: Update task status as work progresses

## Best Practices

- Be specific in requests for better task breakdown
- Review task assignments before starting work
- Update task status as you complete work
- Use dependencies to ensure proper execution order

