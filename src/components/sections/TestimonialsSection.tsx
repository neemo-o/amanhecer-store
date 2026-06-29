import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "1",
    name: "Helena Bittencourt",
    role: "Colecionadora de Arte &amp; Joias",
    comment: "Adquiri o anel Solitaire Celeste e fiquei impressionada com a fluidez do metal blanc e o brilho fascinante do diamante central. Uma peça que atrai olhares sem precisar gritar por atenção. Verdadeiro luxo silencioso.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Mariana Vasconcellos",
    role: "Arquiteta e Designer de Interiores",
    comment: "A curadoria da Amanhecer Store é impecável. O atendimento de concierge me guiou na escolha dos meus brincos de esmeralda. Ela brilha lindamente com luz natural. Sinto-me empoderada toda vez que uso.",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=120&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Isadora Mendonça",
    role: "Diretora Criativa de Moda",
    comment: "Gargantilha Aurora é uma obra-prima. O acabamento artesanal é perfeito e traz uma ergonomia sensacional. O metal ouro 18k brilha de maneira muito particular sob a luz do sol. Recomendo de olhos fechados.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
  }
];

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="bg-[#FDF8F0] py-24 md:py-32 border-b border-[#E8E0D0] relative overflow-hidden">
      {/* Background decoration blur */}
      <div className="absolute right-[5%] bottom-[10%] w-[350px] h-[350px] rounded-full bg-[#E8A020]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center space-y-4 mb-20">
          <span className="font-poppins text-xs tracking-[0.3em] uppercase text-[#E8A020] font-semibold flex items-center justify-center gap-2">
            <span className="h-1 w-1 bg-[#E8A020] rounded-full" />
            Vozes de Nossos Clientes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] font-medium tracking-tight">
            Relatos de <span className="font-serif italic font-light text-[#E8A020]">Fascínio</span>
          </h2>
        </div>

        {/* Testimonial Active Display Window */}
        <div className="relative bg-white border border-[#E8E0D0] p-8 md:p-16 rounded-sm shadow-sm flex flex-col md:flex-row gap-8 md:gap-14 items-center">
          {/* Decorative quote icon */}
          <div className="absolute right-8 top-8 text-black/[0.03] pointer-events-none hidden sm:block">
            <Quote className="w-24 h-24 stroke-[1]" />
          </div>

          {/* Client Avatar Circle */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-[#E8A020]/30 p-1 bg-white">
              <img
                src={TESTIMONIALS[activeIdx].avatar}
                alt={TESTIMONIALS[activeIdx].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Glowing gold dot background */}
            <div className="absolute -bottom-2 -right-2 bg-[#E8A020] text-black rounded-full p-2 border-2 border-white">
              <Quote className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>

          {/* Comment Space with Fade In-out Animation */}
          <div className="flex-grow space-y-6 text-center md:text-left">
            <div className="flex justify-center md:justify-start space-x-1 text-[#E8A020]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <p className="font-serif italic text-base sm:text-lg text-[#1A1A1A] font-light leading-relaxed">
                  "{TESTIMONIALS[activeIdx].comment}"
                </p>
                <div>
                  <h4 className="font-display text-lg text-[#1A1A1A] font-medium tracking-wide">
                    {TESTIMONIALS[activeIdx].name}
                  </h4>
                  <p className="font-poppins text-sm tracking-widest text-[#E8A020] uppercase font-light mt-0.5">
                    {TESTIMONIALS[activeIdx].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 border border-[#E8E0D0] hover:border-[#F0A830] rounded-full text-[#6B6B6B] hover:text-[#F0A830] hover:bg-black/[0.01] transition-all duration-300"
            aria-label="Depoimento Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 border border-[#E8E0D0] hover:border-[#F0A830] rounded-full text-[#6B6B6B] hover:text-[#F0A830] hover:bg-black/[0.01] transition-all duration-300"
            aria-label="Próximo Depoimento"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
