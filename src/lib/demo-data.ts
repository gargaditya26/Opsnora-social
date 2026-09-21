import { BrandProfile, Post, SocialConnection } from "./types";

export const workspaces = [
  { id: "ws_vikrant", name: "Vikrant Group", initials: "VG" },
  { id: "ws_opsnora", name: "OPSNORA", initials: "OP" },
];

export const defaultBrandProfiles: Record<string, BrandProfile> = {
  ws_vikrant: {
    workspaceId: "ws_vikrant",
    brandName: "Vikrant Group",
    businessDescription: "Engineering and manufacturing solutions built around quality, reliability and long-term partnerships.",
    industry: "Engineering and manufacturing",
    productsServices: "Engineered steel solutions, electrical products and project support",
    targetAudience: "Business buyers, contractors, consultants and project decision-makers",
    preferredTone: "Professional",
    website: "",
    preferredCtas: "Talk to our team; Learn more; Request a quote",
    preferredHashtags: "#VikrantGroup #Engineering #BuiltToLast",
    avoidedTopics: "Unverified claims, competitor comparisons and political topics",
    brandInstructions: "Use clear, confident language. Emphasize engineering quality, credibility and practical customer outcomes.",
    updatedAt: new Date().toISOString(),
  },
  ws_opsnora: {
    workspaceId: "ws_opsnora",
    brandName: "OPSNORA",
    businessDescription: "Digital products and operational systems that help growing teams work with greater clarity.",
    industry: "Software and business operations",
    productsServices: "Workflow automation, reporting systems and social media operations software",
    targetAudience: "Growing businesses and operations teams",
    preferredTone: "Professional",
    website: "",
    preferredCtas: "Book a consultation; Explore the platform",
    preferredHashtags: "#OPSNORA #BusinessOperations #Automation",
    avoidedTopics: "Unsupported performance claims",
    brandInstructions: "Be concise, useful and confident. Prefer concrete outcomes over generic marketing language.",
    updatedAt: new Date().toISOString(),
  },
};

const today = new Date();
const at = (offset: number, hour: number, minute = 0) => {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset, hour, minute);
  return date.toISOString();
};

export const demoPosts: Post[] = [
  { id: "p1", workspaceId: "ws_vikrant", title: "Building stronger structures", caption: "Precision in every profile. Built for the projects shaping tomorrow.", platforms: ["instagram", "linkedin"], scheduledAt: at(1, 10, 30), status: "scheduled", mediaTone: "steel", createdBy: "Aditya Garg" },
  { id: "p2", workspaceId: "ws_vikrant", title: "Inside our quality process", caption: "Quality is not a checkpoint. It is how every decision gets made.", platforms: ["linkedin"], scheduledAt: at(3, 14), status: "scheduled", mediaTone: "factory", createdBy: "Aditya Garg" },
  { id: "p3", workspaceId: "ws_vikrant", title: "Project milestone", caption: "Another milestone delivered safely, precisely and on schedule.", platforms: ["instagram"], scheduledAt: at(5, 18), status: "scheduled", mediaTone: "site", createdBy: "Aditya Garg" },
  { id: "p4", workspaceId: "ws_vikrant", title: "Team spotlight", caption: "Meet the people behind the progress.", platforms: ["instagram", "linkedin"], scheduledAt: at(-1, 11), status: "published", mediaTone: "team", createdBy: "Aditya Garg" },
  { id: "p5", workspaceId: "ws_vikrant", title: "Sustainability note", caption: "Smarter material choices create better long-term outcomes.", platforms: ["linkedin"], scheduledAt: at(-3, 9), status: "published", mediaTone: "green", createdBy: "Aditya Garg" },
  { id: "p6", workspaceId: "ws_vikrant", title: "Customer story", caption: "A partnership built around reliability.", platforms: ["instagram"], scheduledAt: at(-2, 16), status: "failed", mediaTone: "blue", createdBy: "Aditya Garg", error: "The Instagram connection has expired. Reconnect the account and retry." },
  { id: "p7", workspaceId: "ws_vikrant", title: "Product feature", caption: "", platforms: ["instagram"], scheduledAt: at(7, 12), status: "draft", mediaTone: "navy", createdBy: "Aditya Garg" },
  { id: "p8", workspaceId: "ws_vikrant", title: "Monthly recap", caption: "A look back at the work, people and partnerships that moved us forward.", platforms: ["linkedin"], scheduledAt: at(8, 10), status: "draft", mediaTone: "warm", createdBy: "Aditya Garg" },
];

export const demoConnections: SocialConnection[] = [
  { id: "c1", workspaceId: "ws_vikrant", platform: "linkedin", status: "connected", accountName: "Vikrant Group", accountType: "Company Page", connectedAt: at(-46, 10), lastSyncAt: at(0, 9) },
  { id: "c2", workspaceId: "ws_vikrant", platform: "instagram", status: "expired", accountName: "@vikrantgroup", accountType: "Business account", connectedAt: at(-63, 10), lastSyncAt: at(-2, 16) },
];
