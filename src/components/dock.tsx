import { DOCK_APPS } from "@/constants/dock.constants";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindow from "@/store/window";
import type { DockAppType } from "@/types/dock";

function Dock() {
  const { openWindow, closeWindow, focusWindow, windows } = useWindow();
  const dockRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const icons = dock.querySelectorAll<HTMLButtonElement>(".dock-icon");

    const quickTos = new Map<
      HTMLButtonElement,
      { scaleTo: (value: number) => void; yTo: (value: number) => void }
    >();
    icons.forEach((icon) => {
      const scaleXTo = gsap.quickTo(icon, "scaleX", {
        duration: 0.25,
        ease: "power1.out",
      });
      const scaleYTo = gsap.quickTo(icon, "scaleY", {
        duration: 0.25,
        ease: "power1.out",
      });
      quickTos.set(icon, {
        scaleTo: (value: number) => {
          scaleXTo(value);
          scaleYTo(value);
        },
        yTo: gsap.quickTo(icon, "y", {
          duration: 0.25,
          ease: "power1.out",
        }),
      });
    });

    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);

        const intensity = Math.exp(-(distance ** 2) / 2000);
        const qt = quickTos.get(icon);
        if (!qt) return;
        qt.scaleTo(1 + 0.25 * intensity);
        qt.yTo(-15 * intensity);
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect();
      const mouseX = e.clientX - left;
      animateIcons(mouseX);
    };

    const resetIcons = () => {
      icons.forEach((icon) => {
        const qt = quickTos.get(icon);
        if (!qt) return;
        qt.scaleTo(1);
        qt.yTo(0);
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (app: DockAppType) => {
    if (!app.canOpen) return;
    if (app.id === "trash") return;
    const window = windows[app.id];

    if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {DOCK_APPS.map((app) => (
          <div key={app.id} className="relative flex justify-center">
            <button
              className="dock-icon"
              type="button"
              aria-label={app.name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={app.name}
              data-tooltip-delay-show={150}
              disabled={!app.canOpen}
              onClick={() => toggleApp(app)}
            >
              <img
                src={`/images/${app.icon}`}
                alt={app.name}
                loading="lazy"
                className={`${!app.canOpen ? "grayscale" : ""}`}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" className="tooltip" place="top" />
      </div>
    </section>
  );
}

export default Dock;
