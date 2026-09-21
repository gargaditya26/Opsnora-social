export type Platform = "instagram" | "linkedin";
export type PostStatus = "draft" | "pending_approval" | "approved" | "scheduled" | "publishing" | "published" | "failed" | "cancelled";
export type ConnectionStatus = "connected" | "not_connected" | "expired" | "configuration_required";

export interface Post {
  id: string;
  workspaceId: string;
  title: string;
  caption: string;
  platforms: Platform[];
  scheduledAt: string;
  status: PostStatus;
  mediaUrl?: string;
  mediaTone: string;
  createdBy: string;
  error?: string;
}

export interface SocialConnection {
  id: string;
  workspaceId: string;
  platform: Platform;
  status: ConnectionStatus;
  accountName?: string;
  accountType?: string;
  connectedAt?: string;
  lastSyncAt?: string;
}
