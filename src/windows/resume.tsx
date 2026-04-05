import WindowControls from "@/components/window-controls";
import WindowWrapper from "@/hoc/window-wrapper";
import { DownloadIcon } from "lucide-react";
import {Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Resume() {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href="/files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download Resume"
        >
          <DownloadIcon className="icon" />
        </a>
      </div>
      <Document file="/files/resume.pdf" >
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer/>
      </Document>
    </>
  );
}

const ResumeWindow = WindowWrapper({
  component: Resume,
  windowKey: "resume",
});

export default ResumeWindow;
