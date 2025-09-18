# Testing Checklist for Email Capture and Stripe Checkout Flow

## Email Capture Flow (Hero Section)
1. ✅ User enters email in hero section form
2. ✅ Email is saved to database via `/api/lead` endpoint
3. ✅ User is redirected to `/pricing` page
4. ✅ Email is stored in sessionStorage for pre-filling

## Pricing Page Flow
1. ✅ User sees two pricing tiers (Starter $499.99, Professional $999.99)
2. ✅ Clicking "Get Started" buttons navigates to `/checkout/basic` or `/checkout/premium`

## Checkout Page Flow
1. ✅ Email is pre-filled if coming from hero section
2. ✅ User enters website URL
3. ✅ User clicks "Continue to Payment"
4. ✅ System creates Stripe checkout session
5. ✅ User is redirected to Stripe's hosted checkout page

## Key Fixes Implemented:
1. **Email Capture Redirect**: Updated `EmailCapture.tsx` to save email to DB and redirect to pricing page
2. **Session Storage**: Email is stored in sessionStorage and retrieved on checkout page
3. **Error Handling**: Added detailed error messages for debugging Stripe issues
4. **Environment Variables**: Added fallback for BASE_URL in development
5. **Validation**: Added proper validation for price IDs before creating checkout session

## Required Environment Variables:
```
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...
NEXT_PUBLIC_BASE_URL=https://epub.ai
```

## Troubleshooting:
If Stripe checkout is not working:
1. Verify all environment variables are set correctly in `.env.local`
2. Check that Stripe price IDs match products created in Stripe Dashboard
3. Ensure Stripe account is in the correct mode (test/live)
4. Check browser console for detailed error messages
5. Review server logs for API errors

## Testing Steps:
1. Go to homepage (/)
2. Enter email in hero section form
3. Click "Get started"
4. Should redirect to /pricing with email saved
5. Click on either pricing tier
6. Email should be pre-filled on checkout page
7. Enter a website URL
8. Click "Continue to Payment"
9. Should redirect to Stripe checkout