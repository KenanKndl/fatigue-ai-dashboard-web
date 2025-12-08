"use client";

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

/**
 * ThemeToggle bileşeni "window" nesnesine eriştiği için sunucu tarafında (SSR) render edilemez.
 * Bu yüzden 'dynamic' import kullanarak sadece tarayıcıda (client-side) yüklenmesini sağlıyoruz.
 * 'ssr: false' seçeneği, sunucu tarafında bu bileşeni tamamen devre dışı bırakır.
 */
const ThemeToggle = dynamic(() => import('./ThemeToggle').then(mod => mod.ThemeToggle), {
    ssr: false,
    loading: () => <div className="w-10 h-10" />, // Yüklenirken düzen bozulmasın diye boş kutu (placeholder)
});

/**
 * @component Navbar
 * @description Sayfanın üst kısmında sabit duran navigasyon barı.
 * Logo, Tema Değiştirici ve Kullanıcı Profilini içerir.
 */
export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-text-primary/10 bg-background/80 backdrop-blur-md transition-colors duration-300">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

                {/* === SOL: LOGO === */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-text-primary flex items-center justify-center transition-colors">
                        <span className="text-background font-funnel-bold text-lg">F</span>
                    </div>
                    <span className="text-xl font-funnel-bold text-text-primary tracking-tight">
                        Fatigue AI
                    </span>
                </Link>

                {/* === SAĞ: KONTROLLER & PROFİL === */}
                <div className="flex items-center gap-4">

                    {/* Tema Butonu */}
                    <ThemeToggle />

                    {/* Dikey Ayırıcı Çizgi */}
                    <div className="w-px h-8 bg-text-primary/10 mx-1 hidden md:block"></div>

                    {/* Kullanıcı Bilgisi (Sadece masaüstünde görünür) */}
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-bold text-text-primary">Coach Kenan</p>
                        <p className="text-xs text-text-muted">Head Trainer</p>
                    </div>

                    {/* Profil Avatarı */}
                    <div className="h-10 w-10 rounded-full bg-status-optimal/20 border border-status-optimal flex items-center justify-center text-status-optimal font-bold">
                        CK
                    </div>
                </div>
            </div>
        </nav>
    );
};