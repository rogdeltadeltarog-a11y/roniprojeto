'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MapPin, CheckCircle, Navigation } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function TechnicianPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);
    // In MVP, we show all "SCHEDULED" or "EN_ROUTE" jobs
    const { data } = await supabase
      .from('Order')
      .select('*, Service(name), User:clientId(name, phone)')
      .in('status', ['SCHEDULED', 'EN_ROUTE', 'IN_PROGRESS'])
      .order('scheduledDate', { ascending: true });
    
    setJobs(data || []);
    setLoading(false);
  }

  async function updateJobStatus(id: string, status: string) {
    const { error } = await supabase
      .from('Order')
      .update({ status })
      .eq('id', id);
    
    if (error) alert(error.message);
    else fetchJobs();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-blue-600 text-white p-6 shadow-lg rounded-b-3xl mb-8">
        <h1 className="text-2xl font-bold italic">Painel do Técnico</h1>
        <p className="text-blue-100 text-sm">Bom trabalho hoje!</p>
      </header>

      <div className="max-w-md mx-auto px-4 space-y-6">
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest">Serviços do Dia</h2>

        {loading ? (
          <p className="text-center text-gray-400 py-10">Carregando sua agenda...</p>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-200">
             <p className="text-gray-400 font-medium">Nenhum serviço agendado.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{job.Service.name}</h3>
                  <p className="text-blue-600 font-bold text-sm">
                    {format(new Date(job.scheduledDate), "HH:mm")} - {format(new Date(job.scheduledDate), "dd MMM", { locale: ptBR })}
                  </p>
                </div>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-black uppercase">
                  {job.status}
                </span>
              </div>

              <div className="flex gap-3 text-gray-600">
                <MapPin className="w-5 h-5 shrink-0 text-gray-400" />
                <p className="text-sm">{job.address}</p>
              </div>

              <div className="pt-4 flex gap-2">
                {job.status === 'SCHEDULED' && (
                  <Button 
                    className="flex-1 gap-2" 
                    onClick={() => updateJobStatus(job.id, 'EN_ROUTE')}
                  >
                    <Navigation className="w-5 h-5" /> Iniciar Rota
                  </Button>
                )}
                {job.status === 'EN_ROUTE' && (
                  <Button 
                    className="flex-1 gap-2 bg-indigo-600" 
                    onClick={() => updateJobStatus(job.id, 'IN_PROGRESS')}
                  >
                    Cheguei ao Local
                  </Button>
                )}
                {job.status === 'IN_PROGRESS' && (
                  <Button 
                    className="flex-1 gap-2 bg-green-600" 
                    onClick={() => updateJobStatus(job.id, 'COMPLETED')}
                  >
                    <CheckCircle className="w-5 h-5" /> Finalizar
                  </Button>
                )}
              </div>

              <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                <span>Cliente: {job.User.name}</span>
                <a href={`tel:${job.User.phone}`} className="text-blue-600 font-bold">Ligar</a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
