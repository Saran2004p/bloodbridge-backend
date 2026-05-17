const { transporter } = require('./mailer')
const {
  donorNotificationEmail,
  coordinatorNotificationEmail,
  donorConfirmedEmail,
  donorWelcomeEmail,
} = require('./templates')

const FROM = `"BloodBridge AI 🩸" <${process.env.EMAIL_USER}>`
const COORDINATOR = process.env.COORDINATOR_EMAIL || 'contact.bloodbridge@gmail.com'

// ── Send email to a single donor about blood request ──
const notifyDonor = async ({ donor, request, requestId, aiScore }) => {
  if (!global.EMAIL_CONNECTED || !donor.email) return false
  try {
    const { subject, html, text } = donorNotificationEmail({ donor, request, requestId, aiScore })
    await transporter.sendMail({ from: FROM, to: donor.email, subject, html, text })
    console.log(`📧 Donor notified: ${donor.email}`)
    return true
  } catch (err) {
    console.error(`❌ Failed to notify donor ${donor.email}:`, err.message)
    return false
  }
}

// ── Notify all matched donors ──────────────────────
const notifyAllDonors = async ({ donors, request, requestId }) => {
  if (!global.EMAIL_CONNECTED) {
    console.log('⚠️  Email not connected — skipping donor notifications')
    return { sent: 0, failed: 0 }
  }

  let sent = 0, failed = 0

  for (const matched of donors) {
    if (!matched.email) { failed++; continue }
    const success = await notifyDonor({
      donor:     matched,
      request,
      requestId,
      aiScore:   matched.aiScore || 75,
    })
    if (success) sent++
    else failed++
    // Small delay between emails to avoid Gmail rate limits
    await new Promise(r => setTimeout(r, 300))
  }

  console.log(`📧 Donor emails: ${sent} sent, ${failed} failed`)
  return { sent, failed }
}

// ── Notify coordinator of new request ──────────────
const notifyCoordinator = async ({ request, requestId, matchedDonors }) => {
  if (!global.EMAIL_CONNECTED) return false
  try {
    const { subject, html, text } = coordinatorNotificationEmail({ request, requestId, matchedDonors })
    await transporter.sendMail({ from: FROM, to: COORDINATOR, subject, html, text })
    console.log(`📧 Coordinator notified: ${COORDINATOR}`)
    return true
  } catch (err) {
    console.error('❌ Failed to notify coordinator:', err.message)
    return false
  }
}

// ── Notify coordinator when donor confirms ─────────
const notifyDonorConfirmed = async ({ donor, request }) => {
  if (!global.EMAIL_CONNECTED) return false
  try {
    const { subject, html, text } = donorConfirmedEmail({ donor, request })
    await transporter.sendMail({ from: FROM, to: COORDINATOR, subject, html, text })
    console.log(`📧 Confirmation sent to coordinator`)
    return true
  } catch (err) {
    console.error('❌ Failed to send confirmation:', err.message)
    return false
  }
}

// ── Send welcome email to new donor ───────────────
const sendWelcomeEmail = async ({ donor }) => {
  if (!global.EMAIL_CONNECTED || !donor.email) return false
  try {
    const { subject, html, text } = donorWelcomeEmail({ donor })
    await transporter.sendMail({ from: FROM, to: donor.email, subject, html, text })
    console.log(`📧 Welcome email sent to: ${donor.email}`)
    return true
  } catch (err) {
    console.error('❌ Failed to send welcome email:', err.message)
    return false
  }
}

module.exports = {
  notifyDonor,
  notifyAllDonors,
  notifyCoordinator,
  notifyDonorConfirmed,
  sendWelcomeEmail,
}
