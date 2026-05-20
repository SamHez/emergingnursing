import Button from "../src/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="site-container">
        <div className="rounded-[2rem] border border-sand bg-[#FBF6ED] px-8 py-12 text-center shadow-soft sm:px-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
            Page Not Found
          </p>
          <h1 className="mt-5 text-balance text-3xl font-display font-semibold leading-tight text-ink sm:text-4xl">
            The page you&apos;re looking for isn&apos;t available.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-ink/68">
            The current public website routes remain focused on NDIS services, referrals,
            careers, staff training, and contact support.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button to="/" size="lg">
              Back to Home
            </Button>
            <Button to="/contact" variant="ghost" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
