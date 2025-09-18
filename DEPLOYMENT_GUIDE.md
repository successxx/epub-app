# EPUB.AI Deployment Guide

## System Overview
EPUB.AI is a complete lead magnet eBook generation system that creates professional business books using AI. The system features dual pricing tiers ($49 basic / $999 premium), website scraping, sequential AI-powered content generation, and professional EPUB output.

## Pre-Deployment Checklist

### 1. Database Setup (Supabase)

Run the migration script to create required tables:

```bash
# Copy the contents of run-migrations.sql and execute in Supabase SQL editor
```

Required tables:
- `epub_books` - Stores book metadata and content
- `epub_sessions` - Tracks Stripe checkout sessions
- `epub_book_purchases` - Records completed purchases

### 2. Environment Variables

Copy `.env.example` to `.env.local` and configure:

#### Required Variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_live_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# OpenAI
OPENAI_API_KEY=sk-proj-your_key

# SendGrid
SENDGRID_API_KEY=SG.your_key
SENDGRID_FROM_EMAIL=support@yourdomain.com

# App
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

#### Optional Variables:
```env
# Separate API key for DALL-E 3 image generation
OPENAI_IMAGE_API_KEY=sk-proj-your_image_key
```

### 3. Stripe Configuration

1. Create two products in Stripe Dashboard:
   - **Basic Plan**: $49 - 15 chapters (~120 pages)
   - **Premium Plan**: $999 - 30 chapters (~250 pages)

2. Get the Price IDs and add to environment:
   ```env
   STRIPE_PRICE_STARTER=price_xxxxx
   STRIPE_PRICE_PRO=price_xxxxx
   ```

3. Configure webhook endpoint:
   - URL: `https://yourdomain.com/api/stripe-webhook`
   - Events to listen for:
     - `checkout.session.completed`
     - `payment_intent.succeeded`

4. Get the webhook signing secret and add to env:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

### 4. SendGrid Setup

1. Verify your sending domain in SendGrid
2. Create an API key with full access
3. Set the from email to match your verified domain

### 5. OpenAI Configuration

1. Ensure your OpenAI account has:
   - GPT-4-mini access for content generation
   - DALL-E 3 access for cover generation (optional)

2. Monitor usage limits:
   - Basic book: ~15 API calls
   - Premium book: ~30 API calls
   - Cover generation: 1 DALL-E 3 call per book

## Deployment Steps

### Deploy to Vercel (Recommended)

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Import project in Vercel:
   - Connect GitHub repository
   - Configure environment variables
   - Deploy

3. Configure custom domain (optional)

### Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables
4. Enable server-side functions

## Post-Deployment Testing

### 1. Run System Verification
```bash
npm install
node test-full-system.mjs
```

Expected output:
- ✅ All environment variables configured
- ✅ Database tables created
- ✅ Stripe prices valid
- ✅ OpenAI connection working
- ✅ SendGrid configured

### 2. Test Full Flow

1. **Test Basic Tier ($49)**:
   - Visit homepage
   - Enter company website
   - Complete Stripe checkout (test mode)
   - Verify book generation (15 chapters)
   - Check email delivery
   - Download EPUB

2. **Test Premium Tier ($999)**:
   - Repeat above with premium option
   - Verify 30 chapters generated
   - Check premium formatting

### 3. Verify EPUB Quality

Test generated EPUBs in:
- Apple Books
- Kindle app
- Adobe Digital Editions
- Calibre

Check for:
- ✅ Proper formatting (bold, italics)
- ✅ Clean chapter titles (no asterisks)
- ✅ Clickable table of contents
- ✅ Professional cover image
- ✅ Industry-standard CSS

## Production Monitoring

### Key Metrics to Track

1. **API Usage**:
   - OpenAI tokens per book
   - DALL-E image generation calls
   - SendGrid email sends

2. **Performance**:
   - Book generation time (2-5 min basic, 4-10 min premium)
   - Website scraping success rate
   - EPUB file sizes

3. **Business Metrics**:
   - Conversion rate
   - Successful payments
   - Email delivery rate
   - Download completion rate

### Error Handling

Common issues and solutions:

1. **OpenAI Rate Limits**:
   - Solution: Implement retry logic with exponential backoff
   - Consider: Multiple API keys for load balancing

2. **Large Website Scraping**:
   - Solution: Implement timeout (30 seconds max)
   - Fallback: Use company description if scraping fails

3. **Email Delivery Issues**:
   - Check: SendGrid domain verification
   - Monitor: Spam rates and bounces

4. **EPUB Generation Failures**:
   - Log: Chapter generation errors
   - Fallback: Save partial books for manual recovery

## Security Considerations

1. **API Keys**:
   - Never commit to repository
   - Rotate keys regularly
   - Use separate keys for dev/prod

2. **Database**:
   - Enable RLS policies
   - Regular backups
   - Monitor for unusual activity

3. **File Storage**:
   - Clean up old EPUB files (30 days)
   - Implement download limits
   - Use signed URLs for downloads

## Scaling Considerations

As usage grows:

1. **Implement Queue System**:
   - Use Redis/BullMQ for job processing
   - Separate book generation from web requests

2. **Optimize API Usage**:
   - Batch API calls where possible
   - Cache common responses
   - Consider fine-tuned models

3. **Storage Optimization**:
   - Move EPUBs to S3/CloudStorage
   - Implement CDN for downloads
   - Compress stored files

## Support & Maintenance

### Regular Tasks

Weekly:
- Review error logs
- Check API usage and costs
- Monitor email delivery rates

Monthly:
- Update dependencies
- Review and optimize prompts
- Analyze user feedback

### Debug Commands

```bash
# Test book generation locally
npm run test:book

# Check database connection
npm run test:db

# Verify all systems
node test-full-system.mjs

# Test email sending
npm run test:email
```

## Contact & Support

- GitHub Repository: https://github.com/successxx/epub-app
- Issues: Report at GitHub Issues
- System Status: Check deployment platform dashboard

## License & Legal

- All generated content includes AI disclosure
- Users receive full commercial rights to generated books
- System includes legal disclaimer on completion page

---

**System Ready for Production!** 🚀

Follow this guide for successful deployment. The system is designed to handle 100+ books per day with current configuration.