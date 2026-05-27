# EVA — Claude Code Anweisungen

## Design-Standards (VERBINDLICH)

**Für jede neue Komponente, Seite oder Feature gelten folgende Regeln:**

### 🎨 Farben (AUSSCHLIESSLICH verwenden)

- **Primär:** `bg-ci-blue` / `text-ci-blue` (#345168)
- **Hintergründe:** `bg-ci-blue-light` (#f2f5f7)
- **Akzente/Links:** `bg-ci-blue-medium` (#6688a4)
- **Sekundär:** `bg-ci-gray` (#F4F4F4), `bg-ci-beige` (#beb8af)
- **Instagram:** `bg-insta-bg`, `text-insta-accent`

❌ **NIEMALS** Standard-Tailwind-Farben verwenden (z.B. `blue-500`, `red-400`)

### ✍️ Typografie (AUSSCHLIESSLICH verwenden)

- **Überschriften:** `font-heading` (Lato Bold)
- **Fließtext:** `font-body` (Open Sans)
- **Ziertext:** `font-decorative` (Cormorant Garamond, UPPERCASE)
- **Buzzwords:** `font-buzzword` (Playfair Display SC)

❌ **NIEMALS** `font-sans` oder andere Schriften verwenden

### 📚 Dokumentation

Vollständige Design-Guidelines: [`docs/DESIGN-GUIDE.md`](./docs/DESIGN-GUIDE.md)

---

## Architektur

**Stack:**
- Frontend: Next.js 16, React 19, Tailwind CSS 4
- Backend: Supabase (PostgreSQL, Auth, Storage)
- AI: OpenAI GPT-4o, Replicate Imagen 3
- Automation: n8n

**Wichtig:** Next.js 16 hat Breaking Changes. Siehe `@AGENTS.md` für Details.

---

## Development

```bash
npm install
npm run dev
```

Läuft auf `http://localhost:3000`

---

@AGENTS.md
