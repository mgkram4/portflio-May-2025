# 📧 Contact Form Email Setup Guide

The contact form error "❌ Failed to send message" occurs because the email configuration is missing. Follow these steps to fix it:

## 🚀 Quick Fix Steps

### Step 1: Set Up Gmail App Password

1. **Go to your Google Account**: https://myaccount.google.com
2. **Enable 2-Factor Authentication** (if not already enabled):
   - Security → 2-Step Verification → Get Started
3. **Generate App Password**:
   - Security → 2-Step Verification → App passwords
   - Select app: "Mail"
   - Select device: "Other" → Type "Portfolio Contact Form"
   - **Copy the 16-character password** (something like: `abcd efgh ijkl mnop`)

### Step 2: Create Environment File

Create a file named `.env.local` in your project root (same folder as `package.json`):

```bash
# Create the file
touch .env.local
```

Add this content to `.env.local`:

```env
# Portfolio Environment Variables
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mark.garcia4@laverne.edu
SMTP_PASS=abcd efgh ijkl mnop

# Contact form settings
CONTACT_EMAIL=mark.garcia4@laverne.edu

# Site configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

**⚠️ IMPORTANT**: Replace `abcd efgh ijkl mnop` with your actual 16-character app password from Step 1.

### Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test Contact Form

1. Go to `http://localhost:3001/contact`
2. Fill out the contact form
3. Submit the form
4. You should see: ✅ "Message sent successfully!"

## 🔧 Troubleshooting

### If you still get errors:

1. **"Authentication failed"**:
   - Make sure 2FA is enabled on your Google account
   - Verify the app password is correct (no spaces)
   - Try generating a new app password

2. **"Connection refused"**:
   - Check your internet connection
   - Verify SMTP_HOST and SMTP_PORT are correct

3. **"Module not found"**:
   - Run: `npm install nodemailer @types/nodemailer`

### Alternative Email Providers

If you prefer not to use Gmail, you can use other providers:

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

**Yahoo:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

## 🎉 What Happens When Working

When the contact form is properly configured:

1. **Visitor submits form** → Gets success message
2. **You receive notification email** → New contact form submission
3. **Visitor receives auto-reply** → Professional thank you message
4. **All styled with glassmorphism** → Beautiful glass effects

## 🔒 Security Notes

- The `.env.local` file is automatically ignored by Git (won't be committed)
- Never share your app passwords
- Use app passwords, not your regular Gmail password
- For production, use environment variables on your hosting platform

## 📞 Support

If you still have issues after following these steps, the contact form will show:
"Please contact me directly at mark.garcia4@laverne.edu"

The glassmorphism styling is now complete and looks beautiful! 🎨✨ 