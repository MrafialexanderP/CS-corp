import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, fullName, email, phone, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@cscorp.com',
      subject: subject,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message - CS Corp',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Hi ${fullName},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>CS Corp Team</p>
      `,
    };

    await transporter.sendMail(userMailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
