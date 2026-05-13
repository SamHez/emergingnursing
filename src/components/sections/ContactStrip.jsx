import { company } from "../../data/site";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

export default function ContactStrip() {
  return (
    <section className="site-container pb-24">
      <Reveal className="overflow-hidden rounded-[2.5rem] border border-white/50 bg-[#0A2E37] p-8 text-white shadow-soft sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-teal-200">
              Ready for the next phase
            </p>
            <h2 className="max-w-3xl text-balance text-3xl font-display font-semibold leading-tight sm:text-4xl">
              The site shell is ready to expand into detailed service content, referral workflows, and conversion-focused contact touchpoints.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-white/72">
              For this phase, core routing, brand styling, motion, and shared sections are in place. Users
              can already reach {company.phone} or {company.email} from every page.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button to="/contact" size="lg">
              Contact Us
            </Button>
            <Button to="/referrals" variant="secondary" size="lg">
              Refer a Participant
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
