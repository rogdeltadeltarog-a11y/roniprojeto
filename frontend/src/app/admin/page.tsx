export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Resumo */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium">Novos Pedidos</p>
          <h3 className="text-2xl font-bold mt-1 text-blue-600">12</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium">Receita Mensal (EST)</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">R$ 4.250,00</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium">Técnicos Ativos</p>
          <h3 className="text-2xl font-bold mt-1 text-purple-600">8</h3>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Próximos Agendamentos</h2>
        <p className="text-gray-500 italic">Nenhum agendamento para hoje.</p>
      </div>
    </div>
  );
}
