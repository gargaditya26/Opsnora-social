"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoPosts, workspaces } from "@/lib/demo-data";
import type { Platform, Post, PostStatus } from "@/lib/types";

export interface AppNotification { id: string; title: string; body: string; read: boolean; createdAt: string }
export interface MediaItem { id: string; name: string; type: "image" | "video"; size: string; createdAt: string; dataUrl?: string; tone: string }
export interface TeamMember { id: string; name: string; email: string; role: string; status: "Active" | "Invited" }
type ConnectionMap = Record<Platform, "connected" | "expired" | "not_connected">;

interface StoreValue {
  ready: boolean; posts: Post[]; workspaceId: string; connections: ConnectionMap; notifications: AppNotification[]; media: MediaItem[]; members: TeamMember[];
  setWorkspaceId(id: string): void; addPost(post: Omit<Post,"id"|"workspaceId"|"createdBy">): Post; updatePost(id: string, patch: Partial<Post>): void; duplicatePost(id: string): Post | undefined; deletePost(id: string): void;
  setConnection(platform: Platform, status: ConnectionMap[Platform]): void; markNotificationsRead(): void; addNotification(title: string, body: string): void;
  addMedia(item: Omit<MediaItem,"id"|"createdAt">): void; deleteMedia(id: string): void; addMember(member: Omit<TeamMember,"id"|"status">): void;
}

const StoreContext = createContext<StoreValue | null>(null);
const STORAGE_KEY = "opsnora-social-state-v2";
const initialMedia: MediaItem[] = demoPosts.slice(0,6).map((p,i)=>({id:`m${i}`,name:`${p.title.toLowerCase().replaceAll(" ","-")}.jpg`,type:"image",size:`${(1.2+i*.3).toFixed(1)} MB`,createdAt:`2026-09-${18-i}`,tone:p.mediaTone}));

export function AppStoreProvider({children}:{children:React.ReactNode}){
 const [ready,setReady]=useState(false); const [posts,setPosts]=useState<Post[]>(demoPosts); const [workspaceId,setWorkspaceId]=useState(workspaces[0].id);
 const [connections,setConnections]=useState<ConnectionMap>({instagram:"expired",linkedin:"connected"});
 const [notifications,setNotifications]=useState<AppNotification[]>([{id:"n1",title:"Instagram connection expired",body:"Reconnect @vikrantgroup to resume Instagram publishing.",read:false,createdAt:new Date().toISOString()},{id:"n2",title:"Post published",body:"Team spotlight was published successfully.",read:false,createdAt:new Date(Date.now()-3600000).toISOString()}]);
 const [media,setMedia]=useState<MediaItem[]>(initialMedia); const [members,setMembers]=useState<TeamMember[]>([{id:"u1",name:"Aditya Garg",email:"aditya@opsnora.com",role:"Owner",status:"Active"}]);
 useEffect(()=>{try{const raw=localStorage.getItem(STORAGE_KEY);if(raw){const s=JSON.parse(raw);setPosts(s.posts??demoPosts);setWorkspaceId(s.workspaceId??workspaces[0].id);setConnections(s.connections??{instagram:"expired",linkedin:"connected"});setNotifications(s.notifications??[]);setMedia(s.media??initialMedia);setMembers(s.members??[]);}}finally{setReady(true)}},[]);
 useEffect(()=>{if(ready)localStorage.setItem(STORAGE_KEY,JSON.stringify({posts,workspaceId,connections,notifications,media,members}))},[ready,posts,workspaceId,connections,notifications,media,members]);
 const value=useMemo<StoreValue>(()=>({ready,posts,workspaceId,connections,notifications,media,members,setWorkspaceId,
  addPost:(input)=>{const post:Post={...input,id:`p_${Date.now()}`,workspaceId,createdBy:"Aditya Garg"};setPosts(v=>[post,...v]);return post},
  updatePost:(id,patch)=>setPosts(v=>v.map(p=>p.id===id?{...p,...patch}:p)), duplicatePost:(id)=>{const src=posts.find(p=>p.id===id);if(!src)return;const copy={...src,id:`p_${Date.now()}`,title:`${src.title} (Copy)`,status:"draft" as PostStatus};setPosts(v=>[copy,...v]);return copy}, deletePost:(id)=>setPosts(v=>v.filter(p=>p.id!==id)),
  setConnection:(platform,status)=>setConnections(v=>({...v,[platform]:status})),markNotificationsRead:()=>setNotifications(v=>v.map(n=>({...n,read:true}))),addNotification:(title,body)=>setNotifications(v=>[{id:`n_${Date.now()}`,title,body,read:false,createdAt:new Date().toISOString()},...v]),
  addMedia:(item)=>setMedia(v=>[{...item,id:`m_${Date.now()}`,createdAt:new Date().toISOString()},...v]),deleteMedia:(id)=>setMedia(v=>v.filter(m=>m.id!==id)),addMember:(member)=>setMembers(v=>[...v,{...member,id:`u_${Date.now()}`,status:"Invited"}])
 }),[ready,posts,workspaceId,connections,notifications,media,members]);
 return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export function useAppStore(){const value=useContext(StoreContext);if(!value)throw new Error("useAppStore must be used within AppStoreProvider");return value}
