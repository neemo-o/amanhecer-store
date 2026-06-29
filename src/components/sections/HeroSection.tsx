import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1920&auto=format&fit=crop",
    title: "A elegância que nasce com você.",
    subtitle: "Joias selecionadas para transformar momentos em memórias eternas."
  },
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop",
    title: "O reflexo da sua raridade.",
    subtitle: "Criações impecáveis esculpidas com a pureza dos metais nobres."
  },
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop",
    title: "Sua história, eternizada.",
    subtitle: "Sinta a sofisticação da alta joalheria em cada detalhe delicado."
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const resetAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
    autoplayTimer.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    resetAutoplay();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    resetAutoplay();
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section id="inicio" className="relative w-full h-screen overflow-hidden bg-black flex items-center">
      {/* Background carousel with Ken Burns zooming element */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.image}
              alt="Modelo Joalheria Amanhecer"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center select-none"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Soft elegant darkening layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/90 via-[#000000]/55 to-[#000000]/75 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent z-10" />
      </div>

      {/* Hero content container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full mt-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center space-x-2.5 mb-6"
          >
            <span className="h-[1px] w-8 bg-[#E8A020]" />
            <span className="font-poppins text-xs md:text-xs tracking-[0.4em] text-[#E8A020] uppercase font-semibold">
              Coleção Haute Joaillerie
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-medium tracking-tight leading-[1.12] mb-6"
            >
              {currentSlide.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif italic text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-10"
            >
              {currentSlide.subtitle}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#categorias"
              className="px-8 py-4 bg-[#E8A020] hover:bg-[#F0A830] text-black font-semibold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm hover:-translate-y-0.5 text-center"
            >
              Explorar Coleção
            </a>
            <a
              href="#sobre"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 font-medium text-sm tracking-widest uppercase transition-all duration-300 rounded-sm text-center"
            >
              Nossa História
            </a>
          </motion.div>
        </div>
      </div>

      {/* Discrete slider controls overlay */}
      <div className="absolute right-6 md:right-12 bottom-12 z-20 flex items-center space-x-6">
        <div className="flex space-x-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                resetAutoplay();
              }}
              className="group p-1 relative focus:outline-none"
              aria-label={`Ir para slide ${idx + 1}`}
            >
              <div
                className={`h-1 rounded-full transition-all duration-500 ease-out ${
                  currentIndex === idx ? "w-8 bg-[#E8A020]" : "w-2 bg-white/30 group-hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />
        <div className="space-x-2 hidden sm:flex">
          <button
            onClick={handlePrev}
            className="p-2 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all text-white/70 hover:text-white"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all text-white/70 hover:text-white"
            aria-label="Próximo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Decorative vertical down signifier */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-10 z-20 hidden md:block">
        <a href="#sobre" className="flex flex-col items-center text-white/40 hover:text-white transition-colors duration-300">
          <span className="font-poppins text-xs tracking-[0.2em] uppercase mb-2">Deslizar</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-[#E8A020]" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
