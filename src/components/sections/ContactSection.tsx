import { motion } from "motion/react";
import { Instagram, MessageCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contato"
      className="bg-[#FDF8F0] py-24 md:py-36 relative scroll-mt-20"
    >
      {/* Background decoration blur glow */}
      <div className="absolute left-[10%] top-[40%] w-[400px] h-[400px] rounded-full bg-[#E8A020]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Title */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] font-medium tracking-tight">
            Fale com a{" "}
            <span className="font-serif italic font-light text-[#E8A020]">
              Gente
            </span>
          </h2>
          <p className="font-serif italic text-sm sm:text-xl text-[#6B6B6B] max-w-sm mx-auto">
            Atendimento exclusivo pelas nossas redes digitais.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="https://instagram.com/amanhecerstore05"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-3 px-8 py-4 border border-[#E8A020] text-[#E8A020] hover:bg-[#E8A020] hover:text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm w-full sm:w-auto"
          >
            <Instagram className="w-5 h-5" />
            <span>Nos siga no Instagram</span>
          </a>
          <a
            href="https://wa.me/554899551127"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[#E8A020] text-white hover:bg-[#F0A830] font-semibold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chamar no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
