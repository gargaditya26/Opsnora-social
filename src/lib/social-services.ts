import type { Platform } from "./types";

export interface PublishInput { postId: string; connectionId: string; mediaUrl: string; caption: string; idempotencyKey: string }
export interface PublishResult { externalId: string; publicUrl?: string; publishedAt: string }
export interface SocialProviderService {
  platform: Platform;
  getAuthorizationUrl(state: string): Promise<string>;
  exchangeAuthorizationCode(code: string): Promise<{ encryptedToken: string; expiresAt?: string }>;
  publish(input: PublishInput): Promise<PublishResult>;
  getPublishingStatus(externalId: string): Promise<"processing" | "published" | "failed">;
}

export class ProviderNotConfiguredError extends Error {
  constructor(platform: Platform) { super(`${platform} developer credentials are not configured.`); }
}
