// ─────────────────────────────────────────────────
// BloodBridge AI — Email Templates
// ─────────────────────────────────────────────────

const BASE_URL = process.env.BACKEND_URL || 'https://bloodbridge-backend-3d5m.onrender.com'
const SITE_URL = process.env.CLIENT_URL  || 'https://bloodbridge-ai.web.app'

// ── 1. Donor Notification Email ─────────────────
const donorNotificationEmail = ({ donor, request, requestId, aiScore }) => {
  const confirmUrl = `${BASE_URL}/api/respond?requestId=${requestId}&donorId=${donor.id}&action=confirm`
  const declineUrl = `${BASE_URL}/api/respond?requestId=${requestId}&donorId=${donor.id}&action=decline`
  const urgencyColor = request.urgency === 'critical' ? '#c0392b' : '#e67e22'
  const urgencyLabel = request.urgency === 'critical' ? '🚨 CRITICAL' : '📅 PLANNED'

  return {
    subject: `🩸 Blood Needed — ${request.bloodType} required in ${request.city}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BloodBridge AI — Blood Request</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#c0392b,#e74c3c);padding:30px 20px;text-align:center;">
    <h1 style="color:white;margin:0;font-size:28px;font-weight:900;letter-spacing:-0.5px;">
      🩸 BloodBridge AI
    </h1>
    <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">
      Connecting Donors. Saving Lives.
    </p>
  </div>

  <!-- Main Card -->
  <div style="max-width:560px;margin:24px auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Urgency Banner -->
    <div style="background:${urgencyColor};padding:12px 24px;text-align:center;">
      <span style="color:white;font-weight:700;font-size:15px;letter-spacing:1px;">
        ${urgencyLabel} — ACTION NEEDED
      </span>
    </div>

    <!-- Body -->
    <div style="padding:32px 28px;">
      <h2 style="color:#1c1c1c;margin:0 0 8px;font-size:22px;">
        Dear ${donor.name},
      </h2>
      <p style="color:#555;font-size:16px;line-height:1.6;margin:0 0 24px;">
        A Thalassemia patient urgently needs your help. Our AI has matched you as one of the best available donors.
      </p>

      <!-- Request Details Card -->
      <div style="background:#fff5f5;border:1.5px solid #fecaca;border-radius:12px;padding:20px;margin-bottom:24px;">
        <h3 style="color:#c0392b;margin:0 0 14px;font-size:15px;text-transform:uppercase;letter-spacing:0.5px;">
          📋 Request Details
        </h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#888;font-size:14px;width:140px;">Blood Type Needed</td>
            <td style="padding:6px 0;color:#1c1c1c;font-weight:700;font-size:16px;">${request.bloodType}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:14px;">Your Blood Type</td>
            <td style="padding:6px 0;color:#1c1c1c;font-weight:600;font-size:14px;">${donor.bloodType} ✅ Compatible</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:14px;">Hospital</td>
            <td style="padding:6px 0;color:#1c1c1c;font-weight:600;font-size:14px;">${request.hospital || 'Details shared on confirm'}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:14px;">City</td>
            <td style="padding:6px 0;color:#1c1c1c;font-weight:600;font-size:14px;">${request.city}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:14px;">Units Required</td>
            <td style="padding:6px 0;color:#1c1c1c;font-weight:600;font-size:14px;">${request.unitsRequired || 1} unit(s)</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:14px;">Urgency</td>
            <td style="padding:6px 0;font-weight:700;font-size:14px;color:${urgencyColor};">${urgencyLabel}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:14px;">Your Match Score</td>
            <td style="padding:6px 0;color:#16a34a;font-weight:700;font-size:14px;">${aiScore}/100 ⭐</td>
          </tr>
        </table>
      </div>

      <!-- CTA Buttons -->
      <p style="color:#444;font-size:15px;margin:0 0 16px;font-weight:600;">
        Can you donate? Please respond:
      </p>
      <div style="display:flex;gap:12px;margin-bottom:24px;">
        <a href="${confirmUrl}" style="display:inline-block;background:linear-gradient(135deg,#c0392b,#e74c3c);color:white;text-decoration:none;padding:14px 28px;border-radius:50px;font-weight:700;font-size:15px;text-align:center;">
          ✅ Yes, I Can Donate
        </a>
        <a href="${declineUrl}" style="display:inline-block;background:white;color:#888;text-decoration:none;padding:14px 28px;border-radius:50px;font-weight:600;font-size:15px;border:2px solid #e5e7eb;text-align:center;">
          ❌ Can't Donate Now
        </a>
      </div>

      <!-- Note -->
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 18px;">
        <p style="color:#15803d;font-size:13px;margin:0;line-height:1.6;">
          💚 <strong>Your response saves a life.</strong> Once you confirm, our coordinator will contact you with full details. Your information is shared only with the treating hospital.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;padding:20px 28px;border-top:1px solid #f0f0f0;text-align:center;">
      <p style="color:#aaa;font-size:12px;margin:0 0 6px;">
        You received this because you registered as a donor on BloodBridge AI.
      </p>
      <p style="color:#aaa;font-size:12px;margin:0;">
        <a href="${SITE_URL}" style="color:#c0392b;text-decoration:none;">bloodbridge-ai.web.app</a>
        &nbsp;|&nbsp;
        <a href="mailto:contact.bloodbridge@gmail.com" style="color:#c0392b;text-decoration:none;">contact.bloodbridge@gmail.com</a>
      </p>
    </div>
  </div>

</body>
</html>
    `,
    text: `
Dear ${donor.name},

A Thalassemia patient urgently needs ${request.bloodType} blood at ${request.hospital || 'a hospital'} in ${request.city}.

Your blood type ${donor.bloodType} is compatible. You are one of our top matched donors (Score: ${aiScore}/100).

To CONFIRM you can donate, visit:
${confirmUrl}

To DECLINE, visit:
${declineUrl}

Thank you for being a lifeline!
BloodBridge AI — bloodbridge-ai.web.app
    `
  }
}

// ── 2. Coordinator Notification Email ───────────
const coordinatorNotificationEmail = ({ request, requestId, matchedDonors }) => {
  const donorRows = matchedDonors.map((d, i) => `
    <tr style="background:${i % 2 === 0 ? '#fff' : '#f9fafb'};">
      <td style="padding:10px 14px;font-size:13px;color:#1c1c1c;font-weight:600;">${d.name || 'Donor ' + (i+1)}</td>
      <td style="padding:10px 14px;font-size:13px;color:#c0392b;font-weight:700;">${d.bloodType}</td>
      <td style="padding:10px 14px;font-size:13px;color:#555;">${d.city}</td>
      <td style="padding:10px 14px;font-size:13px;color:#16a34a;font-weight:700;">${d.aiScore}/100</td>
      <td style="padding:10px 14px;font-size:13px;color:#3b82f6;">${d.phone || 'On file'}</td>
    </tr>
  `).join('')

  return {
    subject: `🚨 New Blood Request — ${request.bloodType} needed in ${request.city}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">

  <div style="background:linear-gradient(135deg,#1c1c1c,#374151);padding:24px 20px;text-align:center;">
    <h1 style="color:white;margin:0;font-size:22px;font-weight:900;">
      🩸 BloodBridge AI — Coordinator Alert
    </h1>
  </div>

  <div style="max-width:640px;margin:24px auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <div style="background:#c0392b;padding:12px 24px;">
      <span style="color:white;font-weight:700;font-size:15px;">
        🚨 NEW BLOOD REQUEST — IMMEDIATE ACTION REQUIRED
      </span>
    </div>

    <div style="padding:28px;">
      <h2 style="color:#1c1c1c;margin:0 0 20px;font-size:20px;">Request Summary</h2>

      <!-- Request Info -->
      <div style="background:#fff5f5;border:1.5px solid #fecaca;border-radius:12px;padding:18px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:5px 0;color:#888;font-size:13px;width:160px;">Patient Name</td><td style="padding:5px 0;color:#1c1c1c;font-weight:600;">${request.patientName}</td></tr>
          <tr><td style="padding:5px 0;color:#888;font-size:13px;">Blood Type</td><td style="padding:5px 0;color:#c0392b;font-weight:700;font-size:16px;">${request.bloodType}</td></tr>
          <tr><td style="padding:5px 0;color:#888;font-size:13px;">Hospital</td><td style="padding:5px 0;color:#1c1c1c;font-weight:600;">${request.hospital || 'Not specified'}</td></tr>
          <tr><td style="padding:5px 0;color:#888;font-size:13px;">City</td><td style="padding:5px 0;color:#1c1c1c;font-weight:600;">${request.city}</td></tr>
          <tr><td style="padding:5px 0;color:#888;font-size:13px;">Units Required</td><td style="padding:5px 0;color:#1c1c1c;font-weight:600;">${request.unitsRequired || 1}</td></tr>
          <tr><td style="padding:5px 0;color:#888;font-size:13px;">Urgency</td><td style="padding:5px 0;color:#c0392b;font-weight:700;">${request.urgency?.toUpperCase()}</td></tr>
          <tr><td style="padding:5px 0;color:#888;font-size:13px;">Contact Person</td><td style="padding:5px 0;color:#1c1c1c;font-weight:600;">${request.contactPerson || 'N/A'}</td></tr>
          <tr><td style="padding:5px 0;color:#888;font-size:13px;">Contact Phone</td><td style="padding:5px 0;color:#3b82f6;font-weight:700;">${request.contactPhone}</td></tr>
          <tr><td style="padding:5px 0;color:#888;font-size:13px;">Donors Notified</td><td style="padding:5px 0;color:#16a34a;font-weight:700;">${matchedDonors.length} donors emailed</td></tr>
        </table>
      </div>

      <!-- Matched Donors Table -->
      <h3 style="color:#1c1c1c;margin:0 0 12px;font-size:16px;">Top Matched Donors (AI Ranked)</h3>
      <div style="border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#1c1c1c;">
              <th style="padding:10px 14px;color:white;font-size:12px;text-align:left;">Name</th>
              <th style="padding:10px 14px;color:white;font-size:12px;text-align:left;">Blood</th>
              <th style="padding:10px 14px;color:white;font-size:12px;text-align:left;">City</th>
              <th style="padding:10px 14px;color:white;font-size:12px;text-align:left;">Score</th>
              <th style="padding:10px 14px;color:white;font-size:12px;text-align:left;">Phone</th>
            </tr>
          </thead>
          <tbody>${donorRows}</tbody>
        </table>
      </div>

      <p style="color:#888;font-size:12px;margin:12px 0 0;">
        All donors above have been notified by email. Monitor responses in Firebase Console.
      </p>
    </div>

    <div style="background:#f9fafb;padding:16px 28px;text-align:center;border-top:1px solid #f0f0f0;">
      <p style="color:#aaa;font-size:12px;margin:0;">
        BloodBridge AI — bloodbridge-ai.web.app
      </p>
    </div>
  </div>
</body>
</html>
    `,
    text: `
NEW BLOOD REQUEST — BloodBridge AI

Patient: ${request.patientName}
Blood Type: ${request.bloodType}
Hospital: ${request.hospital}
City: ${request.city}
Contact: ${request.contactPhone}
Urgency: ${request.urgency}

${matchedDonors.length} donors have been notified by email.

BloodBridge AI
    `
  }
}

// ── 3. Donor Confirmation Email to Coordinator ──
const donorConfirmedEmail = ({ donor, request }) => ({
  subject: `✅ Donor Confirmed — ${donor.name} will donate ${request.bloodType} in ${request.city}`,
  html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="background:linear-gradient(135deg,#15803d,#16a34a);padding:24px 20px;text-align:center;">
    <h1 style="color:white;margin:0;font-size:22px;font-weight:900;">✅ Donor Confirmed!</h1>
  </div>
  <div style="max-width:500px;margin:24px auto;background:white;border-radius:16px;padding:28px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <h2 style="color:#15803d;margin:0 0 16px;">Great news! A donor has confirmed.</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#888;font-size:14px;width:140px;">Donor Name</td><td style="color:#1c1c1c;font-weight:700;">${donor.name}</td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:14px;">Blood Type</td><td style="color:#c0392b;font-weight:700;">${donor.bloodType}</td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:14px;">Phone</td><td style="color:#3b82f6;font-weight:700;">${donor.phone}</td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:14px;">City</td><td style="color:#1c1c1c;font-weight:600;">${donor.city}</td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:14px;">For Patient</td><td style="color:#1c1c1c;font-weight:600;">${request.patientName}</td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:14px;">Hospital</td><td style="color:#1c1c1c;font-weight:600;">${request.hospital}</td></tr>
    </table>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px;margin-top:20px;">
      <p style="color:#15803d;margin:0;font-size:13px;">
        📞 Please call the donor to confirm timing and coordinate with the hospital.
      </p>
    </div>
  </div>
</body>
</html>
  `,
  text: `Donor ${donor.name} (${donor.bloodType}) has confirmed donation for patient ${request.patientName}. Phone: ${donor.phone}`
})

// ── 4. Donor Registration Welcome Email ─────────
const donorWelcomeEmail = ({ donor }) => ({
  subject: `🩸 Welcome to BloodBridge AI — You're a Lifeline, ${donor.name}!`,
  html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="background:linear-gradient(135deg,#c0392b,#e74c3c);padding:30px 20px;text-align:center;">
    <h1 style="color:white;margin:0;font-size:28px;font-weight:900;">🩸 BloodBridge AI</h1>
    <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">Connecting Donors. Saving Lives.</p>
  </div>
  <div style="max-width:520px;margin:24px auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="padding:32px 28px;">
      <h2 style="color:#1c1c1c;margin:0 0 12px;">Welcome, ${donor.name}! 🎉</h2>
      <p style="color:#555;font-size:15px;line-height:1.7;margin:0 0 20px;">
        You are now officially a <strong>BloodBridge AI donor</strong>. Thank you for joining our mission to make India Thalassemia-free by 2035.
      </p>
      <div style="background:#fff5f5;border:1.5px solid #fecaca;border-radius:12px;padding:18px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:5px 0;color:#888;font-size:13px;width:130px;">Your Name</td><td style="color:#1c1c1c;font-weight:600;">${donor.name}</td></tr>
          <tr><td style="padding:5px 0;color:#888;font-size:13px;">Blood Type</td><td style="color:#c0392b;font-weight:700;font-size:16px;">${donor.bloodType}</td></tr>
          <tr><td style="padding:5px 0;color:#888;font-size:13px;">City</td><td style="color:#1c1c1c;font-weight:600;">${donor.city}</td></tr>
          <tr><td style="padding:5px 0;color:#888;font-size:13px;">Status</td><td style="color:#16a34a;font-weight:700;">✅ Active Donor</td></tr>
        </table>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 18px;">
        <p style="color:#15803d;font-size:13px;margin:0;line-height:1.6;">
          💚 <strong>What happens next?</strong> When a Thalassemia patient near ${donor.city} needs ${donor.bloodType} blood, you'll receive an email alert. Just click YES to confirm and we'll handle the rest!
        </p>
      </div>
    </div>
    <div style="background:#f9fafb;padding:16px 28px;text-align:center;border-top:1px solid #f0f0f0;">
      <p style="color:#aaa;font-size:12px;margin:0;">BloodBridge AI — bloodbridge-ai.web.app</p>
    </div>
  </div>
</body>
</html>
  `,
  text: `Welcome ${donor.name}! You are now a BloodBridge AI donor. Blood type: ${donor.bloodType}. City: ${donor.city}. We'll contact you when a patient needs your help!`
})

module.exports = {
  donorNotificationEmail,
  coordinatorNotificationEmail,
  donorConfirmedEmail,
  donorWelcomeEmail,
}
