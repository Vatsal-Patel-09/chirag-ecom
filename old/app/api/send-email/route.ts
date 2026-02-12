import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, name, orderId, totalAmount } = await request.json();

    // Create a test email account (for development)
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: '"T-Shirt Store" <noreply@tshirtstore.com>',
      to: email,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #9333ea;">Order Confirmed!</h1>
          <p>Dear ${name},</p>
          <p>Thank you for your order! We're excited to let you know that your order has been received and is being processed.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin: 0;">Order Details</h2>
            <p style="margin: 10px 0;"><strong>Order ID:</strong> ${orderId}</p>
            <p style="margin: 10px 0;"><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
          </div>

          <p><strong>Delivery Estimate:</strong> Your order will be delivered within 5-7 working days.</p>
          
          <p>If you have any questions, feel free to contact our support team.</p>
          
          <p>Best regards,<br/>The T-Shirt Store Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
