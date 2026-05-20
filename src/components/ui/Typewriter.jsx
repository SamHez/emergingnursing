"use client";

import { useEffect, useState, useRef } from "react";

export default function Typewriter({ words = [], speed = 70, pause = 900, className = "" }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const [display, setDisplay] = useState("");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const current = words[index];

    if (forward) {
      if (subIndex <= current.length) {
        const t = setTimeout(() => {
          if (!mounted.current) return;
          setDisplay(current.slice(0, subIndex));
          setSubIndex((s) => s + 1);
        }, speed);
        return () => clearTimeout(t);
      }

      const t = setTimeout(() => {
        if (!mounted.current) return;
        setForward(false);
      }, pause);
      return () => clearTimeout(t);
    }

    if (!forward) {
      if (subIndex > 0) {
        const t = setTimeout(() => {
          if (!mounted.current) return;
          setDisplay(current.slice(0, subIndex - 1));
          setSubIndex((s) => s - 1);
        }, speed / 2);
        return () => clearTimeout(t);
      }

      const t = setTimeout(() => {
        if (!mounted.current) return;
        setForward(true);
        setIndex((i) => (i + 1) % words.length);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [words, index, subIndex, forward, speed, pause]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{display}</span>
      <span className="ml-1 animate-type-caret">|</span>
    </span>
  );
}
