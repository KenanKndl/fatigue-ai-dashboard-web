import { Athlete } from "@/types/athlete";

const MOCK_DATA: Athlete[] = [
    {
        id: "101",
        name: "Ali Kerem",
        last_fatigue_score: 0.85,
        status: "critical",
        last_update: "2025-10-25T14:30:00Z",
        image_url: "https://randomuser.me/api/portraits/men/32.jpg",
        ai_advice: "Yüksek laktat riski. 24 saat aktif dinlenme önerilir.",
    },
    {
        id: "102",
        name: "Burak Yilmaz",
        last_fatigue_score: 0.20,
        status: "optimal",
        last_update: "2025-10-25T14:35:00Z",
        image_url: "https://randomuser.me/api/portraits/men/45.jpg",
        ai_advice: "Durumu gayet iyi. Normal antrenman temposuna devam edilebilir.",
    },
];

export const getAthletes = (): Promise<Athlete[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_DATA);
        }, 1000); // 1000ms = 1 saniye gecikme
    });
};

export const getAthleteById = (id: string): Promise<Athlete | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const athlete = MOCK_DATA.find((a) => a.id === id);
            resolve(athlete);
        }, 1000);
    });
};