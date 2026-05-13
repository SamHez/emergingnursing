import { Link } from "react-router-dom";
import { company, homeServices, navigation } from "../../data/site";
import Button from "../ui/Button";

export default function Footer() {
  const footerServices = homeServices.map((item) => item.title);

  return (
    <footer className=" bg-[#015451] text-white">
      <div className="site-container py-16 lg:py-20">
        <div className="flex flex-col gap-5 border-b border-white/14 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-200">
              Emerging Nursing, Every Step
            </p>
            <p className="mt-2 text-lg text-white/84">
              Registered NDIS Provider in Western Australia
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/referrals">Make a Referral</Button>
            <Button to="/contact" variant="ghostDark">
              Contact Us
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-10 rounded-[2.2rem] border border-white/12 bg-white/[0.08] p-8 shadow-soft lg:grid-cols-[1.2fr_0.78fr_0.9fr_0.82fr] lg:p-11">
          <div className="space-y-6">
            <img
              src="/assets/brand/logo.png"
              alt={company.shortName}
              className="h-16 w-auto rounded-[1.35rem] bg-white px-4 py-3"
            />
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-200">Person-Centred Care</p>
              <p className="max-w-lg text-sm leading-8 text-white/78">
                Emerging Nursing and Disability Services supports people through the NDIS with
                empathy, accountability, and practical care shaped around autonomy and choice.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={company.phoneHref}>Call Our Team</Button>
              <Button href={company.emailHref} variant="ghostDark">Email Us</Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
              Quick Links
            </p>
            <div className="mt-4 grid gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-white/78 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/staff-training" className="text-sm text-white/78 hover:text-white">
                Staff Training
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
              Services
            </p>
            <div className="mt-4 grid gap-3">
              {footerServices.map((item) => (
                <p key={item} className="text-sm leading-8 text-white/78">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
                Contact
              </p>
              <div className="mt-4 space-y-4 text-sm leading-8 text-white/78">
                <p>{company.registration}</p>
                <a href={company.phoneHref} className="block hover:text-white">
                  {company.phone}
                </a>
                <a href={company.emailHref} className="block hover:text-white">
                  {company.email}
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
                Locations
              </p>
              <div className="mt-4 space-y-4 text-sm leading-8 text-white/78">
                {company.locations.map((location) => (
                  <p key={location}>{location}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 px-1 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {company.name}. All rights reserved.</p>
          <p>Built for trusted, accessible NDIS care presentation.</p>
        </div>
      </div>
    </footer>
  );
}
