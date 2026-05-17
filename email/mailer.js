const nodemailer = require('nodemailer')

console.log('EMAIL_USER:', process.env.EMAIL_USER)
console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS)

// ── Gmail Transporter ───────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// ── Verify connection on startup ────────────────
const verifyMailer = async () => {
  try {
    await transporter.verify()
    console.log('✅ Email service ready — bloodbridge.ai@gmail.com')
    global.EMAIL_CONNECTED = true
  } catch (err) {
    console.log('⚠️  Email service not configured:', err.message)
    global.EMAIL_CONNECTED = false
  }
}

module.exports = { transporter, verifyMailer }
