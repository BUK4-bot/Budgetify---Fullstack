'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Wallet, 
  Settings, 
  Search,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface Transaction {
  id: number;
  title: string;
  date: string;
  amount: string;
  isExpense: boolean;
}

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dashboard-stats/')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.transactions) {
          setTransactions(data.transactions);
        }
      })
      .catch(err => console.error("Błąd pobierania historii transakcji:", err));
  }, []);

  const filteredTransactions = transactions.filter(tx =>
    tx.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200">
      
      {/* SIDEBAR */}
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
              className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-[#6444A4] border border-black/10 font-semibold shadow-inner transition-all"
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

      {/* GŁÓWNA TREŚĆ */}
      <main className="flex-1 p-8 overflow-y-auto max-w-[1400px] mx-auto w-full">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Historia Transakcji</h1>
            <p className="text-gray-500 font-medium text-sm">Pełny wgląd we wszystkie przychody i wydatki zapisane w bazie.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Filtruj historię..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-purple-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7B59C2] bg-white text-gray-700 shadow-sm"
            />
            <Search size={18} className="absolute right-3 top-3 text-gray-400" />
          </div>
        </header>

        {/* TABELA Z TRANSAKCJAMI */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="p-5">Typ</th>
                  <th className="p-5">Nazwa operacji</th>
                  <th className="p-5">Data</th>
                  <th className="p-5 text-right">Kwota</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-semibold text-gray-700">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-gray-400 font-medium">
                      Brak operacji spełniających kryteria wyszukiwania.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-5">
                        <div className={`p-2 w-9 h-9 rounded-xl flex items-center justify-center ${tx.isExpense ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                          {tx.isExpense ? <TrendingDown size={18} /> : <TrendingUp size={18} />}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-900">{tx.title}</span>
                        </div>
                      </td>
                      <td className="p-5 text-gray-500">{tx.date}</td>
                      <td className={`p-5 text-right font-extrabold text-base ${tx.isExpense ? 'text-red-500' : 'text-green-600'}`}>
                        {tx.amount}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}