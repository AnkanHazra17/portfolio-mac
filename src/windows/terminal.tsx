import WindowControls from "@/components/window-controls";
import { TECHSTACKS } from "@/constants/techstack.constants";
import WindowWrapper from "@/hoc/window-wrapper";
import { CheckIcon, FlagIcon } from "lucide-react";

function Terminal() {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Tech Stack</h2>
      </div>
      <div className="techstack">
        <p>
          <span>@ankan % </span> show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {TECHSTACKS.map((techstack) => (
            <li key={techstack.category} className="flex items-center">
              <CheckIcon className="check" size={20} />
              <h3>{techstack.category}</h3>
              <ul>
                {techstack.items.map((item, i) => (
                  <li key={i}>{`${item}${i < techstack.items.length - 1 ? ", " : ""}`}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
            <p>
                <CheckIcon size={20} /> {TECHSTACKS.length} of {TECHSTACKS.length} stacks loaded successfully (100%)
            </p>
            <p className="text-black">
                <FlagIcon size={15} fill="black" /> Render time: 0.023s
            </p>
        </div>
      </div>
    </>
  );
}

const TerminalWindow = WindowWrapper({
  component: Terminal,
  windowKey: "terminal",
});

export default TerminalWindow;
