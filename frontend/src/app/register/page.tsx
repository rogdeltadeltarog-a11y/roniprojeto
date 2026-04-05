'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    // 1. Supabase Auth Signup
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert('Erro no cadastro: ' + error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // 2. Manual Insert into our 'User' table (Prisma-managed)
      const { error: dbError } = await supabase
        .from('User')
        .insert([{
          id: data.user.id,
          email: formData.email,
          password: 'HASHED_BY_SUPABASE', // We won't use this directly
          name: formData.name,
          phone: formData.phone,
          role: 'CLIENT'
        }]);
      
      if (dbError) {
        console.error('Database Sync Error:', dbError);
      }
      
      alert('Cadastro realizado! Por favor, verifique seu e-mail.');
      router.push('/login');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
      <Container>
        <div className="max-w-md mx-auto bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-blue-600 mb-2 italic">HigienizeJá</h1>
            <p className="text-gray-500 font-medium">Crie sua conta e agende em segundos.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6 text-gray-800">
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Nome Completo</label>
              <input 
                type="text" 
                required 
                className="w-full p-4 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">E-mail</label>
              <input 
                type="email" 
                required 
                className="w-full p-4 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Senha</label>
              <input 
                type="password" 
                required 
                className="w-full p-4 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <Button className="w-full" size="lg" isLoading={loading}>Cadastrar</Button>
          </form>

          <p className="mt-8 text-center text-gray-500">
            Já tem uma conta? <Link href="/login" className="text-blue-600 font-bold hover:underline">Entrar</Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
