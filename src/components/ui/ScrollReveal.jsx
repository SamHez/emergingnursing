"use client";

import { useReveal } from "../../hooks/useReveal";

export default function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  style,
}) {
  const { ref, isVisible } = useReveal();

  return (
    <Tag
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      className={`transform-gpu transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
