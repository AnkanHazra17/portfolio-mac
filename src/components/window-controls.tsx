import type { WindowKeyType } from "@/types/window";
import useWindow from "@/store/window";

function WindowControls({ target }: { target: WindowKeyType }) {
  const closeWindow = useWindow((s) => s.closeWindow);
  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)}></div>
      <div className="minimize"></div>
      <div className="maximize"></div>
    </div>
  );
}

export default WindowControls;
