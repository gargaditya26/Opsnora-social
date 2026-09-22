"use client";
import Link from "next/link";
import { Badge } from "@/components/ui";
import { PlatformIcon } from "@/components/icons";
import { AlertTriangle, ArrowRight, CalendarDays, CheckCircle2, FileEdit, Plus, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { useAppStore } from "@/components/app-store";

export default function Overview() {
  const {posts,connections}=useAppStore();
  const counts = { scheduled: posts.filter(p => p.status === "scheduled").length, published: posts.filter(p => p.status === "published").length, draft: posts.filter(p => p.status === "draft").length, failed: posts.filter(p => p.status === "failed").length };
  const upcoming = posts.filter(p => p.status === "scheduled").slice(0, 3);
  return <div className="page dashboard-page">
    <div className="demo-banner"><Sparkles size={15}/><span><strong>Demo workspace</strong> — Sample data is shown. Publishing remains disabled until accounts are configured.</span><Link href="/connections">Review connections</Link></div>
    <div className="page-header welcome"><div><span className="eyebrow">Sunday, September 20</span><h1>Good afternoon, Aditya</h1><p>Here&apos;s what&apos;s happening with your content.</p></div><Link href="/create" className="button button-primary"><Plus size={17}/> Create post</Link></div>
    <section className="kpi-grid">
      <article><span className="kpi-icon blue"><CalendarDays size={18}/></span><div><small>Scheduled</small><strong>{counts.scheduled}</strong><p>Next post tomorrow at 10:30 AM</p></div></article>
      <article><span className="kpi-icon green"><CheckCircle2 size={18}/></span><div><small>Published</small><strong>{counts.published}</strong><p>2 posts in the last 7 days</p></div></article>
      <article><span className="kpi-icon slate"><FileEdit size={18}/></span><div><small>Drafts</small><strong>{counts.draft}</strong><p>1 draft needs a caption</p></div></article>
      <article><span className="kpi-icon red"><AlertTriangle size={18}/></span><div><small>Failed</small><strong>{counts.failed}</strong><p>Needs your attention</p></div></article>
    </section>
    <section className="content-section"><div className="section-heading"><div><h2>Upcoming posts</h2><p>Your next scheduled content across all platforms.</p></div><Link href="/scheduled">View all <ArrowRight size={15}/></Link></div>
      <div className="upcoming-list">{upcoming.map(post => <article key={post.id}><div className={`post-cover thumb-${post.mediaTone}`}><span>{post.title.split(" ")[0]}</span></div><div className="upcoming-main"><strong>{post.title}</strong><p>{post.caption}</p></div><div className="platforms">{post.platforms.map(p => <span key={p}><PlatformIcon platform={p}/></span>)}</div><div className="when"><strong>{format(new Date(post.scheduledAt), "EEE, MMM d")}</strong><small>{format(new Date(post.scheduledAt), "h:mm a")}</small></div><Badge status={post.status}/><Link className="text-button" href={`/create?id=${post.id}`}>Edit</Link></article>)}</div>
    </section>
    <div className="dashboard-bottom"><section className="attention"><div className="section-heading"><div><h2>Needs attention</h2><p>Issues that may affect publishing.</p></div></div><div className="alert-row"><span><AlertTriangle size={18}/></span><div><strong>{connections.instagram==="connected"?"All accounts connected":"Instagram connection needs attention"}</strong><p>{connections.instagram==="connected"?"Your connected channels are ready for scheduling.":"Reconnect @vikrantgroup before your next Instagram post."}</p></div>{connections.instagram!=="connected"&&<Link href="/connections">Reconnect</Link>}</div></section><section className="quick-plan"><small>CONTENT HEALTH</small><strong>{counts.scheduled} posts scheduled</strong><div className="progress"><i/></div><p>Keep your publishing calendar consistent.</p></section></div>
  </div>;
}
