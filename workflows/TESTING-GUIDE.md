# Testing Guide - FLUX 2 Workflow

**Quick Start:** In 5 Minuten den optimierten Workflow testen

---

## 1. Workflow in n8n importieren

### Option A: Via UI
1. In n8n öffnen
2. **Workflows** → **Import from File**
3. `Laura-Instagram-Workflow.json` hochladen
4. **Import** klicken

### Option B: Via CLI (falls n8n self-hosted)
```bash
# Workflow-File kopieren
cp workflows/Laura-Instagram-Workflow.json /path/to/n8n/workflows/

# n8n neu laden
pm2 restart n8n
```

---

## 2. Environment Variables prüfen

In n8n → **Settings** → **Environments** prüfen:

```bash
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Falls nicht gesetzt:**
1. n8n → Settings → Environments → Add Variable
2. Name: `REPLICATE_API_TOKEN`
3. Value: Dein Replicate API Token (erstellt auf replicate.com)

---

## 3. Test-Daten vorbereiten

### A) Laura-Bild in Supabase hochladen

Supabase Storage → `eva-images/laura/` → Upload

**Empfohlene Bilder:**
- ✅ Gut beleuchtet
- ✅ Frontale Ansicht
- ✅ Klare Gesichtszüge
- ✅ Business-Kleidung (weiße Bluse oder blaues Outfit)
- ✅ Min. 1024x1024px

### B) Laura-Bild in Datenbank eintragen

```sql
-- In Supabase SQL Editor
INSERT INTO laura_images (name, description, storage_path, pose_type)
VALUES (
  'Laura - Sprechend',
  'Laura in weißer Bluse, erklärende Handgeste',
  'laura/IMG_0915.JPG',
  'speaking'
);

-- ID notieren für Test-Payload
SELECT id, name FROM laura_images;
```

---

## 4. Workflow aktivieren

In n8n:
1. Workflow öffnen: **Laura Instagram Thumbnail Creator**
2. Oben rechts: **Inactive** → **Active**
3. Webhook-URL notieren (z.B. `https://your-n8n.com/webhook/laura-instagram-thumbnail`)

---

## 5. Test durchführen

### Via Postman / Insomnia

```bash
POST https://your-n8n.com/webhook/laura-instagram-thumbnail
Content-Type: application/json

{
  "postId": "test_flux2_001",
  "postType": "value",
  "title": "Warum dein Auftreten deinen Erfolg bestimmt",
  "keyword": "AUFTRETEN",
  "lauraImageId": "HIER_DEINE_LAURA_IMAGE_ID"
}
```

### Via curl

```bash
curl -X POST https://your-n8n.com/webhook/laura-instagram-thumbnail \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "test_flux2_001",
    "postType": "value",
    "title": "Warum dein Auftreten deinen Erfolg bestimmt",
    "keyword": "AUFTRETEN",
    "lauraImageId": "HIER_DEINE_LAURA_IMAGE_ID"
  }'
```

### Via Frontend (wenn schon deployed)

```javascript
const response = await fetch('/api/generate-thumbnail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    postId: 'test_flux2_001',
    postType: 'value',
    title: 'Warum dein Auftreten deinen Erfolg bestimmt',
    keyword: 'AUFTRETEN',
    lauraImageId: 'HIER_DEINE_LAURA_IMAGE_ID'
  })
});

const result = await response.json();
console.log('Generated Image URL:', result.imageUrl);
```

---

## 6. Workflow-Execution prüfen

In n8n → **Executions**:

1. **Letzte Execution öffnen**
2. **Jeden Node durchklicken** und Output prüfen:

### ✅ Parse Input
```json
{
  "postId": "test_flux2_001",
  "postType": "value",
  "title": "Warum dein Auftreten deinen Erfolg bestimmt",
  "keyword": "AUFTRETEN",
  "aspectRatio": "9:16"
}
```

### ✅ Fetch Laura Image Row
```json
[{
  "id": "...",
  "storage_path": "laura/IMG_0915.JPG"
}]
```

### ✅ Set Value Source URL
```json
{
  "sourceImageUrl": "https://bmsflpbhftguohitixjj.supabase.co/storage/v1/object/public/eva-images/laura/IMG_0915.JPG",
  "designReferenceUrl": "https://bmsflpbhftguohitixjj.supabase.co/storage/v1/object/public/eva-images/design-references/Value-Post/..."
}
```

### ✅ Generate Value Prompt
```json
{
  "output": [{
    "content": [{
      "text": "The person from the reference image, wearing exactly the same clothing as shown. Remove the background and place her on a deep dark blue background (#1e3a5f)..."
    }]
  }]
}
```

**Prüfen:**
- ✅ Prompt startet mit "The person from the reference image..."
- ✅ Prompt endet mit "Preserve the exact face, skin tone..."
- ✅ 3-Zeilen-Text-Format beschrieben
- ✅ Layout: Laura links, Text rechts

### ✅ Create Image (Replicate)
```json
{
  "id": "gvy7m8ydf5rmy0cycgwvexce6g",
  "model": "black-forest-labs/flux-2-max",
  "status": "starting",
  "input": {
    "prompt": "...",
    "input_image": "https://...",
    "input_image_2": "https://...",
    "aspect_ratio": "9:16"
  }
}
```

**Prüfen:**
- ✅ Model: `black-forest-labs/flux-2-max`
- ✅ `input_image` vorhanden (Laura)
- ✅ `input_image_2` vorhanden (Design-Reference)

### ✅ Check Status
```json
{
  "status": "succeeded",
  "output": "https://replicate.delivery/xezq/8kQgxDUjVB4wPJ3foxLf3z2MkW..."
}
```

---

## 7. Ergebnis prüfen

### Bild herunterladen und checken:

```bash
# Via curl
curl https://replicate.delivery/xezq/8kQgxDUjVB4wPJ3foxLf3z2MkW... -o test-result.jpg

# Im Browser öffnen
open test-result.jpg
```

### Quality Checklist:

**✅ Face Consistency:**
- [ ] Ist das Laura's Gesicht? (gleiche Person wie Referenzbild)
- [ ] Hautton korrekt?
- [ ] Gesichtszüge erkennbar?
- [ ] Kleidung wie im Referenzbild?

**✅ Layout:**
- [ ] Laura auf der linken Seite (40-50% Breite)?
- [ ] Text auf der rechten Seite?
- [ ] 3 Zeilen Text sichtbar?
- [ ] Mittlere Zeile in Hellblau?

**✅ Design:**
- [ ] Hintergrund Dunkelblau?
- [ ] Vorhang-Textur sichtbar?
- [ ] Spotlight-Effekt von oben?
- [ ] Professioneller, cinematischer Look?

**✅ Technical:**
- [ ] Aspect Ratio 9:16 (1080x1920px)?
- [ ] Gute Auflösung?
- [ ] Keine Artefakte?
- [ ] Text lesbar?

---

## 8. Troubleshooting

### ❌ Error: "Replicate API Token invalid"
**Fix:** Token erneuern auf replicate.com → Settings → API Tokens

### ❌ Error: "Laura image not found"
**Fix:** `lauraImageId` UUID prüfen, Bild in Supabase Storage hochladen

### ❌ Gesicht stimmt nicht überein
**Mögliche Ursachen:**
1. Referenzbild zu dunkel/unscharf → besseres Bild wählen
2. Prompt zu vage → Identitäts-Anker prüfen
3. FLUX 2 Parameter falsch → `input_image` statt `image` verwenden

**Fix:**
```javascript
// In "Create Image (Replicate)" Node prüfen:
{
  "input": {
    "prompt": "...",
    "input_image": "...",  // ← MUSS "input_image" sein
    "input_image_2": "..." // ← Design-Reference
  }
}
```

### ❌ Text-Layout falsch
**Fix:** Prompt prüfen, sollte enthalten:
```
"On the right side, three lines of text in large bold sans-serif uppercase, right-aligned:
Line 1: 'WARUM DEIN' in white (#FFFFFF)
Line 2: 'AUFTRETEN' in light blue (#5ba4d4)
Line 3: 'DEINEN ERFOLG BESTIMMT' in white (#FFFFFF)"
```

### ❌ Design-Stil passt nicht
**Fix:** Design-Reference wechseln:
- In Supabase Storage → `eva-images/design-references/Value-Post/`
- Bessere Referenz hochladen
- `designReferenceUrl` in "Set Value Source URL" anpassen

---

## 9. Iteration & Fine-Tuning

Falls Ergebnis **gut aber nicht perfekt**:

### A) Prompt anpassen

In n8n → "Generate Value Prompt" Node → Message 1 (System) editieren:

**Beispiel-Änderungen:**
```diff
# Mehr Emotion
- "in a professional speaking pose"
+ "in a confident, empowering speaking pose with strong eye contact"

# Text präziser platzieren
- "On the right side"
+ "On the right side, vertically centered"

# Lighting anpassen
- "Spotlight-Effekt von oben"
+ "Soft spotlight from top-right, creating subtle shadows"
```

### B) Referenzbild wechseln

Falls Gesicht nicht gut erkannt wird:
1. Andere Laura-Bilder in Supabase hochladen
2. ID in Test-Payload ändern
3. Neu testen

**Best Practices:**
- Frontale Aufnahme (nicht Profil)
- Gute Beleuchtung (keine harten Schatten)
- Neutrale Pose (nicht zu dynamisch)
- Mind. 1024x1024px

### C) Design-Reference optimieren

Falls Stil nicht passt:
1. In Supabase Storage bessere Beispiel-Posts hochladen
2. `Set Value Source URL` Node anpassen:
```javascript
const valueRefs = [
  'design-references/Value-Post/example1.png',
  'design-references/Value-Post/example2.png',
  'design-references/Value-Post/example3.png'
];
```

---

## 10. Production Ready Checklist

Bevor du Live gehst:

- [ ] Mindestens 5 Test-Generierungen durchgeführt
- [ ] Face Consistency bei 90%+ der Tests
- [ ] Layout konsistent
- [ ] Kosten kalkuliert (~$0.04 pro Bild)
- [ ] Error Handling getestet
- [ ] Frontend-Integration funktioniert
- [ ] Supabase Storage Limits geprüft
- [ ] Replicate Rate Limits bekannt

---

## Support & Resources

**Dokumentation:**
- [CHANGELOG_V2.md](./CHANGELOG_V2.md) - Alle Änderungen
- [PROMPT_VALUE_V2.md](./PROMPT_VALUE_V2.md) - Vollständiger Prompt
- [README.md](../README.md) - Projekt-Übersicht

**Quellen:**
- [FLUX 2 Max Documentation](https://replicate.com/black-forest-labs/flux-2-max)
- [Replicate API Docs](https://replicate.com/docs)
- [n8n Workflow Docs](https://docs.n8n.io)

**Bei Problemen:**
1. n8n Executions checken
2. Replicate Dashboard prüfen (replicate.com/dashboard)
3. Supabase Logs prüfen
