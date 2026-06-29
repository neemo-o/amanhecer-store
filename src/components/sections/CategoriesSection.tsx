import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { Product } from "../../types";
import ProductGrid from "../product/ProductGrid";
import { Sparkles, ShoppingBag, Filter } from "lucide-react";

interface CategoriesSectionProps {
  onProductSelect: (product: Product) => void;
}

export default function CategoriesSection({ onProductSelect }: CategoriesSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("todos");

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products API, loading local backup data...", err);
        // Robust fallback/backup in case of offline states directly matching server seeds
        const localBackup: Product[] = [
          {
            id: "anel-aurora-ouro",
            name: "Anel Aurora Ouro 18k",
            category: "aneis",
            categoryLabel: "Anéis",
            images: ["/produtos/aneis/anel-aurora-ouro/foto1.svg"],
            description: "Anel de ouro amarelo 18k com acabamento polido, esculpido à mão para refletir o esplendor do amanhecer.",
            price: "R$ 4.800",
            details: ["Ouro Amarelo 18k", "Largura: 4mm", "Acabamento Alto Brilho", "Design Anatômico"]
          },
          {
            id: "anel-solitaire-diamante",
            name: "Anel Solitaire Diamante Celeste",
            category: "aneis",
            categoryLabel: "Anéis",
            images: ["/produtos/aneis/anel-solitaire-diamante/foto1.svg"],
            description: "O brilho lendário de um diamante central de 0.8 quilates, cravado em uma delicada coroa de ouro branco.",
            price: "R$ 14.200",
            details: ["Ouro Branco 18k", "Diamante Central 0.8ct", "Pureza VVS1", "Lapidação Brilhante"]
          },
          {
            id: "gargantilha-amanhecer",
            name: "Gargantilha Amanhecer Dourada",
            category: "colares",
            categoryLabel: "Colares",
            images: ["/produtos/colares/gargantilha-amanhecer/foto1.svg"],
            description: "Um colar em ouro 18k com elos lapidados e um pingente de topázio imperial que capta os primeiros raios de sol.",
            price: "R$ 8.500",
            details: ["Ouro Amarelo 18k", "Topázio Imperial Natural", "Fecho de Alta Segurança", "Corrente de 45cm ajustável"]
          },
          {
            id: "colar-noblesse-perolas",
            name: "Colar Noblesse de Pérolas",
            category: "colares",
            categoryLabel: "Colares",
            images: ["/produtos/colares/colar-noblesse-perolas/foto1.svg"],
            description: "Clássico atemporal unindo pérolas de água salgada perfeitamente selecionadas e fecho em filigrana de ouro.",
            price: "R$ 11.900",
            details: ["Pérolas Akoya 7.5mm", "Fecho em Ouro Amarelo 18k", "Comprimento: 50cm", "Enfiamento com Nós de Proteção"]
          },
          {
            id: "brincos-gota-esmeralda",
            name: "Brincos Gota Esmeralda Imperial",
            category: "brincos",
            categoryLabel: "Brincos",
            images: ["/produtos/brincos/brincos-gota-esmeralda/foto1.svg"],
            description: "Brincos pendentes em ouro branco com impressionantes esmeraldas colombianas lapidadas em gota e halos de brilhantes.",
            price: "R$ 18.500",
            details: ["Ouro Branco 18k", "Duas Esmeraldas Colombianas de 1.2ct cada", "Halos de Microdiamantes", "Trava de Pressão Confortável"]
          },
          {
            id: "bracelete-orvalho-ouro",
            name: "Bracelete Orvalho do Amanhecer",
            category: "pulseiras",
            categoryLabel: "Pulseiras",
            images: ["/produtos/pulseiras/bracelete-orvalho-ouro/foto1.svg"],
            description: "Design rígido e elegante em ouro amarelo, adornado com detalhes gravados à mão que imitam o frescor do orvalho.",
            price: "R$ 7.200",
            details: ["Ouro Amarelo 18k", "Formato Oval Anatômico", "Fecho Invisível Lateral", "Largura: 6mm"]
          },
          {
            id: "relogio-cronografo-lumian",
            name: "Chronos Lumian Gold",
            category: "relogios",
            categoryLabel: "Relógios",
            images: ["/produtos/relogios/relogio-cronografo-lumian/foto1.svg"],
            description: "Obra de arte da relojoaria fina. Movimento automático suíço, caixa em aço de alto impacto com detalhes banhados a ouro 18k.",
            price: "R$ 24.000",
            details: ["Movimento Automático Suíço", "Caixa de 40mm banhada a Ouro 18k", "Vidro Cristal Safira Antirreflexo", "Resistência 10 ATM"]
          }
        ];
        setProducts(localBackup);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filterTabs = [
    { label: "Todas as Joias", value: "todos" },
    { label: "Anéis", value: "aneis" },
    { label: "Colares", value: "colares" },
    { label: "Brincos", value: "brincos" },
    { label: "Pulseiras", value: "pulseiras" },
    { label: "Relógios", value: "relogios" }
  ];

  return (
    <section id="categorias" className="relative bg-[#FAF8F3] py-24 md:py-32 scroll-mt-20">
      {/* Decorative vertical coordinates overlay */}
      <div className="absolute left-[5%] top-1/4 h-72 w-[1px] bg-gradient-to-b from-[#D9A441]/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Introduction */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-[#D9A441]/10 border border-[#E8E0D0] rounded-full"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D9A441]" />
            <span className="font-poppins text-[10px] tracking-widest text-[#D9A441] uppercase font-semibold">
              Catálogo de Peças Únicas
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] tracking-tight leading-tight"
          >
            Nossas <span className="font-serif italic font-light text-[#D9A441]">Coleções</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif italic text-sm text-[#6B6B6B] max-w-xl mx-auto"
          >
            Navegue pelo nosso mostruário de designs autorais. Cada peça é uma promessa de resplendor e elegância eterna.
          </motion.p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16 max-w-4xl mx-auto border-b border-[#E8E0D0] pb-8">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value)}
                className={`relative px-4 sm:px-6 py-2.5 text-[11px] sm:text-xs tracking-widest uppercase rounded-sm transition-all duration-300 select-none ${
                    isActive
                      ? "text-black font-semibold"
                      : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                }`}
              >
                {/* Framer motion active fill effect overlay */}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterTab"
                    className="absolute inset-0 bg-[#D9A441] rounded-sm -z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Products Catalog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className="animate-pulse space-y-4">
                <div className="aspect-[3/4] bg-neutral-900 border border-white/5 rounded-sm" />
                <div className="space-y-2">
                  <div className="h-2.5 bg-neutral-900 rounded-sm w-1/4" />
                  <div className="h-4 bg-neutral-900 rounded-sm w-3/4" />
                  <div className="h-3.5 bg-neutral-900 rounded-sm w-1/3 pt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid
            products={products}
            onProductSelect={onProductSelect}
            selectedCategoryFilter={selectedFilter}
          />
        )}
      </div>
    </section>
  );
}
