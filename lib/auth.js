import { useContext, useEffect, useState, createContext } from 'react';
import cookie from 'js-cookie';
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

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser);
            const { token, ...userWithoutToken } = user;

            createUser(user.uid, userWithoutToken);
            setUser(user);

            cookie.set('fast-feedback-auth', true, {
                expires: 1
            });

            setLoading(false);

            return user;
        } else {
            setLoading(false);
            setUser(false);
            cookie.remove('fast-feedback-auth');

            return false;
        }
    };

    const signInWithGithub = () => {
        setLoading(true);

        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => handleUser(response.user));
    };

    const signInWithGoogle = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => handleUser(response.user));
    };

    const signOut = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => handleUser(false));
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        signInWithGithub,
        signInWithGoogle,
        signOut
    };
}

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        token: user.ya,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL
    };
};
