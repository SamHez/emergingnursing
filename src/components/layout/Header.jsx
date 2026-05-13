import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
  const [isPinned, setIsPinned] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const topBarRef = useRef(null);
  const navPanelRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const measure = () => {
      setTopBarHeight(topBarRef.current?.offsetHeight ?? 0);
      setNavHeight(navPanelRef.current?.offsetHeight ?? 0);
    };

    measure();
    window.addEventListener("resize", measure);

    let observer;

    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);

      if (topBarRef.current) {
        observer.observe(topBarRef.current);
      }

      if (navPanelRef.current) {
        observer.observe(navPanelRef.current);
      }
    }

    return () => {
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, [isOpen, isScrolled]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
      setIsPinned(window.scrollY >= topBarHeight);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [topBarHeight]);

  const navWrapClassName = isHome && !isPinned ? "mb-[-5.5rem]" : "";
  const panelClassName =
    isScrolled || !isHome
      ? "border-[#d6e4e3] bg-white/96 shadow-soft"
      : "border-white/12 bg-[#0B4746]/92 shadow-glass";
  const logoSrc =
    isHome && !isScrolled ? "/assets/brand/logo-white.png" : "/assets/brand/logo.png";
  const desktopLinkTone = "text-ink/74 hover:bg-white/70 hover:text-[#015451]";
  const desktopActiveTone = "bg-white text-[#015451] shadow-soft";
  const phoneTone = isScrolled || !isHome ? "text-[#015451]" : "text-white";
  const mobilePanelTone =
    isScrolled || !isHome ? "border-[#d6e4e3] bg-white" : "border-white/12 bg-[#0B4746]";
  const navTone = "border-white/55 bg-[#E3F4EF]/85";
  const navPositionClass = isPinned ? "fixed inset-x-0 top-0 z-[70]" : "relative";

  return (
    <>
      <header ref={topBarRef} className="relative z-50">
        <div className="bg-[#015451] text-white">
          <div className="site-container flex min-h-10 flex-col justify-center gap-2 py-2 text-[11px] font-medium sm:min-h-12 sm:flex-row sm:items-center sm:justify-between sm:py-0 sm:text-xs">
            <p className="tracking-[0.18em] text-white/92">
              Registered NDIS Provider in Western Australia
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/88">
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
      </header>

      <div
        className={`relative z-[60] ${navWrapClassName}`}
        style={isPinned && navHeight ? { height: `${navHeight}px` } : undefined}
      >
        <div className={navPositionClass}>
          <div ref={navPanelRef} className="w-full">
            <div className="site-container">
              <div className={`rounded-[2rem] border ${panelClassName}`}>
                <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-6">
                  <Link to="/" className="flex min-w-0 items-center gap-3">
                    <img src={logoSrc} alt={company.shortName} className="h-11 w-auto sm:h-12" />
                  </Link>

                  <nav className={`hidden items-center gap-1 rounded-full border px-2 py-2 lg:flex ${navTone}`}>
                    {navigation.map((item) => (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) =>
                          `rounded-full px-4 py-2 text-sm font-semibold ${
                            isActive ? desktopActiveTone : desktopLinkTone
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </nav>

                  <div className="hidden items-center gap-4 lg:flex">
                    <Button to="/referrals" size="sm">
                      Make a Referral
                    </Button>
                    <a
                      href={company.phoneHref}
                      className={`inline-flex items-center gap-2 text-sm font-semibold ${phoneTone}`}
                    >
                      <PhoneIcon />
                      <span>{company.phone}</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((current) => !current)}
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border lg:hidden ${
                      isScrolled || !isHome
                        ? "border-[#d6e4e3] bg-white text-ink"
                        : "border-white/20 bg-white/10 text-white"
                    }`}
                  >
                    <MenuIcon open={isOpen} dark={isScrolled || !isHome} />
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 lg:hidden ${
                    isOpen ? "max-h-[34rem] pb-4" : "max-h-0"
                  }`}
                >
                  <div className={`mx-4 rounded-[1.75rem] border p-4 ${mobilePanelTone}`}>
                    <nav className="flex flex-col gap-2">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.href}
                          to={item.href}
                          className={({ isActive }) =>
                            `rounded-2xl px-4 py-3 text-sm font-semibold ${
                              isActive
                                ? "bg-[#015451] text-white"
                                : isScrolled || !isHome
                                  ? "text-ink/78 hover:bg-[#f1f7f6] hover:text-[#015451]"
                                  : "text-white/84 hover:bg-white/10 hover:text-white"
                            }`
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </nav>

                    <div className="mt-4 grid gap-3 rounded-[1.5rem] bg-[#015451] px-4 py-4 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">
                        Contact
                      </p>
                      <a
                        href={company.phoneHref}
                        className="inline-flex items-center gap-2 text-sm font-semibold"
                      >
                        <PhoneIcon />
                        <span>{company.phone}</span>
                      </a>
                      <a
                        href={company.emailHref}
                        className="inline-flex items-center gap-2 text-sm text-white/82"
                      >
                        <MailIcon />
                        <span>{company.email}</span>
                      </a>
                      <p className="inline-flex items-center gap-2 text-sm text-white/82">
                        <MapPinIcon />
                        <span>{company.topBarLocation}</span>
                      </p>
                      <Button to="/referrals" variant="secondary" className="w-full justify-center">
                        Make a Referral
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
