'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Wallet, 
  Settings, 
  Edit3, 
  Image as ImageIcon, 
  Sun, 
  Moon 
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  
  // Stan przełączania motywu (Jasny / Ciemny)
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`flex min-h-screen font-sans selection:bg-purple-200 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-[#F8FAFC] text-gray-900'}`}>
      
      {/* SIDEBAR (Identyczny jak na zrzucie ekranu image_8e0960.png) */}
      <aside className="w-72 bg-[#7B59C2] p-6 flex flex-col justify-between text-white shadow-xl hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-12 pl-2">
            <div className="bg-white/20 p-2 rounded-xl">
              <Wallet size={28} className="text-white" />
            </div>
            <span className="text-3xl font-bold tracking-wide">Budgetify</span>
          </div>

          <nav className="space-y-3">
            <button 
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 font-medium transition-all text-white/90"
            >
              <LayoutDashboard size={22} />
              <span>Panel główny</span>
            </button>
            <button 
              onClick={() => router.push('/transactions')}
              className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 font-medium transition-all text-white/90"
            >
              <ArrowLeftRight size={22} />
              <span>Transakcje</span>
            </button>
            <button 
              onClick={() => router.push('/budgets')}
              className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 font-medium transition-all text-white/90"
            >
              <Wallet size={22} />
              <span>Budżety</span>
            </button>
            <button 
              onClick={() => router.push('/settings')}
              className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-[#6444A4] border border-black/10 font-semibold shadow-inner transition-all"
            >
              <Settings size={22} />
              <span>Ustawienia</span>
            </button>
          </nav>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 w-full pl-2">
            <div className="w-12 h-12 rounded-full bg-orange-200 border-2 border-white overflow-hidden flex items-center justify-center text-xl font-bold text-orange-700">
              U
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-white">User</span>
            </div>
          </div>
          <button onClick={() => router.push('/login')} className="w-full border border-white/50 hover:bg-white/10 text-white py-2.5 rounded-full text-sm font-semibold transition-colors">
            Wyloguj się
          </button>
        </div>
      </aside>

      {/* GŁÓWNA TREŚĆ OCZYWIŚCIE Z ODPOWIEDNIM DESIGNEM Z FIGMY */}
      <main className="flex-1 p-8 overflow-y-auto max-w-[1400px] mx-auto w-full space-y-8">
        
        <header>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Zarządzanie kontem Budgetify</h1>
        </header>

        {/* SEKCJA: TWÓJ PROFIL */}
        <div className="bg-[#7B59C2] text-white p-6 rounded-3xl shadow-lg space-y-4">
          <h2 className="text-xl font-bold border-b border-white/20 pb-2">Twój profil</h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-orange-200 border-2 border-white overflow-hidden flex items-center justify-center text-2xl font-bold text-orange-700 shadow-md">
                U
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight">User</span>
                <span className="text-sm text-white/80 font-medium">user@wp.pl</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button className="flex items-center justify-center gap-2 bg-black/30 hover:bg-black/40 border border-white/10 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95">
                <Edit3 size={16} />
                <span>Edytuj dane</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-black/30 hover:bg-black/40 border border-white/10 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95">
                <ImageIcon size={16} />
                <span>Zmień zdjęcie</span>
              </button>
            </div>
          </div>
        </div>

        {/* SEKCJA: PREFERENCJE APLIKACJI */}
        <div className="bg-[#7B59C2] text-white p-6 rounded-3xl shadow-lg space-y-6">
          <h2 className="text-xl font-bold border-b border-white/20 pb-2">Preferencje aplikacji</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-white/90">Waluta główna</label>
              <select className="w-full px-4 py-3 bg-white/20 border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/40">
                <option value="PLN" className="text-gray-900 font-semibold">Polski Złoty (zł)</option>
                <option value="EUR" className="text-gray-900 font-semibold">Euro (€)</option>
                <option value="USD" className="text-gray-900 font-semibold">Dolar ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-white/90">Język</label>
              <select className="w-full px-4 py-3 bg-white/20 border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/40">
                <option value="PL" className="text-gray-900 font-semibold">Polski</option>
                <option value="EN" className="text-gray-900 font-semibold">English</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-white/90">Początek miesiąca</label>
              <select className="w-full px-4 py-3 bg-white/20 border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/40">
                <option value="1" className="text-gray-900 font-semibold">1 dzień miesiąca</option>
                <option value="10" className="text-gray-900 font-semibold">10 dzień miesiąca</option>
                <option value="25" className="text-gray-900 font-semibold">25 dzień miesiąca</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-white/90">Motyw</label>
              <div className="grid grid-cols-2 p-1 bg-black/20 rounded-xl border border-white/10">
                <button 
                  type="button" 
                  onClick={() => setIsDarkMode(false)} 
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-extrabold transition-all ${!isDarkMode ? 'bg-white text-gray-900 shadow-md' : 'text-white/80 hover:text-white'}`}
                >
                  <Sun size={14} />
                  <span>Jasny</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsDarkMode(true)} 
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-extrabold transition-all ${isDarkMode ? 'bg-slate-900 text-white shadow-md border border-slate-700' : 'text-white/80 hover:text-white'}`}
                >
                  <Moon size={14} />
                  <span>Ciemny</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}