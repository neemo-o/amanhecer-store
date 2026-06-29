import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "motion/react";
import { Product } from "../../types";
import ProductGrid from "../product/ProductGrid";
import { Sparkles, ShoppingBag } from "lucide-react";

interface CategoriesSectionProps {
  onProductSelect: (product: Product) => void;
}

export default function CategoriesSection({
  onProductSelect,
}: CategoriesSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const productListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products API:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    const smallScreen = window.matchMedia("(max-width: 768px)");
    const tabletScreen = window.matchMedia(
      "(min-width: 769px) and (max-width: 1024px)",
    );

    const updateItemsPerPage = () => {
      if (smallScreen.matches) {
        setItemsPerPage(4);
      } else if (tabletScreen.matches) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(8);
      }
    };

    updateItemsPerPage();
    smallScreen.addEventListener("change", updateItemsPerPage);
    tabletScreen.addEventListener("change", updateItemsPerPage);
    return () => {
      smallScreen.removeEventListener("change", updateItemsPerPage);
      tabletScreen.removeEventListener("change", updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, itemsPerPage]);

  useEffect(() => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  // Dynamically build filter tabs based on categories present in the fetched products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedFilter === "todos") return true;
      return product.category === selectedFilter;
    });
  }, [products, selectedFilter]);

  const filterTabs = useMemo(() => {
    const baseTabs = [{ label: "Todos os acessórios", value: "todos" }];
    const categoryMap: Record<string, string> = {
      aneis: "Anéis",
      colares: "Colares",
      brincos: "Brincos",
      pulseiras: "Pulseiras",
      relogios: "Relógios",
    };
    const presentCategories = new Set(products.map((p) => p.category));
    for (const [cat, label] of Object.entries(categoryMap)) {
      if (presentCategories.has(cat)) {
        baseTabs.push({ label, value: cat });
      }
    }
    return baseTabs;
  }, [products]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section
      id="categorias"
      className="relative bg-[#FDF8F0] py-20 md:py-28 scroll-mt-20"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((id) => (
              <div
                key={id}
                className="animate-pulse space-y-4 rounded-3xl overflow-hidden bg-white/80 p-4 shadow-sm border border-[#E8E0D0]"
              >
                <div className="aspect-[3/4] bg-neutral-900 rounded-xl" />
                <div className="space-y-2 py-3">
                  <div className="h-2.5 bg-neutral-900 rounded-sm w-1/4" />
                  <div className="h-4 bg-neutral-900 rounded-sm w-3/4" />
                  <div className="h-3.5 bg-neutral-900 rounded-sm w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div ref={productListRef} className="space-y-10">
              <ProductGrid
                products={paginatedProducts}
                onProductSelect={onProductSelect}
                selectedCategoryFilter={selectedFilter}
                emptyMessage={
                  filteredProducts.length === 0
                    ? "Nenhum produto corresponde ao filtro selecionado."
                    : ""
                }
              />
            </div>

            <div className="mt-10 flex flex-col gap-3 items-center justify-between sm:flex-row sm:gap-0 border-t border-[#E8E0D0]/70 pt-8">
              <div className="text-center sm:text-left text-sm sm:text-base text-[#6B6B6B]">
                Mostrando {paginatedProducts.length} de{" "}
                {filteredProducts.length} produtos
                {filteredProducts.length > 0 &&
                  ` — página ${currentPage} de ${totalPages}`}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center rounded-full border border-[#E8E0D0] bg-white px-4 py-2 text-sm font-medium text-[#1A1A1A] transition hover:border-[#E8A020] hover:text-[#E8A020] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Anterior
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center rounded-full border border-[#E8E0D0] bg-white px-4 py-2 text-sm font-medium text-[#1A1A1A] transition hover:border-[#E8A020] hover:text-[#E8A020] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Próxima
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
