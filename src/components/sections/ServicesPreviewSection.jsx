import { serviceGroups } from "../../data/site";
import Button from "../ui/Button";
import Card from "../ui/Card";
import AppIcon from "../ui/AppIcon";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

export default function ServicesPreviewSection() {
  return (
    <section className="section-pad">
      <div className="site-container space-y-12">
        <Reveal>
          <SectionHeader
            badge="Service Design"
            title="A service mix that covers clinical needs, everyday support, and confident community participation."
            description="The structure below establishes the visual system for the wider site while giving each service area room to expand into dedicated page content."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {serviceGroups.map((group, index) => (
            <Reveal key={group.title} className={index === 0 ? "lg:col-span-2" : ""}>
              <Card className="h-full overflow-hidden p-0">
                <div className="grid h-full gap-0 lg:grid-cols-[0.78fr_1.22fr]">
                  <div className="bg-[#0D3A45] p-7 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
                      {group.eyebrow}
                    </p>
                    <h3 className="mt-4 text-2xl font-display font-semibold leading-tight">
                      {group.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/72">{group.description}</p>
                    <Button
                      to="/services"
                      variant="ghostDark"
                      className="mt-6"
                    >
                      View Services
                      <AppIcon name="chevronRight" className="h-5 w-5" strokeWidth={2} />
                    </Button>
                  </div>

                  <div className="grid gap-3 bg-white/78 p-7 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.5rem] border border-sand bg-cream/70 px-4 py-4 text-sm font-medium leading-6 text-ink/78"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
