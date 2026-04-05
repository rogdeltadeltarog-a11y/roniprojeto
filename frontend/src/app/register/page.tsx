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
    phone: '',
    password: '',
    confirmPassword: '',
    cep: '',
    role: 'CLIENT' as 'CLIENT' | 'TECHNICIAN',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function fetchCep(cep: string) {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          cep,
        }));
      }
    } catch {}
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    setLoading(true);

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
      const { error: dbError } = await supabase.from('User').insert([
        {
          id: data.user.id,
          email: formData.email,
          password: 'HASHED_BY_SUPABASE',
          name: formData.name,
          phone: formData.phone,
          role: formData.role,
        },
      ]);

      if (dbError) {
        console.error('Database Sync Error:', dbError);
      }

      alert('Cadastro realizado! Verifique seu e-mail para ativar a conta.');
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

          <form onSubmit={handleRegister} className="space-y-5 text-gray-800">
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Nome Completo</label>
              <input
                type="text"
                required
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">E-mail</label>
              <input
                type="email"
                required
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">CEP</label>
              <input
                type="text"
                placeholder="00000-000"
                maxLength={9}
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.cep}
                onChange={(e) => {
                  const v = e.target.value;
                  setFormData({ ...formData, cep: v });
                  if (v.replace(/\D/g, '').length === 8) fetchCep(v);
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Telefone</label>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                required
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Senha</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <p className="text-xs text-gray-400 mt-1">Mínimo 6 caracteres</p>
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Confirmar Senha</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Tipo de Conta</label>
              <div className="grid grid-cols-2 gap-3">
                {(['CLIENT', 'TECHNICIAN'] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role })}
                    className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                      formData.role === role
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {role === 'CLIENT' ? 'Cliente' : 'Técnico'}
                  </button>
                ))}
              </div>
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
