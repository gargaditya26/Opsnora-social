const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const requiredFirebaseConfig = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
};

export const missingFirebaseEnv = Object.entries(requiredFirebaseConfig).filter(([,value])=>!value?.trim()).map(([key])=>key);
export const isFirebaseConfigured = missingFirebaseEnv.length === 0;
export const isFirebaseStorageConfigured = isFirebaseConfigured && Boolean(firebaseConfig.storageBucket?.trim());
export { firebaseConfig };
export const firebaseConfigurationError = isFirebaseConfigured ? null : `Firebase configuration is incomplete. Missing: ${missingFirebaseEnv.join(", ")}`;
