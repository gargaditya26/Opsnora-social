"use client";

import { useEffect, useState } from "react";
import { Bell, BrainCircuit, Building2, Check, Clock, Lock, User } from "lucide-react";
import { Button } from "@/components/ui";
import { useAppStore } from "@/components/app-store";
import type { BrandProfile } from "@/lib/types";

const tabs=[
  {id:"profile",label:"Profile",Icon:User},
  {id:"workspace",label:"Workspace",Icon:Building2},
  {id:"brand",label:"Brand Brain",Icon:BrainCircuit},
  {id:"publishing",label:"Publishing defaults",Icon:Clock},
  {id:"notifications",label:"Notifications",Icon:Bell},
  {id:"security",label:"Security",Icon:Lock},
];

export default function Settings(){
 const store=useAppStore();
 const [tab,setTab]=useState("profile");
 const [saved,setSaved]=useState(false);
 const [name,setName]=useState("Aditya Garg");
 const [workspace,setWorkspace]=useState("Vikrant Group");
 const [brandDraft,setBrandDraft]=useState<BrandProfile>(store.brandProfile);
 useEffect(()=>setTab(new URLSearchParams(window.location.search).get("tab")??"profile"),[]);
 useEffect(()=>setBrandDraft(store.brandProfile),[store.brandProfile]);
 function updateBrand<K extends keyof BrandProfile>(key:K,value:BrandProfile[K]){setBrandDraft(v=>({...v,[key]:value}))}
 function save(){
  if(tab==="brand")store.updateBrandProfile(brandDraft);
  localStorage.setItem("opsnora-settings",JSON.stringify({name,workspace,tab}));
  setSaved(true);setTimeout(()=>setSaved(false),2500);
 }
 return <div className="page settings-page"><div className="page-header"><div><span className="eyebrow">Account</span><h1>Settings</h1><p>Manage your profile, workspace and publishing defaults.</p></div></div>{saved&&<div className="inline-notice success"><Check size={17}/>Settings saved.</div>}<div className="settings-layout"><nav>{tabs.map(t=><button key={t.id} className={tab===t.id?"active":""} onClick={()=>setTab(t.id)}><t.Icon size={16}/> {t.label}</button>)}</nav><section className="settings-panel"><header><h2>{tabs.find(t=>t.id===tab)?.label}</h2><p>{tab==="brand"?"Give AI tools consistent, workspace-specific context for future content generation.":"Configure preferences for your OPSNORA Social workspace."}</p></header><div className="form-grid">
 {tab==="profile"&&<><label className="field"><span>Full name</span><input value={name} onChange={e=>setName(e.target.value)}/></label><label className="field"><span>Email address</span><input defaultValue="aditya@opsnora.com" disabled/></label><label className="field"><span>Default timezone</span><select defaultValue="Asia/Kolkata"><option>Asia/Kolkata</option><option>UTC</option><option>America/New_York</option></select></label><label className="field"><span>Date format</span><select><option>Sep 21, 2026</option><option>21 Sep 2026</option></select></label></>}
 {tab==="workspace"&&<><label className="field"><span>Workspace name</span><input value={workspace} onChange={e=>setWorkspace(e.target.value)}/></label><label className="field"><span>Organization</span><input defaultValue="OPSNORA"/></label></>}
 {tab==="brand"&&<><label className="field"><span>Brand name</span><input value={brandDraft.brandName} onChange={e=>updateBrand("brandName",e.target.value)}/></label><label className="field"><span>Industry</span><input value={brandDraft.industry} onChange={e=>updateBrand("industry",e.target.value)}/></label><label className="field"><span>Website</span><input type="url" placeholder="https://example.com" value={brandDraft.website} onChange={e=>updateBrand("website",e.target.value)}/></label><label className="field"><span>Preferred tone</span><select value={brandDraft.preferredTone} onChange={e=>updateBrand("preferredTone",e.target.value)}><option>Professional</option><option>Friendly</option><option>Educational</option><option>Promotional</option><option>Inspirational</option><option>Conversational</option><option>Custom</option></select></label><label className="field full"><span>Business description</span><textarea rows={3} value={brandDraft.businessDescription} onChange={e=>updateBrand("businessDescription",e.target.value)}/></label><label className="field full"><span>Products and services</span><textarea rows={3} value={brandDraft.productsServices} onChange={e=>updateBrand("productsServices",e.target.value)}/></label><label className="field full"><span>Target audience</span><textarea rows={3} value={brandDraft.targetAudience} onChange={e=>updateBrand("targetAudience",e.target.value)}/></label><label className="field full"><span>Preferred calls to action</span><textarea rows={2} placeholder="Separate options with semicolons" value={brandDraft.preferredCtas} onChange={e=>updateBrand("preferredCtas",e.target.value)}/></label><label className="field full"><span>Preferred hashtags</span><textarea rows={2} value={brandDraft.preferredHashtags} onChange={e=>updateBrand("preferredHashtags",e.target.value)}/></label><label className="field full"><span>Words or topics to avoid</span><textarea rows={2} value={brandDraft.avoidedTopics} onChange={e=>updateBrand("avoidedTopics",e.target.value)}/></label><label className="field full"><span>Brand instructions</span><textarea rows={4} value={brandDraft.brandInstructions} onChange={e=>updateBrand("brandInstructions",e.target.value)}/><small>Non-secret context saved for this workspace and used by future AI generation.</small></label></>}
 {tab==="publishing"&&<><label className="field"><span>Default publish time</span><input type="time" defaultValue="10:30"/></label><label className="field"><span>Approval workflow</span><select><option>Disabled</option><option>Required for editors</option></select></label></>}
 {tab==="notifications"&&<div className="setting-checks"><label><input type="checkbox" defaultChecked/> Post published</label><label><input type="checkbox" defaultChecked/> Publishing failed</label><label><input type="checkbox" defaultChecked/> Connection expired</label><label><input type="checkbox"/> Approval updates</label></div>}
 {tab==="security"&&<><label className="field"><span>Current password</span><input type="password"/></label><label className="field"><span>New password</span><input type="password"/></label></>}
 </div><footer><Button onClick={save}>Save changes</Button></footer></section></div></div>
}
