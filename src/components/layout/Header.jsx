"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company, navigation } from "../../data/site";
import Button from "../ui/Button";
import AppIcon from "../ui/AppIcon";

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

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
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
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            aria-label="Emerging Nursing home"
          >
            <Image
              src={logoSrc}
              alt={company.shortName}
              width={220}
              height={80}
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className={`hidden items-center gap-1 rounded-full border px-2 py-2 lg:flex ${navTone}`}
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
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
              <AppIcon name="phone" className="h-4 w-4" strokeWidth={1.8} />
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
            aria-controls="mobile-navigation"
            aria-haspopup="dialog"
            onClick={() => setIsOpen((current) => !current)}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border lg:hidden ${
              menuDark
                ? "border-[#d6e4e3] bg-white text-ink"
                : "border-white/20 bg-white/10 text-white"
            }`}
          >
            <AppIcon
              name={isOpen ? "x" : "menu"}
              className="h-5 w-5"
              strokeWidth={2}
            />
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
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 tracking-[0.18em] text-white/92">
              <span>Registered</span>
              <Image
                src="/assets/brand/ndis-logo.svg"
                alt="NDIS"
                width={84}
                height={24}
                className="h-4 w-auto shrink-0 sm:h-[1.1rem]"
              />
              <span>Provider in Western Australia</span>
            </p>
            <div className="hidden sm:flex flex-wrap items-center gap-x-5 gap-y-2 text-white/88">
              <a href={company.emailHref} className="inline-flex items-center gap-2 hover:text-white">
                <ContactIcon>
                  <AppIcon name="mail" className="h-4 w-4" strokeWidth={1.8} />
                </ContactIcon>
                <span>{company.email}</span>
              </a>
              <span className="inline-flex items-center gap-2">
                <ContactIcon>
                  <AppIcon name="mapPin" className="h-4 w-4" strokeWidth={1.8} />
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
          id="mobile-navigation"
          className={`fixed left-0 top-0 bottom-0 z-[96] w-80 transform-gpu bg-[#013B39] p-4 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
          }`}
          role="dialog"
          aria-modal={isOpen}
          aria-label="Mobile navigation"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3"
              aria-label="Emerging Nursing home"
            >
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
              <AppIcon name="x" className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <nav
            aria-label="Primary navigation"
            className="mt-6 flex h-[calc(80%-220px)] flex-col gap-3 overflow-auto text-white"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
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
              <AppIcon name="phone" className="h-4 w-4" strokeWidth={1.8} />
              <span>{company.phone}</span>
            </a>
            <a href={company.emailHref} className="mt-2 inline-flex items-center gap-2 text-sm text-white/82">
              <AppIcon name="mail" className="h-4 w-4" strokeWidth={1.8} />
              <span>{company.email}</span>
            </a>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/82">
              <AppIcon name="mapPin" className="h-4 w-4" strokeWidth={1.8} />
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
