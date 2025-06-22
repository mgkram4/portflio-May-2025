# SendGrid Email Setup Guide

This guide will help you set up SendGrid for the contact form on your portfolio website.

## Prerequisites

1. A SendGrid account (free tier available)
2. A verified domain or email address
3. Access to your environment variables

## Step 1: Create SendGrid Account

1. Visit [SendGrid](https://sendgrid.com) and create an account
2. Verify your email address
3. Complete the onboarding process

## Step 2: Domain Authentication (Recommended)

### Option A: Domain Authentication (Best for Production)
1. Go to **Settings > Sender Authentication**
2. Click **Authenticate Your Domain**
3. Choose your DNS provider
4. Add the CNAME records to your domain DNS
5. Verify the domain

### Option B: Single Sender Verification (Quick Setup)
1. Go to **Settings > Sender Authentication**
2. Click **Create a Single Sender**
3. Enter your email address (`mark.garcia4@laverne.edu`)
4. Fill in the required information
5. Verify the email address

## Step 3: Create API Key

1. Go to **Settings > API Keys**
2. Click **Create API Key**
3. Choose **Restricted Access** (recommended)
4. Name it something like "Portfolio Contact Form"
5. Set permissions:
   - **Mail Send**: Full Access
   - All others: No Access
6. Click **Create & View**
7. **IMPORTANT**: Copy the API key immediately (you won't see it again)

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root (if you don't have one) and add:

```bash
# SendGrid Configuration
SENDGRID_API_KEY=your-actual-api-key-here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=mark.garcia4@laverne.edu

# Site configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Important Notes:

- **SENDGRID_API_KEY**: The API key you just created
- **SENDGRID_FROM_EMAIL**: Must be a verified sender (either your domain or single sender)
- **CONTACT_EMAIL**: Where you want to receive contact form submissions

## Step 5: Verify Setup

1. Start your development server: `npm run dev`
2. Go to your contact page
3. Fill out and submit the contact form
4. Check:
   - Your email for the notification
   - The sender's email for the auto-reply
   - SendGrid dashboard for activity

## Step 6: Production Deployment

Before deploying to production:

1. Update `NEXT_PUBLIC_SITE_URL` to your production domain
2. Ensure all environment variables are set in your hosting platform
3. Test the contact form in production

## Troubleshooting

### Common Issues:

1. **401 Unauthorized**
   - Check if API key is correct
   - Verify API key permissions

2. **403 Forbidden**
   - Verify sender email/domain
   - Check sender authentication

3. **Email not received**
   - Check spam folder
   - Verify recipient email
   - Check SendGrid activity dashboard

### Testing Tips:

- Use SendGrid's Email Testing feature in development
- Check the Activity Feed in SendGrid dashboard
- Monitor the browser console for errors
- Test with different email addresses

## SendGrid Dashboard Monitoring

After setup, you can monitor:
- **Activity Feed**: See all email attempts
- **Stats**: Email delivery rates
- **Suppressions**: Bounced/blocked emails

## Security Best Practices

1. Never commit API keys to version control
2. Use environment variables for all sensitive data
3. Restrict API key permissions to minimum required
4. Regularly rotate API keys
5. Monitor SendGrid activity for unusual behavior

## Support

If you encounter issues:
1. Check SendGrid's documentation
2. Use SendGrid's support (they have excellent support)
3. Check the browser console and server logs
4. Verify all environment variables are set correctly 