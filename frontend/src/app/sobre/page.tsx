'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Shield, Clock, Star, Users, Droplets, Award, Home, Truck } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: '5.000+', label: 'Sofás higienizados' },
    { number: '2.500+', label: 'Clientes satisfeitos' },
    { number: '99%', label: 'Aprovação' },
    { number: '4.9', label: 'Nota média' },
  ];

  const values = [
    { icon: Shield, title: 'Qualidade Garantida', desc: 'Se não ficar satisfeito, refazemos o serviço sem custo adicional.' },
    { icon: Clock, title: 'Pontualidade', desc: 'Chegamos no horário combinado. Sem atrasos, sem desculpas.' },
    { icon: Droplets, title: 'Produtos Premium', desc: 'Utilizamos produtos hipoalergênicos, seguros para crianças e pets.' },
    { icon: Truck, title: 'Vamos até você', desc: 'Atendimento presencial na sua casa ou empresa. Sem deslocamento.' },
    { icon: Award, title: 'Equipe Treinada', desc: 'Técnicos certificados com treinamento contínuo.' },
    { icon: Home, title: 'Compromisso Local', desc: 'Orgulho de servir nossa comunidade com excelência.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 pt-24 pb-16 text-white">
        <Container className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-6xl font-black mb-4">
              Sobre a HigienizeJá
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Especialistas em higienização de estofados. Levamos saúde, conforto e bem-estar para sua casa e empresa.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-50">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-black text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
                Mais que limpeza: saúde para sua família
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                A HigienizeJá nasceu com um objetivo claro: oferecer serviços de limpeza profissional
                acessíveis e de alta qualidade. Entendemos que sofás, colchões e estofados em geral
                acumulam ácaros, fungos e bactérias que podem causar alergias e problemas respiratórios.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Nossa missão é transformar esse cenário com tecnologia de ponta, produtos hipoalergênicos
                e uma equipe treinada para entregar resultados visíveis na hora.
              </p>
              <Link href="/servicos">
                <Button size="lg">Conhecer Nossos Serviços</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-blue-50 rounded-3xl p-8 text-center">
                <Star className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <p className="font-bold text-gray-900">Excelência</p>
                <p className="text-sm text-gray-500 mt-1">Resultado impecável</p>
              </div>
              <div className="bg-green-50 rounded-3xl p-8 text-center">
                <Shield className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <p className="font-bold text-gray-900">Segurança</p>
                <p className="text-sm text-gray-500 mt-1">Produtos seguros</p>
              </div>
              <div className="bg-yellow-50 rounded-3xl p-8 text-center">
                <Users className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <p className="font-bold text-gray-900">Confiança</p>
                <p className="text-sm text-gray-500 mt-1">Equipe uniformizada</p>
              </div>
              <div className="bg-purple-50 rounded-3xl p-8 text-center">
                <Droplets className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <p className="font-bold text-gray-900">Tecnologia</p>
                <p className="text-sm text-gray-500 mt-1">Equipamentos modernos</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <Container>
          <h2 className="text-3xl lg:text-4xl font-black text-center text-gray-900 mb-12">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <Container className="text-center">
          <h2 className="text-3xl lg:text-5xl font-black mb-6">
            Pronto para transformar seus estofados?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Agende agora e receba nosso time profissional na sua porta.
          </p>
          <Link href="/servicos">
            <Button variant="ghost" size="lg" className="!bg-white !text-blue-600 hover:!bg-blue-50">
              Solicitar Orçamento
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
