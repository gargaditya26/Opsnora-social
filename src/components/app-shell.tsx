"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/config";
import { workspaces } from "@/lib/demo-data";
import { BarChart3, Bell, CalendarDays, ChevronDown, ChevronsLeft, CircleHelp, Clock3, FileText, ImageIcon, LayoutDashboard, LogOut, Menu, PenSquare, Plus, Search, Send, Settings, Users, Unplug, X } from "lucide-react";
import { useAppStore } from "./app-store";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";
import { firebaseAuth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const nav = [
  ["Overview", "/", LayoutDashboard], ["Content Calendar", "/calendar", CalendarDays], ["Create Post", "/create", PenSquare], ["Scheduled", "/scheduled", Clock3], ["Drafts", "/drafts", FileText], ["Published", "/published", Send], ["Media Library", "/media", ImageIcon], ["Analytics", "/analytics", BarChart3], ["Connections", "/connections", Unplug], ["Team", "/team", Users], ["Settings", "/settings", Settings],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const {user}=useAuth();
  const {workspaceId,setWorkspaceId,notifications,markNotificationsRead,posts}=useAppStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [workspaceOpen,setWorkspaceOpen]=useState(false); const [notificationsOpen,setNotificationsOpen]=useState(false); const [query,setQuery]=useState("");
  const workspace=workspaces.find(w=>w.id===workspaceId)??workspaces[0]; const unread=notifications.filter(n=>!n.read).length;
  const results=useMemo(()=>query.trim()?posts.filter(p=>`${p.title} ${p.caption}`.toLowerCase().includes(query.toLowerCase())).slice(0,5):[],[posts,query]);
  return <div className={`app ${collapsed ? "sidebar-collapsed" : ""}`}>
    {mobileOpen && <div className="mobile-scrim" onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="brand-row"><Link href="/" className="brand"><span className="brand-mark">O</span><span className="brand-copy"><strong>{brand.product}</strong><small>An OPSNORA product</small></span></Link><button className="icon-button mobile-only" onClick={() => setMobileOpen(false)}><X size={18}/></button></div>
      <div className="workspace-wrap"><button className="workspace-switch" onClick={()=>setWorkspaceOpen(v=>!v)}><span className="workspace-avatar">{workspace.initials}</span><span className="workspace-copy"><small>Workspace</small><strong>{workspace.name}</strong></span><ChevronDown size={15}/></button>{workspaceOpen&&<div className="workspace-menu">{workspaces.map(w=><button key={w.id} className={w.id===workspaceId?"active":""} onClick={()=>{setWorkspaceId(w.id);setWorkspaceOpen(false)}}><span className="workspace-avatar">{w.initials}</span>{w.name}</button>)}<button onClick={()=>alert("Workspace creation is ready for backend setup.")}><Plus size={15}/> Add workspace</button></div>}</div>
      <nav>{nav.map(([label, href, Icon]) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={path === href ? "active" : ""} title={collapsed ? label : undefined}><Icon size={18}/><span>{label}</span>{label === "Scheduled" && <em>3</em>}</Link>)}</nav>
      <div className="sidebar-bottom"><Link href="/help"><CircleHelp size={18}/><span>Help & support</span></Link><button onClick={() => setCollapsed(v => !v)}><ChevronsLeft size={18}/><span>Collapse sidebar</span></button></div>
    </aside>
    <div className="main-area">
      <header className="topbar">
        <button className="icon-button mobile-only" onClick={() => setMobileOpen(true)}><Menu size={20}/></button>
        <div className="top-workspace"><span>{workspace.name}</span><small>Active workspace</small></div>
        <div className="search-wrap"><label className="global-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search posts, media and more"/><kbd>⌘ K</kbd></label>{results.length>0&&<div className="search-results">{results.map(p=><button key={p.id} onClick={()=>{router.push(`/create?id=${p.id}`);setQuery("")}}><strong>{p.title}</strong><small>{p.status} · {p.platforms.join(", ")}</small></button>)}</div>}</div>
        <div className="top-actions"><div className="notification-wrap"><button className="icon-button notification-button" aria-label="Notifications" onClick={()=>{setNotificationsOpen(v=>!v);setProfileOpen(false)}}><Bell size={19}/>{unread>0&&<i/>}</button>{notificationsOpen&&<div className="notification-panel"><header><strong>Notifications</strong><button onClick={markNotificationsRead}>Mark all read</button></header>{notifications.length?notifications.slice(0,5).map(n=><article key={n.id} className={n.read?"":"unread"}><strong>{n.title}</strong><p>{n.body}</p></article>):<p className="no-notifications">You&apos;re all caught up.</p>}</div>}</div><Link href="/create" className="button button-primary quick-create"><Plus size={17}/> <span>Quick create</span></Link><div className="profile-wrap"><button className="avatar" onClick={() => {setProfileOpen(v => !v);setNotificationsOpen(false)}}>{(user?.displayName||user?.email||"AG").split(/\s|@/).map(x=>x[0]).join("").slice(0,2).toUpperCase()}</button>{profileOpen && <div className="profile-menu"><div><strong>{user?.displayName||"Aditya Garg"}</strong><small>{user?.email||"Local demo session"}</small></div><Link href="/settings?tab=profile">Profile</Link><Link href="/settings?tab=workspace">Workspace settings</Link><Link href="/settings?tab=security">Account settings</Link><button onClick={async()=>{if(firebaseAuth)await signOut(firebaseAuth);sessionStorage.removeItem("opsnora-demo-access");router.push("/login")}}><LogOut size={15}/> Sign out</button></div>}</div></div>
      </header>
      <main>{children}</main>
    </div>
  </div>;
}
