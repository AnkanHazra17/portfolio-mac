import type { WindowKeyType } from "@/types/window";
import useWindow from "@/store/window";

function WindowControls({ target }: { target: WindowKeyType }) {
  const closeWindow = useWindow((s) => s.closeWindow);
  return (
    <div id="window-controls">
      <button
        type="button"
        className="close"
        aria-label="Close window"
        onClick={() => closeWindow(target)}
      />
      <button
        type="button"
        className="minimize"
        aria-label="Minimize window"
        aria-disabled
        disabled
      />
      <button
        type="button"
        className="maximize"
        aria-label="Maximize window"
        aria-disabled
        disabled
      />
    </div>
  );
}

export default WindowControls;
