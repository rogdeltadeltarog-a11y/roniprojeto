'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const AREAS = [
  'São Paulo - Capital', 'Guarulhos', 'Osasco', 'Santo André',
  'São Bernardo do Campo', 'São Caetano do Sul', 'Diadema',
  'Mauá', 'Ribeirão Pires', 'Rio Grande da Serra',
  'Barueri (Alphaville)', 'Carapicuíba', 'Embu das Artes',
  'Taboão da Serra', 'Cotia', 'Itapevi',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 pt-24 pb-16 text-white">
        <Container className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-6xl font-black mb-4">Fale Conosco</h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              Estamos prontos para atender você. Escolha o canal que preferir!
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie uma mensagem</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <Send className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h3>
                  <p className="text-gray-600">Retornaremos em até 2 horas úteis.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nome</label>
                      <input
                        type="text"
                        required
                        className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">E-mail</label>
                      <input
                        type="email"
                        required
                        className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      placeholder="(11) 99999-9999"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mensagem</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                      placeholder="Como podemos ajudar?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <Button type="submit" size="lg">Enviar Mensagem</Button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500 rounded-3xl p-8 text-white shadow-xl"
            >
              <MessageCircle className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-green-100 mb-4">Resposta mais rápida! Chame agora</p>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-green-50 transition"
              >
                <MessageCircle className="w-5 h-5" /> Iniciar Conversa
              </a>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-4"
            >
              <div className="flex items-center gap-4 text-gray-700">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold">0800 XXX XXXX</p>
                  <p className="text-xs text-gray-400">Ligação gratuita</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold">contato@higienizeja.com.br</p>
                  <p className="text-xs text-gray-400">Respondemos em até 2h</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold">Seg-Sáb: 7h às 20h</p>
                  <p className="text-xs text-gray-400">Dom: 8h às 14h</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold">São Paulo e Região</p>
                  <p className="text-xs text-gray-400">Metropolitana + ABCD</p>
                </div>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
            >
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Redes Sociais</p>
              <div className="flex gap-3">
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
                  <span className="text-sm font-bold">IG</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
                  <span className="text-sm font-bold">FB</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
        >
          <MapPin className="w-6 h-6 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Áreas de Atendimento</h3>
          <div className="flex flex-wrap gap-3">
            {AREAS.map((area) => (
              <span
                key={area}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
