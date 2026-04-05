'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Check, Star, Users, Clock, Shield } from 'lucide-react';

const PLANS = [
  {
    name: 'Básico',
    price: 18.90,
    description: 'Ideal para quem quer manter o sofá sempre limpo',
    features: [
      '1 Limpeza mensal de sofá (2 lugares)',
      '1 Limpeza de colchão trimestral',
      'Desconto de 10% em serviços extras',
      'Atendimento prioritário via WhatsApp',
    ],
    popular: false,
  },
  {
    name: 'Família',
    price: 39.90,
    description: 'O mais escolhido pelas famílias com crianças e pets',
    features: [
      '1 Limpeza mensal de sofá (até 4 lugares)',
      '2 Limpezas de colchão por ano',
      '1 Limpeza de tapete por trimestre',
      'Desconto de 20% em serviços extras',
      'Impermeabilização com 15% off',
      'Atendimento prioritário via WhatsApp',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 69.90,
    description: 'Cobertura completa para todos os seus estofados',
    features: [
      'Limpezas ilimitadas de todos os estofados',
      '1 Limpeza veicular completa por trimestre',
      'Impermeabilização inclusa 2x ao ano',
      'Desconto de 30% em serviços extras',
      'Gerente de conta dedicado',
      'Agendamento flexível (mesmo dia)',
      'Relatório de saúde do ambiente',
    ],
    popular: false,
  },
];

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 pt-24 pb-16 text-white">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-6xl font-black mb-4">
              Planos Mensais
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Assine e tenha seus estofados sempre limpos. Limpezas a partir de R$ 18,90/mês!
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white border-b border-gray-100">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Limpeza na hora certa', desc: 'Agendamentos flexíveis no horário que você quiser' },
              { icon: Shield, title: 'Ar puro dentro de casa', desc: 'Eliminamos até 99% dos ácaros, fungos e bactérias' },
              { icon: Star, title: 'Resultados visíveis', desc: 'Manchas, odores e sujeira profunda resolvidos na hora' },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <b.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{b.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Plans */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl p-8 flex flex-col relative ${
                  plan.popular
                    ? 'bg-blue-600 text-white shadow-2xl border border-blue-500 scale-[1.02]'
                    : 'bg-white border border-gray-100 shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-black uppercase px-4 py-2 rounded-full">
                    Mais Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-2xl font-black ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mt-1 ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm">R$</span>
                    <span className={`text-5xl font-black ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price.toFixed(2)}
                    </span>
                    <span className={`text-sm ${plan.popular ? 'text-blue-200' : 'text-gray-400'}`}>/mês</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? 'text-blue-200' : 'text-green-500'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-blue-50' : 'text-gray-700'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'ghost' : 'primary'}
                  size="lg"
                  className={`w-full ${plan.popular ? '!bg-white !text-blue-600 hover:!bg-blue-50' : ''}`}
                >
                  Assinar Agora
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 text-gray-500 text-sm">
            Todos os planos incluem garantia de 7 dias. Cancele quando quiser.
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12">Perguntas Frequentes</h2>
          <div className="space-y-6">
            {[
              { q: 'Posso cancelar a qualquer momento?', a: 'Sim! Não há multa de fidelidade. Cancele quando quiser.' },
              { q: 'Como funciona o agendamento?', a: 'Após assinar, você agenda pelo WhatsApp ou pelo app no dia e horário que preferir.' },
              { q: 'Preciso estar em casa?', a: 'Sim, um responsável deve estar presente durante a limpeza.' },
              { q: 'Vocês atendem em toda a cidade?', a: 'Atendemos toda a região metropolitana de São Paulo e Grande ABCD.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-gray-100 pb-6"
              >
                <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
