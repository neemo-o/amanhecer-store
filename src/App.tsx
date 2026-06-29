import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import BrandSection from "./components/sections/BrandSection";
import CategoriesSection from "./components/sections/CategoriesSection";
import FeaturedCollection from "./components/sections/FeaturedCollection";
import ModelsSection from "./components/sections/ModelsSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import ContactSection from "./components/sections/ContactSection";
import ProductModal from "./components/product/ProductModal";
import { Product } from "./types";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] flex flex-col justify-between overflow-x-hidden relativeSelection selection:bg-[#D4AF37] selection:text-black">
      {/* Dynamic luxury layout grids background lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.05]">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 grid grid-cols-4 gap-6">
          <div className="border-x border-black/10 h-full" />
          <div className="border-r border-black/10 h-full" />
          <div className="border-r border-black/10 h-full" />
          <div className="border-r border-black/10 h-full" />
        </div>
      </div>

      <Navbar />

      <main className="flex-grow z-10">
        <HeroSection />
        <BrandSection />
        <CategoriesSection onProductSelect={handleProductSelect} />
        <FeaturedCollection />
        <ModelsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Fullscreen premium inspection modal */}
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
}
