import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles, Check } from "lucide-react";
import { Product } from "../../types";
import ProductGallery from "./ProductGallery";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  // Elegantly composed message for WhatsApp concierge service
  const waMessage = `Olá! Gostaria de falar com uma consultora da Amanhecer Store sobre o acessório *${product.name}*`;
  const waUrl = `https://wa.me/554899551127?text=${encodeURIComponent(waMessage)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        {/* Backdrop Fade In */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-0"
        />

        {/* Modal Window Slide Up */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 180 }}
          className="relative bg-[#FDF8F0] border border-[#E8E0D0] rounded-sm max-w-6xl w-full max-h-[90vh] overflow-y-auto md:overflow-hidden grid grid-cols-1 md:grid-cols-12 z-10 shadow-2xl"
        >
          {/* Close button inside modal */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/70 border border-[#E8E0D0] hover:border-[#F0A830] text-[#1A1A1A] hover:text-[#F0A830] transition-all cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Advanced Img Gallery */}
          <div className="md:col-span-6 p-6 md:p-10 flex flex-col justify-center bg-[#FDF8F0] border-r border-[#E8E0D0] max-h-none md:max-h-[90vh] overflow-y-auto w-full">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Right Side: Product Details info */}
          <div className="md:col-span-6 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-none md:max-h-[90vh] bg-white">
            <div className="space-y-8">
              {/* Category label styling */}
              <div className="space-y-2 mt-4 md:mt-2">
                <span className="font-poppins text-sm tracking-[0.3em] text-[#E8A020] uppercase font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  Escolhido para Você
                </span>
                <p className="font-poppins text-sm tracking-widest text-[#E8A020] uppercase font-light">
                  {product.categoryLabel}
                </p>
                <h2 className="font-display text-2xl md:text-3xl text-[#1A1A1A] font-medium tracking-wide">
                  {product.name}
                </h2>
              </div>

              {/* Price display tag */}
              <div className="py-4 border-y border-[#E8E0D0]">
                <p className="text-sm tracking-widest uppercase text-[#6B6B6B] mb-1">
                  Preço
                </p>
                <span className="font-poppins text-xl font-medium tracking-wider text-[#1A1A1A]">
                  {product.price || "Sob Consulta"}
                </span>
                <span className="text-xs text-[#6B6B6B] font-light ml-2">
                  {" "}
                  {product.price
                    ? " - "
                    : " - Falar com consultor"}{" "}
                  
                </span>
              </div>

              {/* Description */}
              {/* <div className="space-y-3">
                <h4 className="font-sans text-sm tracking-wider uppercase text-[#E8A020] font-semibold">
                  A Essência da Peça
                </h4>
                <p className="font-serif italic text-sm text-[#1A1A1A] leading-relaxed font-light">
                  "{product.description}"
                </p>
              </div> */}

              {/* Technical Specifications */}
              {product.details && product.details.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-sans text-sm tracking-wider uppercase text-[#E8A020] font-semibold">
                    Especificações Técnicas
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-center space-x-2 text-xs text-[#6B6B6B] font-light"
                      >
                        <Check className="w-3.5 h-3.5 text-[#E8A020] shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA Interaction WhatsApp Button */}
            <div className="mt-12 space-y-4 border-t border-[#E8E0D0] pt-8">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-3 py-4 bg-[#E8A020] hover:bg-[#F0A830] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm hover:-translate-y-0.5 shadow-lg shadow-[#E8A020]/10 cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
                <span className="text-white">Solicitar via WhatsApp</span>
              </a>
              <p className="text-xs text-center text-[#6B6B6B] font-light">
                Clique para iniciar um atendimento exclusivo com a gente no WhatsApp.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
