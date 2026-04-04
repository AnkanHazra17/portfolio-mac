import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (
  text: string,
  className: string,
  baseWeight: number = 400,
) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setUpTextHover = (
  container: React.RefObject<
    HTMLHeadingElement | HTMLParagraphElement | null
  >,
  type: "subtitle" | "title",
) => {
  if (!container || !container.current) return () => {};
  const element = container.current;
  const letters = container.current.querySelectorAll<HTMLSpanElement>("span");
  const { min, max, default: baseWeight } = FONT_WEIGHTS[type];

  const animateLetter = (
    letter: HTMLSpanElement,
    weight: number,
    duration: number = 0.25,
  ) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!container?.current) return;
    const { left } = container.current.getBoundingClientRect();
    const mousex = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mousex - (l - left + w / 2));
      const intencity = Math.exp(-(distance ** 2) / 2000);
      const weight = min + (max - min) * intencity;

      animateLetter(letter, weight);
    });
  };

  const handleMouseLeave = () =>
    letters.forEach((letter) => animateLetter(letter, baseWeight, 0.3));

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

function WelcomeScreen() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const titleHover = setUpTextHover(titleRef, "title");
    const subtitleHover = setUpTextHover(subtitleRef, "subtitle");
    return () => {
      titleHover();
      subtitleHover();
    };
  }, [titleRef, subtitleRef]);
  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey! I'm Ankan! Welcome to my",
          "text-3xl font-georama",
          100,
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("portfolio.", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
}

export default WelcomeScreen;
