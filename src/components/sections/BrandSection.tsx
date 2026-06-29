import { motion } from "motion/react";
import { Gem, Shield, Star, Award } from "lucide-react";

export default function BrandSection() {
  const pillars = [
    {
      icon: Gem,
      title: "Exclusividade Meticulosa",
      description: "Nossas coleções contam com peças de tiragem estritamente limitada, garantindo um design verdadeiramente único e raridade absoluta para quem as veste."
    },
    {
      icon: Star,
      title: "Elegância Atemporal",
      description: "Prezamos pelo refinamento minimalista moderno, criando designs que dialogam livremente com o passado e o futuro, transcendendo modismos passageiros."
    },
    {
      icon: Shield,
      title: "Qualidade Soberana",
      description: "Utilizamos exclusivamente metais nobres certificados com pureza extrema (Ouro 18k e Platina 950) fundidos a gemas minadas de forma ética e sustentável."
    },
    {
      icon: Award,
      title: "Alta Orfebraria",
      description: "Cada curva e encaixe de nossas joias é trabalhado sob lentes microscópicas por mestres artesãos tradicionais, unindo paixão secular e precisão técnica."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section id="sobre" className="relative bg-[#FAF8F3] py-24 md:py-36 overflow-hidden">
      {/* Abstract light gold glow backgound decor */}
      <div className="absolute right-[10%] top-[20%] w-[350px] h-[350px] rounded-full bg-[#D9A441]/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-[5%] bottom-[10%] w-[400px] h-[400px] rounded-full bg-black/[0.02] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Title with Scroll reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="font-poppins text-xs tracking-[0.3em] uppercase text-[#D9A441] font-semibold flex items-center gap-2">
                <span className="h-1 w-1 bg-[#D9A441] rounded-full inline-block" />
                A Casa Amanhecer
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[#1A1A1A] tracking-tight leading-tight">
                O brilho de um <br />
                <span className="font-serif italic font-light text-[#D9A441]">novo amanhecer.</span>
              </h2>
            </motion.div>
          </div>
          
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif italic text-lg sm:text-xl text-neutral-800 leading-relaxed font-light mb-6"
            >
              "Joias são mais do que ornamentos; são amuletos que guardam nossas histórias, carregam nossa luz e dão forma eterna ao invisível."
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-sans text-sm text-neutral-600 leading-relaxed font-light"
            >
              Nascida com o propósito de harmonizar o requinte clássico da alta joalheria internacional à leveza e frescor contemporâneos, a Amanhecer Store esculpe obras de arte com curadoria primorosa. Cada peça é pensada para realçar discretamente seu brilho pessoal, captando memórias em metais eternos.
            </motion.p>
          </div>
        </div>

        {/* Pillars Cards Grid with Scroll Reveal items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="p-8 bg-white border border-[#E8E0D0] hover:border-[#D9A441]/50 rounded-sm shadow-xs transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xs bg-[#D9A441]/5 text-[#D9A441] group-hover:bg-[#E7B95A] group-hover:text-white transition-colors duration-500">
                  <pillar.icon className="w-5.5 h-5.5 stroke-[1.25]" />
                </div>
                <h3 className="font-display text-lg text-[#1A1A1A] font-medium tracking-wide">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs text-[#6B6B6B] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="h-0.5 w-full bg-[#D9A441]/10 group-hover:bg-[#E7B95A] transition-all duration-500 mt-8 scale-x-0 group-hover:scale-x-100 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
