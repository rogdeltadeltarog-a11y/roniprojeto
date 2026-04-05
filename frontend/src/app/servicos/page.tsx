'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { Sofa, Bed, Waves, Car, Armchair, Sparkles, Droplets, Shirt, Bus, Wind, ChevronRight, Search, Filter } from 'lucide-react';

const STATIC_SERVICES = [
  { id: 'sofa', name: 'Limpeza de Sofá', description: 'Limpeza profunda e higienização do seu sofá', basePrice: 159.90, Category: { name: 'Estofados' }, features: ['Remoção de manchas', 'Eliminação de ácaros', 'Neutralização de odores', 'Secagem rápida'], icon: Sofa },
  { id: 'colchao', name: 'Limpeza de Colchão', description: 'Elimine ácaros, fungos e bactérias do seu colchão', basePrice: 129.90, Category: { name: 'Dormitório' }, features: ['Elimina 99% dos ácaros', 'Remove manchas amareladas', 'Elimina odores de suor', 'Melhora qualidade do sono'], icon: Bed },
  { id: 'tapetes', name: 'Limpeza de Tapetes e Carpetes', description: 'Tratamento especializado para fibras nobres', basePrice: 89.90, Category: { name: 'Pisos' }, features: ['Lavagem profunda sem danos', 'Fibras renovadas', 'Remoção de pelos', 'Secagem rápida'], icon: Waves },
  { id: 'automotivo', name: 'Limpeza de Estofados Automotivos', description: 'Revitalização completa dos bancos e forros', basePrice: 199.90, Category: { name: 'Veículos' }, features: ['Bancos em couro e tecido', 'Painel e forros', 'Cintos de segurança', 'Elimina odores de cigarro'], icon: Car },
  { id: 'cadeiras', name: 'Limpeza de Cadeiras', description: 'Higienização de cadeiras de escritório e jantar', basePrice: 79.90, Category: { name: 'Mobiliário' }, features: ['Escritório e residência', 'Remoção de manchas', 'Tecido renovado', 'Ideal para condomínios'], icon: Armchair },
  { id: 'poltronas', name: 'Limpeza de Poltronas', description: 'Limpeza profissional de poltronas decorativas', basePrice: 119.90, Category: { name: 'Estofados' }, features: ['Todos os tipos de tecido', 'Detalhamento completo', 'Cuidado com acabamentos', 'Resultado visível na hora'], icon: Sparkles },
  { id: 'cortinas', name: 'Limpeza de Cortinas e Persianas', description: 'Remoção de poeira e manchas sem desmontagem', basePrice: 99.90, Category: { name: 'Decoração' }, features: ['Sem necessidade de remoção', 'Limpeza no local', 'Todos os tecidos', 'Retira gordura e fuligem'], icon: Droplets },
  { id: 'capas', name: 'Limpeza de Capas de Sofá', description: 'Limpeza especializada em tecidos diversos', basePrice: 69.90, Category: { name: 'Estofados' }, features: ['Elásticos e fixos', 'Cores preservadas', 'Encolhimento zero', 'Entrega rápida'], icon: Shirt },
  { id: 'veicular', name: 'Higienização Veicular Completa', description: 'Limpeza interna e externa completa do veículo', basePrice: 249.90, Category: { name: 'Veículos' }, features: ['Interior completo', 'Painel e console', 'Portas e tetos', 'Eliminação de bactérias'], icon: Bus },
  { id: 'puff', name: 'Higienização de Puff e Ottomans', description: 'Limpeza de puffs e ottomans em qualquer tamanho', basePrice: 59.90, Category: { name: 'Mobiliário' }, features: ['Todos os tamanhos', 'Pele e tecido', 'Resultado imediato', 'Preço acessível'], icon: Wind },
];

const CATEGORIES = ['Todos', 'Estofados', 'Dormitório', 'Pisos', 'Veículos', 'Mobiliário', 'Decoração'];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const supabase = createClient();

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('Service')
        .select('*, Category(name)');

      if (data && data.length > 0) {
        const merged = data.map((s: any) => ({
          ...s,
          id: s.id || STATIC_SERVICES.find((ss) => ss.name === s.name)?.id || s.id,
          icon: ICON_MAP[s.name] || Sofa,
        }));
        setServices(merged);
      } else {
        setServices(STATIC_SERVICES);
      }
      setLoading(false);
    }
    fetchServices();
  }, []);

  const filtered = services.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Todos' || (s.Category?.name || '') === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 pt-24 pb-16 text-white">
        <Container className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black mb-4"
          >
            Nossos Serviços
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto"
          >
            Escolha o serviço que precisa e solicite agora mesmo. Vamos até você!
          </motion.p>
        </Container>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar serviço..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Filter className="w-5 h-5 text-gray-400 shrink-0 mr-2" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    category === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <Container>
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-xl font-bold">Nenhum serviço encontrado</p>
              <p className="mt-2">Tente alterar os filtros de busca</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((service, i) => (
                <ServiceCard key={service.id || i} service={service} index={i} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const Icon = service.icon || Sofa;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-shadow"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
          <p className="text-gray-500 text-sm mt-1">{service.Category?.name || 'Serviço'}</p>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{service.description}</p>

      {service.features && (
        <ul className="space-y-2 mb-6">
          {service.features.map((f: string, i: number) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <ChevronRight className="w-4 h-4 text-green-500" />
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className="pt-6 border-t border-gray-100 mt-auto flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 block">A partir de</span>
          <span className="text-2xl font-black text-blue-600">
            R$ {service.basePrice?.toFixed(2) || '0,00'}
          </span>
        </div>
        <Link href={`/agendar/${service.id}`}>
          <Button size="sm">Solicitar</Button>
        </Link>
      </div>
    </motion.div>
  );
}

const ICON_MAP: Record<string, any> = {
  'Limpeza de Sofá': Sofa,
  'Limpeza de Colchão': Bed,
  'Limpeza de Tapetes e Carpetes': Waves,
  'Limpeza de Estofados Automotivos': Car,
  'Limpeza de Cadeiras': Armchair,
  'Limpeza de Poltronas': Sparkles,
  'Limpeza de Cortinas e Persianas': Droplets,
  'Limpeza de Capas de Sofá': Shirt,
  'Higienização Veicular Completa': Bus,
  'Higienização de Puff e Ottomans': Wind,
};
