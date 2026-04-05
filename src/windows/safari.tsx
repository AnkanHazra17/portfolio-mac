import WindowControls from "@/components/window-controls";
import { BLOGS } from "@/constants/blogs.constants";
import WindowWrapper from "@/hoc/window-wrapper";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  MoveRightIcon,
  PanelLeftIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  ShieldHalfIcon,
} from "lucide-react";

function Safari() {
  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />
        <PanelLeftIcon className="icon ml-10" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeftIcon className="icon" />
          <ChevronRightIcon className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalfIcon className="icon" />
          <div className="search">
            <SearchIcon className="icon" />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <ShareIcon className="icon" />
          <PlusIcon className="icon" />
          <CopyIcon className="icon" />
        </div>
      </div>

      <div className="blog">
        <h2>My Developer Blogs</h2>
        <div className="space-y-8">
          {BLOGS.map((blog) => (
            <div key={blog.id} className="blog-post">
              <div className="col-span-2">
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="content">
                <p>{blog.date}</p>
                <h3>{blog.title}</h3>
                <a href={blog.link} target="_blank" rel="noopener noreferrer">
                  Checkout the full post{" "}
                  <MoveRightIcon className="icon-hover" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const SafariWindow = WindowWrapper({
  component: Safari,
  windowKey: "safari",
});

export default SafariWindow;
