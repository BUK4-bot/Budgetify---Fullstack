'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Wallet, 
  Settings, 
  Plus, 
  ShoppingCart,
  Banknote,
  Car,
  Film,
  Layers
} from 'lucide-react';

export default function BudgetsPage() {
  const router = useRouter();
  
  const [currentExpenses, setCurrentExpenses] = useState({ Spożywcze: 350, Transport: 250, Rozrywka: 200, Rachunki: 600, Inne: 210 });

  const budgetLimits = {
    Spożywcze: 1000,
    Transport: 500,
    Rozrywka: 400,
    Rachunki: 1200,
    Inne: 500
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dashboard-stats/')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.categories) {
          setCurrentExpenses(data.categories);
        }
      })
      .catch(err => console.error("Błąd pobierania danych do budżetów:", err));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200">
      
      
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
              className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-[#6444A4] border border-black/10 font-semibold shadow-inner transition-all"
            >
              <Wallet size={22} />
              <span>Budżety</span>
            </button>
            <button className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 font-medium transition-all text-white/90">
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
              <span className="font-semibold text-lg">Użytkownik</span>
            </div>
          </div>
          <button onClick={() => router.push('/login')} className="w-full border border-white/50 hover:bg-white/10 text-white py-2.5 rounded-full text-sm font-semibold transition-colors">
            Wyloguj się
          </button>
        </div>
      </aside>

      
      <main className="flex-1 p-8 overflow-y-auto max-w-[1400px] mx-auto w-full">
        
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Twoje Budżety</h1>
            <p className="text-gray-500 font-medium text-sm">Kontroluj limity wydatków w poszczególnych kategoriach.</p>
          </div>
          <button className="flex items-center gap-2 bg-[#7B59C2] hover:bg-[#6848a6] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-colors">
            <Plus size={18} />
            <span>Stwórz nowy budżet</span>
          </button>
        </header>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <BudgetItem 
            icon={<ShoppingCart size={22} />} 
            title="Spożywcze" 
            current={currentExpenses.Spożywcze} 
            limit={budgetLimits.Spożywcze} 
            color="bg-blue-500"
          />
          <BudgetItem 
            icon={<Car size={22} />} 
            title="Transport" 
            current={currentExpenses.Transport} 
            limit={budgetLimits.Transport} 
            color="bg-orange-500"
          />
          <BudgetItem 
            icon={<Film size={22} />} 
            title="Rozrywka" 
            current={currentExpenses.Rozrywka} 
            limit={budgetLimits.Rozrywka} 
            color="bg-slate-600"
          />
          <BudgetItem 
            icon={<Banknote size={22} />} 
            title="Rachunki" 
            current={currentExpenses.Rachunki} 
            limit={budgetLimits.Rachunki} 
            color="bg-[#7B59C2]"
          />
          <BudgetItem 
            icon={<Layers size={22} />} 
            title="Inne" 
            current={currentExpenses.Inne} 
            limit={budgetLimits.Inne} 
            color="bg-green-500"
          />

        </div>
      </main>
    </div>
  );
}


function BudgetItem({ icon, title, current, limit, color }: { icon: React.ReactNode; title: string; current: number; limit: number; color: string }) {
  const percentage = Math.min((current / limit) * 100, 100);
  const isOverBudget = current > limit;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 ${color} text-white rounded-2xl shadow-sm`}>
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{title}</h3>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Miesięczny limit</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-extrabold text-gray-900">{current.toFixed(0)}</span>
          <span className="text-sm font-bold text-gray-400"> / {limit} zł</span>
        </div>
      </div>

      
      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden relative">
        <div 
          style={{ width: `${percentage}%` }} 
          className={`h-full rounded-full transition-all duration-500 ${isOverBudget ? 'bg-red-500' : color}`}
        ></div>
      </div>

      <div className="flex justify-between items-center text-xs font-bold">
        <span className={isOverBudget ? 'text-red-500' : 'text-gray-500'}>
          {isOverBudget ? 'Przekroczono limit!' : `Wykorzystano ${percentage.toFixed(0)}%`}
        </span>
        <span className="text-gray-400">Zostało: {(limit - current) < 0 ? 0 : (limit - current).toFixed(0)} zł</span>
      </div>
    </div>
  );
}