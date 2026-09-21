import type { SocialProviderService } from "./social-services";

/** Contract for a database adapter using SELECT ... FOR UPDATE SKIP LOCKED. */
export interface PublishingJobStore {
  claimDueJobs(workerId: string, limit: number): Promise<Array<{ id: string; postId: string; connectionId: string; platform: "instagram"|"linkedin"; mediaUrl: string; caption: string; idempotencyKey: string; attemptCount: number }>>;
  markPublished(jobId: string, result: { externalId: string; publicUrl?: string; publishedAt: string }): Promise<void>;
  markFailed(jobId: string, error: { safeMessage: string; retryable: boolean; retryAt?: string }): Promise<void>;
}

export async function runPublishingWorker(store: PublishingJobStore, providers: Record<string, SocialProviderService>, workerId: string) {
  const jobs = await store.claimDueJobs(workerId, 20);
  await Promise.allSettled(jobs.map(async job => {
    try {
      const result = await providers[job.platform].publish({ postId: job.postId, connectionId: job.connectionId, mediaUrl: job.mediaUrl, caption: job.caption, idempotencyKey: job.idempotencyKey });
      await store.markPublished(job.id, result);
    } catch {
      const retryable = job.attemptCount < 5;
      const retryAt = new Date(Date.now() + Math.min(2 ** job.attemptCount * 60_000, 3_600_000)).toISOString();
      await store.markFailed(job.id, { safeMessage: "The platform could not publish this post. Please retry shortly.", retryable, retryAt: retryable ? retryAt : undefined });
    }
  }));
}
