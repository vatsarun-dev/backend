import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapReveal(selector = "[data-reveal], .page-header, .stats-grid > *, .dashboard-grid > *, .panel, .table-shell, .class-tabs, .search-bar, .student-form") {
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
      clearProps: "opacity,visibility,transform",
    });
    }, scope);
    return () => ctx.revert();
  }, [selector]);

  return scope;
}
