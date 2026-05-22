import "../src/index.css";
import Script from "next/script";
import SiteLayout from "../src/components/layout/SiteLayout";
import JsonLd from "../src/components/seo/JsonLd";
import {
  isProductionIndexable,
  siteConfig,
} from "../src/lib/metadata";
import { createGlobalStructuredData } from "../src/lib/structuredData";

const globalStructuredData = createGlobalStructuredData();
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
    index: isProductionIndexable,
    follow: isProductionIndexable,
    googleBot: {
      index: isProductionIndexable,
      follow: isProductionIndexable,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YKDLHJ6MJD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YKDLHJ6MJD');
          `}
        </Script>
      </head>
      <body>
        <JsonLd id="global-structured-data" data={globalStructuredData} />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
