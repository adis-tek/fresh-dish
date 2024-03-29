import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logOut() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser?.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser?.UpdatePassword(password)
    }

    useEffect(() => {    
        const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        setLoading(false)


        return unsubscribe;
    })
    }, [])



    const value = { 
        currentUser,
        logIn,
        signUp,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword

    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    )
}

export default AuthContext;
