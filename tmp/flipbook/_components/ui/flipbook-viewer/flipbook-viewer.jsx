"use client";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import React, { useCallback, useRef, useState } from "react";
import Toolbar from "./toolbar/toolbar";
import { cn } from "@/flipbook/_lib/utils";
import Flipbook from "./flipbook/flipbook";
import screenfull from "screenfull";
import { TransformWrapper } from "react-zoom-pan-pinch";
import { pdfjs, Document } from "react-pdf";
import PdfLoading from "./pad-loading/pdf-loading";

// ✅ Always point to the hosted worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

// ✅ Add proper CMap + font configs
pdfjs.GlobalWorkerOptions.cMapUrl = "/cmaps/";
pdfjs.GlobalWorkerOptions.cMapPacked = true;
pdfjs.GlobalWorkerOptions.standardFontDataUrl = "/standard_fonts/";

const options = {
  wasmUrl: "/_next/static/wasm/",
};

const FlipbookViewer = ({ pdfUrl, shareUrl, className, disableShare }) => {
  const containerRef = useRef(); // For full screen container
  const flipbookRef = useRef();
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfDetails, setPdfDetails] = useState(null);
  const [viewerStates, setViewerStates] = useState({
    currentPageIndex: 0,
    zoomScale: 1,
  });

  // Setting pdf details on document load >>>>>>>>>
  const onDocumentLoadSuccess = useCallback(async (document) => {
    try {
      if (!document || document.numPages === 0) {
        console.warn("PDF document is empty or failed to load");
        return;
      }

      const firstPage = await document.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1 });

      setPdfDetails({
        totalPages: document.numPages,
        width: viewport.width,
        height: viewport.height,
      });

      setPdfLoading(false);
    } catch (error) {
      console.error("Error loading document:", error);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[20.163rem] xs:h-[22.163rem] lg:h-[27.163rem] xl:h-[30.66rem] bg-foreground w-full overflow-hidden",
        className
      )}
    >
      {pdfLoading && <PdfLoading />}
      <Document
        file={pdfUrl}
        renderMode="canvas"
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        loading={<></>}
      >
        {pdfDetails && !pdfLoading && (
          <TransformWrapper
            doubleClick={{ disabled: true }}
            pinch={{ step: 2 }}
            disablePadding={viewerStates?.zoomScale <= 1}
            initialScale={1}
            minScale={1}
            maxScale={5}
            onTransformed={({ state }) =>
              setViewerStates({ ...viewerStates, zoomScale: state.scale })
            }
          >
            <div className="w-full relative bg-foreground flex flex-col justify-between">
              <Flipbook
                viewerStates={viewerStates}
                setViewerStates={setViewerStates}
                flipbookRef={flipbookRef}
                screenfull={screenfull}
                pdfDetails={pdfDetails}
              />
              <Toolbar
                viewerStates={viewerStates}
                setViewerStates={setViewerStates}
                containerRef={containerRef}
                flipbookRef={flipbookRef}
                screenfull={screenfull}
                pdfDetails={pdfDetails}
                shareUrl={shareUrl}
                disableShare={disableShare}
              />
            </div>
          </TransformWrapper>
        )}
      </Document>
    </div>
  );
};

export default FlipbookViewer;
