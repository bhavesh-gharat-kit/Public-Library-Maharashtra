'use client';
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure PDF.js worker
try {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
} catch (error) {
  console.warn('PDF.js worker initialization warning:', error);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

import HTMLFlipBook from "react-pageflip";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minimize,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./FlipbookViewer.css";
import { useParams } from "next/navigation";

const FlipbookViewer = (
  {
    baseUrl,
    fileUrl,
    bookId,
    initialPagesToLoad,
    pagesPerChunk,
    loadMoreThreshold,
    onPageChange,
    onBookLoaded,
    onError,
  }
) => {
  const [bookInfo, setBookInfo] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Enhanced zoom state with single page mode
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showSinglePage, setShowSinglePage] = useState(false);

  // Progressive loading state
  const [loadedRanges, setLoadedRanges] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pdfChunks, setPdfChunks] = useState({});
  const [loadingStrategy, setLoadingStrategy] = useState('data-url');

  const flipBookRef = useRef(null);
  const containerRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  // Calculate base dimensions without zoom
  const baseDimensions = useMemo(() => {
    const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
    const containerHeight = containerRef.current?.clientHeight || window.innerHeight;

    const mobile = containerWidth < 768;
    const tablet = containerWidth >= 768 && containerWidth < 1024;

    setIsMobile(mobile);
    setIsTablet(tablet);

    let baseWidth, baseHeight;

    if (mobile) {
      baseWidth = Math.min(containerWidth - 40, 350);
      baseHeight = baseWidth * 1.414; // A4 ratio
    } else if (tablet) {
      baseWidth = Math.min(containerWidth - 100, 500);
      baseHeight = baseWidth * 1.414;
    } else {
      baseWidth = Math.min(containerWidth - 160, 600);
      baseHeight = baseWidth * 1.414;
    }

    return {
      width: baseWidth,
      height: baseHeight
    };
  }, []);

  // Calculate zoomed dimensions
  const pageDimensions = useMemo(() => {
    const zoomedWidth = Math.round(baseDimensions.width * zoomLevel);
    const zoomedHeight = Math.round(baseDimensions.height * zoomLevel);

    return {
      width: zoomedWidth,
      height: zoomedHeight
    };
  }, [baseDimensions, zoomLevel]);

  // Auto-show single page when zoomed in enough
  useEffect(() => {
    if (zoomLevel > 1.5) {
      setShowSinglePage(true);
    } else {
      setShowSinglePage(false);
    }
  }, [zoomLevel]);

  // PDF options
  const pdfOptions = useMemo(() => ({
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    disableFontFace: false,
    useSystemFonts: false,
    isEvalSupported: true,
    maxImageSize: 2048 * 2048,
    enableXfa: true,
  }), []);

  // Clean up blob URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(pdfChunks).forEach(chunk => {
        if (chunk.url && chunk.url.startsWith('blob:')) {
          URL.revokeObjectURL(chunk.url);
        }
      });
    };
  }, [pdfChunks]);

  // Enhanced zoom functions with single page mode
  const zoomIn = useCallback(() => {
    setZoomLevel(prev => {
      const newZoom = Math.min(prev + 0.25, 3);
      return Math.round(newZoom * 100) / 100;
    });
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.25, 0.5);
      return Math.round(newZoom * 100) / 100;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setShowSinglePage(false);
  }, []);

  const setZoomToFit = useCallback(() => {
    setZoomLevel(1);
    setShowSinglePage(false);
  }, []);

  const setZoomToWidth = useCallback(() => {
    setZoomLevel(1.2);
    setShowSinglePage(false);
  }, []);

  const setZoomToActual = useCallback(() => {
    setZoomLevel(1.5);
  }, []);

  const setZoomToEnhanced = useCallback(() => {
    setZoomLevel(2);
  }, []);

  const toggleSinglePage = useCallback(() => {
    setShowSinglePage(prev => !prev);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        // Force re-calculation by updating zoom level slightly
        setZoomLevel(prev => prev);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Smart loading strategy
  const loadPdfRange = async (startPage, endPage, forceStrategy = null) => {
    const strategy = forceStrategy || loadingStrategy;
    const chunkKey = `${startPage}-${endPage}`;

    try {
      let url;

      if (strategy === 'data-url') {
        // const rangeUrl = `${baseUrl}/books/read-abhishek/${bookId}/range-json?startPage=${startPage}&endPage=${endPage}`;
        const rangeUrl = `${fileUrl}/range-json?startPage=${startPage}&endPage=${endPage}`;
        const response = await fetch(rangeUrl);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || `HTTP error! status: ${response.status}`);
        }

        if (data.success && data.url) {
          return {
            url: data.url,
            totalPages: data.totalPages,
            strategy: 'data-url'
          };
        } else if (data.success === false && data.message?.includes('too large')) {
          console.log('PDF too large for data URL, switching to blob strategy');
          setLoadingStrategy('blob');
          return await loadPdfRange(startPage, endPage, 'blob');
        } else {
          throw new Error(data.message || "Failed to load PDF range");
        }
      } else {
        const rangeUrl = `${baseUrl}/books/read-abhishek/${bookId}/range?startPage=${startPage}&endPage=${endPage}`;
        const response = await fetch(rangeUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const pdfBytes = await response.arrayBuffer();
        const blobUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        const totalPages = response.headers.get('X-Total-Pages');

        return {
          url: blobUrl,
          totalPages: totalPages ? parseInt(totalPages) : null,
          strategy: 'blob'
        };
      }
    } catch (error) {
      console.error(`Error loading range ${chunkKey}:`, error);
      throw error;
    }
  };

  // Fetch book info and initial pages
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);

        const initialStartPage = 1;
        const initialEndPage = 2;

        console.log('Fetching initial book pages...');

        const result = await loadPdfRange(initialStartPage, initialEndPage);

        const bookData = {
          id: bookId,
          title: `Book ${bookId}`,
          author: "Unknown Author",
          totalPages: result.totalPages || 0,
          publicId: bookId
        };

        setBookInfo(bookData);
        setNumPages(result.totalPages || 0);

        setPdfChunks({
          [`${initialStartPage}-${initialEndPage}`]: {
            url: result.url,
            strategy: result.strategy,
            startPage: initialStartPage,
            endPage: initialEndPage
          }
        });

        setLoadedRanges([{ start: initialStartPage, end: initialEndPage }]);

      } catch (err) {
        console.error('Fetch book error:', err);
        setError(err.message || "Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  // Load more pages progressively
  const loadMorePages = async (startPage, endPage) => {
    try {
      setIsLoadingMore(true);

      const result = await loadPdfRange(startPage, endPage);
      const chunkKey = `${startPage}-${endPage}`;

      const existingChunk = pdfChunks[chunkKey];
      if (existingChunk && existingChunk.url.startsWith('blob:')) {
        URL.revokeObjectURL(existingChunk.url);
      }

      setPdfChunks(prev => ({
        ...prev,
        [chunkKey]: {
          url: result.url,
          strategy: result.strategy,
          startPage: startPage,
          endPage: endPage
        }
      }));

      setLoadedRanges(prev => [...prev, { start: startPage, end: endPage }]);
      return true;
    } catch (error) {
      console.error("Error loading more pages:", error);
      return false;
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Check and load more pages when needed
  const checkAndLoadMorePages = useCallback(async (currentPageNum) => {
    if (!bookId || isLoadingMore) return;

    const currentRange = loadedRanges[loadedRanges.length - 1];
    if (!currentRange) return;

    const pagesLeftInRange = currentRange.end - currentPageNum;

    if (pagesLeftInRange <= 2 && currentRange.end < numPages) {
      const nextStart = currentRange.end + 1;
      const nextEnd = Math.min(currentRange.end + 5, numPages);

      await loadMorePages(nextStart, nextEnd);
    }
  }, [loadedRanges, numPages, isLoadingMore, bookId]);

  // Navigation handlers
  const goToPreviousPage = useCallback(() => {
    setCurrentPage(prev => {
      const newPage = Math.max(1, prev - 1);
      checkAndLoadMorePages(newPage);
      if (flipBookRef.current && !showSinglePage) {
        flipBookRef.current.pageFlip().flipPrev();
      }
      return newPage;
    });
  }, [checkAndLoadMorePages, showSinglePage]);

  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => {
      const newPage = Math.min(numPages, prev + 1);
      checkAndLoadMorePages(newPage);
      if (flipBookRef.current && !showSinglePage) {
        flipBookRef.current.pageFlip().flipNext();
      }
      return newPage;
    });
  }, [numPages, checkAndLoadMorePages, showSinglePage]);

  // Handle flip event
  const handleFlip = useCallback((e) => {
    const newPage = e.data + 1;
    setCurrentPage(newPage);
    checkAndLoadMorePages(newPage);
  }, [checkAndLoadMorePages]);

  // Sync flipbook when currentPage changes externally
  useEffect(() => {
    if (flipBookRef.current && flipBookRef.current.pageFlip() && !showSinglePage) {
      const flipbookCurrentPage = flipBookRef.current.pageFlip().getCurrentPageIndex();
      if (flipbookCurrentPage + 1 !== currentPage) {
        flipBookRef.current.pageFlip().flip(currentPage - 1);
      }
    }
  }, [currentPage, showSinglePage]);

  // Check if page is loaded
  const isPageLoaded = useCallback((pageNumber) => {
    return loadedRanges.some(range =>
      pageNumber >= range.start && pageNumber <= range.end
    );
  }, [loadedRanges]);

  // Get PDF file for a specific page
  const getPdfFileForPage = useCallback((pageNumber) => {
    for (const [rangeKey, chunk] of Object.entries(pdfChunks)) {
      const [start, end] = rangeKey.split('-').map(Number);
      if (pageNumber >= start && pageNumber <= end) {
        return {
          url: chunk.url,
          startPage: start,
          localPageNumber: pageNumber - start + 1
        };
      }
    }
    return null;
  }, [pdfChunks]);

  // Single page renderer for zoomed-in view
  const renderSinglePage = useCallback((pageNumber) => {
    const pageLoaded = isPageLoaded(pageNumber);
    const pdfFileInfo = getPdfFileForPage(pageNumber);

    if (!pageLoaded || !pdfFileInfo) {
      return (
        <div key={pageNumber} className="pdf-single-page pdf-page-loading">
          <div className="page-loading-placeholder">
            <Loader2 size={24} className="spinner" />
            <span>Loading page {pageNumber}...</span>
          </div>
        </div>
      );
    }

    return (
      <div key={pageNumber} className="pdf-single-page">
        <Document
          file={pdfFileInfo.url}
          loading={
            <div className="pdf-page-loading">
              <Loader2 size={24} className="spinner" />
              <span>Loading PDF...</span>
            </div>
          }
          error={
            <div className="pdf-page-loading">
              <span>Error loading PDF</span>
            </div>
          }
          options={pdfOptions}
        >
          <Page
            pageNumber={pdfFileInfo.localPageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            width={pageDimensions.width}
            loading={
              <div className="pdf-page-loading">
                <Loader2 size={24} className="spinner" />
                <span>Rendering page {pageNumber}...</span>
              </div>
            }
            className="pdf-page-content"
          />
        </Document>
        <div className="pdf-page-footer">
          <span className="page-number">{pageNumber}</span>
        </div>
      </div>
    );
  }, [isPageLoaded, getPdfFileForPage, pdfOptions, pageDimensions.width]);

  // Flipbook page renderer
  const renderFlipbookPage = useCallback((pageNumber) => {
    const pageLoaded = isPageLoaded(pageNumber);
    const pdfFileInfo = getPdfFileForPage(pageNumber);

    if (!pageLoaded || !pdfFileInfo) {
      return (
        <div key={pageNumber} className="pdf-flip-page pdf-page-loading">
          <div className="page-loading-placeholder">
            <Loader2 size={24} className="spinner" />
            <span>Loading page {pageNumber}...</span>
          </div>
        </div>
      );
    }

    return (
      <div key={pageNumber} className="pdf-flip-page">
        <Document
          file={pdfFileInfo.url}
          loading={
            <div className="pdf-page-loading">
              <Loader2 size={24} className="spinner" />
              <span>Loading PDF chunk...</span>
            </div>
          }
          error={
            <div className="pdf-page-loading">
              <span>Error loading PDF</span>
            </div>
          }
          options={pdfOptions}
        >
          <Page
            pageNumber={pdfFileInfo.localPageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            width={pageDimensions.width}
            loading={
              <div className="pdf-page-loading">
                <Loader2 size={24} className="spinner" />
                <span>Rendering page {pageNumber}...</span>
              </div>
            }
            className="pdf-page-content"
          />
        </Document>
        <div className="pdf-page-footer">
          <span className="page-number">{pageNumber}</span>
        </div>
      </div>
    );
  }, [isPageLoaded, getPdfFileForPage, pdfOptions, pageDimensions.width]);

  // Generate pages array
  const pages = useMemo(() => {
    if (!numPages) return [];
    const maxLoadedPage = loadedRanges.reduce((max, range) => Math.max(max, range.end), 0);
    return Array.from({ length: Math.min(maxLoadedPage, numPages) }, (_, i) => i + 1);
  }, [numPages, loadedRanges]);

  // Fullscreen toggle
  const toggleFullScreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
        setIsFullScreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullScreen(false);
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  }, []);

  // Page input navigation
  const handlePageInput = useCallback((e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= numPages) {
      setCurrentPage(val);
      checkAndLoadMorePages(val);
      if (flipBookRef.current && !showSinglePage) {
        flipBookRef.current.pageFlip().flip(val - 1);
      }
    }
  }, [numPages, checkAndLoadMorePages, showSinglePage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '=') {
          e.preventDefault();
          zoomIn();
        } else if (e.key === '-') {
          e.preventDefault();
          zoomOut();
        } else if (e.key === '0') {
          e.preventDefault();
          resetZoom();
        }
      } else {
        if (e.key === 'ArrowLeft') goToPreviousPage();
        if (e.key === 'ArrowRight') goToNextPage();
        if (e.key === 'Escape' && isFullScreen) toggleFullScreen();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToPreviousPage, goToNextPage, isFullScreen, toggleFullScreen, zoomIn, zoomOut, resetZoom]);

  if (loading) {
    return (
      <div className="pdf-book-reader__loading">
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Loader2 size={48} className="spinner-icon" />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Loading your book...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div className="pdf-book-reader__error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <h3>Error Loading Book</h3>
        <p>{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`pdf-book-reader ${isFullScreen ? 'pdf-book-reader--fullscreen' : ''} ${isMobile ? 'pdf-book-reader--mobile' : isTablet ? 'pdf-book-reader--tablet' : 'pdf-book-reader--desktop'
        } ${showSinglePage ? 'pdf-book-reader--single-page' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >


      <main className="pdf-book-reader__viewer-container">
        {showSinglePage ? (
          // Single Page View for zoomed-in mode
          <motion.div
            key="single-page-view"
            className="pdf-single-page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {renderSinglePage(currentPage)}
          </motion.div>
        ) : (
          // Flipbook View for normal mode
          <AnimatePresence mode="wait">
            {pages.length > 0 && (
              <motion.div
                key="flipbook-view"
                className="pdf-book-reader__flip-book-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <HTMLFlipBook
                  width={pageDimensions.width}
                  height={pageDimensions.height}
                  minWidth={300}
                  maxWidth={1200}
                  minHeight={400}
                  maxHeight={1600}
                  size="stretch"
                  maxShadowOpacity={0.3}
                  showCover={true}
                  mobileScrollSupport={true}
                  flippingTime={800}
                  className="custom-flipbook"
                  ref={flipBookRef}
                  onFlip={handleFlip}
                  startPage={currentPage - 1}
                  usePortrait={true}
                  drawShadow={true}
                  autoSize={true}
                >
                  {pages.map(renderFlipbookPage)}
                </HTMLFlipBook>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {isLoadingMore && (
          <div className="loading-more-indicator">
            <Loader2 size={16} className="spinner" />
            <span>Loading more pages...</span>
          </div>
        )}


      </main>

      <motion.header className="pdf-book-reader__header" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        {/* <div className="pdf-book-reader__book-info">
          <h2>PDF Book Reader</h2>
          <div className="view-mode-indicator">
            {showSinglePage ? 'Single Page View' : 'Flipbook View'} • {Math.round(zoomLevel * 100)}%
          </div>
        </div> */}
        <div className="pdf-book-reader__controls">
          {/* Enhanced Zoom Controls */}
          <div className="zoom-controls-group">
            <div className="zoom-controls">
              <button onClick={zoomOut} className="control-btn" title="Zoom Out" disabled={zoomLevel <= 0.5}>
                <ZoomOut size={18} />
              </button>
              <button onClick={resetZoom} className="scale-display" title="Reset Zoom">
                {Math.round(zoomLevel * 100)}%
              </button>
              <button onClick={zoomIn} className="control-btn" title="Zoom In" disabled={zoomLevel >= 3}>
                <ZoomIn size={18} />
              </button>
              <div className="zoom-display-group">

                <div className="zoom-presets">
                  <button
                    onClick={setZoomToFit}
                    className={`zoom-preset-btn ${Math.abs(zoomLevel - 1) < 0.1 ? 'active' : ''}`}
                    title="Fit to Screen"
                  >
                    Fit
                  </button>
                  <button
                    onClick={setZoomToWidth}
                    className={`zoom-preset-btn ${Math.abs(zoomLevel - 1.2) < 0.1 ? 'active' : ''}`}
                    title="Fit to Width"
                  >
                    Width
                  </button>
                  <button
                    onClick={setZoomToActual}
                    className={`zoom-preset-btn ${Math.abs(zoomLevel - 1.5) < 0.1 ? 'active' : ''}`}
                    title="Actual Size"
                  >
                    100%
                  </button>
                  <button
                    onClick={toggleSinglePage}
                    className={`zoom-preset-btn ${showSinglePage ? 'active' : ''}`}
                    title="Single Page View"
                  >
                    Single
                  </button>
                </div>
              </div>

            </div>
          </div>

          <nav className="pdf-book-reader__navigation">
            <button onClick={goToPreviousPage} disabled={currentPage <= 1} className="nav-btn prev-btn">
              <ChevronLeft size={20} />
              {/* {!isMobile && "Previous"} */}
            </button>
            <div className="page-info">
              <input type="number" value={currentPage} onChange={handlePageInput} min="1" max={numPages || 1} className="page-input" aria-label="Current page" />
              <span className="page-count">of {numPages || "--"}</span>
            </div>
            <button onClick={goToNextPage} disabled={currentPage >= numPages} className="nav-btn next-btn">
              {/* {!isMobile && "Next"} */}
              <ChevronRight size={20} />
            </button>
          </nav>

          <button onClick={toggleFullScreen} className="control-btn fullscreen-btn" title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
            {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </motion.header>
    </motion.div>
  );
};

export default FlipbookViewer;

// 'use client';

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   useMemo,
//   forwardRef,
// } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import HTMLFlipBook from 'react-pageflip';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Minimize,
//   Maximize,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   ZoomIn,
//   ZoomOut,
//   BookOpen,
//   FileText,
// } from 'lucide-react';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

// // Configure PDF.js worker
// try {
//   pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url
//   ).toString();
// } catch (error) {
//   console.warn('PDF.js worker initialization warning:', error);
//   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// }

// // =============================================================================
// // Page Component (for HTMLFlipBook - requires forwardRef)
// // =============================================================================

// const FlipbookPage = forwardRef(function FlipbookPage(
//   { pageNumber, width, pdfFileInfo, isLoaded, pdfOptions },
//   ref
// ) {
//   const height = Math.round(width * 1.414);

//   if (!isLoaded || !pdfFileInfo) {
//     return (
//       <div
//         ref={ref}
//         className="relative flex flex-col items-center justify-center bg-white shadow-lg"
//         style={{ width, height }}
//       >
//         <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
//           <Loader2 size={24} className="animate-spin" />
//           <span className="text-sm">Loading page {pageNumber}...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       ref={ref}
//       className="relative flex flex-col bg-white shadow-lg overflow-hidden"
//       style={{ width, height }}
//     >
//       <Document
//         file={pdfFileInfo.url}
//         loading={
//           <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
//             <Loader2 size={24} className="animate-spin" />
//             <span className="text-sm">Loading PDF...</span>
//           </div>
//         }
//         error={
//           <div className="flex flex-col items-center justify-center h-full text-red-400">
//             <span className="text-sm">Error loading PDF</span>
//           </div>
//         }
//         options={pdfOptions}
//       >
//         <Page
//           pageNumber={pdfFileInfo.localPageNumber}
//           renderAnnotationLayer={false}
//           renderTextLayer={false}
//           width={width}
//           loading={
//             <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
//               <Loader2 size={24} className="animate-spin" />
//               <span className="text-sm">Rendering...</span>
//             </div>
//           }
//           className="pdf-page-content"
//         />
//       </Document>
//       <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
//         <span className="text-xs text-gray-400 bg-white/80 px-2 py-0.5 rounded">
//           {pageNumber}
//         </span>
//       </div>
//       <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-gray-200 to-transparent pointer-events-none" />
//     </div>
//   );
// });

// // =============================================================================
// // Main Component
// // =============================================================================

// const FlipbookViewer = ({
//   baseUrl,
//   bookId,
//   initialPagesToLoad = 5,
//   pagesPerChunk = 5,
//   loadMoreThreshold = 2,
//   className = '',
//   onPageChange,
//   onBookLoaded,
//   onError,
// }) => {
//   // State
//   const [numPages, setNumPages] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [showSinglePage, setShowSinglePage] = useState(false);
//   const [loadedRanges, setLoadedRanges] = useState([]);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [pdfChunks, setPdfChunks] = useState({});
//   const [loadingStrategy, setLoadingStrategy] = useState('data-url');

//   // Refs
//   const flipBookRef = useRef(null);
//   const containerRef = useRef(null);
//   const resizeTimeoutRef = useRef(null);

//   // =============================================================================
//   // Computed Values
//   // =============================================================================

//   const deviceType = useMemo(() => {
//     if (typeof window === 'undefined') return 'desktop';
//     const width = window.innerWidth;
//     if (width < 768) return 'mobile';
//     if (width < 1024) return 'tablet';
//     return 'desktop';
//   }, []);

//   const baseDimensions = useMemo(() => {
//     if (typeof window === 'undefined') {
//       return { width: 400, height: 566 };
//     }
//     const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
//     let baseWidth;
//     switch (deviceType) {
//       case 'mobile':
//         baseWidth = Math.min(containerWidth - 40, 350);
//         break;
//       case 'tablet':
//         baseWidth = Math.min(containerWidth - 100, 500);
//         break;
//       default:
//         baseWidth = Math.min(containerWidth - 160, 600);
//     }
//     return {
//       width: baseWidth,
//       height: Math.round(baseWidth * 1.414),
//     };
//   }, [deviceType]);

//   const pageDimensions = useMemo(() => ({
//     width: Math.round(baseDimensions.width * zoomLevel),
//     height: Math.round(baseDimensions.height * zoomLevel),
//   }), [baseDimensions, zoomLevel]);

//   const pdfOptions = useMemo(() => ({
//     cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
//     cMapPacked: true,
//     standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
//     disableFontFace: false,
//     useSystemFonts: false,
//     isEvalSupported: true,
//     maxImageSize: 2048 * 2048,
//     enableXfa: true,
//   }), []);

//   const pages = useMemo(() => {
//     if (!numPages) return [];
//     const maxLoadedPage = loadedRanges.reduce((max, range) => Math.max(max, range.end), 0);
//     return Array.from({ length: Math.min(maxLoadedPage, numPages) }, (_, i) => i + 1);
//   }, [numPages, loadedRanges]);

//   // =============================================================================
//   // URL Building
//   // =============================================================================

//   const buildRangeUrl = useCallback((startPage, endPage, useJson = true) => {
//     const endpoint = useJson ? 'range-json' : 'range';
//     return `${baseUrl}/books/read-abhishek/${bookId}/${endpoint}?startPage=${startPage}&endPage=${endPage}`;
//   }, [baseUrl, bookId]);

//   // =============================================================================
//   // PDF Loading
//   // =============================================================================

//   const loadPdfRange = useCallback(async (startPage, endPage, forceStrategy = null) => {
//     const strategy = forceStrategy || loadingStrategy;
//     try {
//       if (strategy === 'data-url') {
//         const rangeUrl = buildRangeUrl(startPage, endPage, true);
//         const response = await fetch(rangeUrl);
//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(data?.message || `HTTP error! status: ${response.status}`);
//         }
//         if (data.success && data.url) {
//           return { url: data.url, totalPages: data.totalPages, strategy: 'data-url' };
//         } else if (data.success === false && data.message?.includes('too large')) {
//           console.log('PDF too large for data URL, switching to blob strategy');
//           setLoadingStrategy('blob');
//           return loadPdfRange(startPage, endPage, 'blob');
//         } else {
//           throw new Error(data.message || 'Failed to load PDF range');
//         }
//       } else {
//         const rangeUrl = buildRangeUrl(startPage, endPage, false);
//         const response = await fetch(rangeUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const pdfBytes = await response.arrayBuffer();
//         const blobUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
//         const totalPages = response.headers.get('X-Total-Pages');
//         return { url: blobUrl, totalPages: totalPages ? parseInt(totalPages) : null, strategy: 'blob' };
//       }
//     } catch (err) {
//       console.error(`Error loading range ${startPage}-${endPage}:`, err);
//       throw err;
//     }
//   }, [loadingStrategy, buildRangeUrl]);

//   const loadMorePages = useCallback(async (startPage, endPage) => {
//     try {
//       setIsLoadingMore(true);
//       const result = await loadPdfRange(startPage, endPage);
//       const chunkKey = `${startPage}-${endPage}`;
//       const existingChunk = pdfChunks[chunkKey];
//       if (existingChunk?.url?.startsWith('blob:')) {
//         URL.revokeObjectURL(existingChunk.url);
//       }
//       setPdfChunks(prev => ({
//         ...prev,
//         [chunkKey]: { url: result.url, strategy: result.strategy, startPage, endPage },
//       }));
//       setLoadedRanges(prev => [...prev, { start: startPage, end: endPage }]);
//       return true;
//     } catch (err) {
//       console.error('Error loading more pages:', err);
//       return false;
//     } finally {
//       setIsLoadingMore(false);
//     }
//   }, [loadPdfRange, pdfChunks]);

//   const checkAndLoadMorePages = useCallback(async (currentPageNum) => {
//     if (!bookId || isLoadingMore) return;
//     const currentRange = loadedRanges[loadedRanges.length - 1];
//     if (!currentRange) return;
//     const pagesLeftInRange = currentRange.end - currentPageNum;
//     if (pagesLeftInRange <= loadMoreThreshold && currentRange.end < numPages) {
//       const nextStart = currentRange.end + 1;
//       const nextEnd = Math.min(currentRange.end + pagesPerChunk, numPages);
//       await loadMorePages(nextStart, nextEnd);
//     }
//   }, [loadedRanges, numPages, isLoadingMore, bookId, loadMoreThreshold, pagesPerChunk, loadMorePages]);

//   // =============================================================================
//   // Page Helpers
//   // =============================================================================

//   const isPageLoaded = useCallback((pageNumber) => {
//     return loadedRanges.some(range => pageNumber >= range.start && pageNumber <= range.end);
//   }, [loadedRanges]);

//   const getPdfFileForPage = useCallback((pageNumber) => {
//     for (const [rangeKey, chunk] of Object.entries(pdfChunks)) {
//       const [start, end] = rangeKey.split('-').map(Number);
//       if (pageNumber >= start && pageNumber <= end) {
//         return { url: chunk.url, startPage: start, localPageNumber: pageNumber - start + 1 };
//       }
//     }
//     return null;
//   }, [pdfChunks]);

//   // =============================================================================
//   // Zoom Controls
//   // =============================================================================

//   const zoomIn = useCallback(() => {
//     setZoomLevel(prev => Math.min(Math.round((prev + 0.25) * 100) / 100, 3));
//   }, []);

//   const zoomOut = useCallback(() => {
//     setZoomLevel(prev => Math.max(Math.round((prev - 0.25) * 100) / 100, 0.5));
//   }, []);

//   const resetZoom = useCallback(() => {
//     setZoomLevel(1);
//     setShowSinglePage(false);
//   }, []);

//   const toggleSinglePage = useCallback(() => {
//     setShowSinglePage(prev => !prev);
//   }, []);

//   // =============================================================================
//   // Navigation
//   // =============================================================================

//   const goToPreviousPage = useCallback(() => {
//     setCurrentPage(prev => {
//       const newPage = Math.max(1, prev - (showSinglePage ? 1 : 2));
//       checkAndLoadMorePages(newPage);
//       if (flipBookRef.current && !showSinglePage) {
//         flipBookRef.current.pageFlip().flipPrev();
//       }
//       return newPage;
//     });
//   }, [checkAndLoadMorePages, showSinglePage]);

//   const goToNextPage = useCallback(() => {
//     setCurrentPage(prev => {
//       const newPage = Math.min(numPages, prev + (showSinglePage ? 1 : 2));
//       checkAndLoadMorePages(newPage);
//       if (flipBookRef.current && !showSinglePage) {
//         flipBookRef.current.pageFlip().flipNext();
//       }
//       return newPage;
//     });
//   }, [numPages, checkAndLoadMorePages, showSinglePage]);

//   const handleFlip = useCallback((e) => {
//     const newPage = e.data + 1;
//     setCurrentPage(newPage);
//     checkAndLoadMorePages(newPage);
//   }, [checkAndLoadMorePages]);

//   const handlePageInputChange = useCallback((e) => {
//     const val = parseInt(e.target.value);
//     if (!isNaN(val) && val >= 1 && val <= numPages) {
//       setCurrentPage(val);
//       checkAndLoadMorePages(val);
//       if (flipBookRef.current && !showSinglePage) {
//         flipBookRef.current.pageFlip().flip(val - 1);
//       }
//     }
//   }, [numPages, checkAndLoadMorePages, showSinglePage]);

//   // =============================================================================
//   // Fullscreen
//   // =============================================================================

//   const toggleFullScreen = useCallback(async () => {
//     try {
//       if (!document.fullscreenElement) {
//         await containerRef.current?.requestFullscreen();
//         setIsFullScreen(true);
//       } else {
//         await document.exitFullscreen();
//         setIsFullScreen(false);
//       }
//     } catch (err) {
//       console.error('Fullscreen error:', err);
//     }
//   }, []);

//   // =============================================================================
//   // Effects
//   // =============================================================================

//   // Auto-show single page when zoomed in
//   useEffect(() => {
//     setShowSinglePage(zoomLevel > 1.5);
//   }, [zoomLevel]);

//   // Cleanup blob URLs on unmount
//   useEffect(() => {
//     return () => {
//       Object.values(pdfChunks).forEach(chunk => {
//         if (chunk.url?.startsWith('blob:')) {
//           URL.revokeObjectURL(chunk.url);
//         }
//       });
//     };
//   }, [pdfChunks]);

//   // Handle resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (resizeTimeoutRef.current) {
//         clearTimeout(resizeTimeoutRef.current);
//       }
//       resizeTimeoutRef.current = setTimeout(() => {
//         setZoomLevel(prev => prev);
//       }, 150);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (resizeTimeoutRef.current) {
//         clearTimeout(resizeTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.ctrlKey || e.metaKey) {
//         if (e.key === '=' || e.key === '+') {
//           e.preventDefault();
//           zoomIn();
//         } else if (e.key === '-') {
//           e.preventDefault();
//           zoomOut();
//         } else if (e.key === '0') {
//           e.preventDefault();
//           resetZoom();
//         }
//       } else {
//         if (e.key === 'ArrowLeft') goToPreviousPage();
//         if (e.key === 'ArrowRight') goToNextPage();
//         if (e.key === 'Escape' && isFullScreen) toggleFullScreen();
//       }
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [goToPreviousPage, goToNextPage, isFullScreen, toggleFullScreen, zoomIn, zoomOut, resetZoom]);

//   // Sync flipbook with current page
//   useEffect(() => {
//     if (flipBookRef.current?.pageFlip() && !showSinglePage) {
//       const flipbookCurrentPage = flipBookRef.current.pageFlip().getCurrentPageIndex();
//       if (flipbookCurrentPage + 1 !== currentPage) {
//         flipBookRef.current.pageFlip().flip(currentPage - 1);
//       }
//     }
//   }, [currentPage, showSinglePage]);

//   // Page change callback
//   useEffect(() => {
//     if (onPageChange) {
//       onPageChange(currentPage, numPages);
//     }
//   }, [currentPage, numPages, onPageChange]);

//   // Initial fetch
//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const result = await loadPdfRange(1, initialPagesToLoad);
//         if (result.totalPages) {
//           setNumPages(result.totalPages);
//           if (onBookLoaded) {
//             onBookLoaded(result.totalPages);
//           }
//         }
//         setPdfChunks({
//           [`1-${initialPagesToLoad}`]: {
//             url: result.url,
//             strategy: result.strategy,
//             startPage: 1,
//             endPage: initialPagesToLoad,
//           },
//         });
//         setLoadedRanges([{ start: 1, end: initialPagesToLoad }]);
//       } catch (err) {
//         const errorMessage = err instanceof Error ? err.message : 'Failed to load book';
//         setError(errorMessage);
//         if (onError) {
//           onError(errorMessage);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (bookId) {
//       fetchBook();
//     }
//   }, [bookId, initialPagesToLoad, loadPdfRange, onBookLoaded, onError]);

//   // =============================================================================
//   // Render Helpers
//   // =============================================================================

//   const renderSinglePage = useCallback((pageNumber) => {
//     const pageLoaded = isPageLoaded(pageNumber);
//     const pdfFileInfo = getPdfFileForPage(pageNumber);

//     if (!pageLoaded || !pdfFileInfo) {
//       return (
//         <div
//           key={pageNumber}
//           className="flex flex-col items-center justify-center bg-white shadow-xl rounded-lg"
//           style={{ width: pageDimensions.width, height: pageDimensions.height }}
//         >
//           <div className="flex flex-col items-center gap-2 text-gray-400">
//             <Loader2 size={24} className="animate-spin" />
//             <span className="text-sm">Loading page {pageNumber}...</span>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div
//         key={pageNumber}
//         className="relative bg-white shadow-xl rounded-lg overflow-hidden"
//         style={{ width: pageDimensions.width, height: pageDimensions.height }}
//       >
//         <Document
//           file={pdfFileInfo.url}
//           loading={
//             <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
//               <Loader2 size={24} className="animate-spin" />
//               <span className="text-sm">Loading PDF...</span>
//             </div>
//           }
//           error={
//             <div className="flex flex-col items-center justify-center h-full text-red-400">
//               <span className="text-sm">Error loading PDF</span>
//             </div>
//           }
//           options={pdfOptions}
//         >
//           <Page
//             pageNumber={pdfFileInfo.localPageNumber}
//             renderAnnotationLayer={false}
//             renderTextLayer={false}
//             width={pageDimensions.width}
//             loading={
//               <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
//                 <Loader2 size={24} className="animate-spin" />
//                 <span className="text-sm">Rendering page {pageNumber}...</span>
//               </div>
//             }
//           />
//         </Document>
//         <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
//           <span className="text-xs text-gray-500 bg-white/90 px-2 py-1 rounded shadow-sm">
//             {pageNumber}
//           </span>
//         </div>
//       </div>
//     );
//   }, [isPageLoaded, getPdfFileForPage, pdfOptions, pageDimensions]);

//   // =============================================================================
//   // Loading State
//   // =============================================================================

//   if (loading) {
//     return (
//       <div className={`flex flex-col items-center justify-center min-h-[400px] gap-4 ${className}`}>
//         <motion.div
//           initial={{ rotate: 0 }}
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//         >
//           <Loader2 size={48} className="text-blue-500" />
//         </motion.div>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-gray-600"
//         >
//           Loading your book...
//         </motion.p>
//       </div>
//     );
//   }

//   // =============================================================================
//   // Error State
//   // =============================================================================

//   if (error) {
//     return (
//       <motion.div
//         className={`flex flex-col items-center justify-center min-h-[400px] gap-4 p-8 ${className}`}
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//       >
//         <div className="text-red-500 text-6xl mb-4">📖</div>
//         <h3 className="text-xl font-semibold text-gray-800">Error Loading Book</h3>
//         <p className="text-gray-600 text-center max-w-md">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Try Again
//         </button>
//       </motion.div>
//     );
//   }

//   // =============================================================================
//   // Main Render
//   // =============================================================================

//   const displayPageStart = showSinglePage ? currentPage : Math.max(1, currentPage - (currentPage % 2 === 0 ? 1 : 0));
//   const displayPageEnd = showSinglePage ? currentPage : Math.min(numPages, displayPageStart + 1);

//   return (
//     <motion.div
//       ref={containerRef}
//       className={`
//         relative flex flex-col w-full h-full min-h-[500px] bg-gray-100
//         ${isFullScreen ? 'fixed inset-0 z-50 bg-gray-900' : ''}
//         ${className}
//       `}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Main Viewer Area */}
//       <main className="flex-1 flex items-center justify-center p-4 overflow-auto">
//         {showSinglePage ? (
//           <motion.div
//             key="single-page-view"
//             className="flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             {renderSinglePage(currentPage)}
//           </motion.div>
//         ) : (
//           <AnimatePresence mode="wait">
//             {pages.length > 0 && (
//               <motion.div
//                 key="flipbook-view"
//                 className="relative"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-gray-300" />
//                 <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-gray-300" />
//                 <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-gray-300" />
//                 <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-gray-300" />

//                 <HTMLFlipBook
//                   width={pageDimensions.width}
//                   height={pageDimensions.height}
//                   minWidth={300}
//                   maxWidth={1200}
//                   minHeight={400}
//                   maxHeight={1600}
//                   size="stretch"
//                   maxShadowOpacity={0.3}
//                   showCover={true}
//                   mobileScrollSupport={true}
//                   flippingTime={800}
//                   className="shadow-2xl"
//                   ref={flipBookRef}
//                   onFlip={handleFlip}
//                   startPage={currentPage - 1}
//                   usePortrait={deviceType === 'mobile'}
//                   drawShadow={true}
//                   autoSize={true}
//                 >
//                   {pages.map(pageNumber => (
//                     <FlipbookPage
//                       key={pageNumber}
//                       pageNumber={pageNumber}
//                       width={pageDimensions.width}
//                       pdfFileInfo={getPdfFileForPage(pageNumber)}
//                       isLoaded={isPageLoaded(pageNumber)}
//                       pdfOptions={pdfOptions}
//                     />
//                   ))}
//                 </HTMLFlipBook>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         )}

//         {isLoadingMore && (
//           <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
//             <Loader2 size={16} className="animate-spin text-blue-500" />
//             <span className="text-sm text-gray-600">Loading more pages...</span>
//           </div>
//         )}
//       </main>

//       {/* Bottom Toolbar */}
//       <motion.footer
//         className={`
//           flex items-center justify-between gap-4 px-4 py-3
//           ${isFullScreen ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white border-t border-gray-200'}
//         `}
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         {/* Left: Progress Indicator */}
//         <div className="flex-1 flex items-center gap-3">
//           <div className="relative flex-1 h-1 bg-gray-200 rounded-full overflow-hidden max-w-xs">
//             <div
//               className="absolute left-0 top-0 h-full bg-blue-500 rounded-full transition-all duration-300"
//               style={{ width: `${(currentPage / numPages) * 100}%` }}
//             />
//             <div
//               className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-md transition-all duration-300"
//               style={{ left: `calc(${(currentPage / numPages) * 100}% - 6px)` }}
//             />
//           </div>
//         </div>

//         {/* Center: Navigation & Zoom Controls */}
//         <div className="flex items-center gap-2">
//           <button
//             onClick={goToPreviousPage}
//             disabled={currentPage <= 1}
//             className={`
//               p-2 rounded-lg transition-all
//               ${currentPage <= 1
//                 ? 'text-gray-300 cursor-not-allowed'
//                 : isFullScreen
//                   ? 'text-white hover:bg-white/10'
//                   : 'text-gray-600 hover:bg-gray-100'
//               }
//             `}
//             aria-label="Previous page"
//           >
//             <ChevronLeft size={24} />
//           </button>

//           <button
//             onClick={goToNextPage}
//             disabled={currentPage >= numPages}
//             className={`
//               p-2 rounded-lg transition-all
//               ${currentPage >= numPages
//                 ? 'text-gray-300 cursor-not-allowed'
//                 : isFullScreen
//                   ? 'text-white hover:bg-white/10'
//                   : 'text-gray-600 hover:bg-gray-100'
//               }
//             `}
//             aria-label="Next page"
//           >
//             <ChevronRight size={24} />
//           </button>

//           <div className={`w-px h-6 ${isFullScreen ? 'bg-gray-600' : 'bg-gray-200'}`} />

//           <button
//             onClick={zoomOut}
//             disabled={zoomLevel <= 0.5}
//             className={`
//               p-2 rounded-lg transition-all
//               ${zoomLevel <= 0.5
//                 ? 'text-gray-300 cursor-not-allowed'
//                 : isFullScreen
//                   ? 'text-white hover:bg-white/10'
//                   : 'text-gray-600 hover:bg-gray-100'
//               }
//             `}
//             aria-label="Zoom out"
//           >
//             <ZoomOut size={20} />
//           </button>

//           <button
//             onClick={zoomIn}
//             disabled={zoomLevel >= 3}
//             className={`
//               p-2 rounded-lg transition-all
//               ${zoomLevel >= 3
//                 ? 'text-gray-300 cursor-not-allowed'
//                 : isFullScreen
//                   ? 'text-white hover:bg-white/10'
//                   : 'text-gray-600 hover:bg-gray-100'
//               }
//             `}
//             aria-label="Zoom in"
//           >
//             <ZoomIn size={20} />
//           </button>

//           <div className={`w-px h-6 ${isFullScreen ? 'bg-gray-600' : 'bg-gray-200'}`} />

//           <button
//             onClick={toggleSinglePage}
//             className={`
//               p-2 rounded-lg transition-all
//               ${showSinglePage
//                 ? 'bg-blue-100 text-blue-600'
//                 : isFullScreen
//                   ? 'text-white hover:bg-white/10'
//                   : 'text-gray-600 hover:bg-gray-100'
//               }
//             `}
//             aria-label={showSinglePage ? 'Switch to book view' : 'Switch to single page view'}
//             title={showSinglePage ? 'Book View' : 'Single Page'}
//           >
//             {showSinglePage ? <BookOpen size={20} /> : <FileText size={20} />}
//           </button>

//           <button
//             onClick={toggleFullScreen}
//             className={`
//               p-2 rounded-lg transition-all
//               ${isFullScreen
//                 ? 'text-white hover:bg-white/10'
//                 : 'text-gray-600 hover:bg-gray-100'
//               }
//             `}
//             aria-label={isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
//           >
//             {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
//           </button>
//         </div>

//         {/* Right: Page Info */}
//         <div className="flex-1 flex items-center justify-end gap-2">
//           <span className={`text-sm ${isFullScreen ? 'text-gray-300' : 'text-gray-600'}`}>
//             {showSinglePage ? (
//               <>{currentPage} of {numPages}</>
//             ) : (
//               <>{displayPageStart}-{displayPageEnd} of {numPages}</>
//             )}
//           </span>
//         </div>
//       </motion.footer>
//     </motion.div>
//   );
// };

// export default FlipbookViewer;