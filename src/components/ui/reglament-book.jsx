import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ReglamentBook = ({ pdfFile }) => {
    const [numPages, setNumPages] = useState(null);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(800);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                const width = containerRef.current.clientWidth - 48; // Account for padding
                setContainerWidth(Math.min(Math.max(width, 300), 1000)); // Cap width max
            }
        };

        // Timeout to allow initial render layout calculation
        setTimeout(updateWidth, 100);

        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
        <div className="w-full flex flex-col items-center py-4 md:py-10 z-10 relative">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 lowercase text-[#1d1d1f] drop-shadow-sm">Регламент ОЭА</h2>

            <div
                className="w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden"
            >
                {/* Scrollable container for the PDF */}
                <div
                    ref={containerRef}
                    className="w-full h-[75vh] md:h-[80vh] overflow-y-auto overflow-x-hidden custom-scrollbar bg-black/5 p-4 md:p-8 flex flex-col items-center"
                >
                    <Document
                        file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex flex-col items-center gap-8 md:gap-12"
                        loading={<div className="text-gray-500 lowercase my-20 animate-pulse">Загрузка документа...</div>}
                    >
                        {Array.from(new Array(numPages || 0), (el, index) => (
                            <div key={`page_${index + 1}`} className="shadow-2xl relative bg-white rounded-lg overflow-hidden transition-transform duration-300 select-none">
                                <Page
                                    pageNumber={index + 1}
                                    width={containerWidth}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="w-full h-full object-contain pointer-events-none"
                                />
                            </div>
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    );
};

export default ReglamentBook;
