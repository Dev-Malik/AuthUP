"use server";

import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  // Use the configured EMAIL_* environment variables for production
  // or fallback to MailDev for development
  const hasEmailConfig = process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS;

  let transporter;
  let fromAddress;

  if (hasEmailConfig) {
    // Use configured SMTP settings for production
    const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587;
    const isSecure = port === 465; // Use SSL for port 465, TLS for others
    
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: port,
      secure: isSecure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    fromAddress = process.env.EMAIL_USER;
  } else {
    // Use MailDev for development.
    const host = process.env.SMTP_HOST || "localhost";
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 1025;
    fromAddress = process.env.SMTP_FROM || "dev@localhost.com";
    
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      ignoreTLS: true,
    });
  }

  try {
    const info = await transporter.sendMail({
      from: fromAddress,                   // Sender's email (either your Gmail address or dev address)
      to: to.toLowerCase().trim(),           // Recipient's email (user's email)
      subject: subject.trim(),
      text: text.trim(),
    });

    console.log("Email sent:", info);
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}
