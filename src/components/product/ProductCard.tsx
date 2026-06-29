import { motion } from "motion/react";
import { Product } from "../../types";
import { Search } from "lucide-react";

interface ProductCardProps {
  key?: string;
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  // Use the first image or a static placeholder
  const mainImage = product.images[0] || "https://picsum.photos/seed/jewelry/500/600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
      onClick={() => onClick(product)}
      className="group bg-white border border-[#E8E0D0] hover:border-[#E8A020]/50 transition-all duration-500 rounded-sm shadow-xs overflow-hidden cursor-pointer flex flex-col h-full relative"
    >
      {/* Product Image Window */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <img
          src={mainImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Elegant hovering glass overlay with search/detail icon */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-full bg-black/85 border border-[#E8A020] flex items-center justify-center text-[#E8A020]"
          >
            <Search className="w-5 h-5 shrink-0" />
          </motion.div>
        </div>

        {/* Small Elegant Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 border border-[#E8E0D0] text-[#E8A020] font-poppins text-sm tracking-widest uppercase font-semibold">
          {product.categoryLabel}
        </div>
      </div>

      {/* Info footer */}
      <div className="p-6 flex flex-col justify-between flex-grow bg-white">
        <div>
          <h3 className="font-display text-base text-[#1A1A1A] tracking-wide font-normal group-hover:text-[#F0A830] transition-colors duration-300">
            {product.name}
          </h3>
        </div>
        
        <div className="mt-4 pt-4 border-t border-[#E8E0D0] flex items-center justify-between">
          <span className="font-mono text-xs text-[#1A1A1A] font-medium font-semibold">
            {product.price || "Sob Consulta"}
          </span>
          <span className="font-sans text-sm tracking-widest text-[#E8A020] group-hover:text-black uppercase font-medium transition-colors duration-300">
            Ver Detalhes →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
