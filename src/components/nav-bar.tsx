import dayjs from "dayjs";
import { NAV_ICONS, NAV_LINKS } from "@/constants/nav.constants";
import useWindow from "@/store/window";

function NavBar() {
  const openWindow = useWindow((s) => s.openWindow);
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Ankan</p>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                aria-label={link.name}
                onClick={() => openWindow(link.type)}
              >
                <p>{link.name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {NAV_ICONS.map((icon) => (
            <li key={icon.id}>
              <img src={icon.img} alt={`icon-${icon.id}`} />
            </li>
          ))}
        </ul>
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
}

export default NavBar;
