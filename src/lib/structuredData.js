import { company } from "../data/site";
import { createAbsoluteUrl, siteConfig } from "./metadata";

const ORGANIZATION_ID = `${siteConfig.siteUrl}/#organization`;
const WEBSITE_ID = `${siteConfig.siteUrl}/#website`;
const MEDICAL_BUSINESS_ID = `${siteConfig.siteUrl}/#medical-business`;

const areaServed = company.contactLocations.map((location) => ({
  "@type": "AdministrativeArea",
  name: location,
}));

export function createGlobalStructuredData() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Emerging Nursing and Disability Services",
      alternateName: company.shortName,
      url: siteConfig.siteUrl,
      logo: createAbsoluteUrl("/assets/brand/logo.png"),
      image: createAbsoluteUrl(siteConfig.defaultImage),
      description:
        "Registered NDIS provider in Western Australia delivering nursing, disability, community access, and complex care support.",
      email: company.email,
      telephone: company.phone,
      areaServed,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: company.phone,
          email: company.email,
          areaServed: "AU-WA",
          availableLanguage: "en-AU",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "@id": MEDICAL_BUSINESS_ID,
      name: "Emerging Nursing and Disability Services",
      url: siteConfig.siteUrl,
      image: createAbsoluteUrl(siteConfig.defaultImage),
      telephone: company.phone,
      email: company.email,
      areaServed,
      openingHours: "Mo-Su 08:00-22:00",
      parentOrganization: {
        "@id": ORGANIZATION_ID,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: siteConfig.siteUrl,
      name: siteConfig.fullName,
      inLanguage: "en-AU",
      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },
  ];
}

export function createBreadcrumbStructuredData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: createAbsoluteUrl(item.path),
    })),
  };
}
