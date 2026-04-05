'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Erro ao entrar: ' + error.message);
      setLoading(false);
    } else {
      router.push('/admin'); // Or wherever intended
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <Container>
        <div className="max-w-md mx-auto bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-blue-600 mb-2 italic">HigienizeJá</h1>
            <p className="text-gray-500 font-medium">Bem-vindo de volta!</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 text-gray-800">
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">E-mail</label>
              <input 
                type="email" 
                required 
                className="w-full p-4 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Senha</label>
              <input 
                type="password" 
                required 
                className="w-full p-4 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full" size="lg" isLoading={loading}>Entrar</Button>
          </form>

          <p className="mt-8 text-center text-gray-500">
            Não tem uma conta? <Link href="/register" className="text-blue-600 font-bold hover:underline">Cadastre-se</Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
