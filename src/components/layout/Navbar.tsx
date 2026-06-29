import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Coleções", href: "#colecoes" },
    { name: "Categorias", href: "#categorias" },
    { name: "Sobre", href: "#sobre" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#FAF8F3]/90 backdrop-blur-md border-b border-[#E8E0D0] py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#inicio" className="group flex flex-col items-center select-none">
            <span className={`font-display text-lg md:text-2xl font-bold tracking-[0.25em] transition-colors duration-300 ${isScrolled ? "text-[#1A1A1A]" : "text-white"} group-hover:text-[#D9A441]`}>
              AMANHECER
            </span>
            <span className="font-poppins text-[8px] md:text-[9px] tracking-[0.4em] text-[#D9A441] -mt-1 group-hover:text-[#1A1A1A] transition-colors duration-300">
              STORE
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-sans text-sm tracking-widest transition-colors duration-300 relative py-1 group uppercase text-[11px] ${
                  isScrolled ? "text-[#1A1A1A]/80 hover:text-[#D9A441]" : "text-neutral-300 hover:text-[#D9A441]"
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D9A441] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left" />
              </a>
            ))}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:block">
            <a
              href="#categorias"
              className={`px-5 py-2.5 bg-transparent border border-[#D9A441]/40 hover:border-[#E7B95A] text-[#D9A441] hover:bg-[#D9A441] hover:text-white text-xs uppercase tracking-widest font-medium transition-all duration-300 rounded-sm ${
                isScrolled ? "hover:text-[#1A1A1A]" : ""
              }`}
            >
              Catálogo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`md:hidden transition-colors p-1 ${isScrolled ? "text-[#1A1A1A]" : "text-white"} hover:text-[#D9A441]`}
            aria-label="Abrir Menu"
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop black-overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Menu container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-[320px] bg-[#FAF8F3] border-l border-[#E8E0D0] px-8 py-10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E8E0D0] pb-6">
                  <div className="flex flex-col">
                    <span className="font-display text-lg font-bold tracking-[0.2em] text-[#1A1A1A]">
                      AMANHECER
                    </span>
                    <span className="font-poppins text-[8px] tracking-[0.4em] text-[#D9A441]">
                      STORE
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-neutral-500 hover:text-[#D9A441] transition-colors p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col space-y-6 mt-12">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-neutral-800 hover:text-[#D9A441] transition-colors duration-200 tracking-widest uppercase font-light text-[13px] flex items-center justify-between group"
                    >
                      {link.name}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#D9A441]" />
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Bottom drawer elements */}
              <div className="border-t border-[#E8E0D0] pt-8">
                <p className="font-serif italic text-xs text-neutral-500 mb-4 text-center">
                  "A elegância que nasce com você."
                </p>
                <a
                  href="#contato"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center py-3 bg-[#D9A441] hover:bg-[#E7B95A] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-sm"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
