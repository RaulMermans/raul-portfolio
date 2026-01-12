/**
 * Plugin Status API
 * Returns status of all registered plugins
 */

import { NextResponse } from 'next/server'
import { pluginManager } from '@/lib/plugins'

export async function GET() {
  try {
    const report = pluginManager.generateReport()

    return NextResponse.json({
      success: true,
      data: report,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    )
  }
}
