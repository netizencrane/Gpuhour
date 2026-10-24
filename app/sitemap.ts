import type { MetadataRoute } from "next";
import {
  COMPARE_SLUGS,
  GPU_SLUGS,
  PROVIDER_SLUGS,
  SITE_URL,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-24T12:00:00Z");
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
      priority: path === "" ? 1 : 0.6,
    })),
    ...Object.keys(GPU_SLUGS).map((slug) => ({
      url: `${SITE_URL}/gpu/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...PROVIDER_SLUGS.map((slug) => ({
      url: `${SITE_URL}/provider/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...COMPARE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/compare/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
  ];
}
