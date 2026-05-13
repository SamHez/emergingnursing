import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-teal-600 text-white shadow-soft hover:bg-teal-700 focus-visible:outline-teal-700",
  secondary:
    "bg-white text-ink shadow-soft hover:bg-cream focus-visible:outline-ink",
  ghost:
    "border border-teal-200 bg-white/70 text-teal-800 hover:border-teal-300 hover:bg-white focus-visible:outline-teal-700",
  ghostDark:
    "border border-white/15 bg-white/10 text-white hover:bg-white/16 focus-visible:outline-white",
};

const sizes = {
  sm: "h-11 px-5 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-7 text-base",
};

function classes({ variant, size, className }) {
  return [
    "inline-flex items-center gap-2 rounded-full font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const sharedClassName = classes({ variant, size, className });

  if (to) {
    return (
      <Link to={to} className={sharedClassName} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={sharedClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={sharedClassName} {...props}>
      {children}
    </button>
  );
}
