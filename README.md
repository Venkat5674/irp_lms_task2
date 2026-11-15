# IRP LMS Platform & Core JavaScript Assignment

A responsive frontend website recreation and core JavaScript foundations project:
- **Part A:** Frontend HTML5 & Responsive CSS3 Website Recreation (`part-a-responsive-ui/`)
  - **Home Page (`index.html`)**: Overview, hero call-to-action banner, and five-step structured learning journey.
  - **Courses Page (`courses.html`)**: Video tutorial library featuring 9 embedded YouTube course players and an explore bar.
  - **Contact Us Page (`contact.html`)**: Split two-column support layout with contact information panel and interactive message form.
- **Part B:** Core JavaScript Bank Account Simulator (`part-b-javascript/bank.js`) diagnosing **Types & Coercion**, **Variable Scoping**, **Hoisting & TDZ**, and the **Asynchronous Loop Bug**.

---

## 📁 Project Directory Structure

```text
irp-web-development-assignment/
├── part-a-responsive-ui/
│   ├── index.html       # Home Page (Overview, Hero, 5-Step Learning Journey)
│   ├── courses.html     # Courses Page (9 Video Tutorial Cards & Explore Bar)
│   ├── contact.html     # Contact Us Page (Contact Details & Message Form)
│   └── style.css        # Responsive CSS (Flexbox, CSS Grid, Media Queries)
├── part-b-javascript/
│   └── bank.js          # Standalone JavaScript file (Part 1 & Part 2)
├── vercel.json          # Vercel deployment rewrites for root routing
└── README.md            # Setup notes, testing steps, and execution instructions
```

---

## 🎨 Part A: Frontend CSS Responsiveness (IRP LMS Website Recreation)

### 1. Home Page (`index.html`)
- **Sticky Navigation Bar (`position: sticky; top: 0; z-index: 1000;`)**: Anchored securely on scroll. Features logo icon + "IRP LMS", active orange indicator under `Home`, links to `Courses` and `Contact Us`, and outlined `Sign In` button.
- **Hero Banner**: Category kicker (`LEARN • BUILD • GET PLACED`), headline with orange `"IRP LMS"` accent, subtitle, solid orange `Explore Courses →` CTA linking to `courses.html`, and `Climbing Towards Success` illustration.
- **Learning Journey (5 Step Cards)**:
  - 5 sequential cards (`Learn`, `Practice`, `Build Projects`, `Prepare`, `Get Placed`) with `#D6E9FF` borders, `#FFFFFF` fill, rounded corners (`10px`), and prominent orange numerals (`1` to `5`).
  - **Desktop (> 1024px)**: 5-column horizontal row (`grid-template-columns: repeat(5, 1fr)`).
  - **Tablet (768px – 1024px)**: Balanced 3-column / 2-column wrapping grid.
  - **Mobile (≤ 768px)**: Strict 1-column vertical stack with numbers positioned on the top-left.

### 2. Courses Page (`courses.html`)
- **Active Navigation**: `Courses` nav link highlighted with the active orange indicator.
- **Course Banner**: Category kicker `OUR COURSES`, headline `Learn by Watching Video Tutorials`, and minimalist e-learning laptop illustration.
- **9 Video Tutorial Cards**:
  - HTML, CSS, JavaScript, React, Python, Java, Spring Boot, Hibernate, and Django.
  - Each card contains an embedded YouTube video with a 16:9 aspect ratio container (`aspect-ratio: 16 / 9;`), bold navy course title (`#003366`), and concise two-line description.
  - **Desktop (> 1024px)**: 3-column grid (`grid-template-columns: repeat(3, 1fr)`).
  - **Tablet (768px – 1024px)**: 2-column grid (`grid-template-columns: repeat(2, 1fr)`).
  - **Mobile (≤ 768px)**: 1-column vertical stack.
- **Explore More Courses Section**: Soft light blue container (`#E2F2FD`) with 9-dot grid icon, descriptive text, and orange `View All Courses →` button.

### 3. Contact Us Page (`contact.html`)
- **Active Navigation**: `Contact Us` nav link highlighted with the active orange indicator.
- **Hero Section**: Category kicker `GET IN TOUCH`, headline `Contact Us`, and supportive copy.
- **Split Two-Column Support Layout**:
  - **Left Panel (Contact Information)**: Light blue container (`#E2F2FD`) displaying direct communication channels with orange subheadings:
    - **Email Us**: Clickable `mailto:support@irplms.com`
    - **Call Us**: Clickable `tel:+919876543210`
    - **Our Office**: `123, Tech Park, 2nd Floor, Bangalore, Karnataka – 560001`
  - **Right Panel (Interactive Message Form)**: White card with `#D6E9FF` border:
    - Heading: `Send Us a Message` with 24-hr response note.
    - Side-by-side inputs on desktop (stacked on mobile) for `Full Name *` and `Email Address *`.
    - Dropdown selector for `Subject *`.
    - Textarea for `Message *` with resize controls.
    - Full-width solid orange `Send Message` button.

### Design Tokens
| Token Name | HEX Code | Purpose |
| :--- | :--- | :--- |
| `--color-primary-navy` | `#003366` | Headings (h1, h2), brand title text, active nav indicator |
| `--color-primary-orange` | `#FE781E` | Hero kicker, CTA buttons, headline accent, step numbers (1–5) |
| `--color-secondary-blue` | `#5F9FE0` | Sub-headings, secondary visual elements, accents |
| `--color-bg-light` | `#E2F2FD` | Hero container backgrounds, soft page section highlights, explore bar |
| `--color-card-bg` | `#FFFFFF` | Main document background, card containers, form backgrounds |
| `--color-border-light` | `#D6E9FF` | Card borders, input outlines, subtle dividers |

---

## ⚡ Part B: Core JavaScript (Bank Account Simulator)

Run the script using Node.js:
```bash
node part-b-javascript/bank.js
```

All test cases and demonstrations execute sequentially with Exit Code 0 and zero unhandled runtime crashes:
- **Part 1 (Types & Coercion)**: `parseAmount` validates raw inputs, catches `null`/`undefined`, non-string/numbers, empty strings `""`, `NaN`, and negative numbers without directly logging from the function.
- **Part 2 (Scoping, Hoisting & TDZ)**: Demonstrates `const` vs `let`, `var` hoisting (`undefined`), `let` TDZ (`ReferenceError`), function declaration vs expression (`TypeError`), and the asynchronous event loop closure bug (`3, 3, 3` vs `0, 1, 2`).

---

## 🚀 Vercel Deployment

A `vercel.json` rewrite file is included at the repository root. When deploying to Vercel, requests to `/`, `/courses`, and `/contact` are routed automatically to `part-a-responsive-ui/` without 404 errors.
