"use client";

import AppIcon from "../ui/AppIcon";

export default function ScrollToTopButton() {
  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-white/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      aria-label="Scroll back to top"
    >
      <AppIcon aria-hidden="true" name="arrowUp" className="h-4 w-4" strokeWidth={1.8} />
      Back to Top
    </button>
  );
}
