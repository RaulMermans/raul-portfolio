import { NextRequest, NextResponse } from 'next/server'
import { investigate, formatInvestigationReport, type InvestigationReport } from '@/lib/detective-bot'
import { logger } from '@/lib/logger'

/**
 * POST /api/departments/detective - Run detective investigation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { problem, focusAreas } = body

    if (!problem) {
      return NextResponse.json(
        { error: 'Missing "problem" field' },
        { status: 400 }
      )
    }

    // Since we can't access DOM on server, return instructions for client-side investigation
    return NextResponse.json({
      success: true,
      message: 'Detective Bot - Use client-side investigation',
      instructions: {
        clientSide: 'Open browser console and run: window.detectiveBot.investigate("problem description")',
        problem: problem,
        focusAreas: focusAreas || ['spacing', 'images', 'hidden'],
      },
      note: 'Detective bot runs in browser console to analyze DOM and CSS',
    })
  } catch (error) {
    logger.error('Error running detective investigation:', error)
    return NextResponse.json(
      { error: 'Failed to run investigation', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/departments/detective - Get detective bot information
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      name: 'Detective Bot',
      description: 'Systematic debugging and problem-solving bot',
      capabilities: [
        'CSS spacing investigation (gaps, margins, padding)',
        'Image loading and placeholder detection',
        'Section gap analysis',
        'Hidden element detection',
        'DOM structure analysis',
        'Style cascade investigation',
      ],
      usage: {
        browserConsole: 'window.detectiveBot.investigate("problem description")',
        methods: [
          'investigate(problem, focusAreas) - Main investigation function',
          'investigateSpacing(element, context) - Analyze spacing issues',
          'investigateImages() - Check image-related problems',
          'investigateSectionGaps() - Analyze gaps between sections',
          'formatReport(report) - Format investigation report',
        ],
      },
    },
  })
}

