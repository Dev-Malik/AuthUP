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
  // Check whether to use real SMTP (Gmail) for production or MailDev for development.
  // To use Gmail for sending actual emails, set the environment variable USE_REAL_SMTP to "true".
  const useRealSMTP = process.env.USE_REAL_SMTP === "true";

  let transporter;
  let fromAddress;

  if (useRealSMTP) {
    // Use Gmail for sending real email.
    // Make sure to set these environment variables: GMAIL_USER and GMAIL_PASSWORD.
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,      // Your Gmail address (e.g., myapp@gmail.com)
        pass: process.env.GMAIL_PASSWORD,  // Your Gmail password or app password (if using 2FA)
      },
    });
    fromAddress = process.env.GMAIL_USER;
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
