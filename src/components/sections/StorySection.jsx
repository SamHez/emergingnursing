import { company, highlights } from "../../data/site";
import Card from "../ui/Card";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

export default function StorySection() {
  return (
    <section className="section-pad pt-0">
      <div className="site-container grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="h-full">
          <Card tint="dark" className="relative h-full overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,182,236,0.2),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(116,201,108,0.16),transparent_32%)]" />
            <div className="relative space-y-6">
              <SectionHeader
                badge="Aim, Mission, Vision"
                title="A care story built on empathy, quality, and practical outcomes."
                description="These foundations guide how the broader website should sound, feel, and prioritise participant wellbeing."
                tone="dark"
              />
              <div className="grid gap-4">
                {[
                  { label: "Aim", text: company.aim },
                  { label: "Mission", text: company.mission },
                  { label: "Vision", text: company.vision },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/78">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>

        <div className="grid gap-6">
          <Reveal>
            <Card className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
                Values
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {company.values.map((value, index) => (
                  <span
                    key={value}
                    className={`rounded-full px-5 py-3 text-sm font-semibold ${
                      index % 2 === 0
                        ? "bg-teal-50 text-teal-800"
                        : "bg-sky-50 text-sky-800"
                    }`}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <Reveal key={item.title}>
                <Card className="h-full">
                  <div className="space-y-4">
                    <div className="h-11 w-11 rounded-2xl bg-mesh-gradient" />
                    <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                    <p className="text-sm leading-7 text-ink/68">{item.text}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
