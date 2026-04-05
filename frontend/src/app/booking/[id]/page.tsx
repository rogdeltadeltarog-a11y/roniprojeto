'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft,
  Wand2,
  AlertCircle,
  Sparkles
} from 'lucide-react';

const steps = [
  { id: 1, title: 'Personalização', icon: Wand2 },
  { id: 2, title: 'Localização', icon: MapPin },
  { id: 3, title: 'Agendamento', icon: Calendar },
  { id: 4, title: 'Pagamento', icon: CreditCard },
];

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Booking State
  const [config, setConfig] = useState({ size: 'M', addons: [] as string[] });
  const [location, setLocation] = useState({ cep: '', address: '', number: '', complement: '' });
  const [schedule, setSchedule] = useState({ date: '', time: '' });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchService();
  }, [id]);

  useEffect(() => {
    if (service) calculateTotal();
  }, [config, service]);

  async function fetchService() {
    const { data, error } = await supabase
      .from('Service')
      .select('*, Category(name)')
      .eq('id', id)
      .single();

    if (error) router.push('/');
    else {
      setService(data);
      setTotalPrice(data.basePrice);
    }
    setLoading(false);
  }

  function calculateTotal() {
    let total = service.basePrice;
    const multipliers: any = { P: 0.8, M: 1.0, G: 1.5, GG: 2.0 };
    total *= multipliers[config.size] || 1.0;
    
    if (config.addons.includes('waterproof')) total += 50;
    setTotalPrice(total);
  }

  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function handleConfirmBooking() {
    if (!user) {
      router.push(`/login?returnTo=/booking/${id}`);
      return;
    }

    setSubmitting(true);
    const orderData = {
      clientId: user.id,
      serviceId: id,
      totalPrice: totalPrice,
      address: `${location.address}, ${location.number} ${location.complement}`,
      cep: location.cep,
      scheduledDate: new Date(`${schedule.date || new Date().toISOString().split('T')[0]}T${schedule.time || '08:00'}:00`),
      status: 'PENDING',
      paymentMethod: 'PIX',
      paymentStatus: 'PENDING'
    };

    const { data, error } = await supabase
      .from('Order')
      .insert([orderData])
      .select();

    if (error) {
      alert('Erro ao criar pedido: ' + error.message);
      setSubmitting(false);
    } else {
      alert('Pedido realizado com sucesso! Redirecionando para o pagamento...');
      router.push(`/booking/success?id=${data[0].id}`);
    }
  }

  const nextStep = () => {
    if (currentStep === 4) {
      handleConfirmBooking();
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-24">
      <Container>
        {/* Stepper Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 -z-10 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-blue-600" 
                 initial={{ width: '0%' }}
                 animate={{ width: `${(currentStep - 1) * 33.3}%` }}
               />
            </div>
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <motion.div
                    animate={{ 
                      scale: currentStep === step.id ? 1.2 : 1,
                      backgroundColor: isActive ? '#2563eb' : '#fff',
                      color: isActive ? '#fff' : '#94a3b8'
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 ${isActive ? 'border-blue-600' : 'border-gray-200'}`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 min-h-[500px] flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1"
                >
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-3xl font-bold mb-2 text-gray-900">{service.name}</h2>
                        <p className="text-gray-600 italic">Personalize seu serviço de {service.Category.name}</p>
                      </div>

                      <div className="space-y-6">
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest">
                          Tamanho do Item
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {['P', 'M', 'G', 'GG'].map((s) => (
                            <button
                              key={s}
                              onClick={() => setConfig({ ...config, size: s })}
                              className={`py-4 rounded-2xl border-2 font-bold transition-all ${
                                config.size === s 
                                ? 'border-blue-600 bg-blue-50 text-blue-700' 
                                : 'border-gray-100 hover:border-blue-200 text-gray-500'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest">
                          Adicionais Sugeridos
                        </label>
                        <div 
                          onClick={() => {
                            const has = config.addons.includes('waterproof');
                            setConfig({
                              ...config,
                              addons: has ? [] : ['waterproof']
                            })
                          }}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                            config.addons.includes('waterproof')
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-100 hover:border-blue-100'
                          }`}
                        >
                          <div className="flex gap-4 items-center text-gray-800">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                              <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-bold">Impermeabilização Premium</p>
                              <p className="text-sm text-gray-500">Proteção contra líquidos e manchas (+R$ 50,00)</p>
                            </div>
                          </div>
                          {config.addons.includes('waterproof') && <CheckCircle2 className="text-blue-600" />}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold text-gray-900">Onde será realizado?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-gray-700 mb-2">CEP</label>
                          <input 
                            type="text" 
                            className="w-full p-4 rounded-xl border-gray-200 bg-gray-50 text-gray-800" 
                            placeholder="00000-000"
                            value={location.cep}
                            onChange={(e) => setLocation({...location, cep: e.target.value})}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-gray-700 mb-2">Endereço Completo</label>
                          <input 
                            type="text" 
                            className="w-full p-4 rounded-xl border-gray-200 bg-gray-50 text-gray-800" 
                            placeholder="Rua, Avenida..."
                            value={location.address}
                            onChange={(e) => setLocation({...location, address: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Número</label>
                          <input 
                            type="text" 
                            className="w-full p-4 rounded-xl border-gray-200 bg-gray-50 text-gray-800"
                            value={location.number}
                            onChange={(e) => setLocation({...location, number: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Complemento</label>
                          <input 
                            type="text" 
                            className="w-full p-4 rounded-xl border-gray-200 bg-gray-50 text-gray-800"
                            value={location.complement}
                            onChange={(e) => setLocation({...location, complement: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold text-gray-900">Escolha a melhor data</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center text-gray-400 italic">
                          [ Calendário Interativo ]
                          <p className="text-xs mt-2">Clique para selecionar o dia</p>
                        </div>
                        <div className="space-y-4 text-gray-800">
                          <label className="block text-sm font-bold uppercase tracking-widest">Horários Disponíveis</label>
                          <div className="grid grid-cols-2 gap-3">
                            {['08:00', '10:00', '13:30', '15:30'].map((t) => (
                              <button
                                key={t}
                                onClick={() => setSchedule({...schedule, time: t})}
                                className={`p-4 rounded-xl border-2 font-bold transition-all ${
                                  schedule.time === t 
                                  ? 'border-blue-600 bg-blue-50 text-blue-700' 
                                  : 'border-gray-100 text-gray-500'
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold text-gray-900">Finalizar Pedido</h2>
                      <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <p className="text-blue-100 text-sm mb-1 uppercase tracking-widest font-bold">Total do Investimento</p>
                        <h3 className="text-5xl font-black italic tracking-tight">R$ {totalPrice.toFixed(2)}</h3>
                        
                        <div className="mt-8 flex gap-4">
                           <div className="flex-1 bg-white/10 p-4 rounded-2xl border border-white/20">
                              <p className="text-xs font-bold uppercase opacity-60">Data Escolhida</p>
                              <p className="font-bold">12 de Outubro</p>
                           </div>
                           <div className="flex-1 bg-white/10 p-4 rounded-2xl border border-white/20">
                              <p className="text-xs font-bold uppercase opacity-60">Horário</p>
                              <p className="font-bold">{schedule.time || '--:--'}</p>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-sm font-bold text-gray-700">Forma de Pagamento</p>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="p-6 rounded-2xl border-2 border-blue-600 bg-blue-50 flex justify-between items-center cursor-pointer text-gray-800">
                            <div className="flex gap-4 items-center">
                              <CreditCard className="text-blue-600" />
                              <span className="font-bold">PIX (5% de Desconto)</span>
                            </div>
                            <div className="w-6 h-6 rounded-full border-4 border-blue-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-auto pt-8 flex justify-between gap-4">
                <Button 
                  variant="ghost" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex gap-2"
                >
                  <ArrowLeft className="w-5 h-5" /> Voltar
                </Button>
                <Button 
                  onClick={nextStep}
                  className="flex gap-2 px-12"
                >
                  {currentStep === 4 ? 'Confirmar e Pagar' : 'Próximo Passo'}
                  {currentStep < 4 && <ArrowRight className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-900 border-b pb-4">Resumo do Pedido</h3>
              <div className="space-y-4 text-gray-800">
                <div className="flex justify-between">
                  <span className="text-gray-500">Serviço</span>
                  <span className="font-bold">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tamanho</span>
                  <span className="font-bold">{config.size}</span>
                </div>
                {config.addons.length > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span className="font-medium text-blue-400">Addon: Impermeab.</span>
                    <span className="font-bold">+R$ 50,00</span>
                  </div>
                )}
                <div className="pt-4 border-t flex justify-between items-baseline">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-blue-600">R$ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-3xl p-6 border border-yellow-100 flex gap-4">
              <AlertCircle className="w-12 h-12 text-yellow-600 shrink-0" />
              <p className="text-sm text-yellow-800 leading-relaxed">
                <strong>Garantia HigienizeJá:</strong> Refazemos o serviço sem custo caso não fique satisfeito em até 7 dias.
              </p>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
