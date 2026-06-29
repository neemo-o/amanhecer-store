import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Clock, Phone, MapPin, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", msg: "" });
    }, 5000);
  };

  return (
    <section id="contato" className="bg-[#FAF8F3] py-24 md:py-36 relative scroll-mt-20">
      {/* Background decoration blur glow */}
      <div className="absolute left-[10%] top-[40%] w-[400px] h-[400px] rounded-full bg-[#D9A441]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-20">
          <span className="font-poppins text-xs tracking-[0.3em] uppercase text-[#D9A441] font-semibold flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#D9A441]" />
            Atendimento Exclusivo
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] font-medium tracking-tight">
            Consulte a <span className="font-serif italic font-light text-[#D9A441]">Nossa Casa</span>
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-[#6B6B6B] max-w-sm mx-auto">
            Reserve um horário para atendimento presencial em nosso showroom ou fale com uma consultora digital.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Direct Showroom Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-10 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-[#1A1A1A] tracking-wide font-normal">
                Showroom <span className="font-serif italic font-light text-[#D9A441]">São Paulo</span>
              </h3>
              <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed font-light">
                Agende uma visita privada com curadores dedicados para examinar de perto as nossas coleções ou planejar um design exclusivo feito sob medida.
              </p>
            </div>

            {/* Direct contact info chips */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#D9A441] group-hover:bg-[#E7B95A] group-hover:text-white transition-colors duration-400 shrink-0">
                  <MapPin className="w-4.5 h-4.5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-sans text-xs tracking-wider uppercase text-[#6B6B6B] font-semibold">Endereço</h4>
                  <p className="font-serif text-sm text-neutral-800 italic font-light mt-0.5">
                    Av. Brg. Faria Lima, 3477 - Itaim Bibi, SP
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#D9A441] group-hover:bg-[#E7B95A] group-hover:text-white transition-colors duration-400 shrink-0">
                  <Phone className="w-4.5 h-4.5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-sans text-xs tracking-wider uppercase text-[#6B6B6B] font-semibold">Telefone Concierge</h4>
                  <p className="font-serif text-sm text-neutral-800 italic font-light mt-0.5">
                    +55 (11) 99999-9999
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#D9A441] group-hover:bg-[#E7B95A] group-hover:text-white transition-colors duration-400 shrink-0">
                  <Clock className="w-4.5 h-4.5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-sans text-xs tracking-wider uppercase text-[#6B6B6B] font-semibold">Horários de Atendimento</h4>
                  <p className="font-serif text-sm text-neutral-800 italic font-light mt-0.5">
                    Segunda a Sexta: 10:00 - 19:00 | Sábado: 10:00 - 15:00
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-note */}
            <div className="p-5 bg-black/[0.02] border-l border-[#D9A441] rounded-r-xs">
              <p className="font-serif italic text-xs text-[#6B6B6B] leading-relaxed font-light">
                *Oferecemos estacionamento privativo com manobrista e segurança privada para garantir total sigilo e tranquilidade à sua visita.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-white border border-[#E8E0D0] p-8 md:p-12 rounded-sm flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-6">
              <h3 className="font-display text-xl text-[#1A1A1A] tracking-wide font-normal">
                Faça uma <span className="font-serif italic font-light text-[#D9A441]">Consulta On-line</span>
              </h3>
              <p className="font-sans text-xs text-[#6B6B6B] font-light leading-relaxed">
                Preencha os campos abaixo com suas dúvidas ou solicitações e entraremos em contato em até duas horas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 border border-[#D9A441]/35 rounded-sm bg-[#D9A441]/5 text-center space-y-4"
                >
                  <CheckCircle className="w-12 h-12 text-[#D9A441] mx-auto animate-bounce" />
                  <h4 className="font-display text-lg text-[#1A1A1A]">Solicitação Enviada!</h4>
                  <p className="font-serif italic text-xs text-[#6B6B6B] max-w-sm mx-auto leading-relaxed">
                    Agradecemos seu interesse. Um de nossos curadores exclusivos de alta joalharia retornará seu contato formalmente em breve.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-sans text-[10px] tracking-widest uppercase text-[#6B6B6B] font-medium">Nome Completo</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FAF8F3] border border-[#E8E0D0] hover:border-[#D9A441]/50 focus:border-[#D9A441] rounded-xs px-4 py-3 text-xs text-neutral-800 uppercase tracking-wider focus:outline-none focus:bg-white transition-all duration-300"
                        placeholder="Ex: Helena Bittencourt"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-sans text-[10px] tracking-widest uppercase text-[#6B6B6B] font-medium">E-mail de Contato</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAF8F3] border border-[#E8E0D0] hover:border-[#D9A441]/50 focus:border-[#D9A441] rounded-xs px-4 py-3 text-xs text-neutral-800 focus:outline-none focus:bg-white transition-all duration-300"
                        placeholder="Ex: helena@contato.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-[10px] tracking-widest uppercase text-[#6B6B6B] font-medium">Como podemos ajudar?</label>
                    <textarea
                      rows={4}
                      value={formData.msg}
                      onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                      className="w-full bg-[#FAF8F3] border border-[#E8E0D0] hover:border-[#D9A441]/50 focus:border-[#D9A441] rounded-xs px-4 py-4 text-xs text-neutral-800 focus:outline-none focus:bg-white transition-all duration-300"
                      placeholder="Ex: Tenho interesse em examinar com exclusividade o Anel Solitaire..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-3 py-4 bg-transparent border border-[#D9A441] text-[#D9A441] hover:bg-[#E7B95A] hover:border-[#E7B95A] hover:text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm hover:-translate-y-0.5 pointer-events-auto cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensagem</span>
                  </button>
                </>
              )}
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
