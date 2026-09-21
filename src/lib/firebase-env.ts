const requiredFirebaseEnv = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const missingFirebaseEnv = Object.entries(requiredFirebaseEnv).filter(([,value])=>!value?.trim()).map(([key])=>key);
export const isFirebaseConfigured = missingFirebaseEnv.length === 0;
export const firebaseConfig = {...requiredFirebaseEnv,measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID};
export const firebaseConfigurationError = isFirebaseConfigured ? null : `Firebase configuration is incomplete. Missing: ${missingFirebaseEnv.join(", ")}`;
