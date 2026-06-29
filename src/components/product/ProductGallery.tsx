import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[3/4] bg-neutral-900 flex items-center justify-center text-neutral-500">
        Nenhuma imagem disponível
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onClick={toggleZoom}
        className="relative aspect-[3/4] bg-neutral-950 border border-black/10 overflow-hidden rounded-sm cursor-zoom-in group select-none"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full"
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transform: isZoomed ? "scale(2.25)" : "scale(1)",
              cursor: isZoomed ? "zoom-out" : "zoom-in",
              transition: isZoomed ? "none" : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
            }}
          >
            <img
              src={images[activeIdx]}
              alt={`${productName} - Vista ${activeIdx + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Shadow Overlay top & bottom */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Gallery Overlay Indicators / Controls */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-widest text-[#D9A441] uppercase rounded-sm border border-transparent">
          {activeIdx + 1} / {images.length}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          className="absolute bottom-4 right-4 p-2 bg-black/60 hover:bg-[#E7B95A] hover:text-white transition-colors rounded-full border border-transparent text-white cursor-pointer"
          aria-label={isZoomed ? "Reduzir Zoom" : "Ampliar Zoom"}
        >
          {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
        </button>

        {/* Manual Slideshow Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#E7B95A] hover:text-white text-white/80 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 border border-white/10 cursor-pointer"
              aria-label="Imagem Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#E7B95A] hover:text-white text-white/80 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 border border-white/10 cursor-pointer"
              aria-label="Próxima Imagem"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails indicator strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2.5">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIdx(idx);
                setIsZoomed(false);
              }}
              className={`relative aspect-[3/4] border overflow-hidden rounded-xs transition-all duration-300 cursor-pointer ${
                activeIdx === idx
                  ? "border-[#D9A441] ring-1 ring-[#D9A441]/50 scale-102"
                  : "border-[#E8E0D0] hover:border-[#D9A441] hover:scale-[1.01]"
              }`}
            >
              <img
                src={img}
                alt={`${productName} Miniatura ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {activeIdx !== idx && <div className="absolute inset-0 bg-black/30 hover:bg-transparent transition-colors" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
