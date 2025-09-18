import sgMail from '@sendgrid/mail'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

interface EmailOptions {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    content: string // base64 encoded
    filename: string
    type: string
    disposition: string
  }>
}

export async function sendEmail(options: EmailOptions) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured, skipping email')
    return
  }

  const msg = {
    to: options.to,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@epub.ai',
    subject: options.subject,
    html: options.html,
    attachments: options.attachments
  }

  try {
    await sgMail.send(msg)
    console.log('Email sent successfully to:', options.to)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export function getBookDeliveryEmailHtml(bookTitle: string, downloadUrl: string, bookType: 'basic' | 'premium'): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 25px; margin: 20px 0; font-weight: bold; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; }
        .book-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
        h1 { margin: 0; font-size: 28px; }
        .emoji { font-size: 48px; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="emoji">📚</div>
          <h1>Your eBook is Ready!</h1>
        </div>
        <div class="content">
          <p>Congratulations! Your ${bookType} eBook has been successfully generated.</p>

          <div class="book-info">
            <strong>Title:</strong> ${bookTitle}<br>
            <strong>Type:</strong> ${bookType === 'premium' ? 'Premium (30 chapters, ~250 pages)' : 'Basic (15 chapters, ~120 pages)'}<br>
            <strong>Format:</strong> EPUB (compatible with all major e-readers)
          </div>

          <p>Your professionally crafted lead magnet is ready for download:</p>

          <center>
            <a href="${downloadUrl}" class="button">Download Your eBook</a>
          </center>

          <h3>What's Next?</h3>
          <ul>
            <li><strong>Review your content:</strong> While AI-generated, we recommend reviewing the content before distribution</li>
            <li><strong>Customize if needed:</strong> You can edit the EPUB file with any EPUB editor</li>
            <li><strong>Use as lead magnet:</strong> Offer this valuable content to capture leads</li>
            <li><strong>Share with your audience:</strong> You have full rights to distribute this book</li>
          </ul>

          <h3>Important Information</h3>
          <p style="font-size: 14px; color: #666;">
            You have full rights to use this eBook as you please. Epub.ai and affiliated companies
            have no responsibility for the content in this book or how you use it. The content is
            AI-generated based on your inputs and should be reviewed before distribution.
          </p>

          <div class="footer">
            <p>
              This email was sent from epub.ai. If you have any questions, please contact our support team.
            </p>
            <p>
              © ${new Date().getFullYear()} epub.ai - AI-Powered Lead Magnet Generation
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function sendBookDeliveryEmail(
  recipientEmail: string,
  bookTitle: string,
  downloadUrl: string,
  bookType: 'basic' | 'premium',
  epubBuffer?: Buffer
) {
  const attachments = epubBuffer ? [{
    content: epubBuffer.toString('base64'),
    filename: `${bookTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.epub`,
    type: 'application/epub+zip',
    disposition: 'attachment' as const
  }] : undefined

  await sendEmail({
    to: recipientEmail,
    subject: `🎉 Your eBook "${bookTitle}" is Ready!`,
    html: getBookDeliveryEmailHtml(bookTitle, downloadUrl, bookType),
    attachments
  })
}