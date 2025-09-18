# ePub.AI - Automated Lead Magnet eBook Generator

A complete standalone SaaS application that automatically generates professional 100-250 page lead magnet ebooks in 5 minutes from just a company website URL.

## Features

- **Fully Automated**: From payment to ebook delivery - completely hands-off
- **Lightning Fast**: Generate complete ebooks in under 5 minutes
- **Professional Quality**: 100-250 pages of AI-generated content tailored to your business
- **Multiple Formats**: PDF and EPUB downloads
- **Web Scraping**: Automatic extraction of company data from websites
- **AI-Powered**: Uses GPT-4/GPT-4o-mini for high-quality content generation
- **Stripe Payments**: Simple checkout for $499 (100 pages) and $999 (250 pages) tiers
- **Email Delivery**: Automatic SendGrid integration for ebook delivery
- **API Ready**: REST API for integration with external platforms like Clients.AI
- **Real-time Progress**: Live generation progress tracking

## Tech Stack

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Backend**: Next.js API Routes (Serverless)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Payments**: Stripe Checkout
- **AI**: OpenAI GPT-4o-mini / GPT-4
- **Email**: SendGrid
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account
- OpenAI API key
- SendGrid account

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd epub-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_PRICE_STARTER=price_xxx # Create a $499 price
STRIPE_PRICE_PRO=price_xxx # Create a $999 price
STRIPE_WEBHOOK_SECRET=whsec_xxx

# OpenAI
OPENAI_API_KEY=sk-xxx

# SendGrid
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# App
NEXT_PUBLIC_URL=http://localhost:3000
```

4. Set up Supabase database:
   - Create a new Supabase project
   - Run the SQL from `supabase-schema.sql` in the SQL editor
   - Enable Authentication in Supabase

5. Set up Stripe:
   - Create two products: "Starter" ($499) and "Professional" ($999)
   - Add the price IDs to your `.env.local`
   - Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Subscribe to `checkout.session.completed` events

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
epub-ai/
├── app/                        # Next.js app directory
│   ├── api/                   # API routes
│   │   ├── checkout/          # Stripe checkout
│   │   ├── generate/          # eBook generation
│   │   ├── scrape/           # Web scraping
│   │   ├── webhooks/         # Stripe webhooks
│   │   └── v1/               # Public API endpoints
│   ├── (auth)/               # Authentication pages
│   ├── checkout/             # Checkout flow
│   ├── generate/             # Generation progress
│   └── page.tsx              # Homepage
├── components/               # React components
│   └── ui/                  # Reusable UI components
├── lib/                     # Core libraries
│   ├── generation/          # eBook generation logic
│   │   ├── prompts.ts      # AI prompts (17 chapters)
│   │   ├── ebook-generator.ts
│   │   ├── pdf-generator.ts
│   │   └── epub-generator.ts
│   ├── scraper/            # Web scraping engine
│   ├── supabase.ts         # Database client
│   ├── stripe.ts           # Payment processing
│   ├── openai.ts           # AI integration
│   └── sendgrid.ts         # Email delivery
└── public/                 # Static assets
```

## API Documentation

### REST API Endpoints

The application provides a REST API for external integrations:

#### Generate eBook
```http
POST /api/v1/generate
Headers:
  x-api-key: your_api_key
Body:
{
  "websiteUrl": "https://example.com",
  "tier": "starter" | "professional",
  "email": "customer@example.com" (optional),
  "webhookUrl": "https://yourapp.com/webhook" (optional)
}
```

#### Check Generation Status
```http
GET /api/v1/status/{ebookId}
Headers:
  x-api-key: your_api_key
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to other platforms

The app is built on Next.js and can be deployed to any platform that supports Node.js applications.

## Configuration

### Customizing Prompts

Edit `lib/generation/prompts.ts` to customize the AI prompts used for generating ebook content. The system uses 17 different prompts to create comprehensive content.

### Adjusting Page Count

- Starter tier: Modify the prompt selection in `getPromptsForTier()`
- Professional tier: Add or remove prompts from the `BOOK_GENERATION_PROMPTS` array

### Branding

- Update colors in `tailwind.config.ts`
- Modify email templates in `lib/sendgrid.ts`
- Customize cover design prompts in `lib/generation/ebook-generator.ts`

## Testing

1. Use Stripe test mode with test cards
2. Test webhook locally using Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

3. Use test API keys for all services during development

## Production Checklist

- [ ] Set up production Supabase project
- [ ] Configure Stripe live mode
- [ ] Set up SendGrid domain authentication
- [ ] Update all environment variables for production
- [ ] Enable RLS policies in Supabase
- [ ] Set up monitoring and error tracking
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Test end-to-end flow with real payment

## Support

For issues or questions:
- Check the [Issues](https://github.com/yourusername/epub-ai/issues) page
- Contact support@epub.ai

## License

All rights reserved. This is proprietary software.

## Credits

Built with:
- Next.js by Vercel
- Supabase for backend
- Stripe for payments
- OpenAI for content generation
- SendGrid for email delivery

---

**ePub.AI** - Professional Lead Magnet Generation in 5 Minutes
