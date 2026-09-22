import { AppShell } from "@/components/app-shell";
import { AppStoreProvider } from "@/components/app-store";
import { AuthGuard } from "@/components/auth-guard";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function DashboardLayout({ children }: { children: React.ReactNode }) { return <AuthGuard><AppStoreProvider><AppShell>{children}</AppShell></AppStoreProvider></AuthGuard>; }
