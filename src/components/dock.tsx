import { DOCK_APPS } from "@/constants/dock.constants";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const icons = dock.querySelectorAll<HTMLButtonElement>(".dock-icon");

    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);

        const intencity = Math.exp(-(distance ** 2) / 2000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intencity,
          y: -15 * intencity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect();
      const mouseX = e.clientX - left;
      animateIcons(mouseX);
    };

    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power1.out" }),
      );
    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = ({ id, canOpen }: { id: string; canOpen: boolean }) => {
    console.log(id, canOpen);
    // TODO: Implement the logic to open window
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
              onClick={() => toggleApp({ id: app.id, canOpen: app.canOpen })}
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
