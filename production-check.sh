#!/bin/bash

echo "🔍 EPUB.AI Production Readiness Check"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check counters
PASS=0
FAIL=0
WARN=0

# Function to check a condition
check() {
    local name="$1"
    local condition="$2"
    local critical="$3"

    printf "Checking: %-40s" "$name"

    if eval "$condition"; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASS++))
    else
        if [ "$critical" = "true" ]; then
            echo -e "${RED}✗ FAIL (CRITICAL)${NC}"
            ((FAIL++))
        else
            echo -e "${YELLOW}⚠ WARNING${NC}"
            ((WARN++))
        fi
    fi
}

echo ""
echo "1. Environment Variables"
echo "------------------------"
check "NEXT_PUBLIC_SUPABASE_URL" "[ ! -z '$NEXT_PUBLIC_SUPABASE_URL' ]" true
check "SUPABASE_SERVICE_ROLE_KEY" "[ ! -z '$SUPABASE_SERVICE_ROLE_KEY' ]" true
check "STRIPE_SECRET_KEY" "[ ! -z '$STRIPE_SECRET_KEY' ]" true
check "STRIPE_WEBHOOK_SECRET" "[ ! -z '$STRIPE_WEBHOOK_SECRET' ]" true
check "OPENAI_API_KEY" "[ ! -z '$OPENAI_API_KEY' ]" true
check "SENDGRID_API_KEY" "[ ! -z '$SENDGRID_API_KEY' ]" true

echo ""
echo "2. File Integrity"
echo "-----------------"
check "Middleware exists" "[ -f middleware.ts ]" true
check "Health endpoint exists" "[ -f app/api/health/route.ts ]" true
check "Monitoring setup" "[ -f lib/monitoring.ts ]" true
check "Environment validation" "[ -f lib/env-check.ts ]" true
check "Webhook handler" "[ -f app/api/webhooks/stripe/route.ts ]" true
check "Book generation API" "[ -f app/api/generate-book/route.ts ]" true

echo ""
echo "3. Dependencies"
echo "---------------"
check "Node modules installed" "[ -d node_modules ]" true
check "Next.js installed" "[ -f node_modules/next/package.json ]" true
check "Stripe SDK installed" "[ -f node_modules/stripe/package.json ]" true
check "Supabase client installed" "[ -f node_modules/@supabase/supabase-js/package.json ]" true
check "SendGrid installed" "[ -f node_modules/@sendgrid/mail/package.json ]" true

echo ""
echo "4. Build & Deploy"
echo "-----------------"
echo "Building application..."
npm run build > /dev/null 2>&1
check "Build successful" "[ $? -eq 0 ]" true

echo ""
echo "5. API Health Check"
echo "-------------------"
if [ "$1" = "live" ]; then
    HEALTH_URL="https://epub.ai/api/health"
else
    # Start server in background for local test
    npm run dev > /dev/null 2>&1 &
    SERVER_PID=$!
    sleep 5
    HEALTH_URL="http://localhost:7829/api/health"
fi

HEALTH_RESPONSE=$(curl -s "$HEALTH_URL" 2>/dev/null)
HEALTH_STATUS=$(echo "$HEALTH_RESPONSE" | grep -o '"status":"[^"]*' | cut -d'"' -f4)

check "Health endpoint responsive" "[ ! -z '$HEALTH_STATUS' ]" true
check "System status healthy" "[ '$HEALTH_STATUS' = 'healthy' ]" false

if [ "$1" != "live" ]; then
    kill $SERVER_PID 2>/dev/null
fi

echo ""
echo "======================================"
echo "Results:"
echo -e "${GREEN}✓ Passed: $PASS${NC}"
echo -e "${YELLOW}⚠ Warnings: $WARN${NC}"
echo -e "${RED}✗ Failed: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 System is READY for production launch!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Configure Stripe webhook in dashboard: https://epub.ai/api/webhooks/stripe"
    echo "2. Monitor health endpoint: https://epub.ai/api/health"
    echo "3. Watch logs on Vercel dashboard"
    echo "4. Test with a small group before full 1000-person launch"
    exit 0
else
    echo -e "${RED}🚨 CRITICAL ISSUES DETECTED - DO NOT LAUNCH!${NC}"
    echo ""
    echo "Fix the failed checks above before launching to production."
    exit 1
fi