export default function Card({ children, className = "", tint = "light" }) {
  const tintMap = {
    light: "border-white/50 bg-white/70",
    teal: "border-teal-200/60 bg-teal-50/80",
    dark: "border-white/10 bg-teal-950/95 text-white",
  };

  return (
    <div
      className={`rounded-[2rem] border p-6 shadow-soft ${tintMap[tint]} ${className}`}
    >
      {children}
    </div>
  );
}
