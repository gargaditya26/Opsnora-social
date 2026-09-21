import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { firebaseDb } from "./firebase";

export const COLLECTIONS = {
  users:"users",organizations:"organizations",workspaces:"workspaces",workspaceMembers:"workspace_members",socialConnections:"social_connections",posts:"posts",postPlatformContent:"post_platform_content",media:"media",publishingJobs:"publishing_jobs",notifications:"notifications",analyticsSnapshots:"analytics_snapshots",auditLogs:"audit_logs",
} as const;

export async function upsertUserProfile(user:User,displayName?:string){
  if(!firebaseDb)throw new Error("Firestore is not configured.");
  const profileRef=doc(firebaseDb,COLLECTIONS.users,user.uid);
  await setDoc(profileRef,{uid:user.uid,email:user.email,displayName:displayName??user.displayName??null,photoURL:user.photoURL??null,updatedAt:serverTimestamp()},{merge:true});
  // createdAt is deliberately merged separately only for new registrations.
}

export async function createUserProfile(user:User,displayName:string){
  if(!firebaseDb)throw new Error("Firestore is not configured.");
  await setDoc(doc(firebaseDb,COLLECTIONS.users,user.uid),{uid:user.uid,email:user.email,displayName:displayName||user.displayName||null,photoURL:user.photoURL??null,createdAt:serverTimestamp(),updatedAt:serverTimestamp()},{merge:true});
}
