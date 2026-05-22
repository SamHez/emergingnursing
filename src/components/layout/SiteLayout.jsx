"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import RouteLoader from "./RouteLoader";

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="page-shell">
      <a
        href="#main-content"
        className="sr-only absolute left-4 top-4 z-[120] rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft focus:not-sr-only focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-teal-700"
      >
        Skip to main content
      </a>
      <RouteLoader />
      {!isHome ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-hero-radial opacity-90" />
          <div className="pointer-events-none absolute left-[-12rem] top-24 -z-10 h-72 w-72 rounded-full bg-sky-300/15" />
          <div className="pointer-events-none absolute right-[-10rem] top-[24rem] -z-10 h-80 w-80 rounded-full bg-mint-300/20" />
        </>
      ) : null}
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
