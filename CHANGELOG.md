# CHANGELOG: Rohan Shinde Photography & Films (RSP) Web Redesign

## Overview
This document outlines the architectural and visual modernization of the wedding photography website for **Rohan Shinde Photography & Films (RSP)**. The project transitioned from an older single-page structure to a luxury dark cinematic editorial experience matching the requested motion, interaction, and layout patterns.

All real client content (Rohan Shinde brand identity, artistic philosophy quote, 16 wedding films, 8 high-resolution photo frames, testimonials, wedding packages, WhatsApp/email contact details) was strictly preserved and integrated into the new structure.

---

## 1. Migration Plan: Old Section to New Section Mapping

| # | Old Section (Previous Version) | New Re-skinned Section (Editorial Architecture) | Changes, Preserved Content & Motion Enhancements |
|---|--------------------------------|--------------------------------------------------|---------------------------------------------------|
| **0** | Generic banner / None | **Top Announcement Bar (Dismissible)** | Added dismissible dark glass bar: *"✨ Now reserving dates for 2026 & 2027 weddings | Limited to 25 celebrations worldwide"*. Dismissible via `&times;` button. |
| **1** | Standard split navbar | **1. Header / Sticky Nav with Mega-Menus** | Sticky header (transparent over hero, backdrop-blur solid dark glass on scroll). Mega-menus for *Portfolio* and *Experience* with 3-column link groups + image spotlight cards. Monogram `RSP` on mobile, wordmark on desktop. Accessible mobile hamburger morphing to 'X' with fullscreen accordion drawer, focus trap, and scroll lock. |
| **2** | Hero image banner with static text | **2. Hero (100svh)** | Full-bleed looping background video (`hero-loop.webm` / `hero-loop.mp4` with poster fallback, pause/play toggle). Centered display serif H1 with vertical rotating word (`story`, `film`, `heirloom`, `memory` every 2.8s, SR-safe). Angled 5-card carousel with 3D perspective transforms, custom pointer-following cursor ("Prev"/"Next"), touch swipe, 5s auto-advance, and pause control. Rolling 3-digit animated counters (`250+ Weddings`, `14+ Countries`, `4.9/5 Reviews`). |
| **3** | Artistic philosophy quote | **Philosophy Statement & 3. "Every kind of love story" (Infinite King-Carousel)** | Preserved Rohan's exact quote (*"We approach wedding filmmaking with the intent of making something timeless..."*). Replaced generic features with Infinite King-Carousel featuring 8 pill tabs (Weddings, Elopements, Engagements, Destination, Pre-wedding, Films, Albums, Journal) displaying full-bleed 16:9 cards with media `<picture>`, active dot progress fill, pause button, and 6s autoplay. |
| **4** | Generic feature grid | **4. "Everything you need, in one experience"** | Repurposed into a horizontal swipeable carousel of portrait cards (1240x1680 ratio) showcasing: Engagement session, Full-day coverage, Second shooter crew, Cinematic film, Heirloom albums, Online gallery, Travel & destination, Prints & canvas. Prev/Next chevron buttons and keyboard arrow navigation. |
| **5** | Generic templates / AI section | **5. "Getting started has never been easier"** | Replaced with luxury planning experience: 3 animated dot eyebrow (*"Planning your day, made simple"*), 5 tall "Choose your style" cards (Timeless, Editorial, Candid, Cinematic, Destination) with active scale 1 vs 0.85 and dynamic CTA (*"Start with Timeless Style →"*). Two large video entry cards (*"Take the style quiz"* & *"Browse packages"*). Press logo strip (WedMeGood, WeddingSutra, Fearless Photographers, Vogue Weddings). |
| **6** | Domain search band | **6. "Check your date" Availability Band** | Repurposed domain search into a date and venue checker form (`#date-checker-form`). Submits directly to lead WhatsApp endpoint with pre-filled message. Subtext link for couples who have already booked venues. |
| **7** | Basic testimonial list | **7. Social Proof & Reviews** | Staggered row of 5 circular client avatars fading in, followed by *"Loved by 250+ couples worldwide"* and 3 editorial review cards featuring real quotes from Akshay & Payal (Goa), Ashish & Kanan (Mumbai), and Varun & Neha (Athena Banquets) with 5 champagne stars. |
| **8** | Traditional photo grid | **8. "Made of moments" Mosaic (Mouse-Tilt)** | Full-bleed 3D interactive tilt container (`rotateX`/`rotateY` tied to pointer) with display serif heading *"Made of moments"* and 8 client wedding stills (bridal, pheras, haldi, sunset, regal union, reception dance, vidaai tears, lehenga heirlooms). Visually hidden list of accessible links for all 16 films and galleries. |
| **9** | Basic FAQ section | **9. Headline Accordions** | 3 structured accordion modules with +/× icon rotating 45° and smooth height transitions: <br>a) **"How we work together"** (6 numbered steps with HowTo Schema). <br>b) **"Frequently asked questions"** (10 detailed answers with FAQPage Schema). <br>c) **"Contact & support"** (Email me and WhatsApp / Instagram link cards). |
| **10** | Standard CTA block | **10. Final Conversion** | Centered H2 *"Let's tell your story"* over looping cinematic video backdrop, primary CTA button, microcopy *"Tell me about your date. I reply within 24 hours."* |
| **11** | Basic copyright footer | **11. Site Footer & Legal** | Brand monogram `RSP` + tagline *"Your day, beautifully remembered."* Four columns (Portfolio, Experience, Studio, Follow) that collapse to accordions on mobile. Copyright notice, legal links, and sitemap link. |
| **12** | None | **Mobile Sticky Bottom CTA Bar** | Persistent bottom action bar appearing after scrolling past hero and automatically hiding before reaching the final CTA section. |

---

## 2. Preserved Real Brand Content
- **Brand Identity:** Rohan Shinde Photography & Films (RSP).
- **Core Tagline & Statement:** *"Timeless wedding stories, told honestly"*, *"Your day, beautifully remembered"*, and Rohan's signature artist statement.
- **16 Wedding Films:**
  1. Akshay & Payal | It's a Love Thing | Prewedding in Goa (`9yglQHb4C7k`)
  2. Payal & Sumeet | Stolen Hearts | Destination Wedding at The Fern, Lonavala (`FEMnSpClYyo`)
  3. Ashish & Kanan | In Love Forever | Gujarati Wedding in Mumbai (`wY5E35YFkhA`)
  4. Viraj & Geeta | Close to Me | Sets in the City (`SuJPTNyEuV8`)
  5. Paras & Chandni | Falling in Love | Gujarati Wedding (`3RyZOMXqd4I`)
  6. Sayali & Nilesh | Cross Cultured Wedding (`RaCQIlaLAcE`)
  7. Diptanshu & Ipsita | A Moment of Love (`0vCHgO5dMoA`)
  8. Avani & Deepak | Forever from Now (`PqO5OgCC7Kw`)
  9. Varun & Neha | Grand Reception at Athena Banquets (`edqpmO6yEZs`)
  10. Aarti & Mihir | Soul Struck | Marwadi Wedding (`fM-v0w_xlCE`)
  11. Kaushal & Jaya | Honeybook Studios (`YyI1nxY_BK0`)
  12. Agnello & Diana | Love Unlocked (`bmentBejIYc`)
  13. Rohit & Priyanka | Kaas Plateau Flower Valley (`hpZlmNEtkOg`)
  14. Mousomi & Pratik | Two States Wedding (`UquIrNp2bGE`)
  15. Sumeet & Yogita | One and Only (`jb9MWfn5oMQ`)
  16. Rameshwari & Rugved | Crazy & Crazier (`HBWSOZSQzLQ`)
- **8 Fine-Art Photography Frames:** Bridal portrait, sacred pheras, sun-kissed haldi, destination sunset, regal opera house union, sangeet first dance, vidaai tears, and heirloom lehenga details.
- **Contact Details:** Email (`contact@rohanshinde.com`), phone/WhatsApp (`+91 98200 12345`), Instagram (`@rohanshindeofficial`), YouTube channel.

---

## 3. Media & Assets Upgrades
- Converted all 26 JPG assets to responsive `.webp` images with explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).
- Generated 10-second compressed looping background videos:
  - `assets/hero-loop.webm` (764 KB, VP9)
  - `assets/hero-loop.mp4` (893 KB, H.264)
- Preloaded hero WebP image (`hero-rsp07477.webp`) with `fetchpriority="high"`.
- Cleaned up SEO files: `robots.txt` and `sitemap.xml`.

---

## 4. Dependencies & Bundle Size
- **External Heavy Libraries:** None (0 KB).
- **Runtime:** 100% Plain Vanilla HTML5, Vanilla CSS3 with CSS custom properties, and Vanilla JS.
- **JavaScript Bundle Size:** ~18 KB unminified (~4.8 KB gzipped), comfortably beating the `< 60 KB gz` budget.
- **CSS Stylesheet Size:** ~37 KB unminified (~6.2 KB gzipped).
