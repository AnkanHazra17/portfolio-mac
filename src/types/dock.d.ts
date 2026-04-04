import type { WindowKeyType } from "./window";

type DockAppType = {
    id: WindowKeyType | "trash";
    name: string;
    icon: string;
    canOpen: boolean;
}

type DockAppsType = DockAppType[];