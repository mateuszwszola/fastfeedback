import firebase from './firebase';
import getStripe from '@/lib/stripe';

const firestore = firebase.firestore();

export function createUser(uid, data) {
    return firestore
        .collection('users')
        .doc(uid)
        .set({ uid, ...data }, { merge: true });
}

export function updateUser(uid, data) {
    return firestore.collection('users').doc(uid).update(data);
}

export function createSite(data) {
    const site = firestore.collection('sites').doc();
    site.set(data);
    return site;
}

export function deleteSite(id) {
    return firestore.collection('sites').doc(id).delete();
}

export function createFeedback(data) {
    return firestore.collection('feedback').add(data);
}

export function deleteFeedback(id) {
    return firestore.collection('feedback').doc(id).delete();
}

export function updateFeedback(id, newValues) {
    return firestore.collection('feedback').doc(id).update(newValues);
}

export async function createCheckoutSession(uid) {
    const checkoutSessionRef = await firestore
        .collection('users')
        .doc(uid)
        .collection('checkout_sessions')
        .add({
            price: 'price_1I6h1VA3IFLQqMTr3QtrglpD',
            success_url: window.location.origin,
            cancel_url: window.location.origin
        });

    checkoutSessionRef.onSnapshot(async (snap) => {
        const { sessionId } = snap.data();
        if (sessionId) {
            const stripe = await getStripe();

            stripe.redirectToCheckout({ sessionId });
        }
    });
}
