import { siteConfig } from "../src/lib/metadata";

const routes = [
  "",
  "/about",
  "/services",
  "/referrals",
  "/careers",
  "/staff-training",
  "/contact",
];

export default function sitemap() {
  const now = new Date();

  return routes.map((route) => ({
    url: route ? `${siteConfig.siteUrl}${route}` : siteConfig.siteUrl,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
