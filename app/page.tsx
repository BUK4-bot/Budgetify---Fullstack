'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-sans">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#7B59C2] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-semibold text-sm animate-pulse">Uruchamianie Budgetify...</p>
      </div>
    </div>
  );
}