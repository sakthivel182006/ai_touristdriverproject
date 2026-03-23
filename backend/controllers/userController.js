import User from "../models/User.js";
import jwt from "jsonwebtoken";
import transporter from "../config/mailer.js";

/**
 * REGISTER USER (SEND VERIFICATION EMAIL)
 * name, email, password
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create verification token (15 minutes)
    const verifyToken = jwt.sign(
      { name, email, password },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Verification link (BACKEND URL)
    const verifyLink = `${process.env.BASE_URL}/api/users/verify/${verifyToken}`;

    // Send verification email
    await transporter.sendMail({
      from: `"Agentic AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email",
      html: `
        <h3>Email Verification</h3>
        <p>Hello ${name},</p>
        <p>Click the link below to verify your email:</p>
        <a href="${verifyLink}">${verifyLink}</a>
        <p>This link expires in 15 minutes.</p>
      `
    });

    res.json({
      message: "Verification email sent. Please check your inbox."
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * VERIFY EMAIL & SAVE USER
 */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, email, password } = decoded;

    // Check if already verified
    const exists = await User.findOne({ email });
    if (exists) {
      return res.send("Email already verified. You can login.");
    }

    // Save user
    const user = new User({ name, email, password });
    await user.save();

    res.send(`
      <h2>Email Verified Successfully ✅</h2>
      <p>You can now login to your account.</p>
    `);

  } catch (error) {
    console.error("VERIFY ERROR:", error);
    res.status(400).send("Invalid or expired verification link.");
  }
};


/**
 * LOGIN USER
 * email, password
 */


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // CREATE TOKEN (expires in 1 hour)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};
