const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Your Gmail address
    pass: 'your-app-specific-password' // Your Gmail app-specific password
  }
});

app.post('/api/book', async (req, res) => {
  const { 
    firstName,
    lastName,
    email,
    phone,
    departureDate,
    travelers,
    specialRequirements,
    experienceTitle,
    totalAmount
  } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'your-email@gmail.com', // Where you want to receive the bookings
    subject: `New Booking: ${experienceTitle}`,
    html: `
      <h2>New Booking Received</h2>
      <p><strong>Experience:</strong> ${experienceTitle}</p>
      <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Departure Date:</strong> ${departureDate}</p>
      <p><strong>Number of Travelers:</strong> ${travelers}</p>
      <p><strong>Special Requirements:</strong> ${specialRequirements || 'None'}</p>
      <p><strong>Total Amount:</strong> £${totalAmount}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send booking email' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 