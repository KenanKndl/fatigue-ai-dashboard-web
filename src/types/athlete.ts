export interface Athlete {
    id: string;
    name: string;
    last_fatigue_score: number;
    status: 'critical' | 'optimal';
    last_update: string; // ISO Date string
    image_url: string;
    ai_advice: string;
}