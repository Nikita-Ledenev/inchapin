"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Scrollbar from "smooth-scrollbar";
import type { ScrollStatus } from "smooth-scrollbar/interfaces";
import styles from "./SmoothScroll.module.scss";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const CONDENSE_AT = 40;
    const setCondensed = (y: number) => {
      document.documentElement.classList.toggle("is-scrolled", y > CONDENSE_AT);
    };

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) {
      const handleWindowScroll = () => setCondensed(window.scrollY);
      handleWindowScroll();
      window.addEventListener("scroll", handleWindowScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleWindowScroll);
        document.documentElement.classList.remove("is-scrolled");
      };
    }

    viewport.dataset.smoothScroll = "custom";

    const scrollbar = Scrollbar.init(viewport, {
      damping: 0.08,
      renderByPixels: true,
      alwaysShowTracks: false,
    });

    const pinnedElements = new Set(
      viewport.querySelectorAll<HTMLElement>("[data-scroll-fixed]"),
    );
    for (const element of viewport.querySelectorAll<HTMLElement>("*")) {
      if (getComputedStyle(element).position === "fixed") {
        pinnedElements.add(element);
      }
    }

    const pinToViewport = ({ offset }: ScrollStatus) => {
      for (const element of pinnedElements) {
        element.style.transform = `translate3d(0, ${offset.y}px, 0)`;
      }
      setCondensed(offset.y);
    };

    scrollbar.addListener(pinToViewport);

    const handleWindowKeyDown = (event: KeyboardEvent) => {
      if (event.target !== document.body) {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      if (document.body.style.overflow === "hidden") {
        return;
      }

      const pageStep = scrollbar.size.container.height - 40;
      let deltaY: number;

      switch (event.key) {
        case "ArrowDown":
          deltaY = 40;
          break;
        case "ArrowUp":
          deltaY = -40;
          break;
        case "PageDown":
          deltaY = pageStep;
          break;
        case "PageUp":
          deltaY = -pageStep;
          break;
        case " ":
          deltaY = event.shiftKey ? -pageStep : pageStep;
          break;
        case "Home":
          deltaY = -scrollbar.offset.y;
          break;
        case "End":
          deltaY = scrollbar.limit.y - scrollbar.offset.y;
          break;
        default:
          return;
      }

      event.preventDefault();
      scrollbar.addMomentum(0, deltaY);
    };

    window.addEventListener("keydown", handleWindowKeyDown);

    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
      scrollbar.removeListener(pinToViewport);
      scrollbar.destroy();
      for (const element of pinnedElements) {
        element.style.transform = "";
      }
      document.documentElement.classList.remove("is-scrolled");
      viewport.dataset.smoothScroll = "native";
    };
  }, []);

  return (
    <div ref={viewportRef} className={styles.viewport} data-smooth-scroll="native">
      <div className={styles.content}>{children}</div>
    </div>
  );
}
