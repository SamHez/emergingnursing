export default function Badge({ children, tone = "default" }) {
  const toneMap = {
    default: "bg-white/80 text-teal-800",
    teal: "bg-teal-600 text-white",
    dark: "bg-ink text-white",
    mint: "bg-mint-100 text-mint-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${toneMap[tone]}`}
    >
      {children}
    </span>
  );
}
