# IRP Web Development Foundations & Core JavaScript Assignment

A comprehensive practical assignment covering:
- **Part A:** Frontend CSS Responsiveness for the **IRP LMS Home Page** (`part-a-responsive-ui/`)
- **Part B:** Core JavaScript Bank Account Simulator diagnosing **Types & Coercion**, **Variable Scoping**, **Hoisting & TDZ**, and the **Asynchronous Loop Bug** (`part-b-javascript/`)

---

## 📁 Project Directory Structure

```text
irp-web-development-assignment/
├── part-a-responsive-ui/
│   ├── index.html       # Semantic HTML5 recreation of IRP LMS Home Page
│   └── style.css        # Responsive CSS (Flexbox, CSS Grid, Media Queries)
├── part-b-javascript/
│   └── bank.js          # Standalone JavaScript file (Part 1 & Part 2)
└── README.md            # Setup notes, responsive testing steps, and execution instructions
```

---

## 🎨 Part A: Frontend CSS Responsiveness (IRP LMS Home Page)

### Overview
Recreation of the IRP LMS Home Page using **semantic HTML5** and **responsive CSS3** (Flexbox, CSS Grid, and Media Queries). The UI adapts fluidly across screen sizes from large desktop monitors down to compact mobile phones.

### Key Implementation Highlights
1. **Sticky Navigation Bar (`position: sticky; top: 0; z-index: 1000;`)**:
   - Remains securely anchored at the top of the viewport during scrolling.
   - **Desktop View (≥ 1024px)**: Displays brand icon + "IRP LMS", full navigation menu (`Home`, `Courses`, `Contact Us`) with an active orange underline indicator on `Home`, and an orange outlined "Sign In" pill button.
   - **Mobile View (≤ 768px)**: Desktop navigation links collapse/hide (`display: none;`). The top bar maintains brand identity on the left and the touch-friendly outlined "Sign In" button on the right.
2. **Hero Banner**:
   - Uses `--color-bg-light` (`#E2F2FD`) background.
   - Two-column desktop layout transitioning to a centered single-column mobile stream.
   - Includes orange kicker (`LEARN • BUILD • GET PLACED`), headline with `"IRP LMS"` highlighted in primary orange, descriptive subtitle, and solid orange `Explore Courses →` CTA button.
   - Responsive vector illustration (`Climbing Towards Success`) scales smoothly without overflowing horizontal viewport bounds.
3. **Learning Journey (Step Cards)**:
   - 5 structured step cards with crisp light blue borders (`#D6E9FF`), rounded corners (`10px`), and prominent orange numerals (`1` to `5`).
   - **Desktop (> 1024px)**: Exact 5-column horizontal row (`grid-template-columns: repeat(5, 1fr)`).
   - **Tablet (768px – 1024px)**: Balanced 3-column / 2-column wrapping grid.
   - **Mobile (≤ 768px)**: Strict 1-column vertical stack (`grid-template-columns: 1fr`). Numbers are positioned on the top-left with card text beside it matching design specifications.

### Design Tokens
| Token Name | HEX Code | Purpose |
| :--- | :--- | :--- |
| `--color-primary-navy` | `#003366` | Headings (h1, h2), brand title text, active nav indicator |
| `--color-primary-orange` | `#FE781E` | Hero kicker, CTA button, headline accent, step numbers (1–5) |
| `--color-secondary-blue` | `#5F9FE0` | Sub-headings, secondary visual elements, accents |
| `--color-bg-light` | `#E2F2FD` | Hero section background, soft container highlights |
| `--color-card-bg` | `#FFFFFF` | Main page background, card containers |
| `--color-border-light` | `#D6E9FF` | Step card outlines, subtle divider borders |

### How to Test Part A
1. Open `part-a-responsive-ui/index.html` in Google Chrome (or any modern web browser).
2. **Sticky Header Verification**: Scroll down the page and observe the navigation bar remaining anchored at the top with page content smoothly scrolling beneath it.
3. **Device Toolbar Testing**:
   - Press `F12` (or right-click and choose **Inspect**) to open Chrome DevTools.
   - Click the **Toggle Device Toolbar** icon (`Ctrl + Shift + M`).
   - **Desktop View (1200px+)**: Check the 5-column step cards layout, visible navigation links with the orange underline under "Home", and 2-column hero layout.
   - **Tablet View (768px – 1024px)**: Check the balanced wrapping grid for cards.
   - **Mobile View (375px / 390px)**: Check that navigation links are collapsed, cards stack in a single column with numbers distinctly on the top-left, and there is zero horizontal scroll/overflow.

---

## ⚡ Part B: Core JavaScript (Bank Account Simulator)

### Overview
A standalone script (`part-b-javascript/bank.js`) executing in strict mode (`"use strict";`) that diagnoses and fixes foundational JavaScript defects involving type coercion, scope, hoisting, and closures.

### Part 1: Types & Coercion (`parseAmount`)
A robust validator function `parseAmount(input)` that catches and prevents invalid data entry:
- Rejects `null` and `undefined` with an informative required-field error.
- Rejects non-string and non-number types.
- Trims whitespace from string inputs.
- Guards against empty strings `""` (preventing accidental `Number("") -> 0` coercion).
- Catches `NaN` values produced by malformed strings (e.g., `"abc"`, `"12.5.3"`).
- Rejects amounts $\le 0$.
- Returns verified strictly positive numeric values.

#### Test Cases & Results:
| Input | Result | Concept Demonstrated |
| :--- | :--- | :--- |
| `"500"` | Returns number `500` | Explicit string-to-number conversion |
| `" 250 "` | Returns number `250` | Whitespace removal prior to conversion |
| `""` | Throws Error | Guarding against empty-string zero coercion |
| `"abc"` | Throws Error | Catching non-numeric NaN values |
| `null` | Throws Error | Preventing null from coercing to 0 |
| `undefined` | Throws Error | Catching missing or uninitialized values |
| `"12.5.3"` | Throws Error | Catching malformed decimal strings |

#### Explanatory Notes:
- **Why `"5" + 2` is `"52"` while `"5" - 2` is `3`**:
  The binary `+` operator supports string concatenation: if either operand is a string, JavaScript converts the other to a string and concatenates them. In contrast, `-` is strictly an arithmetic operator, forcing JavaScript to coerce the string `"5"` into the number `5` and compute subtraction.
- **Why `typeof null === "object"`**:
  This is a historical bug from JavaScript's first 1995 implementation. Values were represented with a 1-to-3 bit type tag in memory where `000` signified an object reference. Since `null` was represented as the NULL pointer (`0x00`), `typeof` read the `000` tag and returned `"object"`. This behavior is retained for backward compatibility.

### Part 2: Scoping, Hoisting & Asynchronous Loops
1. **`const` vs. `let`**:
   - `const BANK_NAME = "JS National Bank"` is used because the bank name is an immutable constant that should never be reassigned.
   - `let transactionCounter = 0` is used because the transaction count is mutable state that increments over time.
2. **Hoisting & Temporal Dead Zone (TDZ)**:
   - Accessing a `var` variable before its declaration logs `undefined` because `var` variables are hoisted and initialized to `undefined` in the creation phase.
   - Accessing a `let` variable before its declaration throws a `ReferenceError` because `let` variables are hoisted but kept in the Temporal Dead Zone until execution reaches their declaration line.
   - Function declarations (`function announce() {}`) are hoisted in their entirety and can be called before their definition.
   - Function expressions assigned to `var` (`var notify = function() {}`) hoist the variable as `undefined`, so calling it before definition throws a `TypeError: notify is not a function`.
3. **Asynchronous Loop Bug**:
   - **`var` loop**: Because `var` is function-scoped/globally-scoped, a single variable binding is shared across all iterations. When `setTimeout` callbacks run after the loop has finished, they all read the final value: `3, 3, 3`.
   - **`let` loop**: Because `let` is block-scoped, JavaScript creates a fresh lexical binding and closure for each loop iteration, correctly logging: `0, 1, 2`.

### How to Run Part B
Run the script using Node.js:
```bash
node part-b-javascript/bank.js
```

All test cases and demonstrations will execute cleanly in sequential order without unhandled runtime crashes.
