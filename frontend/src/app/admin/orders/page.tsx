'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('Order')
      .select('*, Service(name), User:clientId(name, email)')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from('Order')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) alert('Erro ao atualizar: ' + error.message);
    else fetchOrders();
  }

  const statusMap: any = {
    'PENDING': { label: 'Pendente', class: 'bg-yellow-100 text-yellow-700' },
    'SCHEDULED': { label: 'Agendado', class: 'bg-blue-100 text-blue-700' },
    'EN_ROUTE': { label: 'A Caminho', class: 'bg-purple-100 text-purple-700' },
    'IN_PROGRESS': { label: 'Executando', class: 'bg-indigo-100 text-indigo-700' },
    'COMPLETED': { label: 'Concluído', class: 'bg-green-100 text-green-700' },
    'CANCELLED': { label: 'Cancelado', class: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Gestão de Pedidos</h1>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Serviço</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Data/Hora</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center italic text-gray-400">Carregando pedidos...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center italic text-gray-400">Nenhum pedido encontrado.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold">{order.User?.name || 'Cliente Anon.'}</div>
                      <div className="text-xs text-gray-500">{order.User?.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{order.Service?.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold">
                        {format(new Date(order.scheduledDate), "dd 'de' MMM", { locale: ptBR })}
                      </div>
                      <div className="text-xs text-gray-500">
                        às {format(new Date(order.scheduledDate), "HH:mm")}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600">
                      R$ {order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusMap[order.status]?.class}`}>
                        {statusMap[order.status]?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        className="p-1 text-xs border rounded bg-white text-gray-800"
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                      >
                        {Object.keys(statusMap).map(k => (
                          <option key={k} value={k}>{statusMap[k].label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
