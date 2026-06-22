'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet, Lock, User, Mail } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Coś poszło nie tak podczas rejestracji.');
        }
        setSuccess('Konto założone pomyślnie! Przekierowuję do logowania...');
        setTimeout(() => {
          router.push('/login');
        }, 1500);
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
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">Dołącz do nas</h1>
          <p className="text-sm font-medium text-gray-500">Stwórz darmowe konto w Budgetify</p>
        </div>

        {/* KOMUNIKATY */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-semibold p-3.5 rounded-xl text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 text-sm font-semibold p-3.5 rounded-xl text-center">
            {success}
          </div>
        )}

        {/* FORMULARZ */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 ml-1">Nazwa użytkownika</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Twój unikalny login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B59C2] text-gray-800 bg-white"
              />
              <User size={18} className="absolute left-4 top-3.5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 ml-1">Adres E-mail</label>
            <div className="relative">
              <input
                type="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B59C2] text-gray-800 bg-white"
              />
              <Mail size={18} className="absolute left-4 top-3.5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 ml-1">Hasło</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Min. 8 znaków"
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
            {isLoading ? 'Tworzenie konta...' : 'Zarejestruj się'}
          </button>
        </form>

        {/* LINK DO LOGOWANIA */}
        <p className="text-center text-sm font-medium text-gray-600 pt-2">
          Masz już konto?{' '}
          <button onClick={() => router.push('/login')} className="text-[#7B59C2] font-bold hover:underline">
            Zaloguj się
          </button>
        </p>

      </div>
    </div>
  );
}