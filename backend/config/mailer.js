import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // load env here


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER, // Example: 97d79b001@smtp-brevo.com
    pass: process.env.EMAIL_PASS,   // SMTP Key (NOT xkeysib API key)
  },
});

// verify once
transporter.verify((error) => {
  if (error) {
    console.error("SMTP AUTH FAILED:", error);
  } else {
    console.log("SMTP SERVER READY");
  }
});

export default transporter;
