import { motion } from "motion/react";
import { Gem, Shield, Star, Award } from "lucide-react";

export default function BrandSection() {
  const pillars = [
    {
      icon: Gem,
      title: "Curadoria Especial",
      description:
        "Selecionamos acessórios, folheados e maquiagens que unem estilo, qualidade e as principais tendências para compor sua rotina e ocasiões especiais.",
    },
    {
      icon: Star,
      title: "Elegância em Cada Detalhe",
      description:
        "Nossa coleção reúne peças versáteis e atemporais, pensadas para valorizar seu estilo com sofisticação e leveza.",
    },
    {
      icon: Shield,
      title: "Melhor Custo-Benefício",
      description:
        "Selecionamos produtos com excelente equilíbrio entre qualidade, preço e durabilidade, garantindo a melhor escolha para o seu investimento.",
    },
    {
      icon: Award,
      title: "Estilo que Inspira",
      description:
        "Cada item é selecionado para acompanhar diferentes momentos, permitindo que você expresse sua personalidade com elegância e autenticidade.",
    },
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
      transition: { duration: 0.7 }
    }
  };

  return (
    <section
      id="sobre"
      className="relative bg-[#FDF8F0] py-24 md:py-36 overflow-hidden"
    >
      {/* Abstract light gold glow backgound decor */}
      <div className="absolute right-[10%] top-[20%] w-[350px] h-[350px] rounded-full bg-[#E8A020]/5 blur-[120px] pointer-events-none" />
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
              <span className="font-poppins text-sm tracking-[0.3em] uppercase text-[#E8A020] font-semibold flex items-center gap-2">
                <span className="h-1 w-1 bg-[#E8A020] rounded-full inline-block" />
                A Casa Amanhecer
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[#1A1A1A] tracking-tight leading-tight">
                O brilho de um <br />
                <span className="font-serif italic font-light text-[#E8A020]">
                  novo amanhecer.
                </span>
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
              "A beleza está nos detalhes que expressam quem você é. Acessórios
              e maquiagens vão além de complementar o visual: realçam sua
              personalidade, elevam sua autoestima e acompanham seus momentos
              mais especiais."
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-sans text-sm text-neutral-600 leading-relaxed font-light"
            >
              A Amanhecer Store nasceu com o propósito de oferecer acessórios,
              folheados e maquiagens cuidadosamente selecionados, unindo
              elegância, qualidade e tendências para o dia a dia e ocasiões
              especiais. Cada item é escolhido para valorizar sua beleza e
              permitir que você expresse seu estilo com confiança e
              autenticidade.
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
              className="p-8 bg-white border border-[#E8E0D0] hover:border-[#E8A020]/50 rounded-sm shadow-xs transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xs bg-[#E8A020]/5 text-[#E8A020] group-hover:bg-[#F0A830] group-hover:text-white transition-colors duration-500">
                  <pillar.icon className="w-5.5 h-5.5 stroke-[1.25]" />
                </div>
                <h3 className="font-display text-lg text-[#1A1A1A] font-medium tracking-wide">
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm text-[#6B6B6B] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="h-0.5 w-full bg-[#E8A020]/10 group-hover:bg-[#F0A830] transition-all duration-500 mt-8 scale-x-0 group-hover:scale-x-100 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
