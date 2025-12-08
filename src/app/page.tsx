"use client";

import { useEffect, useState } from 'react';
import { Athlete } from '@/types/athlete';
import { getAthletes } from '@/services/api';
import { AthleteCard } from '@/components/AthleteCard';
import { Navbar } from '@/components/Navbar';
import { BackgroundDecor } from '@/components/BackgroundDecor';

/**
 * @page Dashboard
 * @description Uygulamanın ana giriş sayfasıdır. Takım performans özetini ve sporcu listesini gösterir.
 *
 * @features
 * - **İstatistikler:** Toplam, kritik ve optimal sporcu sayılarını gösteren özet kartları.
 * - **Anlık Arama:** Sporcu isimlerinde harf bazlı filtreleme (Client-side).
 * - **Durum Filtresi:** Listeyi 'Critical', 'Optimal' veya 'Hepsi' olarak filtreleme.
 * - **Dinamik Arayüz:** Yüklenme durumu (loading state) ve boş sonuç (empty state) ekranları.
 */
export default function Dashboard() {
  // === STATE YÖNETİMİ ===
  const [athletes, setAthletes] = useState<Athlete[]>([]); // API'den gelen ham veri
  const [loading, setLoading] = useState(true);            // Veri yükleniyor mu?
  const [searchTerm, setSearchTerm] = useState("");        // Arama kutusundaki metin
  const [statusFilter, setStatusFilter] = useState<'all' | 'critical' | 'optimal'>('all'); // Aktif filtre

  // === VERİ ÇEKME (DATA FETCHING) ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gerçek API çağrısı (services/api.ts)
        const data = await getAthletes();
        setAthletes(data);
      } catch (error) {
        console.error("Veri hatası:", error);
      } finally {
        setLoading(false); // Başarılı da olsa hatalı da olsa yüklemeyi bitir
      }
    };
    fetchData();
  }, []);

  // === FİLTRELEME MANTIĞI ===
  // Orijinal 'athletes' dizisini değiştirmeden, ekranda gösterilecek geçici listeyi hesaplıyoruz.
  const filteredAthletes = athletes.filter(athlete => {
    // 1. İsim Araması (Büyük/küçük harf duyarsız)
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Durum Filtresi (Seçili olan duruma eşit mi veya 'hepsi' mi?)
    const matchesStatus = statusFilter === 'all' || athlete.status === statusFilter;

    // Her iki koşul da sağlanıyorsa listeye ekle
    return matchesSearch && matchesStatus;
  });

  // === FİLTRE DÖNGÜSÜ ===
  // Tek bir butona basarak filtreleri sırasıyla değiştirir: All -> Critical -> Optimal -> All
  const cycleFilter = () => {
    if (statusFilter === 'all') setStatusFilter('critical');
    else if (statusFilter === 'critical') setStatusFilter('optimal');
    else setStatusFilter('all');
  };

  // === İSTATİSTİK HESAPLAMALARI ===
  // İstatistik kartlarında, filtrelerden etkilenmeyen GENEL durumu göstermek daha doğru olacaktır.
  // Bu yüzden 'filteredAthletes' yerine orijinal 'athletes' dizisini kullanıyoruz.
  const totalAthletes = athletes.length;
  const criticalCount = athletes.filter(a => a.status === 'critical').length;
  const optimalCount = athletes.filter(a => a.status === 'optimal').length;

  return (
      // selection: Metin seçildiğinde çıkan rengi temanın ana rengiyle uyumlu hale getirir.
      <div className="min-h-screen text-text-primary selection:bg-text-primary/20 relative">

        {/* Dekoratif Arka Plan (En arkada - z-index: -50) */}
        <BackgroundDecor />

        <Navbar />

        {/* Ana İçerik Alanı */}
        <main className="mx-auto max-w-7xl px-6 lg:px-8 py-12 relative z-10">

          {/* === HEADER & ARAMA === */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-text-muted font-medium text-sm uppercase tracking-widest mb-1">Dashboard</h2>
              <h1 className="text-3xl md:text-4xl font-funnel-bold text-text-primary tracking-tight">
                Team Performance
              </h1>
            </div>

            {/* Arama Input Grubu */}
            <div className="relative w-full md:w-80 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className={`h-5 w-5 transition-colors ${searchTerm ? 'text-text-primary' : 'text-text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search athlete by name..."
                  className="block w-full rounded-xl border border-text-primary/10 bg-background-light/50 pl-10 pr-10 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-text-primary/30 focus:ring-0 focus:bg-background-light transition-all shadow-sm"
              />
              {/* Temizle (X) Butonu: Sadece yazı varsa görünür */}
              {searchTerm && (
                  <button
                      onClick={() => setSearchTerm("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
              )}
            </div>
          </div>

          {/* === İÇERİK YÖNETİMİ (LOADING vs DATA) === */}
          {loading ? (
              // Loading State: Sayfa ortasında dönen spinner
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-8 h-8 border-4 border-text-primary/20 border-t-text-primary rounded-full animate-spin"></div>
                <p className="text-text-muted animate-pulse">Syncing team data...</p>
              </div>
          ) : (
              <>
                {/* === 1. İSTATİSTİK KARTLARI (KPIs) === */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">

                  {/* Total Squad */}
                  <div className="relative p-6 rounded-2xl bg-background-light/40 border border-text-primary/5 hover:border-text-primary/10 transition-colors backdrop-blur-sm">
                    <p className="text-sm font-medium text-text-secondary">Total Squad</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-3xl font-funnel-bold text-text-primary">{totalAthletes}</span>
                      <span className="text-sm text-text-muted">athletes</span>
                    </div>
                  </div>

                  {/* Critical Count */}
                  <div className="relative p-6 rounded-2xl bg-status-critical/5 border border-status-critical/10 hover:border-status-critical/20 transition-colors backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-status-critical">Needs Attention</p>
                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-3xl font-funnel-bold text-status-critical">{criticalCount}</span>
                          <span className="text-sm text-status-critical/70">high fatigue</span>
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-status-critical/10 flex items-center justify-center text-status-critical">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Optimal Count */}
                  <div className="relative p-6 rounded-2xl bg-status-optimal/5 border border-status-optimal/10 hover:border-status-optimal/20 transition-colors backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-status-optimal">Ready to Train</p>
                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-3xl font-funnel-bold text-status-optimal">{optimalCount}</span>
                          <span className="text-sm text-status-optimal/70">optimal cond.</span>
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-status-optimal/10 flex items-center justify-center text-status-optimal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* === 2. LİSTE BAŞLIĞI & FİLTRE BUTONU === */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-funnel-bold text-text-primary">
                    Athletes Roster
                    <span className="ml-2 text-sm font-normal text-text-muted">({filteredAthletes.length})</span>
                  </h2>

                  <button
                      onClick={cycleFilter}
                      className={`
                            text-sm font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2 border
                            ${statusFilter === 'all' ? 'bg-background-light text-text-secondary border-text-primary/10 hover:border-text-primary/30' : ''}
                            ${statusFilter === 'critical' ? 'bg-status-critical/10 text-status-critical border-status-critical/20' : ''}
                            ${statusFilter === 'optimal' ? 'bg-status-optimal/10 text-status-optimal border-status-optimal/20' : ''}
                        `}
                  >
                    {/* Filtre Durumuna Göre İkon Değişimi */}
                    {statusFilter === 'all' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
                    {statusFilter === 'critical' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                    {statusFilter === 'optimal' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}

                    <span>
                       {statusFilter === 'all' ? 'Show All' : statusFilter === 'critical' ? 'Critical Only' : 'Optimal Only'}
                    </span>
                  </button>
                </div>

                {/* === 3. SPORCU LİSTESİ (GRID) === */}
                {filteredAthletes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {filteredAthletes.map((athlete) => (
                          <AthleteCard key={athlete.id} athlete={athlete} />
                      ))}
                    </div>
                ) : (
                    // === EMPTY STATE (Sonuç Bulunamadı) ===
                    <div className="text-center py-20 rounded-3xl border border-dashed border-text-primary/10 bg-background-light/30">
                      <div className="mx-auto w-16 h-16 rounded-full bg-text-primary/5 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">No athletes found</h3>
                      <p className="text-text-muted mt-1">
                        We couldn&apos;t find any athlete matching &quot;{searchTerm}&quot;
                        {statusFilter !== 'all' && ` with ${statusFilter} status`}.
                      </p>
                      <button
                          onClick={() => { setSearchTerm(""); setStatusFilter('all'); }}
                          className="mt-6 text-sm text-blue-500 font-bold hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                )}
              </>
          )}
        </main>
      </div>
  );
}