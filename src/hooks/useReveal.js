import { useEffect, useRef, useState } from "react";

export function useReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { threshold = 0.16, root = null, rootMargin = "0px 0px -8% 0px" } = options;

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return { ref, isVisible };
}
