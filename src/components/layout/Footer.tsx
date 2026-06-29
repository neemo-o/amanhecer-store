import { Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FDF8F0] border-t border-[#E8E0D0] pt-16 pb-8 text-[#6B6B6B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        {/* Brand Col */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <img
              src="/logos/simbolo-logo-preto.png"
              alt="Amanhecer Store"
              className="h-14"
            />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-[0.2em] text-[#1A1A1A]">
                AMANHECER
              </span>
              <span className="font-poppins text-sm tracking-[0.4em] text-[#E8A020] -mt-1">
                STORE
              </span>
            </div>
          </div>
          <p className="font-serif italic text-base text-[#6B6B6B] leading-relaxed max-w-xs">
            "Brilho, elegância e beleza em cada detalhe para destacar a sua
            melhor versão."
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/amanhecerstore05/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black/5 text-[#6B6B6B] hover:text-[#F0A830] hover:bg-[#E8A020]/10 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://wa.me/554899551127"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black/5 text-[#6B6B6B] hover:text-[#F0A830] hover:bg-[#E8A020]/10 transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        {/* Navigation Links Col */}
        <div>
          <h3 className="font-sans text-sm tracking-widest text-[#E8A020] uppercase font-semibold mb-6">
            Navegação
          </h3>
          <ul className="space-y-4 text-sm font-light">
            <li>
              <a
                href="#inicio"
                className="hover:text-[#1A1A1A] transition-colors duration-300"
              >
                Início
              </a>
            </li>
            <li>
              <a
                href="#categorias"
                className="hover:text-[#1A1A1A] transition-colors duration-300"
              >
                Nossos produtos
              </a>
            </li>
            <li>
              <a
                href="#sobre"
                className="hover:text-[#1A1A1A] transition-colors duration-300"
              >
                Sobre a Casa
              </a>
            </li>
          </ul>
        </div>

        {/* Services & Care Col */}

        {/* Direct Contact Col */}
        <div className="space-y-4">
          <h3 className="font-sans text-sm tracking-widest text-[#E8A020] uppercase font-semibold mb-6">
            Contato
          </h3>
          <div className="space-y-4 text-sm font-light">
            <div className="flex items-center space-x-3">
              <Instagram className="w-4.5 h-4.5 text-[#E8A020] shrink-0" />
              <a
                href="https://instagram.com/amanhecerstore05"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A1A1A] transition-colors"
              >
                @amanhecerstore05
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-4.5 h-4.5 text-[#E8A020] shrink-0" />
              <a
                href="https://wa.me/554899551127"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A1A1A] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-[#E8E0D0] pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#6B6B6B] font-light gap-4">
        <p>© {currentYear} Amanhecer Store. Todos os direitos reservados.</p>
        <div className="flex space-x-6">
            {/* <a href="#inicio" className="hover:text-[#1A1A1A] transition-colors">
              Termos de Uso
            </a>
            <a href="#inicio" className="hover:text-[#1A1A1A] transition-colors">
              Política de Privacidade
            </a> */}
        </div>
      </div>
    </footer>
  );
}
