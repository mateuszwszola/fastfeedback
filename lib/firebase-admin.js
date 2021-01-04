import admin from 'firebase-admin';

const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            private_key: privateKey,
            project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
        }),
        databaseURL: 'https://fast-feedback.firebaseio.com'
    });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
