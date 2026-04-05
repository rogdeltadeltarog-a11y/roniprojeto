'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    categoryId: '',
  });

  const supabase = createClient();

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    setLoading(true);
    const { data: catData } = await supabase.from('Category').select('*');
    setCategories(catData || []);

    const { data: servData } = await supabase
      .from('Service')
      .select('*, Category(name)');
    setServices(servData || []);
    setLoading(false);
  }

  async function handleAddService(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase
      .from('Service')
      .insert([
        {
          name: formData.name,
          description: formData.description,
          basePrice: parseFloat(formData.basePrice),
          categoryId: formData.categoryId,
          pricingRules: { multipliers: { P: 1.0, M: 1.5, G: 2.0 } },
        },
      ])
      .select();

    if (error) {
      alert('Erro ao adicionar serviço: ' + error.message);
    } else {
      setFormData({ name: '', description: '', basePrice: '', categoryId: '' });
      fetchInitialData();
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Gestão de Serviços</h1>

      {/* Form de Adição */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Novo Serviço</h2>
        <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome (ex: Limpeza de Sofá 3 Lugares)"
            className="p-2 border rounded text-gray-800"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <select
            className="p-2 border rounded text-gray-800 bg-white"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            required
          >
            <option value="">Selecione uma Categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Preço Base (R$)"
            className="p-2 border rounded text-gray-800"
            value={formData.basePrice}
            onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Descrição curta"
            className="p-2 border rounded text-gray-800"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
            >
              Adicionar Serviço
            </button>
          </div>
        </form>
      </div>

      {/* Tabela de Serviços */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Serviço</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Categoria</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Preço Base</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500 italic">Carregando serviços...</td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500 italic">Nenhum serviço cadastrado.</td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.description}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.Category?.name}</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">R$ {s.basePrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-4">Editar</button>
                    <button className="text-red-600 hover:text-red-800">Remover</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
