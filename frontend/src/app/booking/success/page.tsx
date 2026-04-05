'use client';

import { useSearchParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { CheckCircle, Copy, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const pixCode = "00020126580014BR.GOV.BCB.PIX0136dtuvjgyoswxupgglnnqb5204000053039865802BR5913HigienizeJa6009SAO PAULO62070503***6304E2D3";

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 flex items-center">
      <Container>
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
            <CheckCircle className="w-12 h-12" />
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Pedido Recebido!</h1>
          <p className="text-gray-500 mb-10 leading-relaxed text-lg">
            Seu agendamento foi registrado com sucesso. <br />
            Para confirmar, realize o pagamento via PIX abaixo.
          </p>

          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Código PIX (Copia e Cola)</p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
              <code className="text-sm text-gray-800 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {pixCode}
              </code>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(pixCode);
                  alert('Código copiado!');
                }}
                className="bg-blue-50 p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4 italic">Vencimento em 30 minutos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/orders">
              <Button variant="outline" className="w-full">Ver Meus Pedidos</Button>
            </Link>
            <Link href="/">
              <Button className="w-full flex gap-2">
                Voltar ao Início <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-xs text-gray-400">ID do Pedido: {id}</p>
        </div>
      </Container>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
