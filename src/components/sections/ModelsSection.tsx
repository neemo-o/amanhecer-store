import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Camera, Eye, ArrowLeftRight } from "lucide-react";

const EDITORIALS = [
  {
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
    caption: "Retrato Luminoso",
    collection: "Aurora Oro"
  },
  {
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1000&auto=format&fit=crop",
    caption: "Atitude Natural",
    collection: "Serene Platine"
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    caption: "Magnificência Brilhante",
    collection: "Solitaires Haute"
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    caption: "Formas Puristas",
    collection: "Noblesse Blanc"
  },
  {
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000&auto=format&fit=crop",
    caption: "Vanguarda Clássica",
    collection: "Chronos Classic"
  }
];

export default function ModelsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Implement optional slow auto-scroll loop for visual engagement
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animFrame: number;
    let scrollPos = 0;
    const speed = 0.5; // slow moving scroll speed

    const scrollLoop = () => {
      if (!el) return;
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth - el.clientWidth) {
        scrollPos = 0; // reset
      }
      el.scrollLeft = scrollPos;
      animFrame = requestAnimationFrame(scrollLoop);
    };

    // Only auto scroll on screens that have scroll capabilities and when active
    const handleMouseEnter = () => cancelAnimationFrame(animFrame);
    const handleMouseLeave = () => {
      animFrame = requestAnimationFrame(scrollLoop);
    };

    animFrame = requestAnimationFrame(scrollLoop);

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("touchstart", handleMouseEnter);

    return () => {
      cancelAnimationFrame(animFrame);
      if (el) {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.removeEventListener("touchstart", handleMouseEnter);
      }
    };
  }, []);

  return (
    <section className="bg-[#FDF8F0] py-24 overflow-hidden border-b border-[#E8E0D0] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 relative z-10">
        <div className="space-y-4">
          <span className="font-poppins text-xs tracking-[0.3em] uppercase text-[#E8A020] font-semibold flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#E8A020]" />
            Campanha Haute Couture
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] font-medium tracking-tight">
            Editorial <span className="font-serif italic font-light text-[#E8A020]">Amanhecer</span>
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-[#6B6B6B] max-w-sm">
            Um ensaio fotográfico que capta a simbiose perfeita entre a silhueta humana e o resplendor de nossas joias.
          </p>
        </div>

        {/* Swipe prompt hint icon */}
        <div className="inline-flex items-center space-x-2 text-[#6B6B6B] font-poppins text-xs tracking-[0.2em] uppercase select-none pb-1">
          <ArrowLeftRight className="w-4 h-4 text-[#E8A020]" />
          <span>Arraste ou sobreponha</span>
        </div>
      </div>

      {/* Horizontal overflow images track */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto space-x-6 px-6 md:px-12 scrollbar-none pb-12 cursor-grab active:cursor-grabbing relative select-none scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {EDITORIALS.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[280px] sm:w-[350px] aspect-[3/4] overflow-hidden rounded-sm bg-white border border-[#E8E0D0] relative group"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.caption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
            />
            
            {/* Satin gradient elegant mask layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Inner tiny overlay bounding frame */}
            <div className="absolute inset-4 border border-[#E8A020]/0 group-hover:border-[#E8A020]/20 transition-all duration-700 pointer-events-none" />

            {/* Float details text on Hover */}
            <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end text-left transition-all duration-500 group-hover:translate-y-[-4px]">
              <span className="font-poppins text-xs tracking-[0.3em] text-[#E8A020] uppercase font-light mb-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                {item.collection}
              </span>
              <h3 className="font-display text-lg sm:text-xl text-white font-medium tracking-wide">
                {item.caption}
              </h3>
              
              <div className="overflow-hidden mt-3 h-0 group-hover:h-5.5 transition-all duration-500 flex items-center space-x-2 text-[#E8A020]">
                <Eye className="w-4 h-4 shrink-0" />
                <span className="font-poppins text-xs tracking-[0.2em] uppercase font-semibold">
                  Ver Coleção
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
