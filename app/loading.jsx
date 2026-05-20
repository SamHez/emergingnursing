export default function Loading() {
  return (
    <div className="site-container py-24 sm:py-28">
      <div className="rounded-[2rem] border border-white/45 bg-white/72 px-8 py-12 shadow-soft">
        <div className="h-1 w-full overflow-hidden rounded-full bg-sand/80">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-[linear-gradient(90deg,#18B8B0_0%,#74DED8_50%,#C8EAFE_100%)]" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
          Loading page content
        </p>
        <p className="mt-3 text-sm leading-7 text-ink/66">
          Preparing the next section of the Emerging Nursing website.
        </p>
      </div>
    </div>
  );
}
