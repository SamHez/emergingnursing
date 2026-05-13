import { metrics } from "../../data/site";
import Reveal from "../ui/Reveal";

export default function MetricsSection() {
  return (
    <section className="site-container mt-6">
      <Reveal className="rounded-[2.5rem] border border-white/50 bg-white/70 px-6 py-8 shadow-soft sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
              Built for trust
            </p>
            <h2 className="mt-3 text-3xl font-display font-semibold leading-tight text-ink">
              A polished care presence grounded in clarity, capability, and local delivery.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.75rem] border border-sand bg-cream/70 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <p className="text-3xl font-extrabold text-teal-700">{metric.value}</p>
                <p className="mt-3 text-sm font-semibold text-ink">{metric.label}</p>
                <p className="mt-2 text-sm leading-6 text-ink/62">{metric.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
