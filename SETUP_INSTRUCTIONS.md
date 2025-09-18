# EPUB AI - Lead Magnet eBook Generator

## Complete Setup Instructions

### Overview
This is a fully functional lead magnet eBook generation system that creates personalized 15-30 chapter books based on website analysis and company data. The system supports two pricing tiers with Stripe integration and generates professional EPUBs with AI-powered content.

### System Architecture
- **Frontend**: Next.js 15 with TypeScript
- **Database**: Supabase
- **Payments**: Stripe
- **AI**: OpenAI GPT-4-mini for content, DALL-E 3 for covers
- **Book Format**: EPUB with custom styling

### Features
✅ Dual pricing tiers ($49 for 15 chapters, $999 for 30 chapters)
✅ Automatic website scraping and analysis
✅ AI-powered content generation personalized to business
✅ Custom cover generation with DALL-E 3
✅ EPUB format with professional formatting
✅ Stripe payment integration
✅ Post-payment data collection flow
✅ Real-time generation status updates

## Setup Steps

### 1. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Required variables:
- **Supabase**: Get from your Supabase project settings
- **Stripe**: Create products and get API keys from Stripe dashboard
- **OpenAI**: Get API key from OpenAI platform

### 2. Database Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Once created, go to Settings → API to get your keys

#### Run Migration
1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `supabase/migrations/001_initial_schema.sql`
3. Run the migration

### 3. Stripe Setup

#### Create Products
1. Log into Stripe Dashboard
2. Go to Products
3. Create two products:
   - **Basic**: $49 - 15 chapter eBook
   - **Premium**: $999 - 30 chapter eBook
4. Note the price IDs and add to `.env.local`

#### Setup Webhook
1. Go to Webhooks in Stripe
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy webhook secret to `.env.local`

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Production Deployment

### Vercel Deployment (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
Make sure to update:
- `NEXT_PUBLIC_BASE_URL` to your production URL
- Use production Stripe keys
- Use production Supabase project

## User Flow

1. **Landing Page** → User selects pricing tier
2. **Checkout Page** → User enters email and proceeds to Stripe
3. **Payment** → Stripe handles payment securely
4. **Generation Page** → User lands here after successful payment
5. **Website Analysis** → Optional website scraping for company data
6. **Data Collection** → User reviews/completes company information
7. **Book Generation** → AI generates chapters in background
8. **Download** → User downloads completed EPUB file

## Book Generation Process

### Basic Plan (15 Chapters)
- Chapters 1-11: Use existing prompt templates
- Chapters 12-15: Use generated prompts with progression themes

### Premium Plan (30 Chapters)
- Chapters 1-11: Use existing prompt templates
- Chapters 12-30: Advanced topics including:
  - Scaling and automation
  - Team building
  - Strategic partnerships
  - Global expansion
  - Legacy building

## API Endpoints

- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/scrape` - Analyze website and extract company data
- `POST /api/generate-book` - Start book generation process
- `GET /api/generate-book?bookId={id}` - Check generation status
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

## Testing

### Test Payment Flow
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

### Test Book Generation
1. Complete checkout with test card
2. Enter any website URL (e.g., `https://example.com`)
3. Review/edit extracted data
4. Click "Generate Book"
5. Wait for completion (3-10 minutes)

## Customization

### Modify Chapter Prompts
Edit files in `/app/prompts/`:
- `ClientsAI Prompts (1-11).txt` - Chapter templates
- `intro.txt` - Introduction template
- `conclusion.txt` - Conclusion template
- `summary.txt` - Summary template
- `titler.txt` - Title generation
- `cover.txt` - Cover prompt generation

### Adjust Pricing
Update in `/lib/stripe.ts`:
```typescript
export const PRODUCTS = {
  basic: {
    price: 4900, // $49 in cents
    // ...
  },
  premium: {
    price: 99900, // $999 in cents
    // ...
  }
}
```

## Monitoring

### Check Generation Status
Query the `books` table in Supabase:
- `pending` - Awaiting generation
- `generating` - In progress
- `completed` - Ready for download
- `failed` - Generation failed

### Payment Tracking
View `payments` table for transaction history

## Support

### Common Issues

**Book generation fails:**
- Check OpenAI API key and credits
- Verify prompt templates exist
- Check Supabase connection

**Payment not processing:**
- Verify Stripe webhook is configured
- Check webhook secret is correct
- Ensure Stripe keys match environment (test/live)

**Website scraping errors:**
- Some websites block scraping
- User can manually enter data instead

## Security Notes

- Never commit `.env.local` file
- Use environment variables for all secrets
- Enable RLS in Supabase (already configured)
- Validate all user inputs
- Use Stripe for PCI compliance

## Next Steps

1. **Email Integration**: Set up SendGrid for book delivery via email
2. **PDF Export**: Add PDF generation alongside EPUB
3. **Admin Dashboard**: Build admin panel for monitoring
4. **Analytics**: Add tracking for conversions
5. **Affiliate Program**: Implement referral system

## License

This is a commercial product. All rights reserved.

---

**Ready to Launch!** 🚀

The system is fully functional and ready for production use. Follow the setup steps above and you'll have your lead magnet generation service running in minutes.