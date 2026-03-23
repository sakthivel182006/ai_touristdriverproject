import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // load env here

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
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
