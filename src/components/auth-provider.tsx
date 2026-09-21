"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

interface AuthValue { user: User | null; loading: boolean; configured: boolean; demoAccess: boolean; enableDemoAccess(): void }
const AuthContext=createContext<AuthValue|null>(null);
export function AuthProvider({children}:{children:React.ReactNode}){const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(isFirebaseConfigured);const [demoAccess,setDemoAccess]=useState(false);useEffect(()=>{setDemoAccess(sessionStorage.getItem("opsnora-demo-access")==="true");if(!firebaseAuth){setLoading(false);return}return onAuthStateChanged(firebaseAuth,value=>{setUser(value);setLoading(false)})},[]);function enableDemoAccess(){sessionStorage.setItem("opsnora-demo-access","true");setDemoAccess(true)}return <AuthContext.Provider value={{user,loading,configured:isFirebaseConfigured,demoAccess,enableDemoAccess}}>{children}</AuthContext.Provider>}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error("useAuth must be inside AuthProvider");return value}
