import type { MetadataRoute } from "next";
import { FEATURED_PROVIDER_SLUGS } from "@/lib/page-links";
import { latestCheckedAt } from "@/lib/prices";
import {
  COMPARE_SLUGS,
  GPU_SLUGS,
  PROVIDER_SLUGS,
  SITE_URL,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(latestCheckedAt());
  const staticRoutes = [
    "",
    "/methodology",
    "/about",
    "/disclosure",
    "/privacy",
    "/terms",
    "/cookies",
    "/changelog",
    "/cheapest",
    "/eu",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path || "/"}`,
      lastModified: now,
      changeFrequency: (path === "" ? "daily" : "weekly") as "daily" | "weekly",
      priority: path === "" ? 1 : path === "/cheapest" || path === "/eu" ? 0.8 : 0.6,
    })),
    ...Object.keys(GPU_SLUGS).map((slug) => ({
      url: `${SITE_URL}/gpu/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...PROVIDER_SLUGS.map((slug) => ({
      url: `${SITE_URL}/provider/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: (FEATURED_PROVIDER_SLUGS as readonly string[]).includes(slug)
        ? 0.7
        : 0.5,
    })),
    ...COMPARE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/compare/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
