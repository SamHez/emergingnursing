import "../src/index.css";
import SiteLayout from "../src/components/layout/SiteLayout";
import { siteConfig } from "../src/lib/metadata";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "Emerging Nursing and Disability Services",
  description:
    "Emerging Nursing and Disability Services is a registered NDIS provider in Western Australia delivering person-centred nursing, disability, and complex care support.",
  applicationName: siteConfig.siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Emerging Nursing and Disability Services",
    description:
      "Registered NDIS provider in Western Australia offering nursing, disability, community access, and complex care support.",
    url: siteConfig.siteUrl,
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
    title: "Emerging Nursing and Disability Services",
    description:
      "Registered NDIS provider in Western Australia offering nursing, disability, community access, and complex care support.",
    images: [siteConfig.defaultImage],
  },
  icons: {
    icon: "/assets/brand/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
