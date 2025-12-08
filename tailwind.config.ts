import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',

    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: "rgb(var(--color-background) / <alpha-value>)",
                    light: "rgb(var(--color-background-light) / <alpha-value>)",
                },
                text: {
                    primary: "rgb(var(--color-text-primary) / <alpha-value>)",
                    secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
                    muted: "rgb(var(--color-text-muted) / <alpha-value>)",
                },
                status: {
                    optimal: "rgb(var(--color-status-optimal) / <alpha-value>)",
                    critical: "rgb(var(--color-status-critical) / <alpha-value>)",
                }
            },
            fontFamily: {
                funnel: ["var(--font-funnel)", "sans-serif"],
            },
            animation: {
                'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Normal pulse 2s'dir, bunu 8s yaptık çok yavaş olsun diye
            },
        },
    },
    plugins: [],
};
export default config;