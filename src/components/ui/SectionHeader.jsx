import Badge from "./Badge";

export default function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  tone = "light",
  className = "",
  headingId,
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const headingTone = tone === "dark" ? "text-white" : "text-ink";
  const bodyTone = tone === "dark" ? "text-white/72" : "text-ink/68";

  return (
    <div className={`max-w-3xl space-y-5 ${alignment} ${className}`}>
      {badge ? <Badge>{badge}</Badge> : null}
      <div className="space-y-4">
        <h2
          id={headingId}
          className={`text-balance text-3xl font-display font-semibold leading-tight sm:text-4xl lg:text-[2.5rem] ${headingTone}`}
          style={{lineHeight: '40px'}}
        >
          {title}
        </h2>
        {description ? (
          <p className={`text-balance text-base leading-8 sm:text-lg  ${bodyTone}`}>{description}</p>
        ) : null}
      </div>
    </div>
  );
}
