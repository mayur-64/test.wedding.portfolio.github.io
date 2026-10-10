# TODO-FOR-ME: Action Items & Brand Customizations

This file lists all specific items, links, or media files that you can personalize or update with your custom production assets.

---

## 1. Social & Booking Channels
- [ ] **WhatsApp Phone Number**: Currently set to `+91 98200 12345` (`https://wa.me/919820012345`). If your studio WhatsApp number is different, update lines 330 and 807 in `index.html`.
- [ ] **Email Address**: Currently configured to `contact@rohanshinde.com` and `info@rohanshinde.com`. Update in `index.html` (lines 48, 775) and `data/portfolio_data.json` if needed.
- [ ] **Instagram Handle**: Currently set to `@rohanshindeofficial` (`https://www.instagram.com/rohanshindeofficial`).
- [ ] **Custom Booking Engine**: If you use an external client booking portal (e.g. HoneyBook, Studio Ninja, Dubsado), you can point the `#check-date` form action to your portal's URL.

---

## 2. Media & Video Loops
- [x] **Hero Background Video Loop**: Generated and active (`assets/hero-loop.webm` 764KB, `assets/hero-loop.mp4` 893KB).
  - *Optional*: If you wish to replace the hero video loop with a different 10-second 4K master highlight cut, drop the replacement files into `assets/hero-loop.webm` and `assets/hero-loop.mp4`.
- [x] **Hero Stills Carousel**: 5 high-res stills generated and mapped to RSP wedding frames with responsive WebP.
- [x] **King-Carousel (Every kind of love story)**: 8 high-res frames linked to all 8 categories (Weddings, Elopements, Engagements, Destination, Pre-wedding, Films, Albums, Journal).
- [x] **Horizontal Experience Cards**: 8 portrait services cards populated with authentic imagery.
- [x] **Mosaic Moments**: 8 real client photos with 3D pointer-tilt interaction.

---

## 3. Testimonials & Social Proof
- [x] **Couples Featured**: Real testimonials from Akshay & Payal (Goa), Ashish & Kanan (Mumbai), and Varun & Neha (Athena Banquets).
- [ ] *Optional*: To feature more reviews or swap in newer 2025/2026 couples, edit lines 685–725 in `index.html`.

---

## 4. Calendar & Booking Windows
- [x] **Announcement Bar**: Configured as *"Now reserving dates for 2026 & 2027 weddings | Limited to 25 celebrations worldwide"*.
- [ ] *Optional*: When your 2026 calendar fills up, update the text in line 79 of `index.html` to focus exclusively on 2027 celebrations.

---

## 5. Domain & GitHub Pages Deployment
- [x] **Canonical Domain**: Currently pointing to `https://mayur-64.github.io/test.wedding.portfolio.github.io/`.
- [ ] *Custom Domain*: If you map a custom domain (e.g., `https://www.rohanshinde.com/` or `https://rohanshinde.in/`), update:
  - Canonical URL in `index.html` (line 15)
  - `sitemap.xml` (all `<loc>` entries)
  - `robots.txt` (Sitemap URL)
  - Add a `CNAME` file containing your custom domain name in the repository root.
