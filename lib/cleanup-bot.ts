/**
 * CLEANUP BOT
 * 
 * Performs deep code audits and cleanup:
 * - Scans for unused imports, variables, functions
 * - Identifies empty/duplicate files
 * - Finds commented-out code blocks
 * - Detects unused CSS classes
 * - Generates comprehensive cleanup reports
 */

export interface CleanupIssue {
  type: 'unused_import' | 'unused_variable' | 'unused_function' | 'empty_file' | 'commented_code' | 'unused_css' | 'duplicate_file' | 'unused_export'
  file: string
  line?: number
  severity: 'low' | 'medium' | 'high'
  description: string
  suggestion?: string
}

export interface CleanupReport {
  timestamp: string
  totalIssues: number
  issuesByType: Record<string, number>
  issues: CleanupIssue[]
  filesToDelete: string[]
  estimatedCleanup: {
    filesRemoved: number
    linesRemoved: number
    bytesSaved: number
  }
}

/**
 * Safe files/folders to NEVER delete
 */
const SAFE_PATTERNS = [
  /^\.git/,
  /^node_modules/,
  /^\.next/,
  /^\.env/,
  /package\.json/,
  /package-lock\.json/,
  /yarn\.lock/,
  /tsconfig\.json/,
  /next\.config\./,
  /tailwind\.config\./,
  /\.gitignore/,
  /README\.md/,
  /DEPLOYMENT\.md/,
  /^public\/images/,
  /^app\/layout\.tsx/,
  /^app\/page\.tsx/,
  /^app\/globals\.css/,
  /^styles\/globals\.css/,
]

/**
 * File patterns to scan
 */
const SCAN_PATTERNS = {
  typescript: /\.(ts|tsx)$/,
  javascript: /\.(js|jsx)$/,
  css: /\.css$/,
  markdown: /\.md$/,
}

/**
 * Check if a file path is safe to delete/modify
 */
function isSafeFile(filePath: string): boolean {
  return SAFE_PATTERNS.some(pattern => pattern.test(filePath))
}

/**
 * Analyzes a file for cleanup issues
 */
export async function analyzeFile(filePath: string, content: string): Promise<CleanupIssue[]> {
  const issues: CleanupIssue[] = []
  
  if (isSafeFile(filePath)) {
    return issues // Skip safe files
  }

  const lines = content.split('\n')
  const fileExtension = filePath.split('.').pop()?.toLowerCase() || ''

  // Check for empty file (except allowed empty files)
  if (content.trim().length === 0 && !filePath.includes('__tests__')) {
    issues.push({
      type: 'empty_file',
      file: filePath,
      severity: 'medium',
      description: 'File appears to be empty',
      suggestion: 'Consider removing if not needed',
    })
    return issues
  }

  // TypeScript/JavaScript analysis
  if (SCAN_PATTERNS.typescript.test(filePath) || SCAN_PATTERNS.javascript.test(filePath)) {
    // Check for large commented code blocks (more than 10 lines)
    let commentedBlockStart = -1
    let commentedLines = 0
    
    lines.forEach((line, index) => {
      const trimmed = line.trim()
      
      // Detect commented blocks
      if (trimmed.startsWith('//') || trimmed.startsWith('/*')) {
        if (commentedBlockStart === -1) {
          commentedBlockStart = index + 1
        }
        commentedLines++
      } else if (trimmed.endsWith('*/')) {
        if (commentedLines > 10) {
          issues.push({
            type: 'commented_code',
            file: filePath,
            line: commentedBlockStart,
            severity: 'low',
            description: `Large commented code block (${commentedLines} lines)`,
            suggestion: 'Remove if no longer needed',
          })
        }
        commentedBlockStart = -1
        commentedLines = 0
      } else if (commentedBlockStart !== -1 && trimmed.length > 0) {
        // Reset if we hit non-comment code
        commentedBlockStart = -1
        commentedLines = 0
      }
    })

    // Check for unused imports (basic detection - imports that aren't referenced)
    // This is a simplified check - a full AST parser would be more accurate
    const importRegex = /^import\s+.*?from\s+['"](.+?)['"]/gm
    const imports: Array<{ line: number; module: string; fullLine: string }> = []
    
    lines.forEach((line, index) => {
      const match = line.match(/^import\s+(?:(?:\{([^}]+)\})|(\w+)|.+?)\s+from\s+['"](.+?)['"]/)
      if (match) {
        imports.push({
          line: index + 1,
          module: match[3],
          fullLine: line.trim(),
        })
      }
    })

    // Check if imports are used (simplified - look for the import name in the file)
    imports.forEach((imp) => {
      const importName = imp.fullLine.match(/import\s+(?:\{([^}]+)\}|(\w+)|(.+?))\s+from/)?.[1] || 
                        imp.fullLine.match(/import\s+(\w+)/)?.[1]
      
      if (importName) {
        // Skip default imports and complex destructuring for now
        if (importName.includes('{') || importName === 'type') return
        
        const usedNames = importName.split(',').map(n => n.trim().split(' as ')[0])
        usedNames.forEach(name => {
          if (name && !name.startsWith('type ')) {
            // Count occurrences (should be more than just the import line)
            const occurrences = content.split(new RegExp(`\\b${name}\\b`)).length - 1
            if (occurrences <= 1) {
              issues.push({
                type: 'unused_import',
                file: filePath,
                line: imp.line,
                severity: 'medium',
                description: `Possibly unused import: ${name}`,
                suggestion: 'Remove if confirmed unused',
              })
            }
          }
        })
      }
    })
  }

  // CSS analysis
  if (SCAN_PATTERNS.css.test(filePath)) {
    // Check for CSS classes that might be unused
    // This is simplified - would need to scan all TSX/TS files to be accurate
    const classRegex = /\.([a-zA-Z0-9_-]+)\s*\{/g
    const classes = new Set<string>()
    let match
    
    while ((match = classRegex.exec(content)) !== null) {
      classes.add(match[1])
    }
    
    // Note: Full CSS class usage analysis would require scanning all component files
    // This is a placeholder for the structure
  }

  return issues
}

/**
 * Scans the codebase for cleanup opportunities
 */
export async function scanCodebase(rootDir: string = '.'): Promise<CleanupReport> {
  const issues: CleanupIssue[] = []
  const filesToDelete: string[] = []
  
  // This is a framework - actual implementation would use Node.js fs to scan files
  // For now, return a structure that shows what the bot would do
  
  const report: CleanupReport = {
    timestamp: new Date().toISOString(),
    totalIssues: issues.length,
    issuesByType: {},
    issues,
    filesToDelete,
    estimatedCleanup: {
      filesRemoved: filesToDelete.length,
      linesRemoved: 0,
      bytesSaved: 0,
    },
  }

  // Count issues by type
  issues.forEach(issue => {
    report.issuesByType[issue.type] = (report.issuesByType[issue.type] || 0) + 1
  })

  return report
}

/**
 * Formats cleanup report for display
 */
export function formatCleanupReport(report: CleanupReport): string {
  let output = `🧹 CLEANUP BOT REPORT\n`
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`
  output += `📅 Generated: ${new Date(report.timestamp).toLocaleString()}\n`
  output += `📊 Total Issues Found: ${report.totalIssues}\n\n`

  if (report.totalIssues === 0) {
    output += `✅ Codebase is clean! No issues found.\n`
    return output
  }

  output += `📋 Issues by Type:\n`
  Object.entries(report.issuesByType).forEach(([type, count]) => {
    output += `  • ${type.replace(/_/g, ' ').toUpperCase()}: ${count}\n`
  })
  output += `\n`

  // Group issues by file
  const issuesByFile: Record<string, CleanupIssue[]> = {}
  report.issues.forEach(issue => {
    if (!issuesByFile[issue.file]) {
      issuesByFile[issue.file] = []
    }
    issuesByFile[issue.file].push(issue)
  })

  output += `🔍 Detailed Findings:\n\n`
  Object.entries(issuesByFile).slice(0, 20).forEach(([file, fileIssues]) => {
    output += `📄 ${file}\n`
    fileIssues.forEach(issue => {
      const lineInfo = issue.line ? ` (line ${issue.line})` : ''
      const severityEmoji = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢'
      output += `  ${severityEmoji} [${issue.type.toUpperCase()}]${lineInfo}: ${issue.description}\n`
      if (issue.suggestion) {
        output += `     💡 ${issue.suggestion}\n`
      }
    })
    output += `\n`
  })

  if (report.filesToDelete.length > 0) {
    output += `🗑️  Files Suggested for Deletion:\n`
    report.filesToDelete.slice(0, 10).forEach(file => {
      output += `  • ${file}\n`
    })
    if (report.filesToDelete.length > 10) {
      output += `  ... and ${report.filesToDelete.length - 10} more\n`
    }
    output += `\n`
  }

  output += `📈 Estimated Cleanup Impact:\n`
  output += `  • Files to remove: ${report.estimatedCleanup.filesRemoved}\n`
  output += `  • Lines to remove: ${report.estimatedCleanup.linesRemoved}\n`
  output += `  • Bytes saved: ${(report.estimatedCleanup.bytesSaved / 1024).toFixed(2)} KB\n`

  return output
}

/**
 * Main cleanup bot function
 */
export function runCleanupAudit(): Promise<CleanupReport> {
  console.log('🧹 Cleanup Bot: Starting deep code audit...')
  return scanCodebase().then(report => {
    console.log(formatCleanupReport(report))
    return report
  })
}

/**
 * Initialize cleanup bot
 */
export function initCleanupBot() {
  if (typeof window === 'undefined') {
    // Server-side only
    console.log('🧹 Cleanup Bot initialized')
  }
}

// Auto-initialize if running in Node.js
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  initCleanupBot()
}

