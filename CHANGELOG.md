# CHANGELOG: Wedding Photography Redesign (Branch Strategy & Foreign Photographer Persona)

## 1. Branch Strategy
- **Branch `og`:** Created and pushed to remote (`origin/og`). Preserves the original **Rohan Shinde Photography & Films (RSP)** content, authentic Indian destination films, photo frames, and real reviews.
- **Branch `master`:** Re-skinned and sanitized. Replaced all occurrences of Rohan Shinde with an international luxury foreign photographer dummy persona: **Julian Vance Photography & Cinema (JV)**. All imagery has been replaced with high-end editorial European/Western wedding photography and an AI-generated Lake Como masterpiece.

---

## 2. Master Branch: Persona & Branding Replacement
- **Studio Name:** Julian Vance Photography & Cinema
- **Monogram:** `JV`
- **Artist:** Julian Vance (Lead Cinematographer & Director)
- **Tagline:** *"Timeless wedding cinema & fine-art photography, captured with honesty and editorial grace"*
- **Locations & Commissions:** Based in Paris & New York | Commissioned worldwide across Lake Como, Amalfi Coast, Provence, Cotswolds, and luxury private estates.
- **Contact Channels:**
  - Email: `inquiries@julianvance.com`
  - WhatsApp & Phone: `+1 (212) 555-0198` (`https://wa.me/12125550198`)
  - Instagram: `@julianvancestudios`
  - YouTube: `@julianvancefilms`

---

## 3. Image & Video Replacements on `master`
1. **Hero Background Video & Poster:**
   - AI-Generated 4K Lake Como villa terrace wedding photograph (`assets/images/hero_foreign.webp` / `hero_foreign.jpg`).
   - Slow-motion cinematic zoom/pan looping video backdrop: `assets/hero-loop.mp4` (1.3 MB) and `assets/hero-loop.webm` (512 KB).
2. **Angled 5-Card Carousel:**
   - Card 1: Cathedral lace veil bridal portrait (`photo_moment_1_veil.webp`)
   - Card 2: 17th-century French stone chateau ceremony (`film_01_paris.webp`)
   - Card 3 (Center): Lake Como terrace couple overlooking lake and mountains (`hero_foreign.webp`)
   - Card 4: Ravello Amalfi cliffside terrace overlooking Mediterranean (`film_04_amalfi.webp`)
   - Card 5: Black-tie architectural silhouette (`photo_moment_5_silhouette.webp`)
3. **16 European & Worldwide Destination Wedding Films:**
   - Paris, Lake Como, Cotswolds, Amalfi Coast, Tribeca New York, Bastide de Gordes Provence, Geiranger Fjord Norway, The Plaza Manhattan, Val d'Orcia Tuscany, Big Sur California, Belmond La Residencia Mallorca, St. Moritz Swiss Alps, Oia Santorini, Loire Valley Chateau, Belvedere Palace Vienna, and Amangiri Utah.
4. **8 Photo Moments for 3D Tilt Mosaic:**
   - Cathedral veil, exchange of vows, champagne tower toasts, cliffside sunset, black-tie silhouette, candlelit first dance, candid laughter, and heirloom letterpress stationery.
5. **Style Cards (5):**
   - Timeless, Editorial, Candid, Cinematic, Destination.
6. **Avatars & Social Proof:**
   - 5 foreign couple portrait headshots with reviews from Elena & Matteo (Lake Como), Charlotte & William (Cotswolds), and Victoria & Alexander (New York).

---

## 4. Verification & QA Status
- `python3 data/verify_site.py` executed: **6/6 checks passed**.
- Zero instances of the previous name remain in `master`.
- Dev server running on `http://127.0.0.1:8085/` with all endpoints returning HTTP 200 OK.
