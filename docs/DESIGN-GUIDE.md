# EVA Design Guide

> **📐 Verbindliche Design-Regeln für alle neuen Features und Komponenten**

Dieses Dokument definiert die Design-Standards für EVA. **Jede neue Komponente, Seite oder Feature MUSS diese Standards befolgen.**

---

## 🎨 Farbpalette (IMMER verwenden)

### Primärfarben

| Farbe | Tailwind Class | Verwendung |
|-------|----------------|------------|
| **Blau** `#345168` | `bg-ci-blue` / `text-ci-blue` | Überschriften, Buttons, Primäre Aktionen |
| **Leichtes Blau** `#f2f5f7` | `bg-ci-blue-light` | Hintergründe, Seiten-Background |
| **Mittelblau** `#6688a4` | `bg-ci-blue-medium` / `text-ci-blue-medium` | Links, Hover-States, Akzente |
| **Grau** `#F4F4F4` | `bg-ci-gray` | Sekundäre Hintergründe, Disabled States |
| **Beige** `#beb8af` | `bg-ci-beige` / `text-ci-beige` | Dezente Akzente, Dekorative Elemente |

### Instagram-spezifisch

| Farbe | Tailwind Class | Verwendung |
|-------|----------------|------------|
| **Dunkelblau** `#1e3a5f` | `bg-insta-bg` | Instagram Thumbnail Hintergründe |
| **Hellblau** `#5ba4d4` | `bg-insta-accent` / `text-insta-accent` | Keyword-Hervorhebungen |

---

## ✍️ Typografie (IMMER verwenden)

### Schriftarten-Hierarchie

| Element | Tailwind Class | Font | Gewicht |
|---------|----------------|------|---------|
| **Überschriften** (H1-H6) | `font-heading` | Lato | Bold (700) |
| **Fließtext** (Body, Paragraphs) | `font-body` | Open Sans | Regular (400) |
| **Ziertext** (Decorative, Labels) | `font-decorative` | Cormorant Garamond | Regular, **UPPERCASE** |
| **Buzzwords** (Keywords, Tags) | `font-buzzword` | Playfair Display SC | Regular/Bold |

### Typografie-Beispiele

```tsx
// ✅ RICHTIG
<h1 className="font-heading text-4xl text-ci-blue">
  Sales Coaching
</h1>

<p className="font-body text-gray-700">
  Dein Fließtext hier...
</p>

<span className="font-decorative text-ci-blue-medium">
  LEADERSHIP
</span>

// ❌ FALSCH
<h1 className="font-sans text-4xl">  // Nicht font-sans verwenden!
  Sales Coaching
</h1>
```

---

## 🧩 Standard-Komponenten

### Button Primary

```tsx
<button className="
  bg-ci-blue
  text-white
  font-heading
  px-6 py-3
  rounded-lg
  hover:bg-ci-blue-medium
  transition-colors
  duration-200
">
  Button Text
</button>
```

### Card

```tsx
<div className="
  bg-white
  border border-ci-gray
  rounded-lg
  p-6
  shadow-sm
  hover:shadow-md
  transition-shadow
">
  <h3 className="font-heading text-xl text-ci-blue mb-3">
    Card Titel
  </h3>
  <p className="font-body text-gray-600">
    Card Content
  </p>
</div>
```

### Input Field

```tsx
<input
  type="text"
  className="
    w-full
    px-4 py-2
    border border-ci-gray
    rounded-lg
    font-body
    focus:border-ci-blue-medium
    focus:ring-2
    focus:ring-ci-blue-medium/20
    outline-none
    transition
  "
  placeholder="Deine Eingabe..."
/>
```

### Section Header

```tsx
<div className="mb-8">
  <h2 className="font-heading text-3xl text-ci-blue mb-2">
    Abschnitts-Titel
  </h2>
  <p className="font-decorative text-ci-blue-medium">
    UNTERTITEL IN ZIERTEXT
  </p>
</div>
```

---

## 🚦 Status-Farben

Für Status-Anzeigen (Success, Warning, Error) verwende die EVA-Variablen:

```tsx
// Success
<div className="bg-green-50 border border-green-200 text-green-800">
  ✓ Erfolgreich gespeichert
</div>

// Warning
<div className="bg-yellow-50 border border-yellow-200 text-yellow-800">
  ⚠ Achtung: Überprüfe deine Eingabe
</div>

// Error
<div className="bg-red-50 border border-red-200 text-red-800">
  ✗ Ein Fehler ist aufgetreten
</div>
```

---

## 📏 Spacing & Layout

### Container

```tsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* Content */}
</div>
```

### Section Padding

```tsx
<section className="py-16 md:py-24">
  {/* Großzügige Abstände für Sektionen */}
</section>
```

### Spacing-Skala

- **Eng:** `gap-2` / `space-y-2` (8px)
- **Normal:** `gap-4` / `space-y-4` (16px)
- **Weit:** `gap-6` / `space-y-6` (24px)
- **Sehr weit:** `gap-8` / `space-y-8` (32px)

---

## ✅ Checkliste für neue Komponenten

Bevor du eine Komponente als fertig markierst:

- [ ] Verwendet **ausschließlich** CI-Farben (`ci-*` oder `insta-*`)
- [ ] Verwendet **ausschließlich** CI-Schriftarten (`font-heading`, `font-body`, `font-decorative`, `font-buzzword`)
- [ ] Responsive Design (mindestens `md:` Breakpoint)
- [ ] Hover/Focus States definiert
- [ ] Transitions für interaktive Elemente
- [ ] Accessibility: `aria-*` Labels wo nötig
- [ ] Konsistentes Spacing (siehe Spacing-Skala)

---

## 🚫 Verboten

Diese Dinge **NIEMALS** verwenden:

- ❌ `font-sans` / `font-serif` (außer für Fallbacks)
- ❌ Hardcodierte Farben wie `#000000`, `blue-500`, `red-400`
- ❌ Nicht-CI-Farben (z.B. Standard Tailwind Colors)
- ❌ Inline-Styles (`style={{ color: '#...' }}`)
- ❌ Inkonsistente Schriftarten

---

## 💡 Best Practices

1. **Mobile First:** Design zuerst für kleine Bildschirme
2. **Accessibility:** Immer an Tastatur-Navigation denken
3. **Performance:** Bilder optimieren, lazy loading verwenden
4. **Konsistenz:** Wiederverwendbare Komponenten erstellen
5. **Dokumentation:** Neue Komponenten in Storybook dokumentieren (geplant)

---

## 🔗 Weitere Ressourcen

- [CI.md](./CI.md) — Vollständige CI-Dokumentation
- [Tailwind Config](../tailwind.config.ts) — Alle konfigurierten Farben & Fonts
- [Global Styles](../app/globals.css) — CSS-Variablen & Basis-Styles
