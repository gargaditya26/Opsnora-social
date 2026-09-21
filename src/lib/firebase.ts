import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-env";
export { firebaseConfigurationError, isFirebaseConfigured, missingFirebaseEnv } from "./firebase-env";
const app = isFirebaseConfigured ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;
export const firebaseAuth = app ? getAuth(app) : null;
export const firebaseDb = app ? getFirestore(app) : null;
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
