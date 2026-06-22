'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet, Lock, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Błędne dane logowania.');
        }
        // Sukces: Przekierowujemy użytkownika bezpośrednio na dashboard!
        router.push('/dashboard');
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-100 w-full max-w-md space-y-6">
        
        {/* LOGO */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="bg-[#7B59C2] p-3 rounded-2xl text-white shadow-lg shadow-purple-200">
            <Wallet size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">Budgetify</h1>
          <p className="text-sm font-medium text-gray-500">Zaloguj się do swojego portfela</p>
        </div>

        {/* BŁĄD */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-semibold p-3.5 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* FORMULARZ */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 ml-1">Nazwa użytkownika</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Wpisz login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B59C2] text-gray-800 bg-white"
              />
              <User size={18} className="absolute left-4 top-3.5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 ml-1">Hasło</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B59C2] text-gray-800 bg-white"
              />
              <Lock size={18} className="absolute left-4 top-3.5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7B59C2] hover:bg-[#6848a6] disabled:bg-purple-300 text-white py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-purple-100 mt-2 active:scale-[0.99]"
          >
            {isLoading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>

        {/* LINK DO REJESTRACJI */}
        <p className="text-center text-sm font-medium text-gray-600 pt-2">
          Nie masz konta?{' '}
          <button onClick={() => router.push('/register')} className="text-[#7B59C2] font-bold hover:underline">
            Zarejestruj się
          </button>
        </p>

      </div>
    </div>
  );
}