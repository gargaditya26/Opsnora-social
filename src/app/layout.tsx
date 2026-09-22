import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://opsnora-social.vercel.app"),
  title: { default: "OPSNORA Social — Create, schedule and manage content", template: "%s | OPSNORA Social" },
  description: "Plan content, organize social workflows and manage supported channels from one focused workspace.",
  openGraph: { title: "OPSNORA Social", description: "Social media operations, planned with confidence.", url: "https://opsnora-social.vercel.app", siteName: "OPSNORA Social", type: "website" },
  twitter: { card: "summary_large_image", title: "OPSNORA Social", description: "Create, schedule and manage content from one focused workspace." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AuthProvider>{children}</AuthProvider></body></html>;
}
