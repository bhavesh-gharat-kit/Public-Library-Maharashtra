'use client';
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure PDF.js worker
// try {
//   pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url
//   ).toString();
// } catch (error) {
//   console.warn('PDF.js worker initialization warning:', error);
//   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// }
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";


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

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

pdfjs.GlobalWorkerOptions.openJPEGWasmUrl = "/pdfjs/openjpeg.wasm";
pdfjs.GlobalWorkerOptions.openJPEGJSUrl =
  "/pdfjs/openjpeg_nowasm_fallback.js";

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
    // cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapUrl: "/pdfjs/cmaps/",
    cMapPacked: true,
    // standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    standardFontDataUrl: "/pdfjs/standard_fonts/",
    enableXfa: false,
    disableFontFace: false,
    useSystemFonts: false,
    isEvalSupported: true,
    maxImageSize: 2048 * 2048,
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
  // const loadPdfRange = async (startPage, endPage, forceStrategy = null) => {
  //   const strategy = forceStrategy || loadingStrategy;
  //   const chunkKey = `${startPage}-${endPage}`;

  //   try {
  //     let url;

  //     if (strategy === 'data-url') {
  //       // const rangeUrl = `${baseUrl}/books/read-book/${bookId}/range-json?startPage=${startPage}&endPage=${endPage}`;
  //       const rangeUrl = `${fileUrl}/range-json?startPage=${startPage}&endPage=${endPage}`;
  //       const response = await fetch(rangeUrl);
  //       const data = await response.json();

  //       if (!response.ok) {
  //         throw new Error(data?.message || `HTTP error! status: ${response.status}`);
  //       }

  //       if (data.success && data.url) {
  //         return {
  //           url: data.url,
  //           totalPages: data.totalPages,
  //           strategy: 'data-url'
  //         };
  //       } else if (data.success === false && data.message?.includes('too large')) {
  //         console.log('PDF too large for data URL, switching to blob strategy');
  //         setLoadingStrategy('blob');
  //         return await loadPdfRange(startPage, endPage, 'blob');
  //       } else {
  //         throw new Error(data.message || "Failed to load PDF range");
  //       }
  //     } else {
  //       const rangeUrl = `${baseUrl}/books/read-book/${bookId}/range?startPage=${startPage}&endPage=${endPage}`;
  //       const response = await fetch(rangeUrl);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const pdfBytes = await response.arrayBuffer();
  //       const blobUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
  //       const totalPages = response.headers.get('X-Total-Pages');

  //       return {
  //         url: blobUrl,
  //         totalPages: totalPages ? parseInt(totalPages) : null,
  //         strategy: 'blob'
  //       };
  //     }
  //   } catch (error) {
  //     console.error(`Error loading range ${chunkKey}:`, error);
  //     throw error;
  //   }
  // };

  const loadPdfRange = async (startPage, endPage, forceStrategy = null) => {
    const strategy = forceStrategy || loadingStrategy;

    try {
      if (strategy === 'data-url') {
        const rangeUrl = `${fileUrl}/range-json?startPage=${startPage}&endPage=${endPage}`;
        const response = await fetch(rangeUrl);
        const data = await response.json();

        if (!response.ok) {
          // Handle specific error cases
          if (response.status === 400) {
            console.warn('Page range validation error:', data.message);
            // If startPage exceeds total, we might want to handle this
            if (data.totalPages) {
              return {
                url: null,
                totalPages: data.totalPages,
                error: data.message,
                strategy: 'data-url'
              };
            }
          }
          throw new Error(data?.message || `HTTP error! status: ${response.status}`);
        }

        if (data.success && data.url) {
          return {
            url: data.url,
            totalPages: data.totalPages,
            // ✅ Use adjusted values from server
            actualStartPage: data.actualStartPage || startPage,
            actualEndPage: data.actualEndPage || data.adjustedEndPage || endPage,
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
        const rangeUrl = `${baseUrl}/range?startPage=${startPage}&endPage=${endPage}`;
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
      console.error(`Error loading range ${startPage}-${endPage}:`, error);
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
        const initialEndPage = 5;

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
      checkAndLoadMorePages()
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
            {/* <Loader2 size={24} className="spinner" /> */}
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        {/* Spinner */}
        <motion.div
          className="flex items-center justify-center rounded-full bg-blue-50 p-4"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2
            size={40}
            className="text-blue-600"
          />
        </motion.div>

        {/* Text */}
        <motion.p
          className="text-sm font-medium text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading your book…
        </motion.p>

        {/* Subtext */}
        <motion.span
          className="text-xs text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          This may take a few seconds
        </motion.span>
      </div>

    );
  }

  if (error) {
    return (
      <motion.div
        className="mx-auto mt-24 max-w-md rounded-xl border border-yellow-200 bg-red-50 p-6 text-center shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h3 className="mb-2 text-xl font-semibold text-yellow-700">
          Unable to load the book
        </h3>

        <p className="mb-6 text-sm text-yellow-600">
          {error}
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Go Back
          </button>

          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`pdf-book-reader !overflow-visible ${isFullScreen ? 'pdf-book-reader--fullscreen' : ''} ${isMobile ? 'pdf-book-reader--mobile' : isTablet ? 'pdf-book-reader--tablet' : 'pdf-book-reader--desktop'
        } ${showSinglePage ? 'pdf-book-reader--single-page' : ''}`}
      initial={{ opacity: 0 }}
      // style={{ overflow: 'visible' }}
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
        <div className="w-full flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/90 backdrop-blur shadow-md px-3 py-2 sm:px-4">

          {/* ---------------- ZOOM CONTROLS ---------------- */}
          <div className="flex flex-wrap items-center gap-2">

            {/* Zoom buttons */}
            <div className="flex items-center rounded-lg border bg-gray-50 overflow-hidden">
              <button
                onClick={zoomOut}
                disabled={zoomLevel <= 0.5}
                title="Zoom Out"
                className="p-2 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ZoomOut size={18} />
              </button>

              <button
                onClick={resetZoom}
                title="Reset Zoom"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
              >
                {Math.round(zoomLevel * 100)}%
              </button>

              <button
                onClick={zoomIn}
                disabled={zoomLevel >= 3}
                title="Zoom In"
                className="p-2 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ZoomIn size={18} />
              </button>
            </div>

            {/* Zoom presets */}
            <div className="hidden sm:flex items-center gap-1">
              {[
                { label: "Fit", action: setZoomToFit, active: Math.abs(zoomLevel - 1) < 0.1 },
                { label: "Width", action: setZoomToWidth, active: Math.abs(zoomLevel - 1.2) < 0.1 },
                { label: "100%", action: setZoomToActual, active: Math.abs(zoomLevel - 1.5) < 0.1 },
                { label: "Single", action: toggleSinglePage, active: showSinglePage },
              ].map(({ label, action, active }) => (
                <button
                  key={label}
                  onClick={action}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium border transition
          ${active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ---------------- PAGE NAVIGATION ---------------- */}
          <nav className="flex items-center gap-2">

            <button
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
              className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-1 text-sm">
              <input
                type="number"
                value={currentPage}
                onChange={handlePageInput}
                min="1"
                max={numPages || 1}
                aria-label="Current page"
                className="w-16 rounded-md border px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-600">
                / {numPages || "--"}
              </span>
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage >= numPages}
              className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={20} />
            </button>
          </nav>

          {/* ---------------- FULLSCREEN ---------------- */}
          <button
            onClick={toggleFullScreen}
            title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            className="p-2 rounded-lg border hover:bg-gray-100 transition"
          >
            {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>

      </motion.header>
    </motion.div>
  );
};

export default FlipbookViewer;