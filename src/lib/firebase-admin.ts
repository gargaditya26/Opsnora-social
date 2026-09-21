import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const projectId=process.env.FIREBASE_ADMIN_PROJECT_ID;const clientEmail=process.env.FIREBASE_ADMIN_CLIENT_EMAIL;const privateKey=process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g,"\n");
export const isFirebaseAdminConfigured=Boolean(projectId&&clientEmail&&privateKey);
const adminApp=isFirebaseAdminConfigured?(getApps()[0]??initializeApp({credential:cert({projectId:projectId!,clientEmail:clientEmail!,privateKey:privateKey!})})):null;
export const adminAuth=adminApp?getAuth(adminApp):null;
export const adminDb=adminApp?getFirestore(adminApp):null;
