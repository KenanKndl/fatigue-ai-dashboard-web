# Fatigue AI Dashboard

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=react&logoColor=white)

</div>

## 🚀 Overview

**Fatigue AI**, spor kulüpleri ve antrenörler için tasarlanmış, yeni nesil bir sporcu performans takip sistemidir. Modern web teknolojileri kullanılarak geliştirilen bu dashboard, sporcuların yorgunluk seviyelerini (Fatigue Index), antrenman durumlarını ve AI tabanlı önerileri şık bir arayüzde sunar.

Projenin temel amacı, karmaşık veri setlerini **Glassmorphism** ve **Minimalist** tasarım prensipleriyle birleştirerek, son kullanıcıya (antrenörlere) en net ve hızlı şekilde sunmaktır.

## ✨ Key Features

* **📊 Dynamic Dashboard:** Takımın genel durumunu özetleyen, anlık güncellenen KPI kartları.
* **🎨 Modern UI/UX:** Tailwind CSS ile oluşturulmuş, "Ambient Glow" ve "Dot Matrix" efektlerine sahip, göz yormayan karanlık mod (Dark Mode) öncelikli tasarım.
* **🔍 Instant Filtering & Search:** Sporcuları isme göre arama veya 'Critical/Optimal' durumuna göre anlık filtreleme özelliği.
* **⚡ Server-Side Rendering (SSR):** Next.js App Router yapısı ile maksimum performans ve SEO uyumluluğu.
* **🌓 Dark/Light Mode:** `next-themes` entegrasyonu ile sistem tercihine duyarlı tema yönetimi.
* **🧠 AI Insights UI:** Sporcular için yapay zeka tarafından üretilen (simüle edilmiş) kişiselleştirilmiş antrenman önerileri.

## 📸 Screenshots

| Dashboard Overview | Athlete Filtering |
|:---:|:---:|
| ![Dashboard](/public/screenshots/dashboard-full.png) | ![Filtering](/public/screenshots/filtering.png) |
| *Genel Bakış ve KPI Kartları* | *Filtreleme ve Arama Mekanizması* |

| Critical Detail View | Optimal Detail View |
|:---:|:---:|
| ![Critical](/public/screenshots/detail-critical.png) | ![Optimal](/public/screenshots/detail-optimal.png) |
| *Yüksek riskli sporcu detayı* | *Saha içi kondisyonu iyi sporcu detayı* |

## 🛠️ Tech Stack

* **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** CSS Animations & Transitions
* **Icons:** SVG / Heroicons
* **Theming:** next-themes
* **Font:** Funnel Display (Local Fonts)

## 🏃‍♂️ Getting Started

Projeyi yerel makinenizde çalıştırmak için adımları takip edin:

1.  **Repoyu klonlayın:**
    ```bash
    git clone [https://github.com/KULLANICI_ADIN/fatigue-ai-dashboard.git](https://github.com/KULLANICI_ADIN/fatigue-ai-dashboard.git)
    cd fatigue-ai-dashboard
    ```

2.  **Bağımlılıkları yükleyin:**
    ```bash
    npm install
    # veya
    yarn install
    ```

3.  **Geliştirme sunucusunu başlatın:**
    ```bash
    npm run dev
    ```

4.  Tarayıcınızda `http://localhost:3000` adresine gidin.

## 🎨 Design Philosophy

Bu projede **"SaaS-Vibe"** yakalanmaya çalışılmıştır.

* **Background:** Kullanıcıyı içeriğe odaklayan ancak sıkıcı olmayan, aşağı doğru silikleşen (mask-image) nokta desenli (dot-matrix) arka plan.
* **Glassmorphism:** Kartların arkasındaki renklerin hafifçe sızmasını sağlayan `backdrop-blur` efektleri.
* **Visual Hierarchy:** Kritik (Critical) durumdaki sporcular için kırmızı, Optimal durumdakiler için yeşil renk kodlarının (Global CSS Variables) tutarlı kullanımı.

## 🤝 Contributing

Katkılarınızı bekliyoruz! Lütfen bir issue açın veya Pull Request gönderin.

## 📄 License

Bu proje [MIT](LICENSE) lisansı ile lisanslanmıştır.

---

<p align="center">
  Developed with by <a href="https://github.com/kenankndl">Kenan Kandilli</a>
</p>