import { useMemo } from "react";
import { Product } from "../../types";
import ProductCard from "./ProductCard";
import { Sparkles } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  selectedCategoryFilter: string;
}

export default function ProductGrid({
  products,
  onProductSelect,
  selectedCategoryFilter,
}: ProductGridProps) {
  // Group products by category
  const groupedProducts = useMemo(() => {
    const groups: Record<string, { label: string; items: Product[] }> = {};
    
    products.forEach((prod) => {
      // If we have a filter and it doesn't match, skip
      if (selectedCategoryFilter !== "todos" && prod.category !== selectedCategoryFilter) {
        return;
      }

      if (!groups[prod.category]) {
        groups[prod.category] = {
          label: prod.categoryLabel,
          items: [],
        };
      }
      groups[prod.category].items.push(prod);
    });

    return groups;
  }, [products, selectedCategoryFilter]);

  const categoriesOrdered = Object.keys(groupedProducts).sort();

  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-dashed border-[#E8E0D0] mb-4 text-[#6B6B6B]">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <p className="font-serif italic text-base text-[#6B6B6B]">
          Carregando catálogo dinâmico da Amanhecer Store...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-24">
      {categoriesOrdered.map((catKey) => {
        const group = groupedProducts[catKey];
        if (group.items.length === 0) return null;

        return (
          <div key={catKey} id={`categoria-${catKey}`} className="space-y-10 scroll-mt-28">
            {/* Elegant Category Header */}
            <div className="flex flex-col items-center text-center space-y-4">
              <span className="font-poppins text-[10px] tracking-[0.4em] uppercase text-[#D9A441] font-semibold">
                Alta Orfebraria
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#1A1A1A] font-medium tracking-widest relative pb-2 uppercase">
                {group.label}
                <span className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#D9A441]/50 to-transparent" />
              </h3>
              <p className="font-serif italic text-xs text-[#6B6B6B] max-w-md">
                Coleção exclusiva de {group.label.toLowerCase()} trabalhados em metais nobres e gemas selecionadas.
              </p>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {group.items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={onProductSelect}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
