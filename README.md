# Rohan Shinde Photography & Films (RSP) — Luxury Wedding Portfolio

An editorial, high-performance wedding photography and cinematic films portfolio website crafted with zero runtime bloat, bespoke typography, and rich interactive media galleries.

---

## 🌟 Key Features

* **Authentic Brand Essence & Artistry:** Directly styled per the visual language of Rohan Shinde Photography & Films (RSP) with high-contrast editorial photography, rich gold/champagne accents, and luxury serif typography (`Taviraj` & `Cormorant Garamond` with `Roboto`).
* **Complete Wedding Films Collection (16 Films):**
  - Integrated 16 real wedding and pre-wedding films from the original portfolio archive (Goa, Lonavala, Mumbai, Kaas Plateau, etc.).
  - Category filters: *All Films*, *Destination Weddings*, *Pre-Wedding Stories*, and *Cultural Celebrations*.
  - Fast, responsive 16:9 cinematic video lightbox modal with keyboard controls (`Esc` to close).
* **Fine-Art Photography Gallery:**
  - Curated high-resolution wedding frames (*Bridal Portraits*, *Sacred Pheras & Rituals*, *Candid Moments*, *Details & Heirlooms*).
  - Fullscreen photo lightbox with keyboard navigation (`Left` / `Right` arrows, `Esc`), captions, and location tags.
* **Dual Theme Engine:** Dark Luxe (`#0f1012`) default theme and Classic Ivory Light theme with persistent `localStorage` support.
* **Real Wedding Spotlight & Client Love:** In-depth real wedding journal feature (*Payal & Sumeet in Lonavala*) and authentic bride/groom testimonials.
* **Curated Investment Collections:** Clear, transparent pricing packages (*The Royal Union*, *The Cinematic Memoir*, *Pre-Wedding Reverie*) detailing deliverables, 4K resolution, Italian leather albums, and drone cinematography.
* **Interactive Date Reservation & Inquiry Form:**
  - Form validation with date picker, guest count, and service selection.
  - Direct 1-click WhatsApp inquiry generator pre-filling all details for instant communication with the studio.
* **Zero Bloat & Zero Dependencies:** Pure HTML5, Vanilla CSS3 custom properties, and modern ES6+ JavaScript.
* **SEO & Social Metadata:** Pre-configured with Schema.org `PhotographyBusiness` structured data, Open Graph cards, Twitter metadata, and SVG vector monogram favicon.

---

## 📁 Project Structure

```text
/root/wedding-portfolio/
├── index.html                   # Main production single-page luxury portfolio
├── dev_server.py                # Zero-dependency local development server (Port 8085)
├── css/
│   └── style.css                # Luxury design tokens, responsive typography, modals, print styles
├── js/
│   └── main.js                  # Video lightbox, photo lightbox, filters, theme toggle, inquiry form
├── data/
│   ├── portfolio_data.json      # Structured data for all 16 films, photos, packages & FAQs
│   ├── download_assets.py       # Asset synchronization script
│   ├── download_photos.py       # High-res gallery photo downloader
│   └── verify_site.py           # Automated test suite and validation engine
├── assets/
│   ├── favicon.svg              # Gold monogram vector favicon
│   └── images/
│       ├── hero-rsp07477.jpg    # Hero banner background photograph
│       ├── logo.png             # Rohan Shinde Photography emblem
│       ├── thumb_*.jpg          # 16 local thumbnails for all wedding films
│       └── photo_*.jpg          # 8 local high-resolution wedding photography frames
├── .nojekyll                    # GitHub Pages compatibility flag
├── .gitignore                   # Ignores editor and temporary cache files
└── README.md                    # Project documentation
```

---

## 🚀 Running the Local Development Server

Start the zero-dependency Python server:

```bash
cd /root/wedding-portfolio
python3 dev_server.py
```

Open your browser to:
**`http://127.0.0.1:8085/`**

---

## 🧪 Automated Verification Suite

Run the comprehensive test script to verify file integrity, metadata, and responses:

```bash
python3 /root/wedding-portfolio/data/verify_site.py
```
