import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RouteLoader from "./RouteLoader";

export default function SiteLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="page-shell">
      <RouteLoader />
      {!isHome ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-hero-radial opacity-90" />
          <div className="pointer-events-none absolute left-[-12rem] top-24 -z-10 h-72 w-72 rounded-full bg-sky-300/15" />
          <div className="pointer-events-none absolute right-[-10rem] top-[24rem] -z-10 h-80 w-80 rounded-full bg-mint-300/20" />
        </>
      ) : null}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
