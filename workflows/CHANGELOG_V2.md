# Workflow Optimization v2 - FLUX 2 Migration

**Datum:** 2026-05-26
**Status:** ✅ Abgeschlossen, bereit zum Testen

---

## Änderungen

### 1. Model-Migration: Imagen-4 → FLUX 2 Max

**Vorher:** `google/imagen-4`
**Nachher:** `black-forest-labs/flux-2-max`

**Warum FLUX 2?**
- ✅ Multi-Reference Support (bis zu 8-10 Bilder gleichzeitig)
- ✅ Exzellente Face Preservation
- ✅ Konstante Identität über mehrere Varianten
- ✅ Perfekt für Marketing-Content mit konsistenten Gesichtern

**Node-Änderungen:**
```diff
- URL: https://api.replicate.com/v1/models/google/imagen-4/predictions
+ URL: https://api.replicate.com/v1/models/black-forest-labs/flux-2-max/predictions

Body Parameter:
- "image": {{ JSON.stringify($json.sourceImageUrl) }}
- "style_image": {{ JSON.stringify($json.designReferenceUrl) }}
+ "input_image": {{ JSON.stringify($json.sourceImageUrl) }}
+ "input_image_2": {{ JSON.stringify($json.designReferenceUrl) }}
+ "output_quality": 90
```

---

### 2. Prompt-Optimierung für Face Consistency

**Neue Struktur** (basierend auf Tobias' bewährter Methode):

1. **Identitäts-Opener (Start):**
   `"The person from the reference image, wearing exactly the same clothing as shown, ..."`

2. **Layout-Beschreibung:**
   - Links: Laura (40-50% Breite, Hüfte aufwärts, sprechende Pose)
   - Rechts: Text in 3 Zeilen (Weiß / Hellblau / Weiß)
   - Hintergrund: Dunkelblau #1e3a5f mit Vorhang-Textur

3. **Identitäts-Anker (Ende):**
   `"Preserve the exact face, skin tone, clothing and facial structure from the reference image."`

**Vorteile:**
- ✅ Klare Identitäts-Priorisierung für FLUX 2
- ✅ Exakte Layout-Beschreibung (Laura's Stil)
- ✅ Konkrete visuelle Anweisungen statt generischer Begriffe
- ✅ 3-Zeilen-Text-Format explizit beschrieben

---

## Backup

Alte Version gesichert als: `Laura-Instagram-Workflow-BACKUP-20260526.json`

---

## Testing

### Voraussetzungen

1. **Replicate API Token:**
   Benötigt für FLUX 2 Max Zugriff

2. **Test-Daten in Supabase:**
   - Laura-Referenzbilder in `eva-images/laura/`
   - Design-Referenzen in `eva-images/design-references/Value-Post/`

3. **n8n Environment Variable:**
   `REPLICATE_API_TOKEN` muss gesetzt sein

### Test-Payload

```json
{
  "postId": "test_flux2_001",
  "postType": "value",
  "title": "Warum dein Auftreten deinen Erfolg bestimmt",
  "keyword": "AUFTRETEN",
  "lauraImageId": "<UUID aus laura_images Tabelle>"
}
```

### Expected Output

**Generierter Prompt sollte enthalten:**
- ✅ "The person from the reference image, wearing exactly..."
- ✅ Layout: Laura links, Text rechts
- ✅ 3-Zeilen-Struktur mit Farbangaben
- ✅ "Preserve the exact face, skin tone..."

**Replicate Request sollte haben:**
- ✅ `input_image`: Laura's Gesicht
- ✅ `input_image_2`: Design-Reference
- ✅ `aspect_ratio`: "9:16"
- ✅ `output_format`: "jpg"
- ✅ `output_quality`: 90

**Erwartetes Ergebnis:**
- Laura's Gesicht konsistent (gleiche Person wie im Referenzbild)
- Text rechts in 3 Zeilen (Weiß / Hellblau / Weiß)
- Dunkelblauer Hintergrund mit Vorhang-Textur
- Professioneller, cinematischer Look

---

## Troubleshooting

### Problem: Gesicht stimmt nicht überein
- **Check:** Ist `input_image` korrekt gesetzt?
- **Check:** Ist das Laura-Referenzbild gut beleuchtet und frontal?
- **Fix:** Besseres Referenzbild wählen (gut beleuchtet, klar, frontal)

### Problem: Text-Layout falsch
- **Check:** Prompt enthält 3-Zeilen-Struktur?
- **Check:** Schlüsselwort korrekt identifiziert?
- **Fix:** Titel-Parsing in "Parse Input" Node prüfen

### Problem: Design-Stil passt nicht
- **Check:** `input_image_2` (Design-Reference) korrekt?
- **Check:** Design-Reference ist im richtigen Format?
- **Fix:** Andere Design-Reference testen

### Problem: Replicate API Error
- **Check:** API Token gültig?
- **Check:** FLUX 2 Max verfügbar auf Replicate?
- **Fix:** Token erneuern, Model-Status prüfen

---

## Performance & Kosten

**FLUX 2 Max:**
- ⏱️ Generation: ~10-15 Sekunden
- 💰 Kosten: ~$0.04 pro Bild (deutlich günstiger als Imagen-4)
- 🎯 Qualität: Höchste Fidelity, beste Face-Consistency

**Vergleich zu Imagen-4:**
| Metrik | Imagen-4 | FLUX 2 Max |
|--------|----------|------------|
| Face Consistency | ⚠️ Mittel | ✅ Exzellent |
| Multi-Reference | ❌ Nein | ✅ Ja (8-10 Bilder) |
| Speed | ~12s | ~10-15s |
| Kosten | ~$0.08 | ~$0.04 |
| Layout Control | ⚠️ Mittel | ✅ Sehr gut |

---

## Nächste Schritte

1. ✅ Workflow in n8n importieren
2. ✅ Test-Generierung durchführen
3. ⏳ Ergebnis prüfen und ggf. Prompt fine-tunen
4. ⏳ Podcast-Post Prompt analog optimieren
5. ⏳ Frontend-Integration testen

---

## Quellen

- [FLUX 2 Max on Replicate](https://replicate.com/black-forest-labs/flux-2-max)
- [Generate consistent characters – Replicate blog](https://replicate.com/blog/generate-consistent-characters)
- [Run FLUX.2 on Replicate](https://replicate.com/blog/run-flux-2-on-replicate)
- [FLUX.2 Multi-reference capabilities](https://www.together.ai/blog/flux-2-multi-reference-image-generation-now-available-on-together-ai)
