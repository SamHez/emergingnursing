"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company, navigation } from "../../data/site";
import Button from "../ui/Button";

function MenuIcon({ open, dark = false }) {
  const tone = dark ? "bg-ink" : "bg-white";

  return (
    <span className="relative flex h-5 w-5 items-center justify-center">
      <span
        className={`absolute h-0.5 w-5 rounded-full ${tone} transition-all duration-300 ${
          open ? "rotate-45" : "-translate-y-1.5"
        }`}
      />
      <span
        className={`absolute h-0.5 w-5 rounded-full ${tone} transition-all duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-0.5 w-5 rounded-full ${tone} transition-all duration-300 ${
          open ? "-rotate-45" : "translate-y-1.5"
        }`}
      />
    </span>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7.5h16v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z" />
      <path d="m5 8 7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M12 20s5-3.5 5-8.5a5 5 0 1 0-10 0C7 16.5 12 20 12 20Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="1.75" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M6.8 4h2.4a1 1 0 0 1 1 .82l.42 2.5a1 1 0 0 1-.29.88L8.8 9.74a13 13 0 0 0 5.46 5.46l1.54-1.53a1 1 0 0 1 .88-.29l2.5.42a1 1 0 0 1 .82 1v2.4a1 1 0 0 1-.95 1A15.5 15.5 0 0 1 5.8 4.95 1 1 0 0 1 6.8 4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactIcon({ children }) {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
      {children}
    </span>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 72);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile drawer is open
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navWrapClassName = isHome ? "pointer-events-none absolute inset-x-0 top-full z-20" : "mt-3";
  const navInnerClassName = isHome ? "pointer-events-auto pt-4" : "pt-0";
  const desktopLinkTone = "text-ink/74 hover:bg-white/70 hover:text-[#015451]";
  const desktopActiveTone = "bg-white text-[#015451] shadow-soft";
  const topNavLinkTone = desktopLinkTone;
  const topNavActiveTone = desktopActiveTone;
  const topPhoneTone = "text-white";
  const topLogoSrc = isHome ? "/assets/brand/logo-white.png" : "/assets/brand/logo-white.png";
  const topPanelClassName = isHome
    ? "border-white/22 bg-white/8 shadow-glass backdrop-blur-md"
    : "border-white/20 bg-white/10 shadow-glass backdrop-blur-md";
  const topNavTone = "border-white/55 bg-[#E3F4EF]/85 shadow-[0_10px_26px_rgba(255,255,255,0.12)]";
  const stickyPanelClassName =
    "border-[#d6e4e3] bg-white shadow-[0_18px_44px_rgba(11,45,54,0.14)] ";
  const stickyNavTone = "border-[#d6e4e3] bg-[#F3FBF9]";

  function renderNav({
    panelClassName,
    logoSrc,
    linkTone,
    activeTone,
    phoneTone,
    navTone,
    menuDark,
  }) {
    return (
      <div className={`rounded-[2rem] border transition-all duration-500 ease-out ${panelClassName}`}>
        <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src={logoSrc}
              alt={company.shortName}
              width={220}
              height={80}
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <nav className={`hidden items-center gap-1 rounded-full border px-2 py-2 lg:flex ${navTone}`}>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  pathname === item.href ? activeTone : linkTone
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={company.phoneHref}
              className={`inline-flex items-center gap-2 text-sm font-semibold ${phoneTone}`}
            >
              <PhoneIcon />
              <span>{company.phone}</span>
            </a>
            <Button to="/referrals" size="sm">
              Make a Referral
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border lg:hidden ${
              menuDark
                ? "border-[#d6e4e3] bg-white text-ink"
                : "border-white/20 bg-white/10 text-white"
            }`}
          >
            <MenuIcon open={isOpen} dark={menuDark} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="relative z-[70]">
        <div className="bg-[#015451] text-white">
          <div className="site-container flex min-h-10 flex-col justify-center gap-2 py-2 text-[11px] font-medium sm:min-h-12 sm:flex-row sm:items-center sm:justify-between sm:py-0 sm:text-xs">
            <p className="tracking-[0.18em] text-white/92">
              Registered NDIS Provider in Western Australia
            </p>
            <div className="hidden sm:flex flex-wrap items-center gap-x-5 gap-y-2 text-white/88">
              <a href={company.emailHref} className="inline-flex items-center gap-2 hover:text-white">
                <ContactIcon>
                  <MailIcon />
                </ContactIcon>
                <span>{company.email}</span>
              </a>
              <span className="inline-flex items-center gap-2">
                <ContactIcon>
                  <MapPinIcon />
                </ContactIcon>
                <span>{company.topBarLocation}</span>
              </span>
            </div>
          </div>
        </div>

        <div className={navWrapClassName}>
          <div className={`site-container ${navInnerClassName}`}>
            {renderNav({
              panelClassName: topPanelClassName,
              logoSrc: topLogoSrc,
              linkTone: topNavLinkTone,
              activeTone: topNavActiveTone,
              phoneTone: topPhoneTone,
              navTone: topNavTone,
              menuDark: !isHome,
            })}

          </div>
        </div>
      </header>

      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-[85] transition-all duration-500 ease-out ${
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
        aria-hidden={!isScrolled}
      >
        <div className="site-container pt-3">
          <div className="pointer-events-auto">
            {renderNav({
              panelClassName: stickyPanelClassName,
              logoSrc: "/assets/brand/logo.png",
              linkTone: desktopLinkTone,
              activeTone: desktopActiveTone,
              phoneTone: "text-[#015451]",
              navTone: stickyNavTone,
              menuDark: true,
            })}
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-[95] sm:hidden pointer-events-none`} aria-hidden={!isOpen}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <aside
          className={`fixed left-0 top-0 bottom-0 z-[96] w-80 transform-gpu bg-[#013B39] p-4 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
          }`}
          role="dialog"
          aria-modal={isOpen}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
              <Image
                src="/assets/brand/logo-white.png"
                alt={company.shortName}
                width={180}
                height={60}
                className="h-9 w-auto"
              />
            </Link>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <nav className="mt-6 flex h-[calc(80%-220px)] flex-col gap-3 overflow-auto text-white">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                  pathname === item.href ? "bg-[#015451] text-white" : "text-white/90"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-4 rounded-[1rem] bg-[#015451] px-4 py-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/88">Contact</p>
            <a href={company.phoneHref} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white">
              <PhoneIcon />
              <span>{company.phone}</span>
            </a>
            <a href={company.emailHref} className="mt-2 inline-flex items-center gap-2 text-sm text-white/82">
              <MailIcon />
              <span>{company.email}</span>
            </a>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/82">
              <MapPinIcon />
              <span>{company.topBarLocation}</span>
            </p>
            <div className="mt-4">
              <Button to="/referrals" variant="secondary" className="w-full justify-center">
                Make a Referral
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
