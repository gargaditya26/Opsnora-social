import { Instagram, Linkedin } from "lucide-react";
import type { Platform } from "@/lib/types";

export function PlatformIcon({ platform, size = 15 }: { platform: Platform; size?: number }) {
  return platform === "instagram" ? <Instagram size={size} /> : <Linkedin size={size} />;
}
