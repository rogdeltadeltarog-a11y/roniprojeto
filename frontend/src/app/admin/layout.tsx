import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">HigienizeJá Admin</h2>
        <nav className="space-y-4">
          <Link href="/admin" className="block hover:text-blue-300">Dashboard</Link>
          <Link href="/admin/categories" className="block hover:text-blue-300">Categorias</Link>
          <Link href="/admin/services" className="block hover:text-blue-300">Serviços</Link>
          <Link href="/admin/orders" className="block hover:text-blue-300">Pedidos</Link>
          <div className="pt-8 border-t border-blue-800">
            <Link href="/" className="block text-sm text-blue-400 hover:text-white">Voltar ao Site</Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
