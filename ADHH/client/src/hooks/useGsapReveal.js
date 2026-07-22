import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapReveal(selector = "[data-reveal]") {
  const scope = useRef(null);

  useEffect(() => {
    if (!scope.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        opacity: 0,
        y: 18,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.06,
      });
    }, scope);
    return () => ctx.revert();
  }, [selector]);

  return scope;
}
