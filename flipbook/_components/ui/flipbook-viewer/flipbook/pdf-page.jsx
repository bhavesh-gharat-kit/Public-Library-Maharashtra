import { cn } from "@/flipbook/_lib/utils";
import React, { forwardRef, memo } from "react";
import { Page } from "react-pdf";

const PdfPage = forwardRef(
  ({ page, height, zoomScale, isPageInView, isPageInViewRange }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(page % 2 === 0 ? "bg-background" : "bg-muted")}
      >
        {isPageInViewRange && (
          // <Page
          //     devicePixelRatio={(isPageInView && zoomScale > 1.7) ? Math.min(zoomScale * window.devicePixelRatio, 5) : window.devicePixelRatio}
          //     height={height}
          //     pageNumber={page}
          //     loading={<></>}
          // />
          <Page
            pageNumber={page}
            height={height}
            devicePixelRatio={
              isPageInView && zoomScale > 1.7
                ? Math.min(zoomScale * window.devicePixelRatio, 5)
                : window.devicePixelRatio
            }
            renderTextLayer={true} // optional: turn off text layer if not needed
            renderAnnotationLayer={true} // optional: turn off links/annots if not needed
            renderMode="canvas" // 🔑 ensures images+graphics are drawn
            loading={<></>}
          />
        )}
      </div>
    );
  }
);

PdfPage.displayName = "PdfPage";

export default memo(PdfPage);
