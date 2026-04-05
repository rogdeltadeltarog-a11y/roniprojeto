'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { Sofa, Bed, Waves, Car, Armchair, Sparkles, Droplets, Shirt, Bus, Wind, CheckCircle2, ArrowLeft, Star } from 'lucide-react';

const SERVICE_DETAILS: Record<string, {
  icon: any; name: string; description: string; basePrice: number; category: string;
  features: string[]; beforeAfter: string; duration: string; guarantee: string;
}> = {
  sofa: {
    icon: Sofa, name: 'Limpeza de Sofá', description: 'Limpeza profunda e higienização completa do seu sofá. Utilizamos máquinas profissionais de alta performance para extrair sujeira profunda, manchas, ácaros e bactérias.',
    basePrice: 159.90, category: 'Estofados',
    features: ['Remoção profunda de manchas difíceis', 'Eliminação de ácaros, fungos e bactérias', 'Neutralização completa de odores', 'Secagem rápida (1-4 horas)', 'Produto hipoalergênico e seguro para pets', 'Garantia de 7 dias'],
    beforeAfter: 'Resultado visível na hora: cor renovada, cheiro de limpeza ao toque.',
    duration: '45-90 minutos',
    guarantee: 'Refazemos o serviço sem custo se não ficar satisfeito em até 7 dias.',
  },
  colchao: {
    icon: Bed, name: 'Limpeza de Colchão', description: 'Higienização profissional que elimina até 99% dos ácaros, fungos e bactérias. Seu sono fica mais saudável e tranquilo.',
    basePrice: 129.90, category: 'Dormitório',
    features: ['Elimina 99% dos ácaros e bactérias', 'Remove manchas de suor e amareladas', 'Elimina odores persistentes', 'Melhora qualidade do sono e respiração', 'Indicado para quem tem alergia e asma', 'Secagem rápida'],
    beforeAfter: 'Seu colchão fica renovado, sem marcas, sem odores.',
    duration: '30-60 minutos',
    guarantee: 'Refazemos o serviço sem custo se não ficar satisfeito em até 7 dias.',
  },
  tapetes: {
    icon: Waves, name: 'Limpeza de Tapetes e Carpetes', description: 'Tratamento especializado para todos os tipos de fibras e materiais. Respeitamos os limites de cada tecido.',
    basePrice: 89.90, category: 'Pisos',
    features: ['Lavagem profunda sem danos às fibras', 'Fibras renovadas e macias', 'Remoção de pelos de animais', 'Eliminação de odores de animais', 'Secagem rápida', 'Tratamento anti-estático'],
    beforeAfter: 'Tapete renovado, cores vivas, sem pelos nem cheiro de pet.',
    duration: '45-90 minutos',
    guarantee: 'Refazemos o serviço sem custo se não ficar satisfeito em até 7 dias.',
  },
  automotivo: {
    icon: Car, name: 'Limpeza de Estofados Automotivos', description: 'Revitalização completa dos bancos, encostos, carpete e tetos do seu veículo.',
    basePrice: 199.90, category: 'Veículos',
    features: ['Bancos em couro e tecido', 'Painel e consolo completo', 'Forros e tetos', 'Cintos de segurança higienizados', 'Eliminação de odores de cigarro', 'Produto protetor nos plásticos'],
    beforeAfter: 'Interior do carro com cara de novo!',
    duration: '60-120 minutos',
    guarantee: 'Refazemos o serviço sem custo se não ficar satisfeito em até 7 dias.',
  },
  cadeiras: {
    icon: Armchair, name: 'Limpeza de Cadeiras', description: 'Higienização profissional de cadeiras de escritório, jantar e refeitórios.',
    basePrice: 79.90, category: 'Mobiliário',
    features: ['Escritório e residência', 'Remoção de manchas de comida e café', 'Tecido renovado e macio', 'Ideal para condomínios e empresas', 'Remoção de pelo de pet', 'Secagem rápida'],
    beforeAfter: 'Cadeiras limpas e renovadas, prontas para uso rápido.',
    duration: '20-40 minutos',
    guarantee: 'Refazemos o serviço sem custo se não ficar satisfeito em até 7 dias.',
  },
  poltronas: {
    icon: Sparkles, name: 'Limpeza de Poltronas', description: 'Limpeza profissional de poltronas decorativas com cuidado especial com acabamentos e detalhes.',
    basePrice: 119.90, category: 'Estofados',
    features: ['Todos os tipos de tecido e couro', 'Detalhamento completo', 'Cuidado com acabamentos e botões', 'Resultado visível na hora', 'Tratamento anti-manchas', 'Produto que não desbota'],
    beforeAfter: 'Poltrona renovada, cores preservadas, sem manchas.',
    duration: '30-60 minutos',
    guarantee: 'Refazemos o serviço sem custo se não ficar satisfeito em até 7 dias.',
  },
  cortinas: {
    icon: Droplets, name: 'Limpeza de Cortinas e Persianas', description: 'Remoção de poeira, fuligem e manchas direto no local, sem necessidade de desmontagem.',
    basePrice: 99.90, category: 'Decoração',
    features: ['Sem necessidade de remoção', 'Limpeza no local', 'Todos os tipos de tecido', 'Retira gordura e fuligem de cozinha', 'Elimina poeira acumulada', 'Secagem natural'],
    beforeAfter: 'Cortinas limpas, sem poeira, sem odor de mofo.',
    duration: '30-60 minutos',
    guarantee: 'Refazemos o serviço sem custo se não ficar satisfeito em até 7 dias.',
  },
  capas: {
    icon: Shirt, name: 'Limpeza de Capas de Sofá', description: 'Limpeza especializada em capas elásticas e fixas de sofás em qualquer tecido.',
    basePrice: 69.90, category: 'Estofados',
    features: ['Capas elásticas e fixas', 'Cores preservadas', 'Encolhimento zero', 'Entrega rápida', 'Tratamento anti-rugas', 'Indicado para manutenção mensal'],
    beforeAfter: 'Capas renovadas, sem manchas, sem amassados.',
    duration: '30-45 minutos',
    guarantee: 'Refazemos o serviço sem custo se não ficar satisfeito em até 7 dias.',
  },
  veicular: {
    icon: Bus, name: 'Higienização Veicular Completa', description: 'Limpeza interna e externa completa do veículo com produtos profissionais.',
    basePrice: 249.90, category: 'Veículos',
    features: ['Interior completo (bancos, carpete, teto)', 'Painel e console detalhados', 'Portas e frisos externos', 'Eliminação de bactérias e ácaros', 'Protetor de couro/plástico', 'Perfume profissional ao final'],
    beforeAfter: 'Seu carro fica impecável por dentro e por fora!',
    duration: '90-180 minutos',
    guarantee: 'Refazemos o serviço sem custo se não ficar satisfeito em até 7 dias.',
  },
  puff: {
    icon: Wind, name: 'Higienização de Puff e Ottomans', description: 'Limpeza profissional de puffs e ottomans em todos os tamanhos e materiais.',
    basePrice: 59.90, category: 'Mobiliário',
    features: ['Todos os tamanhos', 'Couro e tecido', 'Resultado imediato', 'Preço acessível', 'Sem desmontagem', 'Secagem rápida'],
    beforeAfter: 'Renovado e pronto para uso em minutos.',
    duration: '15-30 minutos',
    guarantee: 'Refazemos o serviço sem custo se não ficar satisfeito em até 7 dias.',
  },
};

export default function ServiceDetailPage() {
  const { id } = useParams();
  const service = SERVICE_DETAILS[id as string];

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Serviço não encontrado</h1>
        <Link href="/servicos">
          <Button variant="outline">Ver todos os serviços</Button>
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 pt-24 pb-12 text-white">
        <Container>
          <Link href="/servicos" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4 transition">
            <ArrowLeft className="w-4 h-4" /> Voltar aos Serviços
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-6"
          >
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center">
              <Icon className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <p className="text-blue-200 text-sm font-bold uppercase tracking-wider">{service.category}</p>
              <h1 className="text-3xl lg:text-5xl font-black">{service.name}</h1>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">O que está incluso</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-gray-700">{f}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Before/After */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 rounded-3xl p-8 border border-green-100"
            >
              <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
                <Star className="w-5 h-5" /> Resultado
              </h3>
              <p className="text-green-700">{service.beforeAfter}</p>
            </motion.div>

            {/* Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-blue-50 rounded-3xl p-8 border border-blue-100"
            >
              <h3 className="text-lg font-bold text-blue-800 mb-2">Garantia HigienizeJá</h3>
              <p className="text-blue-700">{service.guarantee}</p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24"
            >
              <p className="text-sm text-gray-400 uppercase tracking-wider font-bold mb-2">A partir de</p>
              <p className="text-5xl font-black text-blue-600 mb-6">
                R$ {service.basePrice.toFixed(2)}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duração estimada</span>
                  <span className="font-bold text-gray-700">{service.duration}</span>
                </div>
              </div>

              <Link href={`/agendar/${id}`} className="block">
                <Button size="lg" className="w-full">Solicitar Agora</Button>
              </Link>

              <p className="text-xs text-center text-gray-400 mt-4">
                Atendimento presencial • Vamos até você
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
