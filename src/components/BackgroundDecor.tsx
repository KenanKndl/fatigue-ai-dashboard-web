"use client";

import React from 'react';

export const BackgroundDecor = () => {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-background">

            {/* 1. DOT PATTERN (NOKTA DOKUSU)
                - Çizgi yerine nokta kullandık, çok daha modern durur.
                - 'mask-image' sayesinde aşağı doğru indikçe tamamen kaybolur.
                - İçeriğin olduğu orta kısım temiz kalır.
            */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(var(--color-text-primary)) 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)'
                }}
            ></div>

            {/* 2. AMBIENT LIGHTS (ORTAM IŞIKLARI)
                Sadece kenarlarda değil, sayfanın genel atmosferini belirleyen ışıklar.
            */}

            {/* Üst Orta - Ana Aydınlatma (Mavi/Indigo - Güven verir) */}
            <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen" />

            {/* Sol Üst Köşe (Hafif Morluk) */}
            <div className="absolute top-0 -left-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full opacity-60 mix-blend-screen animate-pulse-slow" />

            {/* Sağ Üst Köşe (Hafif Teal/Yeşil - Optimal temasına göz kırpar) */}
            <div className="absolute top-0 -right-[10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full opacity-60 mix-blend-screen animate-pulse-slow delay-1000" />

        </div>
    );
};