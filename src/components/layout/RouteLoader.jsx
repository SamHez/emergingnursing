import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function RouteLoader() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeoutA;
    let timeoutB;
    let timeoutC;
    let timeoutD;

    setVisible(true);
    setProgress(16);

    timeoutA = window.setTimeout(() => setProgress(48), 50);
    timeoutB = window.setTimeout(() => setProgress(76), 140);
    timeoutC = window.setTimeout(() => setProgress(100), 260);
    timeoutD = window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 430);

    return () => {
      window.clearTimeout(timeoutA);
      window.clearTimeout(timeoutB);
      window.clearTimeout(timeoutC);
      window.clearTimeout(timeoutD);
    };
  }, [location.pathname]);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div
        className="h-full bg-[linear-gradient(90deg,#18B8B0_0%,#74DED8_50%,#C8EAFE_100%)] shadow-[0_0_18px_rgba(24,184,176,0.5)] transition-[width] duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
