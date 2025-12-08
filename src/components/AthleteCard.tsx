import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Athlete } from '@/types/athlete';

interface AthleteCardProps {
    athlete: Athlete;
}

/**
 * @component AthleteCard
 * @description Sporcu özet bilgilerini gösteren kart bileşeni.
 * * @features
 * - Sporcunun durumuna (Critical/Optimal) göre dinamik renk değişimi.
 * - Hover (üzerine gelme) durumunda "Glow" (parıltı) ve yukarı kalkma efekti.
 * - Glassmorphism ve Border efektleri.
 */
export const AthleteCard = ({ athlete }: AthleteCardProps) => {
    const isCritical = athlete.status === 'critical';

    // 1. Gölge (Glow): Hover durumunda kartın arkasından sızan renkli ışık.
    const shadowColor = isCritical
        ? 'hover:shadow-status-critical/30'
        : 'hover:shadow-status-optimal/30';

    // 2. Kenarlık (Border): Hover durumunda kartın çerçevesinin rengi.
    const borderColor = isCritical
        ? 'group-hover:border-status-critical/50'
        : 'group-hover:border-status-optimal/50';

    // 3. Rozet (Badge): Statü metninin arka planı ve yazı rengi.
    const badgeStyle = isCritical
        ? 'bg-status-critical/10 text-status-critical border-status-critical/20'
        : 'bg-status-optimal/10 text-status-optimal border-status-optimal/20';

    return (
        <Link href={`/athlete/${athlete.id}`} className="block group relative">

            {/* === ARKA PLAN GLOW EFEKTİ ===
                Kartın arkasında gizli duran, hover olunca opacity'si artan renkli katman.
                'blur-xl' ile yumuşatılarak neon ışığı etkisi verilir.
            */}
            <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl 
                ${isCritical ? 'bg-status-critical/20' : 'bg-status-optimal/20'}`}>
            </div>

            {/* === KARTIN KENDİSİ === */}
            <div
                className={`
                  relative h-full
                  flex items-center gap-5 p-5
                  rounded-2xl
                  bg-background-light          /* Kartın zemin rengi */
                  border border-text-primary/5   /* Varsayılan silik çerçeve */
                  ${borderColor}               /* Hover çerçeve rengi */
                  shadow-sm                    /* Varsayılan hafif gölge */
                  ${shadowColor}               /* Hover renkli gölge */
                  hover:-translate-y-1         /* Hover animasyonu (Yukarı kalkma) */
                  transition-all duration-300 ease-out
                `}
            >
                {/* === SOL: AVATAR ALANI === */}
                <div className="relative">
                    {/* Resim Çerçevesi */}
                    <div className={`p-0.5 rounded-full border-2 ${isCritical ? 'border-status-critical' : 'border-status-optimal'} shadow-sm`}>
                        <Image
                            src={athlete.image_url}
                            alt={athlete.name}
                            width={60}
                            height={60}
                            className="rounded-full object-cover bg-background"
                        />
                    </div>

                    {/* Sağ alttaki durum noktası (Ping Animasyonu) */}
                    <div className="absolute bottom-0 right-0">
                        <span className={`relative flex h-3.5 w-3.5`}>
                          {/* Sadece Critical ise "yanıp sönen" (ping) efekt ekle */}
                            {isCritical && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-critical opacity-75"></span>
                            )}
                            <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-background-light ${isCritical ? 'bg-status-critical' : 'bg-status-optimal'}`}></span>
                        </span>
                    </div>
                </div>

                {/* === SAĞ: BİLGİ ALANI === */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">

                    {/* İsim ve Gizli Ok İkonu */}
                    <div className="flex justify-between items-start">
                        {/* bg-clip-text: İsim üzerine gelince renk geçişi (gradient) uygular */}
                        <h3 className="text-lg font-funnel-bold text-text-primary truncate pr-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-text-primary group-hover:to-text-secondary transition-all">
                            {athlete.name}
                        </h3>

                        {/* Ok İkonu: Sadece hover olunca görünür ve sağa kayar */}
                        <svg className="w-5 h-5 text-text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>

                    {/* Alt Bilgiler: Status ve Score */}
                    <div className="flex items-center gap-3 mt-2">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${badgeStyle}`}>
                            {athlete.status}
                        </span>

                        <div className="h-3 w-px bg-text-primary/10"></div>

                        <div className="flex items-baseline gap-1.5 text-text-muted group-hover:text-text-primary transition-colors">
                            <span className="text-[10px] font-medium uppercase tracking-wide">Score</span>
                            <span className="text-sm font-funnel-bold text-text-primary">{athlete.last_fatigue_score}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};