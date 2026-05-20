import Image from "next/image";
import ScrollReveal from "../ui/ScrollReveal";

export default function FeaturePageHero({
  chips = [],
  title,
  description,
  note,
  image,
  actions,
}) {
  return (
    <section className="relative -mt-[6.1rem] overflow-hidden bg-[#082F39] pt-[7.8rem] sm:-mt-[6.4rem] sm:pt-[8.1rem]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,34,40,0.48)_0%,rgba(7,43,50,0.68)_46%,rgba(7,50,59,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,34,40,0.78)_0%,rgba(6,34,40,0.52)_42%,rgba(6,34,40,0.62)_100%)]" />

      <div className="site-container relative flex min-h-[20rem] items-end pb-8 sm:min-h-[22rem] sm:pb-10 lg:min-h-[24rem] lg:pb-12">
        <div className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <ScrollReveal className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {chips.map((chip, index) => (
                <span
                  key={chip}
                  className={`inline-flex rounded-full px-5 py-2 text-sm font-semibold ${
                    index === 0 ? "bg-[#0C7380] text-white" : "bg-white text-ink"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="max-w-4xl space-y-4">
              <h1 className="max-w-4xl text-balance text-[2rem] font-display font-semibold leading-[1.02] text-white sm:text-[2.45rem] lg:text-[2.95rem]">
                {title}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white sm:text-base">{description}</p>
            </div>

            {actions ? <div className="flex flex-col gap-4 sm:flex-row">{actions}</div> : null}
          </ScrollReveal>

          {note ? (
            <ScrollReveal delay={120} className="hidden lg:block lg:justify-self-end">
              <p className="max-w-xl text-sm leading-7 text-white sm:text-base lg:text-right">
                {note}
              </p>
            </ScrollReveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
