# Laura Klimecki — Corporate Identity

> **✅ Vollständig konfiguriert**
> Alle CI-Farben und Schriftarten sind bereits im Projekt hinterlegt und können direkt über Tailwind CSS-Klassen verwendet werden. Keine weitere Konfiguration nötig.

---

## Farben

### CI Hauptfarben

| Name | HEX | RGB | Verwendung |
|------|-----|-----|------------|
| **Blau** | `#345168` | RGB(52, 81, 104) | Grundfarbe, Überschriften, Buttons |
| **Leichtes Blau** | `#f2f5f7` | RGB(242, 245, 247) | Hintergründe, Cards |
| **Mittelblau** | `#6688a4` | RGB(102, 136, 164) | Akzente, Links, Hover-States |
| Grau | `#F4F4F4` | - | Sekundäre Hintergründe |
| Weiß | `#FFFFFF` | - | Cards, Text auf Dunkel |
| Beige | `#beb8af` | - | Dezente Akzente |

### Instagram Thumbnail Farben

| Name | HEX | Verwendung |
|------|-----|------------|
| **Dunkelblau** | `#1e3a5f` | Hintergrund |
| **Hellblau** | `#5ba4d4` | Schlüsselwort-Hervorhebung |
| Weiß | `#FFFFFF` | Restlicher Text |

---

## Schriftarten

| Typ | Font | Gewicht | Google Fonts |
|-----|------|---------|--------------|
| **Überschriften** | Lato | Bold (700) | [Lato](https://fonts.google.com/specimen/Lato) |
| **Fließtext** | Open Sans | Regular (400) | [Open Sans](https://fonts.google.com/specimen/Open+Sans) |
| **Ziertext** | Cormorant Garamond | Regular, UPPERCASE | [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) |
| **Buzzwords** | Playfair Display SC | Regular/Bold | [Playfair Display SC](https://fonts.google.com/specimen/Playfair+Display+SC) |

Fallback (alte CI): Muli Light oder Calibri Light

---

## CSS Variablen

```css
/* CI Farben */
--ci-blue: #345168;
--ci-blue-light: #f2f5f7;
--ci-blue-medium: #6688a4;
--ci-gray: #F4F4F4;
--ci-white: #FFFFFF;
--ci-beige: #beb8af;

/* Instagram */
--insta-bg: #1e3a5f;
--insta-accent: #5ba4d4;
--insta-text: #FFFFFF;
```

---

## Tailwind CSS Classes

### Schriftarten

```html
<!-- Überschriften (Lato Bold) -->
<h1 class="font-heading">Leadership Coaching</h1>

<!-- Fließtext (Open Sans) -->
<p class="font-body">Dein Text hier...</p>

<!-- Ziertext (Cormorant Garamond, UPPERCASE) -->
<span class="font-decorative">LEADERSHIP</span>

<!-- Buzzwords (Playfair Display SC) -->
<span class="font-buzzword">Sales & Leadership</span>

<!-- Legacy CI (Muli/Calibri Light) -->
<span class="font-muli">Leichter Text</span>
```

### Farben

```html
<!-- CI Hauptfarben -->
<div class="bg-ci-blue text-white">Grundfarbe</div>
<div class="bg-ci-blue-light">Heller Hintergrund</div>
<div class="bg-ci-blue-medium">Akzent</div>
<div class="bg-ci-gray">Grauer Hintergrund</div>
<div class="bg-ci-beige">Beiger Akzent</div>

<!-- Instagram Thumbnail Farben -->
<div class="bg-insta-bg text-insta-text">
  <span class="text-insta-accent">Hervorgehobenes Keyword</span>
</div>

<!-- Text-Farben -->
<p class="text-ci-blue">Blauer Text</p>
<p class="text-ci-blue-medium">Mittelblauer Text</p>
```

### Komplette Komponenten-Beispiele

```html
<!-- Button Primary -->
<button class="bg-ci-blue text-white font-heading px-6 py-3 rounded-lg hover:bg-ci-blue-medium transition">
  Jetzt starten
</button>

<!-- Card -->
<div class="bg-white border border-ci-gray rounded-lg p-6 shadow-sm">
  <h2 class="font-heading text-2xl text-ci-blue mb-4">Überschrift</h2>
  <p class="font-body text-gray-700">Dein Content hier...</p>
</div>

<!-- Hero Section -->
<section class="bg-ci-blue-light py-20">
  <div class="container mx-auto">
    <h1 class="font-heading text-5xl text-ci-blue mb-4">
      Sales & Leadership Coaching
    </h1>
    <p class="font-decorative text-2xl text-ci-blue-medium">
      MIT LAURA KLIMECKI
    </p>
  </div>
</section>
```

---

## Anwendungsbeispiele

### Button Primary
```css
background: var(--ci-blue);
color: white;
font-family: var(--font-lato);
font-weight: 700;
```

### Card
```css
background: var(--ci-white);
border: 1px solid var(--eva-border);
box-shadow: 0 1px 3px rgba(52, 81, 104, 0.1);
```

### Instagram Thumbnail Text
```css
/* Normaler Text */
color: var(--insta-text); /* #FFFFFF */
text-transform: uppercase;

/* Schlüsselwort */
color: var(--insta-accent); /* #5ba4d4 */
```
