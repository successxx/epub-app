import sgMail from '@sendgrid/mail'

// Initialize SendGrid with API key if available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
} else {
  console.warn('Warning: SENDGRID_API_KEY not set. Email features will not work.')
}

export interface EbookEmailData {
  title: string
  subtitle?: string
  pdfUrl: string
  epubUrl: string
  recipientName?: string
  companyName?: string
}

export async function sendEbookDeliveryEmail(
  to: string,
  ebookData: EbookEmailData
): Promise<void> {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured')
    return
  }

  if (!process.env.SENDGRID_FROM_EMAIL) {
    console.error('SendGrid FROM email not configured')
    return
  }

  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Your Lead Magnet eBook "${ebookData.title}" is Ready!`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .content h2 {
            color: #333;
            font-size: 22px;
            margin-top: 0;
          }
          .content p {
            color: #666;
            line-height: 1.6;
            margin: 15px 0;
          }
          .button-container {
            text-align: center;
            margin: 35px 0;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            margin: 10px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: background 0.3s ease;
          }
          .button:hover {
            background: #5a67d8;
          }
          .button.secondary {
            background: #48bb78;
          }
          .button.secondary:hover {
            background: #38a169;
          }
          .features {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin: 25px 0;
          }
          .features h3 {
            color: #333;
            font-size: 18px;
            margin-top: 0;
          }
          .features ul {
            color: #666;
            margin: 10px 0;
            padding-left: 20px;
          }
          .features li {
            margin: 8px 0;
          }
          .footer {
            background: #f8f9fa;
            padding: 25px 30px;
            text-align: center;
            color: #999;
            font-size: 14px;
          }
          .footer a {
            color: #667eea;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Your eBook is Ready!</h1>
          </div>

          <div class="content">
            <h2>${ebookData.title}</h2>
            ${ebookData.subtitle ? `<p style="font-style: italic; color: #888;">${ebookData.subtitle}</p>` : ''}

            <p>
              ${ebookData.recipientName ? `Hi ${ebookData.recipientName},` : 'Hi there,'}
            </p>

            <p>
              Great news! Your professional lead magnet ebook has been successfully generated and is ready for download.
              ${ebookData.companyName ? ` This custom ebook has been created specifically for ${ebookData.companyName} based on your company's unique value propositions and target audience.` : ''}
            </p>

            <div class="features">
              <h3>What's Included:</h3>
              <ul>
                <li>Professionally written content tailored to your business</li>
                <li>Custom-designed cover page with your branding</li>
                <li>100-250 pages of valuable, actionable content</li>
                <li>Both PDF and EPUB formats for maximum compatibility</li>
                <li>Ready to use as a lead magnet immediately</li>
              </ul>
            </div>

            <div class="button-container">
              <a href="${ebookData.pdfUrl}" class="button">
                📄 Download PDF
              </a>
              <a href="${ebookData.epubUrl}" class="button secondary">
                📖 Download EPUB
              </a>
            </div>

            <p>
              <strong>Next Steps:</strong>
            </p>
            <ul style="color: #666; line-height: 1.8;">
              <li>Review your ebook to ensure it meets your expectations</li>
              <li>Add it to your website as a lead capture tool</li>
              <li>Share it with your email list and social media followers</li>
              <li>Use it in your marketing campaigns to generate qualified leads</li>
            </ul>

            <p>
              Your download links will remain active for 30 days. We recommend downloading both formats now and storing them securely.
            </p>
          </div>

          <div class="footer">
            <p>
              © 2024 ePub.AI - Professional Lead Magnet Generation
            </p>
            <p>
              Need help? <a href="mailto:support@epub.ai">Contact our support team</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Your Lead Magnet eBook "${ebookData.title}" is Ready!

      ${ebookData.subtitle || ''}

      Your professional lead magnet ebook has been successfully generated and is ready for download.

      Download your ebook:
      - PDF Version: ${ebookData.pdfUrl}
      - EPUB Version: ${ebookData.epubUrl}

      Your download links will remain active for 30 days.

      Best regards,
      The ePub.AI Team
    `
  }

  try {
    await sgMail.send(msg)
    console.log('Ebook delivery email sent successfully to:', to)
  } catch (error) {
    console.error('Error sending ebook delivery email:', error)
    throw error
  }
}

export async function sendWelcomeEmail(to: string, name?: string): Promise<void> {
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    console.error('SendGrid not configured')
    return
  }

  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Welcome to ePub.AI - Professional Lead Magnet Generation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">Welcome to ePub.AI!</h1>
        <p>Hi ${name || 'there'},</p>
        <p>Thank you for signing up for ePub.AI. You're now ready to generate professional lead magnet ebooks in just 5 minutes!</p>
        <p>Get started by choosing your plan and providing your website URL. Our AI will handle the rest.</p>
        <p>Best regards,<br>The ePub.AI Team</p>
      </div>
    `
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error('Error sending welcome email:', error)
  }
}