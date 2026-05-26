# EVA - Laura's Digitale Assistentin

EVA ist eine AI-gestützte digitale Assistentin für Laura Klimecki, eine Sales- und Leadership-Coachin. EVA unterstützt Laura bei der täglichen Arbeit und übernimmt proaktiv Aufgaben in Bereichen wie Social Media, E-Mail-Management und Business Operations.

---

## Vision

EVA soll Lauras komplettes Business im Blick haben und sie bei der Arbeit unterstützen:

- **Proaktiv handeln** — Aufgaben selbstständig übernehmen
- **Social Media** — Instagram-Posts erstellen, Content planen
- **E-Mail-Management** — Mails klassifizieren, Drafts vorbereiten
- **Sales Pipeline** — Leads tracken, Follow-ups vorschlagen
- **Team-Management** — Setter-Team im Blick behalten
- **Reporting** — Wochenberichte, KPIs zusammenfassen

---

## Architektur

```
┌─────────────────────────────────────────────────────────┐
│                    EVA Cockpit (Web-App)                │
│              Next.js · React · Tailwind CSS             │
├─────────────────────────────────────────────────────────┤
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│   │  Dashboard  │  │ Social Media│  │   Inbox     │    │
│   │    (Home)   │  │  Thumbnail  │  │  Management │    │
│   └─────────────┘  └─────────────┘  └─────────────┘    │
├─────────────────────────────────────────────────────────┤
│                      Supabase                           │
│         Database · Auth · Storage · Realtime            │
├─────────────────────────────────────────────────────────┤
│                        n8n                              │
│              Workflows · Automatisierungen              │
├─────────────────────────────────────────────────────────┤
│                     AI Services                         │
│        OpenAI (GPT-4o) · Replicate (Imagen 3)          │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Komponente | Technologie |
|------------|-------------|
| Frontend | Next.js 16, React, Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage (Bilder) |
| Automation | n8n |
| AI Models | OpenAI GPT-4o, Replicate Imagen 3 |

---

## Module

### 1. Instagram Thumbnail Creator ✅
Erstellt professionelle Instagram-Posts für Laura.

**Features:**
- Podcast-Posts (Laura + Gast)
- Value-Posts (nur Laura)
- Automatische Bildgenerierung via Replicate
- Vorschau in Echtzeit

### 2. Dashboard (geplant)
Tages-Cockpit mit KPIs, Briefing und Kalender.

### 3. Inbox Management (geplant)
E-Mail-Klassifizierung und Draft-Vorschläge.

### 4. Sales Pipeline (geplant)
Kanban-Board für Leads und Deals.

---

## Setup

### 1. Dependencies installieren
```bash
npm install
```

### 2. Umgebungsvariablen
```bash
cp .env.example .env.local
```

### 3. Development Server
```bash
npm run dev
```

---

## Supabase Schema

### Tabellen

**laura_images** — Lauras Referenzbilder
```sql
CREATE TABLE laura_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  pose_type TEXT, -- 'speaking', 'thinking', 'presenting', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**instagram_posts** — Generierte Posts
```sql
CREATE TABLE instagram_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_type TEXT NOT NULL, -- 'podcast' or 'value'
  title TEXT NOT NULL,
  keyword TEXT NOT NULL,
  laura_image_id UUID REFERENCES laura_images(id),
  guest_image_url TEXT,
  generated_image_url TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'generating', 'ready', 'published'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Roadmap

- [x] Instagram Thumbnail Creator UI
- [x] n8n Workflow Template
- [ ] Supabase Integration
- [ ] Dashboard mit KPIs
- [ ] E-Mail Integration (Gmail)
- [ ] Sales Pipeline
- [ ] Team Management
