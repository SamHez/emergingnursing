import Badge from "../ui/Badge";
import Reveal from "../ui/Reveal";

export default function PageHero({ badge, title, description, aside }) {
  return (
    <section className="site-container pt-12">
      <Reveal className="overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/55 p-8 shadow-soft backdrop-blur-xl sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Badge tone="dark">{badge}</Badge>
            <h1 className="max-w-4xl text-balance text-4xl font-display font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-ink/70">{description}</p>
          </div>

          {aside ? (
            <div className="rounded-[2rem] bg-mesh-gradient p-[1px]">
              <div className="rounded-[calc(2rem-1px)] bg-white/82 p-6 backdrop-blur-xl">{aside}</div>
            </div>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
