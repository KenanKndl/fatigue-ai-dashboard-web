"use client";

import { useTheme } from "next-themes";

/**
 * @component ThemeToggle
 * @description Kullanıcının Aydınlık (Light) ve Karanlık (Dark) mod arasında geçiş yapmasını sağlar.
 * * @notes
 * - `next-themes` kütüphanesini kullanır.
 * - Hydration (istemci-sunucu uyumsuzluğu) hatasını önlemek için Navbar içinde dynamic import ile yüklenir.
 * - SVG ikonlar CSS class'ları ile animasyonlu şekilde yer değiştirir.
 */
export function ThemeToggle() {
    // resolvedTheme: Sistem ayarını önemsenmez, o an aktif olan gerçek temayı ('dark' veya 'light') verir.
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-background-light border border-text-primary/10 hover:border-text-primary/30 transition-colors focus:outline-none"
            aria-label="Temayı Değiştir"
        >
            {/* === GÜNEŞ İKONU ===
               Sadece Light Mode'da görünür.
               Dark Mode'da görünmezdir.
            */}
            <svg
                className={`h-5 w-5 text-text-primary transition-all ${
                    resolvedTheme === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>

            {/* === AY İKONU ===
               Sadece Dark Mode'da görünür.
               Light Mode'da görünmezdir.
            */}
            <svg
                className={`absolute h-5 w-5 text-text-primary transition-all ${
                    resolvedTheme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
            </svg>
        </button>
    );
}