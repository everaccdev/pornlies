# PornLies — Astro Website

Built with [Astro](https://astro.build) and deployed on [Netlify](https://netlify.com).  
Content managed via [Decap CMS](https://decapcms.org) (no account needed — uses your existing Netlify login).

---

## Project Structure

```
/
├── public/
│   ├── admin/
│   │   ├── index.html        ← Decap CMS admin UI
│   │   └── config.yml        ← CMS field definitions (edit this to add/change fields)
│   ├── fonts/                ← Lota Grotesque OTF files
│   └── images/
│       ├── textures/         ← texture-grain.png, texture-paint.png
│       └── uploads/          ← CMS-uploaded images land here
├── src/
│   ├── components/
│   │   ├── LieCard.astro     ← Flip card (hover = flip, click = detail page)
│   │   ├── VideoEmbed.astro  ← Responsive YouTube embed
│   │   ├── TestimonialCard.astro
│   │   └── LeadForm.astro    ← Netlify Forms-ready lead capture
│   ├── content/
│   │   ├── lies/lies.md          ← All lie card data (CMS editable)
│   │   ├── videos/videos.md      ← YouTube video list (CMS editable)
│   │   └── testimonials/
│   │       ├── testimonials.md   ← Pull-quote testimonials (CMS editable)
│   │       └── stories.md        ← Stories of Freedom page content (CMS editable)
│   ├── layouts/
│   │   └── BaseLayout.astro  ← Shared HTML shell, nav, footer
│   ├── pages/
│   │   ├── index.astro       ← Homepage
│   │   ├── lies/
│   │   │   ├── index.astro   ← All lies grid
│   │   │   └── [slug].astro  ← Individual lie detail pages (generated at build)
│   │   ├── stories.astro     ← Stories of Freedom
│   │   ├── hope.astro        ← Find Hope
│   │   ├── contact.astro     ← Contact
│   │   └── 404.astro
│   └── styles/
│       └── global.css        ← All design tokens + global styles
├── astro.config.mjs
├── netlify.toml
└── package.json
```

---

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`

---

## Deployment (Netlify)

### First time setup

1. Push this repo to GitHub (or GitLab / Bitbucket)
2. In [Netlify](https://app.netlify.com), click **Add new site → Import an existing project**
3. Connect your GitHub repo
4. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**

### Environment variables

No required environment variables for the base site.  
If you add reCAPTCHA, add `RECAPTCHA_SECRET_KEY` in Netlify → Site configuration → Environment variables.

---

## CMS Setup (Decap CMS)

Decap CMS uses Netlify Identity for authentication — no separate account or database needed.

### One-time setup (5 minutes)

1. In Netlify dashboard → **Site configuration → Identity → Enable Identity**
2. Under Identity → **Registration preferences** → set to **"Invite only"**
3. Under Identity → **Services → Git Gateway** → click **Enable Git Gateway**
4. Under Identity → **Users** → click **Invite users** → enter your email
5. Check your email, accept the invite, set a password
6. Visit `https://your-site.netlify.app/admin` and log in

### Using the CMS

The CMS lets you edit:

| Section | What you can do |
|---|---|
| **Videos** | Add, remove, reorder YouTube videos. Paste the video ID (not the full URL). |
| **Testimonials** | Add/edit the pull-quote cards shown next to forms. |
| **Stories of Freedom** | Add/edit full success stories on the /stories page. |
| **Lies** | Edit card text, color, excerpt. (Note: adding a *new* lie also requires a code change — see below.) |

> **Editorial workflow is enabled** — changes go through Draft → In Review → Ready before publishing. This prevents accidental live changes.

### Adding a brand new Lie

Because each lie has its own detail page, adding a new lie requires one small code change in addition to the CMS:

1. Add the lie in the CMS (this updates `src/content/lies/lies.md`)
2. Open `src/pages/lies/[slug].astro` and add the new lie to the `lies` array with its full `paragraphs` content
3. Push the change — Netlify will rebuild and the new page will go live

---

## YouTube Videos

To find a YouTube video ID:
- Full URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- The ID is everything after `v=`: **`dQw4w9WgXcQ`**

Replace the placeholder `REPLACE_VIDEO_ID_1` / `REPLACE_VIDEO_ID_2` values in:
- `src/pages/index.astro` (the videos array at the top)
- `src/content/videos/videos.md` (for CMS reference)

---

## Forms

Forms use **Netlify Forms** — zero configuration, submissions go straight to your Netlify dashboard.

### To connect to an email list (Mailchimp, ConvertKit, etc.)

1. In Netlify → **Forms → Form notifications** → add a webhook or email notification
2. Or: replace the `action="#"` in `src/components/LeadForm.astro` with your email platform's form endpoint URL

### reCAPTCHA

When you have your reCAPTCHA site key:
1. Add `<script src="https://www.google.com/recaptcha/api.js" async defer></script>` to `BaseLayout.astro`
2. Uncomment the reCAPTCHA div in `LeadForm.astro` and add your site key

---

## Font Awesome Pro

When ready to switch from Free to Pro:

1. Replace the CDN `<link>` in `src/layouts/BaseLayout.astro` with your Pro kit `<script>` tag:
   ```html
   <script src="https://kit.fontawesome.com/YOUR_KIT_ID.js" crossorigin="anonymous"></script>
   ```
2. Remove the Free CDN link above it
3. You can then use any Pro icon class (e.g. `fa-thin`, `fa-duotone`, etc.)

---

## Design Tokens

All colors, fonts, and spacing are defined as CSS custom properties in `src/styles/global.css`.
Key tokens:

```css
--color-bg:          #1a0a0a   /* deep maroon-black */
--color-accent-red:  #e63b2e   /* PornLies red */
--color-accent-gold: #c9a227   /* CTA gold */
--font-body:         'Lota Grotesque'
--font-serif:        'Playfair Display'  /* italic card titles */
```
