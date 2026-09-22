import { BarChart3, Bot, CalendarDays, Image, Layers3, Send, Sparkles, Users } from "lucide-react";

export const siteUrl="https://opsnora-social.vercel.app";
export const marketingNav=[{label:"Features",href:"/features"},{label:"Platforms",href:"/platforms"},{label:"Solutions",href:"/solutions"},{label:"Pricing",href:"/pricing"},{label:"About",href:"/about"}];
export const features=[
 {slug:"content-creation",title:"Content creation",description:"Create, refine and organize platform-ready posts in one focused editor.",icon:Sparkles},
 {slug:"scheduling",title:"Smart scheduling",description:"Choose publishing dates and keep upcoming content organized.",icon:Send},
 {slug:"content-calendar",title:"Content calendar",description:"Review drafts, scheduled posts and publishing status visually.",icon:CalendarDays},
 {slug:"social-management",title:"Social connections",description:"Connect supported accounts through secure, server-side OAuth flows.",icon:Layers3},
 {slug:"media-library",title:"Media library",description:"Organize session media now, with pluggable persistent storage support for later.",icon:Image},
 {slug:"analytics",title:"Analytics workspace",description:"Bring available performance signals into a clear reporting view.",icon:BarChart3},
 {slug:"automation",title:"Workflow automation",description:"Prepare repeatable publishing jobs with deterministic scheduling and idempotency.",icon:Bot},
 {slug:"teams",title:"Team workspaces",description:"Keep brands, members and content operations separated by workspace.",icon:Users},
];
export const plans=[
 {name:"Starter",description:"For individuals establishing a consistent content workflow.",features:["One workspace","Core post editor","Content calendar","Draft and scheduling workflow"],cta:"Get started",href:"/login?mode=signup"},
 {name:"Professional",description:"For growing teams that need connected workflows and AI assistance.",features:["Everything in Starter","Brand Brain","AI-ready creation workflow","Social account connections"],cta:"Contact us",href:"/contact?reason=sales",recommended:true},
 {name:"Business",description:"For multi-brand operations requiring tailored rollout and support.",features:["Workspace-ready architecture","Approval-ready workflow","Automation foundation","Implementation support"],cta:"Talk to sales",href:"/contact?reason=sales"},
];
export const faqs=[
 {category:"Getting Started",q:"What is OPSNORA Social?",a:"A focused workspace for planning, creating, scheduling and managing social content."},
 {category:"Social Accounts",q:"Which platforms are supported?",a:"Instagram professional accounts and LinkedIn member connections have OAuth architecture today. Additional platforms are not presented as active integrations."},
 {category:"Scheduling",q:"Can I plan content ahead?",a:"Yes. Posts can be saved as drafts, scheduled, reviewed in the calendar and edited before publication."},
 {category:"Publishing",q:"Does AI publish automatically?",a:"No. AI-assisted content remains editable and publication requires an explicit user scheduling or publishing action."},
 {category:"Security",q:"Where are connection tokens stored?",a:"OAuth exchanges happen server-side and tokens are encrypted before being stored through Firebase Admin and Firestore."},
 {category:"Account Management",q:"Can I manage more than one brand?",a:"The application has workspace-aware architecture and Brand Brain profiles designed for multi-brand operation."},
 {category:"Billing",q:"How much does it cost?",a:"Commercial pricing is being finalized. Contact OPSNORA for current availability and rollout options."},
];
