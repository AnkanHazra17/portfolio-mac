import type { WINDOW_CONFIG } from "@/constants/wondow.constants";

type WindowKeyType = keyof typeof WINDOW_CONFIG;

type WindowConfigType = typeof WINDOW_CONFIG;

type WindowType = WindowConfigType[WindowKeyType];