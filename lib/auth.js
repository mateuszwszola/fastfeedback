import { useContext, useEffect, useState, createContext } from 'react';
import cookie from 'js-cookie';
import Router from 'next/router';
import { createUser } from '@/lib/db';
import firebase from '@/lib/firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUser = async (rawUser) => {
        if (rawUser) {
            const user = await formatUser(rawUser);
            const { token, ...userWithoutToken } = user;

            createUser(user.uid, userWithoutToken);

            cookie.set('fast-feedback-auth', true, {
                expires: 1
            });

            setUser(user);
            setLoading(false);

            return user;
        } else {
            cookie.remove('fast-feedback-auth');

            setLoading(false);
            setUser(false);

            return false;
        }
    };

    const signInWithGithub = (redirect) => {
        setLoading(true);
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => {
                handleUser(response.user);

                if (redirect) {
                    Router.push(redirect);
                }
            });
    };

    const signInWithGoogle = (redirect) => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => {
                handleUser(response.user);

                if (redirect) {
                    Router.push(redirect);
                }
            });
    };

    const signInWithEmail = (email, password) => {
        setLoading(true);
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                handleUser(response.user);
                Router.push('/sites');
            });
    };

    const signOut = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                handleUser(false);

                Router.push('/');
            });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);

        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        signInWithEmail,
        signInWithGithub,
        signInWithGoogle,
        signOut
    };
}

const getStripeRole = async () => {
    await firebase.auth().currentUser.getIdToken(true);
    const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
    return decodedToken.claims.stripeRole || 'free';
};

const formatUser = async (user) => {
    const token = await user.getIdToken();

    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
        stripeRole: await getStripeRole(),
        token
    };
};
