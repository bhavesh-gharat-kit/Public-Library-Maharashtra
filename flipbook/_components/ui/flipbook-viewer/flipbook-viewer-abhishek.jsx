// 'use client';
// import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

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

// import HTMLFlipBook from "react-pageflip";
// import { motion, AnimatePresence } from "framer-motion";
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
//   RotateCcw,
//   AlertCircle,
//   ArrowLeft,
//   RefreshCw,
// } from "lucide-react";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// import "./FlipbookViewer.css";

// const FlipbookViewer = ({
//   baseUrl,
//   fileUrl,
//   bookId,
//   initialPagesToLoad,
//   pagesPerChunk,
//   loadMoreThreshold,
//   onPageChange,
//   onBookLoaded,
//   onError,
// }) => {
//   const [bookInfo, setBookInfo] = useState(null);
//   const [numPages, setNumPages] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);

//   // Zoom state
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [showSinglePage, setShowSinglePage] = useState(false);

//   // Progressive loading state
//   const [loadedRanges, setLoadedRanges] = useState([]);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [pdfChunks, setPdfChunks] = useState({});
//   const [loadingStrategy, setLoadingStrategy] = useState('data-url');

//   const flipBookRef = useRef(null);
//   const containerRef = useRef(null);
//   const resizeTimeoutRef = useRef(null);

//   // Calculate base dimensions
//   const baseDimensions = useMemo(() => {
//     const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
//     const containerHeight = containerRef.current?.clientHeight || window.innerHeight;

//     const mobile = containerWidth < 768;
//     const tablet = containerWidth >= 768 && containerWidth < 1024;

//     setIsMobile(mobile);
//     setIsTablet(tablet);

//     let baseWidth, baseHeight;

//     if (mobile) {
//       baseWidth = Math.min(containerWidth - 40, 350);
//       baseHeight = baseWidth * 1.414;
//     } else if (tablet) {
//       baseWidth = Math.min(containerWidth - 100, 500);
//       baseHeight = baseWidth * 1.414;
//     } else {
//       baseWidth = Math.min(containerWidth - 160, 600);
//       baseHeight = baseWidth * 1.414;
//     }

//     return { width: baseWidth, height: baseHeight };
//   }, []);

//   // Calculate zoomed dimensions
//   const pageDimensions = useMemo(() => {
//     const zoomedWidth = Math.round(baseDimensions.width * zoomLevel);
//     const zoomedHeight = Math.round(baseDimensions.height * zoomLevel);
//     return { width: zoomedWidth, height: zoomedHeight };
//   }, [baseDimensions, zoomLevel]);

//   // Auto single-page mode when zoomed
//   useEffect(() => {
//     setShowSinglePage(zoomLevel > 1.5);
//   }, [zoomLevel]);

//   // PDF options
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

//   // Cleanup blob URLs
//   useEffect(() => {
//     return () => {
//       Object.values(pdfChunks).forEach(chunk => {
//         if (chunk.url?.startsWith('blob:')) {
//           URL.revokeObjectURL(chunk.url);
//         }
//       });
//     };
//   }, [pdfChunks]);

//   // Zoom controls
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

//   // Handle resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
//       resizeTimeoutRef.current = setTimeout(() => {
//         setZoomLevel(prev => prev);
//       }, 150);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
//     };
//   }, []);

//   // Load PDF range
//   const loadPdfRange = async (startPage, endPage, forceStrategy = null) => {
//     const strategy = forceStrategy || loadingStrategy;

//     try {
//       if (strategy === 'data-url') {
//         const rangeUrl = `${fileUrl}/range-json?startPage=${startPage}&endPage=${endPage}`;
//         const response = await fetch(rangeUrl);
//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data?.message || `HTTP error! status: ${response.status}`);
//         }

//         if (data.success && data.url) {
//           return { url: data.url, totalPages: data.totalPages, strategy: 'data-url' };
//         } else if (data.success === false && data.message?.includes('too large')) {
//           setLoadingStrategy('blob');
//           return await loadPdfRange(startPage, endPage, 'blob');
//         } else {
//           throw new Error(data.message || "Failed to load PDF range");
//         }
//       } else {
//         const rangeUrl = `${baseUrl}/books/read-book/${bookId}/range?startPage=${startPage}&endPage=${endPage}`;
//         const response = await fetch(rangeUrl);

//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//         const pdfBytes = await response.arrayBuffer();
//         const blobUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
//         const totalPages = response.headers.get('X-Total-Pages');

//         return { url: blobUrl, totalPages: totalPages ? parseInt(totalPages) : null, strategy: 'blob' };
//       }
//     } catch (error) {
//       console.error(`Error loading range:`, error);
//       throw error;
//     }
//   };

//   // Fetch initial book
//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const result = await loadPdfRange(1, 2);

//         const bookData = {
//           id: bookId,
//           title: `Book ${bookId}`,
//           author: "Unknown Author",
//           totalPages: result.totalPages || 0,
//           publicId: bookId
//         };

//         setBookInfo(bookData);
//         setNumPages(result.totalPages || 0);

//         setPdfChunks({
//           ['1-2']: {
//             url: result.url,
//             strategy: result.strategy,
//             startPage: 1,
//             endPage: 2
//           }
//         });

//         setLoadedRanges([{ start: 1, end: 2 }]);
//       } catch (err) {
//         console.error('Fetch book error:', err);
//         setError(err.message || "Failed to load book");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (bookId) fetchBook();
//   }, [bookId]);

//   // Load more pages
//   const loadMorePages = async (startPage, endPage) => {
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
//         [chunkKey]: { url: result.url, strategy: result.strategy, startPage, endPage }
//       }));

//       setLoadedRanges(prev => [...prev, { start: startPage, end: endPage }]);
//       return true;
//     } catch (error) {
//       console.error("Error loading more pages:", error);
//       return false;
//     } finally {
//       setIsLoadingMore(false);
//     }
//   };

//   // Check and load more pages
//   const checkAndLoadMorePages = useCallback(async (currentPageNum) => {
//     if (!bookId || isLoadingMore) return;

//     const currentRange = loadedRanges[loadedRanges.length - 1];
//     if (!currentRange) return;

//     const pagesLeftInRange = currentRange.end - currentPageNum;

//     if (pagesLeftInRange <= 2 && currentRange.end < numPages) {
//       const nextStart = currentRange.end + 1;
//       const nextEnd = Math.min(currentRange.end + 5, numPages);
//       await loadMorePages(nextStart, nextEnd);
//     }
//   }, [loadedRanges, numPages, isLoadingMore, bookId]);

//   // Navigation
//   const goToPreviousPage = useCallback(() => {
//     setCurrentPage(prev => {
//       const newPage = Math.max(1, prev - 1);
//       checkAndLoadMorePages(newPage);
//       if (flipBookRef.current && !showSinglePage) {
//         flipBookRef.current.pageFlip().flipPrev();
//       }
//       return newPage;
//     });
//   }, [checkAndLoadMorePages, showSinglePage]);

//   const goToNextPage = useCallback(() => {
//     setCurrentPage(prev => {
//       const newPage = Math.min(numPages, prev + 1);
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

//   // Sync flipbook
//   useEffect(() => {
//     if (flipBookRef.current?.pageFlip() && !showSinglePage) {
//       const flipbookCurrentPage = flipBookRef.current.pageFlip().getCurrentPageIndex();
//       if (flipbookCurrentPage + 1 !== currentPage) {
//         flipBookRef.current.pageFlip().flip(currentPage - 1);
//       }
//     }
//   }, [currentPage, showSinglePage]);

//   // Page utilities
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

//   // Page renderers
//   const renderSinglePage = useCallback((pageNumber) => {
//     const pageLoaded = isPageLoaded(pageNumber);
//     const pdfFileInfo = getPdfFileForPage(pageNumber);

//     if (!pageLoaded || !pdfFileInfo) {
//       return (
//         <div key={pageNumber} className="flex flex-col items-center justify-center w-full h-96 bg-gray-50 rounded-lg border border-gray-200">
//           <Loader2 size={28} className="animate-spin text-gray-400 mb-3" />
//           <span className="text-sm text-gray-500">Loading page {pageNumber}...</span>
//         </div>
//       );
//     }

//     return (
//       <div key={pageNumber} className="pdf-single-page relative bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
//         <Document
//           file={pdfFileInfo.url}
//           loading={
//             <div className="flex flex-col items-center justify-center h-96 bg-gray-50">
//               <Loader2 size={28} className="animate-spin text-gray-400 mb-3" />
//               <span className="text-sm text-gray-500">Loading PDF...</span>
//             </div>
//           }
//           error={
//             <div className="flex flex-col items-center justify-center h-96 bg-red-50">
//               <AlertCircle size={28} className="text-red-400 mb-3" />
//               <span className="text-sm text-red-600">Error loading PDF</span>
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
//               <div className="flex flex-col items-center justify-center h-96 bg-gray-50">
//                 <Loader2 size={28} className="animate-spin text-gray-400 mb-3" />
//                 <span className="text-sm text-gray-500">Rendering page {pageNumber}...</span>
//               </div>
//             }
//             className="pdf-page-content"
//           />
//         </Document>
//         <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
//           {pageNumber}
//         </div>
//       </div>
//     );
//   }, [isPageLoaded, getPdfFileForPage, pdfOptions, pageDimensions.width]);

//   const renderFlipbookPage = useCallback((pageNumber) => {
//     const pageLoaded = isPageLoaded(pageNumber);
//     const pdfFileInfo = getPdfFileForPage(pageNumber);

//     if (!pageLoaded || !pdfFileInfo) {
//       return (
//         <div key={pageNumber} className="pdf-flip-page flex flex-col items-center justify-center bg-gray-50">
//           <Loader2 size={24} className="animate-spin text-gray-400 mb-2" />
//           <span className="text-xs text-gray-500">Loading page {pageNumber}...</span>
//         </div>
//       );
//     }

//     return (
//       <div key={pageNumber} className="pdf-flip-page relative bg-white">
//         <Document
//           file={pdfFileInfo.url}
//           loading={
//             <div className="flex flex-col items-center justify-center h-full bg-gray-50">
//               <Loader2 size={24} className="animate-spin text-gray-400 mb-2" />
//               <span className="text-xs text-gray-500">Loading PDF...</span>
//             </div>
//           }
//           error={
//             <div className="flex flex-col items-center justify-center h-full bg-red-50">
//               <AlertCircle size={24} className="text-red-400 mb-2" />
//               <span className="text-xs text-red-600">Error</span>
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
//               <div className="flex flex-col items-center justify-center h-full bg-gray-50">
//                 <Loader2 size={24} className="animate-spin text-gray-400 mb-2" />
//                 <span className="text-xs text-gray-500">Rendering...</span>
//               </div>
//             }
//             className="pdf-page-content"
//           />
//         </Document>
//         <div className="absolute bottom-2 right-3 bg-black/60 text-white text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
//           {pageNumber}
//         </div>
//       </div>
//     );
//   }, [isPageLoaded, getPdfFileForPage, pdfOptions, pageDimensions.width]);

//   // Generate pages
//   const pages = useMemo(() => {
//     if (!numPages) return [];
//     const maxLoadedPage = loadedRanges.reduce((max, range) => Math.max(max, range.end), 0);
//     return Array.from({ length: Math.min(maxLoadedPage, numPages) }, (_, i) => i + 1);
//   }, [numPages, loadedRanges]);

//   // Fullscreen
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
//       console.error("Fullscreen error:", err);
//     }
//   }, []);

//   // Page input
//   const handlePageInput = useCallback((e) => {
//     const val = parseInt(e.target.value);
//     if (!isNaN(val) && val >= 1 && val <= numPages) {
//       setCurrentPage(val);
//       checkAndLoadMorePages(val);
//       if (flipBookRef.current && !showSinglePage) {
//         flipBookRef.current.pageFlip().flip(val - 1);
//       }
//     }
//   }, [numPages, checkAndLoadMorePages, showSinglePage]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.ctrlKey || e.metaKey) {
//         if (e.key === '=') { e.preventDefault(); zoomIn(); }
//         else if (e.key === '-') { e.preventDefault(); zoomOut(); }
//         else if (e.key === '0') { e.preventDefault(); resetZoom(); }
//       } else {
//         if (e.key === 'ArrowLeft') goToPreviousPage();
//         if (e.key === 'ArrowRight') goToNextPage();
//         if (e.key === 'Escape' && isFullScreen) toggleFullScreen();
//       }
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [goToPreviousPage, goToNextPage, isFullScreen, toggleFullScreen, zoomIn, zoomOut, resetZoom]);

//   // Loading State
//   if (loading) {
//     return (
//       <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
//         <motion.div
//           className="relative"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
//             <BookOpen size={28} className="text-white" />
//           </div>
//           <motion.div
//             className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//           >
//             <Loader2 size={14} className="text-blue-600" />
//           </motion.div>
//         </motion.div>

//         <motion.div
//           className="text-center"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <p className="text-base font-semibold text-slate-700 mb-1">Loading your book</p>
//           <p className="text-sm text-slate-500">Preparing the reader experience...</p>
//         </motion.div>

//         <motion.div
//           className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           <motion.div
//             className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
//             initial={{ width: "0%" }}
//             animate={{ width: "100%" }}
//             transition={{ duration: 2, repeat: Infinity }}
//           />
//         </motion.div>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-6">
//         <motion.div
//           className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
//           initial={{ opacity: 0, y: 20, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <div className="p-8 text-center">
//             <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center border border-amber-200">
//               <AlertCircle size={32} className="text-amber-600" />
//             </div>

//             <h3 className="text-xl font-bold text-slate-800 mb-2">Unable to Load Book</h3>
//             <p className="text-sm text-slate-500 mb-6 leading-relaxed">{error}</p>

//             <div className="flex gap-3 justify-center">
//               <button
//                 onClick={() => window.history.back()}
//                 className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
//               >
//                 <ArrowLeft size={16} />
//                 Go Back
//               </button>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-blue-500/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               >
//                 <RefreshCw size={16} />
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       ref={containerRef}
//       className={`
//         relative min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 
//         rounded-xl border border-slate-200 overflow-hidden
//         ${isFullScreen ? 'fixed inset-0 z-50 rounded-none border-none bg-slate-900' : ''}
//       `}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.4 }}
//     >
//       {/* Toolbar */}
//       <motion.header
//         className={`
//           sticky top-0 z-40 backdrop-blur-xl border-b
//           ${isFullScreen
//             ? 'bg-slate-900/90 border-slate-700'
//             : 'bg-white/80 border-slate-200'
//           }
//         `}
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.1 }}
//       >
//         <div className="flex items-center justify-between px-3 py-2 md:px-5 md:py-3 gap-2 flex-wrap">
//           {/* Left: View Mode Indicator */}
//           <div className={`hidden sm:flex items-center gap-2 text-sm ${isFullScreen ? 'text-slate-300' : 'text-slate-600'}`}>
//             {showSinglePage ? (
//               <><FileText size={16} /><span className="font-medium">Single Page</span></>
//             ) : (
//               <><BookOpen size={16} /><span className="font-medium">Flipbook</span></>
//             )}
//             <span className="text-slate-400">•</span>
//             <span className="font-semibold">{Math.round(zoomLevel * 100)}%</span>
//           </div>

//           {/* Center: Navigation */}
//           <nav className="flex items-center gap-1 md:gap-2">
//             <button
//               onClick={goToPreviousPage}
//               disabled={currentPage <= 1}
//               aria-label="Previous page"
//               className={`
//                 p-2 md:p-2.5 rounded-xl transition-all duration-200
//                 disabled:opacity-40 disabled:cursor-not-allowed
//                 ${isFullScreen
//                   ? 'text-white hover:bg-white/10 active:bg-white/20'
//                   : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
//                 }
//               `}
//             >
//               <ChevronLeft size={20} />
//             </button>

//             <div className={`
//               flex items-center gap-2 px-3 py-1.5 rounded-xl
//               ${isFullScreen ? 'bg-white/10' : 'bg-slate-100'}
//             `}>
//               <input
//                 type="number"
//                 value={currentPage}
//                 onChange={handlePageInput}
//                 min="1"
//                 max={numPages || 1}
//                 aria-label="Current page"
//                 className={`
//                   w-12 text-center font-semibold text-sm bg-transparent outline-none
//                   ${isFullScreen ? 'text-white' : 'text-slate-800'}
//                 `}
//               />
//               <span className={`text-sm ${isFullScreen ? 'text-slate-400' : 'text-slate-500'}`}>
//                 / {numPages || '—'}
//               </span>
//             </div>

//             <button
//               onClick={goToNextPage}
//               disabled={currentPage >= numPages}
//               aria-label="Next page"
//               className={`
//                 p-2 md:p-2.5 rounded-xl transition-all duration-200
//                 disabled:opacity-40 disabled:cursor-not-allowed
//                 ${isFullScreen
//                   ? 'text-white hover:bg-white/10 active:bg-white/20'
//                   : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
//                 }
//               `}
//             >
//               <ChevronRight size={20} />
//             </button>
//           </nav>

//           {/* Right: Controls */}
//           <div className="flex items-center gap-1 md:gap-2">
//             {/* Zoom Controls */}
//             <div className={`
//               flex items-center gap-0.5 p-1 rounded-xl
//               ${isFullScreen ? 'bg-white/10' : 'bg-slate-100'}
//             `}>
//               <button
//                 onClick={zoomOut}
//                 disabled={zoomLevel <= 0.5}
//                 aria-label="Zoom out"
//                 className={`
//                   p-1.5 md:p-2 rounded-lg transition-all duration-200
//                   disabled:opacity-40 disabled:cursor-not-allowed
//                   ${isFullScreen
//                     ? 'text-white hover:bg-white/10'
//                     : 'text-slate-600 hover:bg-white hover:shadow-sm'
//                   }
//                 `}
//               >
//                 <ZoomOut size={16} />
//               </button>

//               <button
//                 onClick={resetZoom}
//                 aria-label="Reset zoom"
//                 className={`
//                   px-2 py-1 text-xs font-semibold rounded-lg transition-all duration-200
//                   ${isFullScreen
//                     ? 'text-white hover:bg-white/10'
//                     : 'text-slate-600 hover:bg-white hover:shadow-sm'
//                   }
//                 `}
//               >
//                 {Math.round(zoomLevel * 100)}%
//               </button>

//               <button
//                 onClick={zoomIn}
//                 disabled={zoomLevel >= 3}
//                 aria-label="Zoom in"
//                 className={`
//                   p-1.5 md:p-2 rounded-lg transition-all duration-200
//                   disabled:opacity-40 disabled:cursor-not-allowed
//                   ${isFullScreen
//                     ? 'text-white hover:bg-white/10'
//                     : 'text-slate-600 hover:bg-white hover:shadow-sm'
//                   }
//                 `}
//               >
//                 <ZoomIn size={16} />
//               </button>
//             </div>

//             {/* View Mode Toggle */}
//             <button
//               onClick={toggleSinglePage}
//               aria-label={showSinglePage ? "Switch to flipbook view" : "Switch to single page view"}
//               className={`
//                 hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200
//                 ${showSinglePage
//                   ? isFullScreen
//                     ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
//                     : 'bg-blue-50 text-blue-700 border border-blue-200'
//                   : isFullScreen
//                     ? 'bg-white/10 text-white hover:bg-white/20'
//                     : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
//                 }
//               `}
//             >
//               {showSinglePage ? <FileText size={14} /> : <BookOpen size={14} />}
//               <span className="hidden md:inline">{showSinglePage ? 'Single' : 'Book'}</span>
//             </button>

//             {/* Fullscreen Toggle */}
//             <button
//               onClick={toggleFullScreen}
//               aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
//               className={`
//                 p-2 md:p-2.5 rounded-xl transition-all duration-200
//                 ${isFullScreen
//                   ? 'text-white bg-white/10 hover:bg-white/20'
//                   : 'text-slate-600 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md shadow-blue-500/20'
//                 }
//               `}
//             >
//               {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
//             </button>
//           </div>
//         </div>
//       </motion.header>

//       {/* Main Viewer */}
//       <main className={`
//         flex flex-col items-center justify-center p-4 md:p-8
//         ${showSinglePage ? 'justify-start overflow-auto' : ''}
//         ${isFullScreen ? 'min-h-[calc(100vh-60px)]' : 'min-h-[70vh]'}
//       `}>
//         {showSinglePage ? (
//           <motion.div
//             key="single-page-view"
//             className="w-full flex justify-center py-4"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {renderSinglePage(currentPage)}
//           </motion.div>
//         ) : (
//           <AnimatePresence mode="wait">
//             {pages.length > 0 && (
//               <motion.div
//                 key="flipbook-view"
//                 className="flipbook-container"
//                 initial={{ opacity: 0, scale: 0.97 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <HTMLFlipBook
//                   width={pageDimensions.width}
//                   height={pageDimensions.height}
//                   minWidth={300}
//                   maxWidth={1200}
//                   minHeight={400}
//                   maxHeight={1600}
//                   size="stretch"
//                   maxShadowOpacity={0.25}
//                   showCover={true}
//                   mobileScrollSupport={true}
//                   flippingTime={700}
//                   className="flipbook-instance"
//                   ref={flipBookRef}
//                   onFlip={handleFlip}
//                   startPage={currentPage - 1}
//                   usePortrait={true}
//                   drawShadow={true}
//                   autoSize={true}
//                 >
//                   {pages.map(renderFlipbookPage)}
//                 </HTMLFlipBook>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         )}

//         {/* Loading More Indicator */}
//         <AnimatePresence>
//           {isLoadingMore && (
//             <motion.div
//               className={`
//                 fixed bottom-6 left-1/2 -translate-x-1/2 z-50
//                 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg
//                 ${isFullScreen ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 border border-slate-200'}
//               `}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//             >
//               <Loader2 size={14} className="animate-spin" />
//               <span className="text-xs font-medium">Loading more pages...</span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>
//     </motion.div>
//   );
// };

// export default FlipbookViewer;


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
        // const rangeUrl = `${baseUrl}/books/read-book/${bookId}/range-json?startPage=${startPage}&endPage=${endPage}`;
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
        const rangeUrl = `${baseUrl}/books/read-book/${bookId}/range?startPage=${startPage}&endPage=${endPage}`;
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
        const initialEndPage = 1;

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