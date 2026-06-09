const CANONICAL_SITE_URL = "https://emergingnursing.com";

function normalizeSiteUrl(url) {
  if (!url) {
    return "";
  }

  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  siteName: "Emerging Nursing",
  fullName: "Emerging Nursing and Disability Services",
  siteUrl: CANONICAL_SITE_URL,
  configuredSiteUrl:
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) || CANONICAL_SITE_URL,
  defaultImage: "/assets/media/hero-home-services.jpg",
  locale: "en_AU",
};

export const isProductionIndexable =
  (process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_FORCE_INDEX === "true") &&
  siteConfig.configuredSiteUrl === siteConfig.siteUrl;

export function createAbsoluteUrl(path = "/") {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");

  return normalizedPath === "/"
    ? siteConfig.siteUrl
    : `${siteConfig.siteUrl}${normalizedPath}`;
}

export function createPageMetadata(path, { title, description }) {
  const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "");
  const url = createAbsoluteUrl(canonicalPath);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.siteName,
      type: "website",
      locale: siteConfig.locale,
      images: [
        {
          url: siteConfig.defaultImage,
          width: 1200,
          height: 630,
          alt: siteConfig.fullName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.defaultImage],
    },
    robots: {
      index: isProductionIndexable,
      follow: isProductionIndexable,
      googleBot: {
        index: isProductionIndexable,
        follow: isProductionIndexable,
      },
    },
  };
}
