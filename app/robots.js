import { isProductionIndexable, siteConfig } from "../src/lib/metadata";

export default function robots() {
  if (!isProductionIndexable) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
      host: siteConfig.siteUrl,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
