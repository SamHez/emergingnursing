export const siteConfig = {
  siteName: "Emerging Nursing",
  fullName: "Emerging Nursing and Disability Services",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://emergingnursing.com",
  defaultImage: "/assets/media/hero-home-services.jpg",
};

export function createPageMetadata(path, { title, description }) {
  const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "");
  const url =
    canonicalPath === "/"
      ? siteConfig.siteUrl
      : `${siteConfig.siteUrl}${canonicalPath}`;

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
      locale: "en_AU",
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
  };
}
