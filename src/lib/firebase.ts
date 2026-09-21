import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = [firebaseConfig.apiKey,firebaseConfig.authDomain,firebaseConfig.projectId,firebaseConfig.storageBucket,firebaseConfig.messagingSenderId,firebaseConfig.appId].every(Boolean);
const app = isFirebaseConfigured ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;
export const firebaseAuth = app ? getAuth(app) : null;
export const firebaseStorage = app ? getStorage(app) : null;

export async function initializeFirebaseAnalytics(){
  if (!app || !firebaseConfig.measurementId || typeof window === "undefined" || !(await isSupported())) return null;
  return getAnalytics(app);
}

export async function uploadWorkspaceMedia(file: File, workspaceId: string, uid: string, onProgress?: (percent: number) => void) {
  if (!firebaseStorage) throw new Error("Firebase Storage is not configured.");
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const objectRef = ref(firebaseStorage, `workspaces/${workspaceId}/users/${uid}/${crypto.randomUUID()}-${safeName}`);
  const task = uploadBytesResumable(objectRef, file, { contentType: file.type, customMetadata: { workspaceId, ownerUid: uid } });
  await new Promise<void>((resolve, reject) => task.on("state_changed", snapshot => onProgress?.(Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)), reject, resolve));
  return { url: await getDownloadURL(task.snapshot.ref), path: task.snapshot.ref.fullPath };
}
