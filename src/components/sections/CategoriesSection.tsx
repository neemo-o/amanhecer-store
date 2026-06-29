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
        console.error("Failed to fetch products API:", err);
        // No local seed – show empty list or error state
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Dynamically build filter tabs based on categories present in the fetched products
  const filterTabs = useMemo(() => {
    // Always include the "todos" tab
    const baseTabs = [{ label: "Todos os acessórios", value: "todos" }];
    const categoryMap: Record<string, string> = {
      aneis: "Anéis",
      colares: "Colares",
      brincos: "Brincos",
      pulseiras: "Pulseiras",
      relogios: "Relógios",
    };
    // Determine which categories exist in the product list
    const presentCategories = new Set(products.map((p) => p.category));
    for (const [cat, label] of Object.entries(categoryMap)) {
      if (presentCategories.has(cat)) {
        baseTabs.push({ label, value: cat });
      }
    }
    return baseTabs;
  }, [products]);

  return (
    <section
      id="categorias"
      className="relative bg-[#FDF8F0] py-24 md:py-32 scroll-mt-20"
    >
      {/* Decorative vertical coordinates overlay */}
      <div className="absolute left-[5%] top-1/4 h-72 w-[1px] bg-gradient-to-b from-[#E8A020]/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Introduction */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-[#E8A020]/10 border border-[#E8E0D0] rounded-full"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E8A020]" />
            <span className="font-poppins text-sm tracking-widest text-[#E8A020] uppercase font-semibold">
              Catálogo de Acessórios
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] tracking-tight leading-tight"
          >
            Nossos{" "}
            <span className="font-serif italic font-light text-[#E8A020]">
              Produtos
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif italic text-xl text-[#6B6B6B] max-w-xl mx-auto"
          >
            Descubra peças e produtos que unem beleza, qualidade e sofisticação
            para todas as ocasiões.
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
                className={`relative px-4 sm:px-6 py-2.5 text-xs sm:text-sm tracking-widest uppercase rounded-sm transition-all duration-300 select-none ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                }`}
              >
                {/* Framer motion active fill effect overlay */}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterTab"
                    className="absolute inset-0 bg-[#E8A020] rounded-sm -z-0"
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
