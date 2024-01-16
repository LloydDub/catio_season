const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "YourEmailServiceProvider",
  auth: {
    user: "your-email@example.com",
    pass: "your-password",
  },
});

app.post("/send-contact-form", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: "your-email@example.com",
    to: "admin@example.com", // Replace with your admin email
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email");
    }
    res.send("Email sent successfully");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
