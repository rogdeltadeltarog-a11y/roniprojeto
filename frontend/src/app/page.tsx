'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { Sparkles, ShieldCheck, Clock, CheckCircle, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/servicos', label: 'Serviços' },
  { href: '/planos', label: 'Planos' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
];

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase.from('Service').select('*').limit(3);

      if (data && data.length > 0) {
        setServices(data);
      } else {
        setServices([
          { id: '1', name: 'Limpeza de Sofá', description: 'Remoção profunda de manchas, ácaros e odores.', basePrice: 159.0 },
          { id: '2', name: 'Limpeza de Colchão', description: 'Sono tranquilo com eliminação de 99% das bactérias.', basePrice: 129.0 },
          { id: '3', name: 'Tapetes e Carpetes', description: 'Tratamento especializado para todos os tipos de fibras.', basePrice: 89.0 },
        ]);
      }
      setLoading(false);
    }
    fetchServices();
  }, []);

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <Container className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-black text-blue-600">
            HigienizeJá
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 font-medium transition">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Cadastrar</Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </Container>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-gray-700 font-medium py-2 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full">Entrar</Button>
            </Link>
            <Link href="/register" onClick={() => setMobileOpen(false)}>
              <Button className="w-full">Cadastrar</Button>
            </Link>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />

        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Líder em Higienização Sob Demanda
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600">
            Sua casa impecável <br /> em apenas alguns cliques.
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Solicite uma limpeza profissional instantaneamente. Preço transparente,
            agendamento rápido e execução padronizada.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/servicos">
              <Button size="lg" className="px-12">Ver Serviços</Button>
            </Link>
            <Link href="/planos">
              <Button size="lg" variant="outline" className="px-12">Conhecer Planos</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-24 lg:py-32">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-gray-900">Nossos Serviços</h2>
            <p className="text-gray-600">Selecione o que deseja higienizar hoje</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col h-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transition-all hover:-translate-y-2"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                </div>
                <div className="pt-8 border-t border-gray-100 mt-auto">
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-sm font-medium text-gray-500">A partir de</span>
                    <span className="text-3xl font-extrabold text-blue-600">
                      R$ {service.basePrice.toFixed(2)}
                    </span>
                  </div>
                  <Link href={`/agendar/${service.id}`} className="block w-full">
                    <Button className="w-full" size="lg">Solicitar Agora</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/servicos">
              <Button variant="outline" size="lg">Ver Todos os Serviços</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-gray-50">
        <Container>
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
            Por que escolher a HigienizeJá?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Mais Saúde', desc: 'Eliminamos até 99% dos ácaros, fungos e bactérias que causam alergias.' },
              { icon: Clock, title: 'Resultados na Hora', desc: 'Manchas, odores e sujeira profunda resolvidos durante o atendimento.' },
              { icon: CheckCircle, title: 'Garantia', desc: 'Refazemos sem custo caso não fique satisfeito em até 7 dias.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <Container className="text-center">
          <h2 className="text-3xl lg:text-5xl font-black mb-6">
            Agende agora e receba nosso time profissional na sua porta
          </h2>
          <Link href="/servicos">
            <Button variant="ghost" size="lg" className="!bg-white !text-blue-600 hover:!bg-blue-50">
              Solicitar Orçamento
            </Button>
          </Link>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-black text-blue-600">HigienizeJá</div>
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-500 hover:text-blue-600 text-sm transition">
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-gray-400 text-sm">© 2026 HigienizeJá. Todos os direitos reservados.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
