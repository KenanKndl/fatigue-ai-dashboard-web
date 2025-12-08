"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

/**
 * @component ThemeProvider
 * @description Uygulamanın tamamını sararak tema (Dark/Light) context'ini sağlar.
 * * @note Bu bileşen 'client-side' çalışmak zorundadır, bu yüzden "use client" direktifi vardır.
 * Layout.tsx içinde <body> etiketinden hemen sonra kullanılır.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}