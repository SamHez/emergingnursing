import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { company, navigation } from "../../data/site";
import Button from "../ui/Button";

function MenuIcon({ open }) {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center">
      <span
        className={`absolute h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
          open ? "rotate-45" : "-translate-y-1.5"
        }`}
      />
      <span
        className={`absolute h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
          open ? "-rotate-45" : "translate-y-1.5"
        }`}
      />
    </span>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shellClassName = isHome
    ? "absolute inset-x-0 top-0 z-50"
    : "sticky top-0 z-50";

  const panelClassName =
    isScrolled || !isHome
      ? "border-white/55 bg-white/88 shadow-soft backdrop-blur-xl"
      : "border-white/22 bg-white/78 shadow-glass backdrop-blur-xl";

  return (
    <header className={shellClassName}>
      <div className="bg-teal-800 text-white">
        <div className="site-container flex min-h-10 flex-col justify-center gap-1 py-2 text-[11px] font-medium sm:min-h-12 sm:flex-row sm:items-center sm:justify-between sm:py-0 sm:text-xs">
          <p className="tracking-[0.18em] text-white/92">
            Registered NDIS Provider in Western Australia
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/82">
            <a href={company.phoneHref} className="hover:text-white">
              {company.phone}
            </a>
            <a href={company.emailHref} className="hover:text-white">
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <div className="site-container pt-3 sm:pt-4">
        <div className={`rounded-[2rem] border transition-all duration-300 ${panelClassName}`}>
          <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-6">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <img
                src="/assets/brand/logo.png"
                alt={company.shortName}
                className="h-11 w-auto sm:h-12"
              />
            </Link>

            <nav className="hidden items-center gap-1 rounded-full border border-white/55 bg-[#E3F4EF]/85 px-2 py-2 lg:flex">
              {navigation.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-white text-teal-800 shadow-soft"
                        : "text-ink/74 hover:bg-white/70 hover:text-teal-800"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Button to="/referrals" size="sm">
                Make a Referral
              </Button>
            </div>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((current) => !current)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/45 bg-white/80 backdrop-blur-xl lg:hidden"
            >
              <MenuIcon open={isOpen} />
            </button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              isOpen ? "max-h-[34rem] pb-4" : "max-h-0"
            }`}
          >
            <div className="mx-4 rounded-[1.75rem] border border-white/55 bg-white/88 p-4 backdrop-blur-xl">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? "bg-teal-700 text-white"
                          : "text-ink/78 hover:bg-teal-50 hover:text-teal-800"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-4 grid gap-3 rounded-[1.5rem] bg-teal-900 px-4 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">
                  Contact
                </p>
                <a href={company.phoneHref} className="text-sm font-semibold">
                  {company.phone}
                </a>
                <a href={company.emailHref} className="text-sm text-white/78">
                  {company.email}
                </a>
                <Button to="/referrals" variant="secondary" className="w-full justify-center">
                  Make a Referral
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
