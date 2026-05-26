# Laura Klimecki — Corporate Identity

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

```html
<!-- Überschriften -->
<h1 class="font-heading">...</h1>

<!-- Fließtext -->
<p class="font-body">...</p>

<!-- Ziertext (uppercase) -->
<span class="font-decorative">LEADERSHIP</span>

<!-- Buzzwords -->
<span class="font-buzzword">Sales & Leadership</span>
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
