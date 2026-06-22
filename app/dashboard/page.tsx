'use client';

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Wallet, 
  Settings, 
  Search, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  ShoppingCart,
  Banknote,
  Plane,
  Bike,
  X 
} from 'lucide-react';

// Rozwiązanie błędu "Unexpected any" - jawnie definiujemy typ dla TypeScripta
interface DashboardTransaction {
  id: number;
  title: string;
  date: string;
  amount: string;
  isExpense: boolean;
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ saldo: 13267, przychod: 3200, wydatki: 1960, oszczednosci: 39 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAmount, setModalAmount] = useState('');
  const [modalCategory, setModalCategory] = useState('Spożywcze');
  const [modalType, setModalType] = useState('expense');

  // Używamy naszego bezpiecznego typu zamiast any[]
  const [transactions, setTransactions] = useState<DashboardTransaction[]>([]);

  const fetchDashboardData = () => {
    fetch('http://127.0.0.1:8000/api/dashboard-stats/')
      .then(res => {
        if (!res.ok) {
          console.warn(`Django zwróciło kod błędu: ${res.status}`);
          return null; 
        }
        return res.json();
      })
      .then(data => {
        if (!data) return;
        setStats({
          saldo: data.saldo,
          przychod: data.przychod,
          wydatki: data.wydatki,
          oszczednosci: data.oszczednosci
        });
        if (data.transactions) {
          setTransactions(data.transactions);
        }
      })
      .catch(err => {
        console.error("Błąd połączenia z Django:", err);
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddOperation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const val = parseFloat(modalAmount);
    if (isNaN(val)) return;

    const isExpense = modalType === 'expense';

    fetch('http://127.0.0.1:8000/api/dashboard-stats/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: modalTitle,
        amount: val,
        category: modalCategory,
        is_expense: isExpense
      })
    })
    .then(res => {
      if (res.ok) {
        fetchDashboardData(); 
        setIsModalOpen(false);
        setModalTitle('');
        setModalAmount('');
        setModalCategory('Spożywcze');
        setModalType('expense');
      }
    })
    .catch(err => console.error("Nie udało się zapisać w bazie danych:", err));
  };

  const saldoCalkowite = stats?.saldo ?? 13267;
  const miesiecznyPrzychod = stats?.przychod ?? 3200;
  const miesieczneWydatki = stats?.wydatki ?? 1960;
  const stopaOszczednosci = stats?.oszczednosci ?? 39;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200 relative">
      
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
            <button className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-[#6444A4] border border-black/10 font-semibold shadow-inner transition-all">
              <LayoutDashboard size={22} />
              <span>Panel główny</span>
            </button>
            <button className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 font-medium transition-all text-white/90">
              <ArrowLeftRight size={22} />
              <span>Transakcje</span>
            </button>
            <button className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 font-medium transition-all text-white/90">
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
          <button className="w-full border border-white/50 hover:bg-white/10 text-white py-2.5 rounded-full text-sm font-semibold transition-colors">
            Wyloguj się
          </button>
        </div>
      </aside>

      {/* GŁÓWNA SEKCJA */}
      <main className="flex-1 p-8 overflow-y-auto max-w-[1400px] mx-auto w-full">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-200 border-2 border-[#7B59C2] flex items-center justify-center text-2xl font-bold text-orange-700 shadow-sm">
              U
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cześć, Użytkowniku!</h1>
              <p className="text-gray-500 font-medium text-sm">Oto twój dzisiejszy przegląd finansowy.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input 
                type="text" 
                placeholder="Szukaj transakcji..." 
                className="w-full pl-4 pr-10 py-2.5 border border-purple-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7B59C2] bg-white text-gray-700 shadow-sm"
              />
              <Search size={18} className="absolute right-3 top-3 text-gray-400" />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#7B59C2] hover:bg-[#6848a6] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} />
              <span>Dodaj operację</span>
            </button>
          </div>
        </header>

        {/* KARTY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <PurpleCard title="Całkowite saldo" value={`${saldoCalkowite.toLocaleString('pl-PL')} zł`} />
          <PurpleCard 
            title="Miesięczny przychód" 
            value={`${miesiecznyPrzychod.toLocaleString('pl-PL')} zł`} 
            icon={<TrendingUp size={24} className="text-white/80" />} 
          />
          <PurpleCard 
            title="Miesięczne wydatki" 
            value={`${miesieczneWydatki.toLocaleString('pl-PL')} zł`} 
            icon={<TrendingDown size={24} className="text-white/80" />} 
          />
          <PurpleCard title="Stopa oszczędności" value={`${stopaOszczednosci} %`} />
        </div>

        {/* WYKRESY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-800 mb-6 self-start w-full text-center">Struktura wydatków</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full py-4">
              <div className="relative w-44 h-44">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="4.2" strokeDasharray="50 100" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#FF9248" strokeWidth="4.2" strokeDasharray="25 100" strokeDashoffset="-50" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#475569" strokeWidth="4.2" strokeDasharray="10 100" strokeDashoffset="-75" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#A3E635" strokeWidth="4.2" strokeDasharray="15 100" strokeDashoffset="-85" />
                </svg>
              </div>
              <div className="space-y-2.5 text-sm font-semibold text-gray-700">
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#3B82F6]"></div><span>Spożywcze</span></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#FF9248]"></div><span>Transport</span></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#475569]"></div><span>Rozrywka</span></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#A3E635]"></div><span>Inne</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">Wydatki według kategorii</h3>
            <div className="flex items-end justify-between h-48 px-4 border-b border-slate-200 pb-2">
              <BarChartColumn heightClass="h-[100%]" value="600" color="bg-[#7B59C2]" label="Rachunki" />
              <BarChartColumn heightClass="h-[42%]" value="250" color="bg-[#DB2777]" label="Transport" />
              <BarChartColumn heightClass="h-[33%]" value="200" color="bg-[#EA580C]" label="Rozrywka" />
              <BarChartColumn heightClass="h-[35%]" value="210" color="bg-[#A3E635]" label="Inne" />
            </div>
          </div>
        </div>

        {/* TRANSAKCJE I CELE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-[#7B59C2] text-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-xl font-bold mb-5 text-center">Ostatnie transakcje</h3>
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <p className="text-center text-white/60 text-sm py-4">Brak transakcji w bazie. Dodaj pierwszą!</p>
              ) : (
                transactions.map(tx => (
                  <TransactionItem 
                    key={tx.id}
                    icon={tx.title.toLowerCase().includes('wynagrodzenie') || tx.title.toLowerCase().includes('premia') ? <Banknote size={20} /> : <ShoppingCart size={20} />} 
                    title={tx.title} 
                    date={tx.date} 
                    amount={tx.amount} 
                    isExpense={tx.isExpense} 
                  />
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#7B59C2] text-white p-6 rounded-3xl shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6 text-center">Moje cele</h3>
              <div className="space-y-5">
                <GoalItem icon={<Plane size={20} />} title="Wakacje w Japonii" current={4500} total={8000} />
                <GoalItem icon={<Bike size={20} />} title="Yamaha R125" current={5000} total={12000} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100">
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Dodaj nową operację</h2>
            <form onSubmit={handleAddOperation} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-2xl">
                <button type="button" onClick={() => setModalType('expense')} className={`py-2 rounded-xl text-sm font-bold transition-all ${modalType === 'expense' ? 'bg-red-500 text-white shadow-md' : 'text-gray-600'}`}>
                  Wydatek
                </button>
                <button type="button" onClick={() => setModalType('income')} className={`py-2 rounded-xl text-sm font-bold transition-all ${modalType === 'income' ? 'bg-green-500 text-white shadow-md' : 'text-gray-600'}`}>
                  Przychód
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Nazwa operacji</label>
                <input type="text" value={modalTitle} onChange={(e) => setModalTitle(e.target.value)} required className="w-full px-4 py-3 border rounded-2xl text-sm text-gray-800 bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Kwota (zł)</label>
                <input type="number" step="0.01" value={modalAmount} onChange={(e) => setModalAmount(e.target.value)} required className="w-full px-4 py-3 border rounded-2xl text-sm text-gray-800 bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Kategoria</label>
                <select value={modalCategory} onChange={(e) => setModalCategory(e.target.value)} className="w-full px-4 py-3 border rounded-2xl text-sm text-gray-800 bg-white">
                  <option value="Spożywcze">Spożywcze</option>
                  <option value="Transport">Transport</option>
                  <option value="Rozrywka">Rozrywka</option>
                  <option value="Rachunki">Rachunki</option>
                  <option value="Inne">Inne</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-[#7B59C2] hover:bg-[#6848a6] text-white py-3.5 rounded-2xl font-bold transition-colors shadow-lg mt-2">
                Zapisz operację
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function PurpleCard({ title, value, icon }: { title: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-[#7B59C2] text-white p-5 rounded-3xl shadow-md flex flex-col items-center justify-center text-center border min-h-[120px]">
      <span className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">{title}</span>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        {icon}
      </div>
    </div>
  );
}

function BarChartColumn({ heightClass, value, color, label }: { heightClass: string; value: string; color: string; label: string }) {
  return (
    <div className="flex flex-col items-center flex-1 h-full justify-end group">
      <div className={`w-14 ${color} ${heightClass} rounded-t-2xl flex items-center justify-center text-white font-bold text-xs shadow-md relative`}>
        <span>{value}</span>
      </div>
      <span className="text-xs font-bold text-gray-500 mt-2">{label}</span>
    </div>
  );
}

function TransactionItem({ icon, title, date, amount, isExpense }: { icon: React.ReactNode; title: string; date: string; amount: string; isExpense: boolean }) {
  return (
    <div className="flex items-center justify-between bg-white/10 border border-white/5 p-3.5 rounded-2xl">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-white/20 rounded-xl">{icon}</div>
        <div className="flex flex-col">
          <span className="font-bold text-base">{title}</span>
          <span className="text-xs text-white/70 font-medium">{date}</span>
        </div>
      </div>
      <span className={`text-base font-bold tracking-tight ${isExpense ? 'text-red-300' : 'text-green-300'}`}>
        {amount}
      </span>
    </div>
  );
}

function GoalItem({ icon, title, current, total }: { icon: React.ReactNode; title: string; current: number; total: number }) {
  const percentage = Math.min((current / total) * 100, 100);
  return (
    <div className="bg-white/10 border border-white/5 p-4 rounded-2xl space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">{icon}</div>
          <span className="font-bold text-base">{title}</span>
        </div>
        <span className="text-sm font-bold">{current} / {total} zł</span>
      </div>
      <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
        <div className="bg-white h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}