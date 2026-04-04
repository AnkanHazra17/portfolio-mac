import React, { useLayoutEffect, useRef } from "react";
import type { WindowKeyType } from "@/types/window";
import useWindow from "@/store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";

function elementTypeLabel(type: React.ElementType): string {
  if (typeof type === "string") return type;
  if (typeof type === "function") {
    return type.displayName ?? type.name ?? "Component";
  }
  if (typeof type === "object" && type !== null) {
    const o = type as { displayName?: string; name?: string };
    return o.displayName ?? o.name ?? "Component";
  }
  return "Component";
}

function WindowWrapper<T extends React.ElementType>({
  component: Component,
  windowKey,
}: {
  component: T;
  windowKey: WindowKeyType;
}) {
  const Wrapped = (props: React.ComponentProps<T>) => {
    const focusWindow = useWindow((s) => s.focusWindow);
    const isOpen = useWindow((s) => s.windows[windowKey].isOpen);
    const zIndex = useWindow((s) => s.windows[windowKey].zIndex);
    const outerRef = useRef<HTMLElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
      const inner = innerRef.current;
      const outer = outerRef.current;
      if (!inner || !outer || !isOpen) return;

      outer.style.display = "block";

      gsap.fromTo(
        outer,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }, [isOpen]);

    useLayoutEffect(() => {
      const el = outerRef.current;
      if (!el || !isOpen) return;

      const [instance] = Draggable.create(el, {
        type: "x,y",
        onPress: () => focusWindow(windowKey),
      });

      return () => {
        instance.kill();
      };
    }, [isOpen, focusWindow, windowKey]);

    useLayoutEffect(() => {
      const el = outerRef.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section id={windowKey} ref={outerRef} style={{ zIndex }} className="absolute">
        <div ref={innerRef}>
          <Component {...props} />
        </div>
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${elementTypeLabel(Component)})`;

  return Wrapped;
}

export default WindowWrapper;
