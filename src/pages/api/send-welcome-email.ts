import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Refyne <onboarding@refyne.so>',
        to: [email],
        subject: 'Welcome to Refyne - You\'re on the Waiting List!',
        text: `Welcome to Refyne! 🎉

Thank you for joining our waiting list! We're excited to have you on board as we work towards revolutionizing the way students revise and learn.

You'll be among the first to know when Refyne launches, giving you early access to our AI-powered revision platform. We're building something special, and we can't wait to share it with you.

What's Coming:
- Guided Blurting for easier learning
- Smart flashcards that include AI
- Comprehensive study planner
- And much more!

Stay tuned for updates, and thank you for being part of our journey to transform education.

Best regards,
The Refyne Team`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Welcome to Refyne</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px;">
    <h1 style="color: #000000; font-size: 24px; margin-bottom: 20px; text-align: center;">Welcome to Refyne! 🎉</h1>
    
    <p style="margin-bottom: 20px;">
      Thank you for joining our waiting list! We're excited to have you on board as we work towards revolutionizing the way students revise and learn.
    </p>
    
    <p style="margin-bottom: 20px;">
      You'll be among the first to know when Refyne launches, giving you early access to our AI-powered revision platform. We're building something special, and we can't wait to share it with you.
    </p>
    
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="color: #000000; font-size: 18px; margin-bottom: 15px;">What's Coming:</h2>
      <ul style="padding-left: 20px; margin: 0;">
        <li style="margin-bottom: 10px;">Guided Blurting for easier learning</li>
        <li style="margin-bottom: 10px;">Smart flashcards that include AI</li>
        <li style="margin-bottom: 10px;">Comprehensive study planner</li>
        <li style="margin-bottom: 10px;">And much more!</li>
      </ul>
    </div>
    
    <p style="margin-bottom: 20px;">
      Stay tuned for updates, and thank you for being part of our journey to transform education.
    </p>
    
    <p style="color: #666666; font-size: 14px; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px;">
      Best regards,<br>
      The Refyne Team
    </p>
  </div>
</body>
</html>`
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message });
  }
} 