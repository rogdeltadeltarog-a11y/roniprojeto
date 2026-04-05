'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import ServiceCard from '@/components/ui/ServiceCard';
import { Sparkles, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from('Service')
        .select('*')
        .limit(3);
      
      if (data && data.length > 0) {
        setServices(data);
      } else {
        // Fallback static data if DB is empty for initial view
        setServices([
          { id: '1', name: "Limpeza de Sofá", description: "Remoção profunda de manchas, ácaros e odores.", basePrice: 159.00 },
          { id: '2', name: "Limpeza de Colchão", description: "Sono tranquilo com eliminação de 99% das bactérias.", basePrice: 129.00 },
          { id: '3', name: "Tapetes e Carpetes", description: "Tratamento especializado para todos os tipos de fibras.", basePrice: 89.00 }
        ]);
      }
      setLoading(false);
    }
    fetchServices();
  }, []);

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
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
            <Link href="#servicos">
              <Button size="lg" className="px-12">Pedir Agora</Button>
            </Link>
            <Button size="lg" variant="outline" className="px-12">Conhecer Planos</Button>
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
              <div key={service.id} className="flex flex-col h-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transition-all hover:-translate-y-2">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                </div>
                <div className="pt-8 border-t border-gray-100 mt-auto">
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-sm font-medium text-gray-500">A partir de</span>
                    <span className="text-3xl font-extrabold text-blue-600">R$ {service.basePrice.toFixed(2)}</span>
                  </div>
                  <Link href={`/booking/${service.id}`} className="block w-full">
                    <Button className="w-full" size="lg">Solicitar Agora</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black text-blue-600">HigienizeJá</div>
          <p className="text-gray-400 text-sm">© 2026 HigienizeJá. Todos os direitos reservados.</p>
        </Container>
      </footer>
    </div>
  );
}
