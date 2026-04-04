import type { WindowKeyType } from "./window";

export type DockAppType = {
    id: WindowKeyType | "trash";
    name: string;
    icon: string;
    canOpen: boolean;
}

export type DockAppsType = DockAppType[];