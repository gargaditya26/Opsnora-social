"use client";

import { useEffect, useState } from "react";
import { CalendarRange, FilePenLine, Sparkles, WandSparkles } from "lucide-react";
import { Button } from "./ui";

export type CreationMode="manual"|"ai"|"plan";

export function AiCreationPanel({mode,onModeChange}:{mode:CreationMode;onModeChange(mode:CreationMode):void}){
 const [configured,setConfigured]=useState<boolean|null>(null);
 const [topic,setTopic]=useState("");
 const [product,setProduct]=useState("");
 const [audience,setAudience]=useState("");
 const [tone,setTone]=useState("Professional");
 const [cta,setCta]=useState("");
 const [instructions,setInstructions]=useState("");
 const [planCount,setPlanCount]=useState(10);
 useEffect(()=>{fetch("/api/ai/status").then(r=>r.json()).then(v=>setConfigured(Boolean(v.configured))).catch(()=>setConfigured(false))},[]);
 const unavailable=configured===false;
 return <section className="creation-mode-card">
  <div className="creation-mode-tabs">
   <button className={mode==="manual"?"active":""} onClick={()=>onModeChange("manual")}><FilePenLine size={17}/><span><strong>Create manually</strong><small>Write and schedule your own post</small></span></button>
   <button className={mode==="ai"?"active":""} onClick={()=>onModeChange("ai")}><WandSparkles size={17}/><span><strong>Generate with AI</strong><small>Caption, hashtags and complete post</small></span></button>
   <button className={mode==="plan"?"active":""} onClick={()=>onModeChange("plan")}><CalendarRange size={17}/><span><strong>Content plan</strong><small>Prepare multiple editable drafts</small></span></button>
  </div>
  {mode!=="manual"&&<div className="ai-workbench">
   <header><div><span className="eyebrow"><Sparkles size={13}/> AI assistant</span><h2>{mode==="ai"?"Create a stronger social post":"Plan a consistent content series"}</h2><p>{mode==="ai"?"Describe the idea, then review and edit everything inside the existing post editor.":"Generate draft concepts first. Nothing is scheduled or published without your approval."}</p></div><span className={`ai-status ${configured?"ready":"setup"}`}>{configured===null?"Checking setup…":configured?"AI ready":"Setup required"}</span></header>
   {unavailable&&<div className="inline-notice ai-setup"><strong>AI generation is not configured yet.</strong><span>Add the server-only <code>OPENAI_API_KEY</code> to enable these actions. Manual creation remains available.</span></div>}
   <div className="ai-input-grid">
    <label className="field full"><span>{mode==="ai"?"Topic or post idea":"Content plan goal"}</span><textarea rows={3} value={topic} onChange={e=>setTopic(e.target.value)} placeholder={mode==="ai"?"Example: Introduce our new electrical product to project consultants.":"Example: Create an October plan focused on products, education, credibility and festivals."}/></label>
    <label className="field"><span>Product or service</span><input value={product} onChange={e=>setProduct(e.target.value)} placeholder="What are we promoting?"/></label>
    <label className="field"><span>Target audience</span><input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="Who should this reach?"/></label>
    <label className="field"><span>Tone</span><select value={tone} onChange={e=>setTone(e.target.value)}>{["Professional","Friendly","Educational","Promotional","Inspirational","Conversational","Custom"].map(v=><option key={v}>{v}</option>)}</select></label>
    {mode==="plan"?<label className="field"><span>Number of posts</span><input type="number" min={1} max={30} value={planCount} onChange={e=>setPlanCount(Number(e.target.value))}/></label>:<label className="field"><span>Call to action</span><input value={cta} onChange={e=>setCta(e.target.value)} placeholder="Example: Request a quote"/></label>}
    <label className="field full"><span>Additional instructions</span><textarea rows={2} value={instructions} onChange={e=>setInstructions(e.target.value)} placeholder="Important details, words to avoid or campaign context"/></label>
   </div>
   <footer><p>Brand Brain context for this workspace will be applied automatically.</p><div><Button variant="secondary" disabled={!configured||!topic.trim()}>{mode==="ai"?"Generate caption":"Generate plan outline"}</Button><Button disabled={!configured||!topic.trim()}><Sparkles size={15}/>{mode==="ai"?"Generate complete post":`Generate ${planCount} drafts`}</Button></div></footer>
  </div>}
 </section>
}
