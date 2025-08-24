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
            renderMode="canvas"
            renderTextLayer={false} // disable if you want pure page render
            renderAnnotationLayer={false}
            loading={<></>}
          />
        )}
      </div>
    );
  }
);

PdfPage.displayName = "PdfPage";

export default memo(PdfPage);
