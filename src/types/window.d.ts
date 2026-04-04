import type { WINDOW_CONFIG } from "@/constants/window.constants";

export type WindowKeyType = keyof typeof WINDOW_CONFIG;

export type WindowConfigType = typeof WINDOW_CONFIG;

export type WindowType = WindowConfigType[WindowKeyType];