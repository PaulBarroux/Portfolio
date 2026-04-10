# Claude Code Prompt — Paul Barroux UX/UI Portfolio

Build a complete, production-ready portfolio website for **Paul Barroux**, a 3rd-year UX/UI Design student at L'École de Design Nantes Atlantique. The site is built with **plain HTML, CSS, and vanilla JavaScript** — no frameworks, no build tools. Everything in **English**. **Light mode only**.

---

## 1. GLOBAL DESIGN DIRECTION

### Style: Elegant & Refined
- Sophisticated, understated design with subtle details (thin borders, soft shadows, micro-interactions)
- Generous whitespace — let the content breathe
- No rounded "friendly" shapes — prefer slightly rounded corners (4–8px max) or sharp edges
- The site itself should feel like a UX case study: polished, intentional, every detail considered

### Color Palette (Blue tones)
- **Background:** #FAFBFD (very light cool white, not pure white)
- **Surface/Cards:** #FFFFFF with subtle 1px border (#E8ECF1)
- **Primary accent:** #2B59C3 (refined medium blue)
- **Primary hover:** #1E3F8F (darker blue)
- **Text primary:** #1A1E2C (near-black with a blue undertone)
- **Text secondary:** #6B7394 (muted blue-gray)
- **Dividers/borders:** #E2E6EE
- **Subtle background tint:** #F0F3F8 (for alternating sections)
- Keep the palette restrained — blue is the ONLY accent color. Consistency is paramount.

### Typography
- **Headings:** "DM Serif Display" (elegant serif, gives editorial refinement) — import from Google Fonts
- **Body / UI:** "Inter" (clean, highly legible sans-serif) — import from Google Fonts
- **Font sizes** (desktop): Hero title 56–64px, Section titles 40px, Project card titles 28px, Body 16–17px, Small/labels 13–14px
- **Line height:** 1.5 for body, 1.2 for headings
- **Letter-spacing:** slight positive tracking on uppercase labels (+0.08em)

### Spacing & Layout
- Max content width: 1200px, centered
- Section vertical padding: 120px top/bottom
- Consistent 8px grid system for all spacing
- Horizontal padding: 24px mobile, 48px tablet, 80px desktop

### Micro-interactions & Motion
- All transitions use `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for an elegant ease
- Hover on project cards: subtle lift (translateY -4px) + soft shadow increase
- Links/buttons: color transition 0.3s
- Page elements animate in on scroll using IntersectionObserver — fade up (translateY 30px → 0, opacity 0 → 1), staggered 100ms between sibling elements
- Project cards on homepage: staggered entrance, each card appears one after the other (150ms delay between each)
- Navigation: hides on scroll down, reappears on scroll up, with a smooth translateY transition
- Keep animations subtle and refined — never flashy or distracting

---

## 2. SITE STRUCTURE

### Pages
1. **index.html** — Homepage
2. **about.html** — Full About page
3. **project.html** (template) — Case study page (reuse for all 5 projects, or create project-1.html through project-5.html)

### Navigation (all pages)
- Fixed top bar, hides on scroll down, slides back on scroll up
- Left: "Paul Barroux" (text logo, DM Serif Display, links to homepage)
- Right: "Projects" (anchor to projects section or scrolls there on homepage), "About", "Contact" (anchor to footer contact section)
- Subtle bottom border (1px #E2E6EE), background slightly blurred (#FAFBFD with backdrop-filter blur)
- On mobile: hamburger menu with a slide-in panel from right

---

## 3. HOMEPAGE (index.html)

### Section 1 — Hero
- Large heading: "Paul Barroux" (DM Serif Display, 56–64px)
- Below: "UX/UI Designer" as a refined subtitle (Inter, 20px, text-secondary color, slight letter-spacing)
- Below that: a short intro paragraph (2–3 lines max), something like: "Currently a 3rd-year student at L'École de Design Nantes Atlantique, I craft thoughtful digital experiences grounded in research and driven by purpose." — Keep it warm but professional.
- No photo. Let typography and whitespace do the work.
- Subtle scroll indicator at the bottom (thin animated line or small arrow)

### Section 2 — Skills / What I Do
- Section title: "Expertise" or "What I Do"
- Display as 3 elegant columns (stack on mobile):

**Column 1 — UX Research**
- User Interviews
- UX Audit
- Personas & User Journeys
- Competitive Analysis

**Column 2 — UI Production**
- Wireframing
- Interface Design
- Design Systems
- Prototyping
- User Testing & Iterations

**Column 3 — Technical Skills**
- HTML, CSS, JavaScript
- 3D (basics)
- Motion Design (basics)

- Each column has a small label/tag at top (uppercase, 13px, letter-spaced, accent blue), then a list styled cleanly (no bullets, just stacked text with spacing)
- Subtle divider lines between columns on desktop

### Section 3 — Selected Projects
- Section title: "Selected Work"
- **5 project cards**, stacked full-width (one per row), each containing:
  - **Header image** (placeholder: a 16:9 light gray box with the text "Project Image" centered — the user will replace these later)
  - **Project type** (small uppercase label above title, e.g. "UX/UI REDESIGN", "MOBILE APP", etc.)
  - **Project name** (DM Serif Display, 28px)
  - **Short description** (one sentence, Inter, text-secondary)
  - The entire card is clickable, linking to the project's case study page
- Cards animate in one after the other on scroll (staggered IntersectionObserver)
- Hover state: subtle lift + shadow
- Use placeholder content for all 5 projects:
  - Project 1: "Project Alpha" — "UX Research" — "Redesigning the onboarding experience for a fintech application."
  - Project 2: "Project Beta" — "Mobile App" — "Designing a sustainable mobility companion app."
  - Project 3: "Project Gamma" — "UX/UI Design" — "Creating an accessible e-commerce platform."
  - Project 4: "Project Delta" — "Design System" — "Building a scalable component library for a SaaS product."
  - Project 5: "Project Epsilon" — "Service Design" — "Rethinking the patient journey in a healthcare context."

### Section 4 — Contact (also the footer)
- Section title: "Get in Touch"
- A short line: "Interested in working together? Let's talk."
- A prominent email link styled as a large clickable text or button: "hello@paulbarroux.com" (placeholder) — this should be a mailto: link
- Below: "© 2026 Paul Barroux — All rights reserved." in small text
- Keep it minimal and elegant

---

## 4. ABOUT PAGE (about.html)

- Hero area: "About" as page title
- A longer bio (3–4 paragraphs). Use this placeholder content:

> "I'm Paul Barroux, a UX/UI designer currently in my third year at L'École de Design Nantes Atlantique. My approach to design is rooted in understanding people — their needs, frustrations, and aspirations — and translating those insights into meaningful digital experiences."
>
> "I believe great design lives at the intersection of research and aesthetics. Every project I take on begins with deep listening: user interviews, contextual research, and careful analysis of the problem space. From there, I move through wireframing, prototyping, and iterative testing to arrive at solutions that are both functional and beautiful."
>
> "Beyond screens, I have a growing interest in the technical side of design. I work with HTML, CSS, and JavaScript to prototype ideas, and I'm exploring 3D and motion design to push the boundaries of what digital experiences can feel like."
>
> "When I'm not designing, you'll find me [placeholder for hobbies/interests — the user can fill this in later]."

- Below the bio: a "Skills" section mirroring the homepage one but slightly more detailed, possibly with proficiency indicators or grouped differently
- At the bottom: same contact section/footer as homepage

---

## 5. PROJECT CASE STUDY PAGE (template)

Every project page follows the **exact same structure and layout** for consistency. Use a clean, editorial, long-scroll format.

### Part 1 — Project Header
- **Project type** (uppercase label, small, accent blue)
- **Project name** (DM Serif Display, large, 48px)
- **Short description** (one sentence, Inter, 18px, text-secondary)
- **Header image** (full-width within content area, 16:9 placeholder)

### Part 2 — Project Metadata
A horizontal row (or clean grid) with the following fields, displayed as label + value pairs:
- **Role:** e.g. "UX/UI Designer"
- **Sector:** e.g. "Fintech" (use "Secteur" content but label in English)
- **Year:** e.g. "2025"
- **Deliverables:** e.g. "User Research, Wireframes, UI Design, Prototype"
- **Partner / Client:** e.g. "Company Name" (or "Personal Project" if none)

Style: labels in uppercase small text (text-secondary), values in regular weight below. Separated by subtle vertical dividers on desktop. On mobile, stack as 2-column grid.

### Part 3 — Case Study Content
Each of the following sections is a distinct block with a section title (DM Serif Display, 32px) and body text (Inter, 16–17px). Separate each section with generous whitespace (80–100px). Include placeholder text for each:

1. **Context**
   - "Placeholder: Describe the project background, the company or organization involved, and the initial situation."

2. **Problem Statement**
   - "Placeholder: What specific problem or challenge needed to be addressed? What pain points were identified?"

3. **Stakes & Challenges**
   - "Placeholder: What were the key stakes? Business constraints, user needs, technical limitations, deadlines?"

4. **Guiding Principles**
   - "Placeholder: What design principles or strategic directions guided the project? What values informed the approach?"

5. **Methodology**
   - "Placeholder: What process did you follow? Describe research methods, ideation, wireframing, testing, iteration cycles."
   - Include space for images/diagrams between paragraphs (placeholder gray boxes, labeled "Process Image")

6. **Proposed Solution / Final Deliverable**
   - "Placeholder: Present the final design solution. Describe key screens, interactions, and design decisions."
   - Include multiple image placeholders here (mockups, screens, etc.)

7. **Key Learnings**
   - "Placeholder: What did you learn from this project? What would you do differently? How did it shape your growth as a designer?"

### Part 4 — Project Navigation
At the bottom of each project page:
- A "Next Project" link (right-aligned, with project name + arrow) leading to the next case study
- A "Back to Projects" link (left-aligned) leading back to the homepage projects section
- Styled as a clean horizontal bar with subtle hover animations

---

## 6. RESPONSIVE DESIGN

- **Desktop:** Full layout as described, max-width 1200px centered
- **Tablet (768–1024px):** Skills columns become 2+1, project metadata becomes 2-column grid, slightly smaller type
- **Mobile (<768px):** Single column everything, hamburger nav, hero text ~36px, sections padding 60px vertical, project cards stack naturally, metadata stacks vertically

---

## 7. TECHNICAL REQUIREMENTS

- Plain HTML5, CSS3, vanilla JavaScript — no frameworks, no npm, no build step
- Google Fonts loaded via `<link>` in `<head>`: DM Serif Display (400) + Inter (400, 500, 600)
- CSS custom properties (variables) for all colors, font sizes, and spacing — defined in `:root`
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Smooth scroll behavior (`scroll-behavior: smooth`)
- IntersectionObserver for scroll-triggered animations
- Navbar scroll behavior: track scroll direction, toggle a CSS class to show/hide with translateY
- Mobile hamburger menu: CSS + JS toggle, no library
- All images are placeholder `<div>`s with background #E2E6EE and centered text — easy to replace with real `<img>` tags later
- Add appropriate `<meta>` tags: viewport, description, Open Graph basics
- Favicon: use a simple inline SVG favicon (a blue square or the letter "P")
- Clean, well-commented code — this is a learning project

---

## 8. FILE STRUCTURE

```
portfolio/
├── index.html
├── about.html
├── project-1.html
├── project-2.html
├── project-3.html
├── project-4.html
├── project-5.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── (empty — for future images)
```

---

## 9. COHERENCE CHECKLIST

This is critical — the portfolio must feel like ONE cohesive product:
- [ ] Same color palette used everywhere, no rogue colors
- [ ] Same typography pairing on every page (DM Serif Display + Inter)
- [ ] Same spacing rhythm (8px grid, consistent section padding)
- [ ] Same animation style and timing across all pages
- [ ] Same card/component styling reused (buttons, labels, metadata blocks)
- [ ] Same header/footer on every page
- [ ] Same hover states on all interactive elements
- [ ] Project pages are visually identical in structure — only content differs
- [ ] Consistent use of uppercase labels, text sizes, and color assignments
- [ ] Everything feels intentional — no default browser styles leaking through

---

## 10. SUMMARY

Build an elegant, refined, light-mode UX/UI portfolio for Paul Barroux using only HTML/CSS/JS. Blue accent color palette, DM Serif Display + Inter typography, smooth scroll-triggered animations with staggered reveals, a smart hide/show navbar, and full-width stacked project cards on the homepage. The site has a homepage (hero + skills + projects + contact), an about page, and 5 identical-structure case study pages with placeholder content. Every detail must be consistent and cohesive. The site should look and feel like a senior designer made it — even though it's for a student. No shortcuts on polish.
