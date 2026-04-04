import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@/constants/wondow.constants";
import type { WindowConfigType, WindowKeyType } from "@/types/window";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type WindowStore = {
    windows: WindowConfigType;
    nextZIndex: number;
    openWindow: (windowKey: WindowKeyType, data?: unknown) => void;
    closeWindow: (windowKey: WindowKeyType) => void;
    focusWindow: (windowKey: WindowKeyType) => void;
  };


const useWindow = create<WindowStore>()(immer((set) => (
    {
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data = null) => set((state) => {
            const window = state.windows[windowKey];
            window.isOpen = true;
            window.zIndex = state.nextZIndex;
            window.data = data ?? window.data;
            state.nextZIndex++;
        }),
        closeWindow: (windowKey) => set((state) => {
            const window = state.windows[windowKey];
            window.isOpen = false;
            window.zIndex = INITIAL_Z_INDEX;
            window.data = null;
        }),
        focusWindow: (windowKey) => set((state) => {
            const window = state.windows[windowKey];
            window.zIndex = state.nextZIndex++;
        }),
    }
)))

export default useWindow;