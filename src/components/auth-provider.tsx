"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { browserLocalPersistence, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut as firebaseSignOut, updateProfile } from "firebase/auth";
import { firebaseAuth, firebaseConfigurationError, initializeFirebaseAnalytics, isFirebaseConfigured } from "@/lib/firebase";
import { createUserProfile, upsertUserProfile } from "@/lib/firestore-service";

interface AuthValue {user:User|null;loading:boolean;isAuthenticated:boolean;configured:boolean;configurationError:string|null;demoAccess:boolean;signIn(email:string,password:string):Promise<void>;signUp(name:string,email:string,password:string):Promise<void>;signOut():Promise<void>;resetPassword(email:string):Promise<void>;enableDemoAccess():void}
const AuthContext=createContext<AuthValue|null>(null);

export function AuthProvider({children}:{children:React.ReactNode}){
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);const [demoAccess,setDemoAccess]=useState(false);
 useEffect(()=>{void initializeFirebaseAnalytics();if(!firebaseAuth){setDemoAccess(process.env.NEXT_PUBLIC_DEMO_MODE==="true"&&sessionStorage.getItem("opsnora-demo-access")==="true");setLoading(false);return}void setPersistence(firebaseAuth,browserLocalPersistence).catch(()=>undefined);return onAuthStateChanged(firebaseAuth,value=>{setUser(value);setLoading(false)})},[]);
 function requireAuth(){if(!firebaseAuth)throw new Error(firebaseConfigurationError??"Firebase is not configured.");return firebaseAuth}
 async function signIn(email:string,password:string){await setPersistence(requireAuth(),browserLocalPersistence);const result=await signInWithEmailAndPassword(requireAuth(),email.trim(),password);await upsertUserProfile(result.user)}
 async function signUp(name:string,email:string,password:string){const auth=requireAuth();await setPersistence(auth,browserLocalPersistence);const result=await createUserWithEmailAndPassword(auth,email.trim(),password);if(name.trim())await updateProfile(result.user,{displayName:name.trim()});await createUserProfile(result.user,name.trim())}
 async function signOut(){if(firebaseAuth)await firebaseSignOut(firebaseAuth);sessionStorage.removeItem("opsnora-demo-access");setDemoAccess(false)}
 async function resetPassword(email:string){await sendPasswordResetEmail(requireAuth(),email.trim())}
 function enableDemoAccess(){if(isFirebaseConfigured||process.env.NEXT_PUBLIC_DEMO_MODE!=="true")return;sessionStorage.setItem("opsnora-demo-access","true");setDemoAccess(true)}
 return <AuthContext.Provider value={{user,loading,isAuthenticated:Boolean(user),configured:isFirebaseConfigured,configurationError:firebaseConfigurationError,demoAccess,signIn,signUp,signOut,resetPassword,enableDemoAccess}}>{children}</AuthContext.Provider>
}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error("useAuth must be inside AuthProvider");return value}
