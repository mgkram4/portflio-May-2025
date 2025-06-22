import sgMail from '@sendgrid/mail';
import { NextRequest, NextResponse } from 'next/server';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate SendGrid API key
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Email to you (notification)
    const notificationEmail = {
      to: process.env.CONTACT_EMAIL || 'mark.garcia4@laverne.edu',
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@markgarcia.dev',
        name: 'Mark Garcia Portfolio'
      },
      replyTo: email,
      subject: `Portfolio Contact: ${subject} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
          </div>

          <div style="background: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    };

    // Auto-reply to sender
    const autoReplyEmail = {
      to: email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@markgarcia.dev',
        name: 'Mark Garcia'
      },
      subject: 'Thank you for contacting Mark Garcia - Message Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            Thank You for Your Message!
          </h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for reaching out through my portfolio website. I've received your message regarding "<strong>${subject}</strong>" and will get back to you within 24 hours.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out my <a href="${process.env.NEXT_PUBLIC_SITE_URL}/projects" style="color: #0066cc;">latest projects</a></li>
            <li>Read my <a href="${process.env.NEXT_PUBLIC_SITE_URL}/blog" style="color: #0066cc;">technical articles</a></li>
            <li>Connect with me on <a href="https://www.linkedin.com/in/markgarcia4/" style="color: #0066cc;">LinkedIn</a></li>
            <li>View my code on <a href="https://github.com/mgkram4" style="color: #0066cc;">GitHub</a></li>
          </ul>

          <p>Looking forward to connecting with you!</p>
          
          <div style="margin-top: 30px; padding: 20px; background: #0066cc; color: white; border-radius: 5px;">
            <p style="margin: 0; font-weight: bold;">Mark Garcia</p>
            <p style="margin: 5px 0 0 0;">AI/ML Engineer & Full-Stack Developer</p>
            <p style="margin: 5px 0 0 0;">
              📧 <a href="mailto:mark.garcia4@laverne.edu" style="color: white;">mark.garcia4@laverne.edu</a> | 
              🌐 <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="color: white;">Portfolio</a>
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails using SendGrid
    await sgMail.send(notificationEmail);
    await sgMail.send(autoReplyEmail);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
} 