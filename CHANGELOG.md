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

## 4. Branch `sample2`: Robin Goodlad Photography (Dorset Wedding Photographer)
- **Goal:** Built a dedicated branch `sample2` providing an exact layout, design language, and editorial structure modeled after **[Dorset Wedding Photographer | Robin Goodlad Photography](https://www.robingoodlad.com/)** with curated, high-end British/Dorset placeholders.
- **Design Language:** Warm organic luxury, cream surface palette (`#faf8f5`), muted sage green (`#455246`), antique bronze/gold accents (`#ab8c56`), and curated typography (`Marcellus`, `Newsreader`, `Manrope`).
- **Implemented Sections:**
  1. **Top Announcement Bar:** Dorset wedding photographer &bull; UK & Destinations &bull; Rangefinder 30 Rising Stars in the World.
  2. **Sticky Header & Drawer Navigation:** Minimalist brand header with quick "Get in Touch" CTA and accessible mobile menu drawer.
  3. **Hero Section:** "real moments, creatively captured" headline, Dorset landscape background, and accolade badges (Rangefinder 30 Rising Stars, Fearless Top 15, FMPA Fellow, BPA Finalist).
  4. **Meet Robin Section:** "Hey there, I’m Robin", Rangefinder Magazine citation, core documentary philosophy, and signature client quote from Kate & Steve (Lulworth Castle).
  5. **The Trilogy (3 Pillars):**
     - Pillar 1: FOR THOSE Authentic Moments
     - Pillar 2: AND BEAUTIFUL ‘Two Of You’ photos
     - Pillar 3: WITH A Sense of Place
  6. **Safe Hands Experience:** 15+ years experience, 500+ weddings documented, FMPA Fellow accreditation, and all-day coverage philosophy.
  7. **The Art of Observation Interactive Gallery:** Interactive category filter pills ("All", "Authentic Moments", "Two Of You", "Sense of Place", "Light & Details") with full-screen lightbox modal and keyboard navigation.
  8. **Featured Weddings (6 Dorset/UK Venues):** Lulworth Castle, Sopley Mill, Salcombe Coast, Axnoller & Chedington, Larmer Tree Gardens, and St Giles House.
  9. **Craft & Presentation:**
     - Group Photos Made Easy (swift 15-minute relaxed family formals)
     - Fine Art Albums & Presentation (Queensberry/Folio handcrafted fine art books)
     - 35mm Analogue Film Craft (authentic Kodak Portra / Ilford analogue grain)
  10. **Kind Words & Testimonials:** Real client reviews from Kate & Steve, Sarah & Tom, and Hannah & Ben.
  11. **Investment Transparency:** Full-day photography coverage package from £2,400 with itemized inclusions.
  12. **Interactive "get in touch" Form:** Real-time field validation, 24-hour reply guarantee alert, and instant confirmation state.
  13. **Dorset Studio Footer:** Wimborne studio address (21 Greenhill Close, BH21 2RQ), telephone numbers (01202 282728 / 07970 704592), accreditations, and legal notices.

---

## 5. Verification & QA Status
- `python3 data/verify_site.py` executed on `sample2`: **6/6 checks passed**.
- All 19 WebP images with JPG fallbacks verified in `assets/images/dorset/`.
- Local dev server running on `http://127.0.0.1:8085/` with all endpoints returning HTTP 200 OK.

