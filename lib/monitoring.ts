// Production monitoring and error tracking
interface ErrorLog {
  timestamp: string
  level: 'error' | 'warning' | 'critical'
  message: string
  context?: any
  stack?: string
}

const errorQueue: ErrorLog[] = []
const MAX_ERROR_QUEUE = 100

export function logError(
  level: 'error' | 'warning' | 'critical',
  message: string,
  context?: any,
  error?: Error
) {
  const log: ErrorLog = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    stack: error?.stack
  }

  // Console log for immediate visibility
  if (level === 'critical') {
    console.error(`🚨 CRITICAL: ${message}`, context, error)
  } else if (level === 'error') {
    console.error(`❌ ERROR: ${message}`, context, error)
  } else {
    console.warn(`⚠️ WARNING: ${message}`, context)
  }

  // Add to queue
  errorQueue.push(log)

  // Keep queue size manageable
  if (errorQueue.length > MAX_ERROR_QUEUE) {
    errorQueue.shift()
  }

  // For critical errors, attempt to store in database
  if (level === 'critical') {
    storeCriticalError(log).catch(console.error)
  }
}

async function storeCriticalError(log: ErrorLog) {
  try {
    const { createSupabaseAdmin } = await import('./supabase')
    const supabase = createSupabaseAdmin()

    await supabase
      .from('system_logs')
      .insert({
        level: log.level,
        message: log.message,
        context: log.context,
        stack: log.stack,
        created_at: log.timestamp
      })
  } catch (err) {
    // Silent fail - don't throw from error handler
    console.error('Failed to store critical error:', err)
  }
}

// Performance monitoring
const performanceMarks = new Map<string, number>()

export function startPerformanceMark(label: string) {
  performanceMarks.set(label, Date.now())
}

export function endPerformanceMark(label: string): number {
  const start = performanceMarks.get(label)
  if (!start) return 0

  const duration = Date.now() - start
  performanceMarks.delete(label)

  // Log slow operations
  if (duration > 10000) { // 10 seconds
    logError('warning', `Slow operation detected: ${label}`, { duration })
  }

  return duration
}

// Health check endpoint data
export function getHealthStatus() {
  const recentErrors = errorQueue.filter(
    e => new Date(e.timestamp).getTime() > Date.now() - 300000 // Last 5 minutes
  )

  const criticalErrors = recentErrors.filter(e => e.level === 'critical')

  return {
    status: criticalErrors.length > 0 ? 'degraded' : 'healthy',
    timestamp: new Date().toISOString(),
    errors: {
      total: recentErrors.length,
      critical: criticalErrors.length,
      recent: recentErrors.slice(-5) // Last 5 errors
    }
  }
}