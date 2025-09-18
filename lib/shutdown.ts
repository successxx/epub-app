// Graceful shutdown handling
let isShuttingDown = false
const activeRequests = new Set<string>()

export function trackRequest(id: string) {
  activeRequests.add(id)
  return () => activeRequests.delete(id)
}

export function isSystemShuttingDown() {
  return isShuttingDown
}

export async function gracefulShutdown() {
  console.log('🛑 Initiating graceful shutdown...')
  isShuttingDown = true

  // Wait for active requests to complete (max 30 seconds)
  const shutdownTimeout = 30000
  const startTime = Date.now()

  while (activeRequests.size > 0 && Date.now() - startTime < shutdownTimeout) {
    console.log(`⏳ Waiting for ${activeRequests.size} active requests to complete...`)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  if (activeRequests.size > 0) {
    console.warn(`⚠️  Force shutting down with ${activeRequests.size} active requests`)
  } else {
    console.log('✅ All requests completed, shutting down cleanly')
  }

  process.exit(0)
}

// Register shutdown handlers
if (typeof process !== 'undefined') {
  process.on('SIGTERM', gracefulShutdown)
  process.on('SIGINT', gracefulShutdown)
  process.on('uncaughtException', (error) => {
    console.error('🚨 Uncaught exception:', error)
    gracefulShutdown()
  })
  process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Unhandled rejection at:', promise, 'reason:', reason)
  })
}