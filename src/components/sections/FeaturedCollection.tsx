import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

const FEATURED_ITEMS = [
  {
    id: "gargantilha-amanhecer",
    tag: "Coleção Exclusiva",
    title: "Coleção Aurora Imperial",
    description: "Inspirada no místico desabrochar do sol sobre as colinas toscanas, esta gargantilha traz tramas contínuas esculpidas em ouro amarelo 18k e cravação central de ametista real e diamante cintilante.",
    quote: "A luz do amanhecer imortalizada em linhas fluidas que abraçam a pele com suavidade incomparável.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop",
    linkText: "Descobrir Gargantilha"
  },
  {
    id: "anel-solitaire-diamante",
    tag: "Alta Joalharia",
    title: "Eternité Diamants Celeste",
    description: "Pedras brutas de diamantes de extraordinária claridade foram selecionadas de forma cirúrgica e submetidas à lapidação brilhante de 58 facetas, apoiadas sobre uma suntuosa coroa dupla de ouro branco.",
    quote: "Uma promessa gravada na mais pura matéria mineral terrestre, feita para refletir sentimentos divinos.",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop",
    linkText: "Explorar Solitário"
  }
];

export default function FeaturedCollection() {
  return (
    <section id="colecoes" className="bg-[#F3EBDD] py-24 md:py-36 overflow-hidden border-y border-[#E8E0D0] relative">
      {/* Decorative luxury abstract elements */}
      <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D9A441]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section title */}
        <div className="text-center space-y-4 mb-24">
          <span className="font-poppins text-xs tracking-[0.3em] uppercase text-[#D9A441] font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            Curadoria Especial
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-medium tracking-tight">
            Coleções de <span className="font-serif italic font-light text-[#D9A441]">Destaque</span>
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-[#6B6B6B] max-w-md mx-auto">
            Conheça as sagas criativas que definem a alta expressão da Amanhecer Store.
          </p>
        </div>

        {/* Alternated Featured Grid Layout */}
        <div className="space-y-32 md:space-y-44">
          {FEATURED_ITEMS.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* Image panel (with alternating grid order on desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`lg:col-span-6 overflow-hidden rounded-sm border border-[#E8E0D0] relative aspect-[4/3] md:aspect-[16/11] group ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                  />
                  {/* Subtle golden grid vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 transition-opacity group-hover:opacity-60 duration-500" />
                  <div className="absolute inset-4 border border-[#D9A441]/0 group-hover:border-[#D9A441]/20 transition-all duration-700 pointer-events-none" />
                </motion.div>

                {/* Info Text Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  className={`lg:col-span-6 space-y-8 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="space-y-3">
                    <span className="font-poppins text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#D9A441] font-semibold">
                      {item.tag}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3.5xl text-[#1A1A1A] font-medium tracking-wide">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed font-light">
                    {item.description}
                  </p>

                  <blockquote className="border-l-2 border-[#D9A441] pl-5 py-1">
                    <p className="font-serif italic text-base text-neutral-700 font-light">
                      "{item.quote}"
                    </p>
                  </blockquote>

                  <div className="pt-4">
                    <a
                      href="#categorias"
                      className="inline-flex items-center space-x-3 text-xs uppercase tracking-widest font-semibold text-[#D9A441] hover:text-[#E7B95A] transition-colors duration-300 group/link"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-4 h-4 translate-x-0 group-hover/link:translate-x-1.5 transition-transform duration-300" />
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
