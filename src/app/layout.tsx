import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// Yeni eklediğimiz provider'ı import et:
import { ThemeProvider } from "@/components/ThemeProvider";

const funnel = localFont({
    src: [
        { path: './fonts/FunnelDisplay-Light.ttf', weight: '300', style: 'normal' },
        { path: './fonts/FunnelDisplay-Regular.ttf', weight: '400', style: 'normal' },
        { path: './fonts/FunnelDisplay-Medium.ttf', weight: '500', style: 'normal' },
        { path: './fonts/FunnelDisplay-SemiBold.ttf', weight: '600', style: 'normal' },
        { path: './fonts/FunnelDisplay-Bold.ttf', weight: '700', style: 'normal' },
        { path: './fonts/FunnelDisplay-ExtraBold.ttf', weight: '800', style: 'normal' },
    ],
    variable: '--font-funnel',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Fatigue AI Dashboard",
    description: "Athlete Fatigue Management System",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        {/* suppressHydrationWarning önemli: next-themes class eklerken hata vermemesi için */}
        <body className={`${funnel.variable} font-funnel antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}