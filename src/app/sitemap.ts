import type { MetadataRoute } from "next";
import { getDatabase } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gabrieladourado.com.br";
  const db = await getDatabase();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/golden-essence`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/procedimentos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/the-beauty-edit`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const procedureRoutes: MetadataRoute.Sitemap = db.procedures
    .filter((p) => p.published)
    .map((p) => ({
      url: `${baseUrl}/procedimentos/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    }));

  const articleRoutes: MetadataRoute.Sitemap = db.articles
    .filter((a) => a.status === "published")
    .map((a) => ({
      url: `${baseUrl}/the-beauty-edit/${a.slug}`,
      lastModified: new Date(a.updatedAt || a.publishedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...procedureRoutes, ...articleRoutes];
}
