import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAthleteById } from '@/services/api';
import { Navbar } from '@/components/Navbar';

/**
 * @interface PageProps
 * Next.js 15+ sürümünde dinamik route parametreleri (params) bir Promise olarak gelir.
 * Bu yüzden { id: string } yerine Promise<{ id: string }> tipini kullanıyoruz.
 */
interface PageProps {
    params: Promise<{ id: string }>;
}

/**
 * @page AthleteDetail
 * @description Seçilen sporcunun detaylı analiz ekranı.
 *
 * @features
 * - **Dinamik Tema:** Sporcunun durumu 'critical' ise tüm sayfa (arkaplan, metinler, grafikler) kırmızı tonlarına,
 * 'optimal' ise yeşil tonlarına bürünür.
 * - **Server Side Rendering (SSR):** Veriler sunucuda çekilir, bu sayede SEO ve ilk yükleme hızı maksimumdur.
 * - **Görsel Hiyerarşi:** Sol tarafta sabit profil kartı, sağ tarafta detaylı analiz metrikleri bulunur.
 */
export default async function AthleteDetail({ params }: PageProps) {
    // 1. URL PARAMETRESİ ÇÖZÜMLEME
    // Next.js 15 standardına uygun olarak params'ı await ediyoruz.
    const { id } = await params;

    // 2. VERİ ÇEKME (DATA FETCHING)
    // API servisimizden asenkron olarak sporcu verisini istiyoruz.
    const athlete = await getAthleteById(id);

    // Eğer ID geçersizse veya sporcu veritabanında yoksa 404 sayfasına yönlendir.
    if (!athlete) {
        notFound();
    }

    const isCritical = athlete.status === 'critical';

    // === 3. DINAMIK STİL TANIMLARI (THEME ENGINE) ===
    // Renk kodlarını (text-red-500, bg-green-100 vb.) HTML içinde tekrar tekrar yazmak yerine,
    // burada tek bir 'theme' objesi altında topluyoruz.
    const theme = {
        text: isCritical ? 'text-status-critical' : 'text-status-optimal',
        bg: isCritical ? 'bg-status-critical' : 'bg-status-optimal',
        bgSoft: isCritical ? 'bg-status-critical/10' : 'bg-status-optimal/10',
        border: isCritical ? 'border-status-critical/20' : 'border-status-optimal/20',
        glow: isCritical ? 'shadow-status-critical/20' : 'shadow-status-optimal/20',
        gradientText: isCritical
            ? 'from-status-critical to-red-600'
            : 'from-status-optimal to-emerald-600'
    };

    return (
        <div className="min-h-screen bg-background selection:bg-text-primary/20">
            <Navbar />

            {/* === ARKA PLAN DEKORU ===
                Sayfaya derinlik katan devasa, flulaştırılmış (blur) renk topları.
                Sporcunun durumuna göre (theme.bg) renk değiştirirler.
            */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] ${theme.bg}`} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-text-primary/5 blur-[100px]" />
            </div>

            <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8">

                {/* === NAVİGASYON & HEADER === */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    {/* Geri Dön Tuşu */}
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
                    >
                        <div className="p-2 rounded-xl bg-background-light border border-text-primary/10 group-hover:border-text-primary/30 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </div>
                        <span className="font-funnel-medium">Back to Roster</span>
                    </Link>

                    {/* Meta Bilgi: Son Güncelleme Zamanı */}
                    <div className="flex items-center gap-2 text-xs font-mono text-text-muted bg-background-light/50 px-3 py-1.5 rounded-lg border border-text-primary/5">
                        <span className="relative flex h-2 w-2">
                          {/* Yeşil yanıp sönen canlılık göstergesi */}
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Last Update: {new Date(athlete.last_update).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                </div>

                {/* === ANA IZGARA (GRID LAYOUT) ===
                    Mobilde tek kolon (grid-cols-1), geniş ekranda 12 birimli grid (grid-cols-12).
                */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* === SOL KOLON: SPORCU PROFİL KARTI (4 birim genişlik) ===
                        Sticky: Sayfa aşağı kaydırılsa bile bu kart ekranda sabit kalır.
                    */}
                    <div className="lg:col-span-4 sticky top-24">
                        <div className={`
                            relative overflow-hidden rounded-3xl p-8 text-center
                            bg-background-light/40 backdrop-blur-xl
                            border border-text-primary/10
                            shadow-2xl ${theme.glow}
                        `}>
                            {/* Profil Resmi Alanı */}
                            <div className="relative mx-auto w-48 h-48 mb-6 group">
                                {/* Dönen Kesikli Çizgi Animasyonu */}
                                <div className={`absolute inset-0 rounded-full border-2 border-dashed ${theme.border} animate-spin-slow`} />
                                <div className={`absolute inset-2 rounded-full border-2 ${theme.border}`} />

                                <Image
                                    src={athlete.image_url}
                                    alt={athlete.name}
                                    fill
                                    className="rounded-full object-cover p-3"
                                />

                                {/* Statü İkonu (Emoji) */}
                                <div className={`absolute bottom-4 right-4 p-2 rounded-full bg-background-light shadow-lg border border-text-primary/5 text-xl`}>
                                    {isCritical ? '⚠️' : '⚡'}
                                </div>
                            </div>

                            {/* Temel Bilgiler */}
                            <h1 className="text-3xl font-funnel-bold text-text-primary mb-1">
                                {athlete.name}
                            </h1>
                            <p className="text-text-muted text-sm font-mono mb-6">ID: #{athlete.id}</p>

                            {/* Statü Rozeti (Pill) */}
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${theme.bgSoft} border ${theme.border}`}>
                                <span className={`w-2.5 h-2.5 rounded-full ${theme.bg} ${isCritical && 'animate-pulse'}`} />
                                <span className={`text-sm font-bold uppercase tracking-wider ${theme.text}`}>
                                    {athlete.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* === SAĞ KOLON: ANALİZ & METRİKLER (8 birim genişlik) === */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* 1. FATIGUE SCORE KARTI */}
                        <div className="relative overflow-hidden rounded-3xl bg-background-light/60 backdrop-blur-md border border-text-primary/10 p-8">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                                <div>
                                    <h2 className="text-lg font-funnel-bold text-text-primary mb-1">Fatigue Index</h2>
                                    <p className="text-text-muted text-sm max-w-xs">
                                        Current physical load calculation based on recent training sessions.
                                    </p>
                                </div>

                                {/* Büyük Skor Göstergesi */}
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden md:block">
                                        <div className="text-xs text-text-muted font-bold uppercase tracking-widest">Score</div>
                                        <div className={`text-sm font-bold ${theme.text}`}>{isCritical ? 'Critical Load' : 'Optimal Range'}</div>
                                    </div>

                                    {/* Skor Değeri (Gradyan Renkli Metin) */}
                                    <div className={`
                                        text-7xl font-funnel-extrabold tracking-tight leading-none p-1
                                        bg-gradient-to-br ${theme.gradientText} bg-clip-text text-transparent
                                        drop-shadow-sm
                                    `}>
                                        {athlete.last_fatigue_score}
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar (Yükleme Çubuğu)
                                Skor değerine (0-1 arası) göre genişliği ayarlanır.
                            */}
                            <div className="mt-8 w-full h-3 bg-text-primary/5 rounded-full overflow-hidden relative">
                                <div className="absolute inset-0 bg-text-primary/5 opacity-20"></div>

                                <div
                                    className={`h-full ${theme.bg} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
                                    // Math.min ile değerin %100'ü geçmesini engelliyoruz (veri güvenliği).
                                    style={{ width: `${Math.min(Number(athlete.last_fatigue_score) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        {/* 2. AI INSIGHT (YAPAY ZEKA ÖNERİSİ) KARTI */}
                        <div className="flex-1 rounded-3xl bg-gradient-to-b from-background-light/80 to-background-light/40 border border-text-primary/10 p-1">
                            <div className="h-full rounded-[20px] bg-background/50 p-8">

                                {/* Kart Başlığı */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                                        {/* Brain/Analiz İkonu */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-funnel-bold text-text-primary">AI Performance Insight</h3>
                                        <p className="text-xs text-text-muted">Generated by Fatigue AI Model v2.1</p>
                                    </div>
                                </div>

                                {/* AI Metin Alanı */}
                                <div className="relative">
                                    {/* Dekoratif Tırnak İşareti */}
                                    <svg className="absolute -top-4 -left-4 w-8 h-8 text-text-primary/10 transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.096 14.017 14.745 14.453 13.554C14.889 12.363 15.554 11.121 16.518 9.928L19.52 7.21L19.52 3.79L14.997 7.21C14.343 7.7 13.554 8.653 12.791 9.954C12.029 11.254 11.538 13.051 11.538 15.225L11.538 21L14.017 21ZM5 21L5 18C5 16.096 5 14.745 5.436 13.554C5.872 12.363 6.537 11.121 7.501 9.928L10.503 7.21L10.503 3.79L5.98 7.21C5.326 7.7 4.537 8.653 3.774 9.954C3.012 11.254 2.521 13.051 2.521 15.225L2.521 21L5 21Z"/></svg>

                                    <p className="text-xl leading-relaxed text-text-primary font-funnel-medium pl-6 relative z-10">
                                        &quot;{athlete.ai_advice}&quot;
                                    </p>
                                </div>

                                {/* Kritik Durum Uyarısı (Opsiyonel)
                                    Sadece sporcu durumu 'critical' ise gösterilir.
                                */}
                                {isCritical && (
                                    <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-status-critical/5 border border-status-critical/10">
                                        <svg className="w-5 h-5 text-status-critical mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        <div>
                                            <p className="text-sm font-bold text-status-critical">Action Required</p>
                                            <p className="text-sm text-text-muted mt-0.5">High fatigue detected. Consider reducing training intensity by 20% for the next 24 hours.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}