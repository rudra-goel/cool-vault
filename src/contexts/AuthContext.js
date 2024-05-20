import React, { useContext, useState, useEffect } from 'react'

import { auth } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createNewUser } from '../FirebaseFunctions';
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [loading, setLoading] = useState(true);
    
    const [currentUser, setCurrentUser] = useState();

    function signUp(email, password) {
        
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signIn(email, password) {

        return signInWithEmailAndPassword(auth, email, password)

    }

    function logout() {
        return signOut(auth)
    } 

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {

            setCurrentUser(user)
            setLoading(false)
            
        })

        return unsubscribe

    }, [])

    const value = {
        currentUser, 
        signUp,
        signIn,
        logout
    }
  return (
    <AuthContext.Provider value={value}>
        { !loading && children }
    </AuthContext.Provider>
  )
}
