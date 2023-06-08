import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const loginWithGithub = () => {
        return signInWithPopup(auth, githubProvider);
    }

    const createUserEmailPass = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateName = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const loginWithEmailPass = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }



    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            return () => {
                return unsubcribe()
            }
        })
    }, [])


    const value = {
        loginWithGoogle,
        loginWithGithub,
        createUserEmailPass,
        loginWithEmailPass,
        updateName,
        user,
        loading,
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}


export default AuthProvider;