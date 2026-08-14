# 🌱 EcoPortfolio — E-Waste & Environmental Management E-Portfolio

A full-stack, production-quality academic E-Portfolio built for **Atharva Chavan** (Roll No.: 24101C0006, Mentor: Prof. Nilima Main, Branch: Information Technology Engineering).

---

## 🚀 Key Features & Architectural Highlights

1. **Light Theme Design System**: Curated color palette (Emerald green, forest green, soft mint, teal, and crisp slate gray) with subtle glassmorphism and animated environmental elements.
2. **Dynamic Assignment Management System**:
   - Continuous CRUD support for unlimited assignments (Assignment 1, 2, ... N).
   - Form modal with multi-file evidence upload (Images, PDFs, Videos, Notebooks, Links), word counter (~150 words target), 3-part reflections, and reference links.
   - Accordion dropdown view with full evidence lightbox viewer (fullscreen images, video player, PDF reader).
   - Real-time search, status filter (Completed, In Progress, Draft), and sorting (Newest, Oldest, Activity Number).
   - Pre-populated with **Sample Assignment 01**: *"Device Anatomy – Mobile Phone Disassembly"*.
3. **Editable Student Profile (`/about`)**:
   - Profile photo uploader with preview, crop fitting, replace, and remove functionality.
   - Editable student details, academic interests, hobbies, skills matrix, projects, achievements, and career vision (*"My Vision"*).
4. **Data Visualization Dashboard (`/dashboard`)**:
   - Real-world empirical metrics from UN Global E-waste Monitor 2024, UNEP, and WHO.
   - **6 Interactive Recharts Visualizations**:
     - Global E-Waste Generation & Recycling Trend (2010–2030)
     - Regional E-Waste Breakdown (Asia, Americas, Europe, Africa, Oceania)
     - E-Waste Category Composition Donut Chart
     - Regional Formal Recycling Rate Comparison (%)
     - E-Waste Per Capita Generation (kg/inhabitant)
     - 2030 Forecast Trajectory vs Recycling Deficit
   - Dynamic live portfolio metrics automatically synced with the assignment database.
5. **Dual Persistence Layer**:
   - Works immediately out-of-the-box using local storage.
   - Seamless async hooks for **Supabase DB** and **Supabase Storage** integration.

---

## 💻 Tech Stack

- **Framework**: Next.js (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS, Vanilla CSS design tokens, Glassmorphism
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Backend / Storage**: Supabase (Database & Storage buckets) + LocalStorage Fallback

---

## ⚙️ Local Development Setup

1. **Clone & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Production Build Verification**:
   ```bash
   npm run build
   ```

---

## 🗄️ Supabase Setup Instructions (Optional)

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** and execute the provided `supabase_schema.sql` script.
3. Go to **Storage** -> Create two public storage buckets:
   - `evidence` (Public)
   - `avatars` (Public)
4. Copy your Supabase Project URL and Anon API key to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## 🌐 Vercel Deployment Instructions

1. Push this repository to GitHub.
2. Import the project in your Vercel Dashboard.
3. Add the Environment Variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in Vercel project settings.
4. Click **Deploy**. Vercel will build and host the Next.js application automatically!

---

© 2026 Atharva Chavan. All rights reserved.  
Submitted for **E-Waste & Environmental Management** course under mentor **Prof. Nilima Main**.
