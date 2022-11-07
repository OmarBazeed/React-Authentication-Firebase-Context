import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut ,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,} from 'firebase/auth';
import auth from "../firebase";



export const authContext = createContext();


export const AuthContextProvider = (props) => {

    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true);

    const signup = (email,password)=>{
        createUserWithEmailAndPassword(auth,email,password);
    }
    const logout = ()=>{
        signOut(auth);
    }
    const login = (email, password)=>{
        signInWithEmailAndPassword(auth , email ,password)
    }
    const resetPassword = (email)=>{
        sendPasswordResetEmail(auth , email )
    }
    const updateUserEmail = (email)=>{
        updateEmail(auth.currentUser , email )
    }
    const updateUserPassword = (password)=>{
        updatePassword(auth.currentUser , password )
    }

    useEffect(()=>{
    const unsuscribe =  onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            setLoading(false);
        })
        // Cleaning Up The (user) In The Firebase And Also Cleaning Up The (currentUser) In The Context ===> To Let New Someone To Signup With New Email Or Login ...
        return ()=>{
            unsuscribe();
        }
    },[])

return <authContext.Provider value={{
        currentUser,
        signup,
        logout,
        login,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
    }}>

    {!loading && props.children}

    </authContext.Provider>
} 