import { Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FDF8F0] border-t border-[#E8E0D0] pt-16 pb-8 text-[#6B6B6B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        {/* Brand Col */}
        <div className="space-y-6">
          <div className="flex flex-col">
            <span className="font-display text-2xl font-bold tracking-[0.2em] text-[#1A1A1A]">
              AMANHECER
            </span>
            <span className="font-poppins text-sm tracking-[0.4em] text-[#E8A020] -mt-1">
              STORE
            </span>
          </div>
          <p className="font-serif italic text-sm text-[#6B6B6B] leading-relaxed max-w-xs">
            "Joias autênticas esculpidas sob a luz da sofisticação para eternizar os seus momentos mais luminosos."
          </p>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com/amanhecerstore"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black/5 text-[#6B6B6B] hover:text-[#F0A830] hover:bg-[#E8A020]/10 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://wa.me/5500000000000"
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
              <a href="#inicio" className="hover:text-[#1A1A1A] transition-colors duration-300">
                Início
              </a>
            </li>
            <li>
              <a href="#colecoes" className="hover:text-[#1A1A1A] transition-colors duration-300">
                Coleções Destaque
              </a>
            </li>
            <li>
              <a href="#categorias" className="hover:text-[#1A1A1A] transition-colors duration-300">
                Categorias De Joias
              </a>
            </li>
            <li>
              <a href="#sobre" className="hover:text-[#1A1A1A] transition-colors duration-300">
                Sobre a Casa
              </a>
            </li>
          </ul>
        </div>

        {/* Services & Care Col */}
        <div>
          <h3 className="font-sans text-sm tracking-widest text-[#E8A020] uppercase font-semibold mb-6">
            Serviços &amp; Cuidados
          </h3>
          <ul className="space-y-4 text-sm font-light">
            <li>
              <a href="#contato" className="hover:text-[#1A1A1A] transition-colors duration-300">
                Consultoria de Alta Joalheria
              </a>
            </li>
            <li>
              <a href="#sobre" className="hover:text-[#1A1A1A] transition-colors duration-300">
                Guia de Medidas de Anéis
              </a>
            </li>
            <li>
              <a href="#sobre" className="hover:text-[#1A1A1A] transition-colors duration-300">
                Limpeza &amp; Conservação
              </a>
            </li>
            <li>
              <a href="#contato" className="hover:text-[#1A1A1A] transition-colors duration-300">
                Garantia &amp; Ajustes
              </a>
            </li>
          </ul>
        </div>

        {/* Direct Contact Col */}
        <div className="space-y-4">
          <h3 className="font-sans text-sm tracking-widest text-[#E8A020] uppercase font-semibold mb-6">
            Contato
          </h3>
          <div className="space-y-4 text-sm font-light">
            <div className="flex items-center space-x-3">
              <Instagram className="w-4.5 h-4.5 text-[#E8A020] shrink-0" />
              <a href="https://instagram.com/amanhecerstore" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1A1A] transition-colors">@amanhecerstore</a>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-4.5 h-4.5 text-[#E8A020] shrink-0" />
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1A1A] transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-[#E8E0D0] pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#6B6B6B] font-light gap-4">
        <p>© {currentYear} Amanhecer Store. Todos os direitos reservados.</p>
        <div className="flex space-x-6">
          <a href="#inicio" className="hover:text-[#1A1A1A] transition-colors">Termos de Uso</a>
          <a href="#inicio" className="hover:text-[#1A1A1A] transition-colors">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}
