const admin = require('firebase-admin')

let db = null

const initFirebase = () => {
  if (admin.apps.length > 0) {
    db = admin.firestore()
    return db
  }

  try {
    // Use service account from environment variable
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
    console.log('✅ Firebase Admin initialized')
  } catch (error) {
    console.log('⚠️  Firebase not configured — using offline fallback mode')
    console.log('   To enable: add FIREBASE_SERVICE_ACCOUNT to environment variables')
  }

  try {
    db = admin.firestore()
    global.DB_CONNECTED = true
  } catch (e) {
    global.DB_CONNECTED = false
  }

  return db
}

const getDB = () => db

module.exports = { initFirebase, getDB }
