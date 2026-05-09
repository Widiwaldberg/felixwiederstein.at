# CLAUDE.md — Frontend Website Rules

## Always Do First
1. *Invoke `huashu-design` skill* — every session, no exceptions
2. *Invoke `claude-code-plugins:frontend-design` skill* — every session, no exceptions
3. *Invoke `everything-claude-code:frontend-patterns` skill* — every session, no exceptions
4. Check `brand_assets/` — use real assets if present, never placeholders where real assets exist
5. No reference image → query ui-ux-pro-max before picking colors, fonts, or style:
   `python3 ~/.claude/plugins/cache/ui-ux-pro-max-skill/ui-ux-pro-max/2.5.0/src/ui-ux-pro-max/scripts/search.py "<query>" --domain <style|color|typography|landing> --stack html-tailwind`
6. Start dev server in background: `node serve.mjs` → http://localhost:3000

## Reference Images
- If provided: match layout, spacing, typography, and color exactly. Use placeholder content (images via https://placehold.co/, generic copy). Do not improve or add.
- If none: design from scratch with high craft (see guardrails below).
- Screenshot → compare → fix → re-screenshot. Minimum 2 rounds. Stop only when no visible differences remain or user says so.

## Output Defaults
- Single `index.html`, all styles inline, unless told otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive
- *Prototypes, animations, design variants, interactive demos* → invoke `huashu-design` skill instead of building from scratch

## Local Server
- *Always serve on localhost* — never screenshot a file:/// URL.
- Start the dev server: node serve.mjs (serves the project root at http://localhost:3000)
- serve.mjs lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- *Always screenshot from localhost* — never `file:///`
- `node screenshot.mjs http://localhost:3000` — saves to `./temporary screenshots/screenshot-N.png` (auto-incremented)
- Optional label: `node screenshot.mjs http://localhost:3000 label`
- After screenshotting, read the PNG with the Read tool and analyze directly
- Be specific: "heading is 32px, reference shows ~24px" — not "looks off"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Brand Assets
- Always check the brand_assets/ folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- *Colors:* Never default Tailwind palette (indigo-500, blue-600, etc.). Derive from a custom brand color.
- *Shadows:* No flat `shadow-md`. Layered, color-tinted shadows with low opacity.
- *Typography:* Never same font for headings and body. Pair display/serif with clean sans. Tight tracking (-0.03em) on large headings, generous line-height (1.7) on body.
- *Gradients:* Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- *Animations:* Only animate `transform` and `opacity`. Never `transition-all`. Spring-style easing. Use `framer-motion` (installed) for component-level animation.
- *Interactive states:* Every clickable element needs `hover`, `focus-visible`, and `active`. No exceptions.
- *Images:* Gradient overlay (`bg-gradient-to-t from-black/60`) + color treatment via `mix-blend-multiply`.
- *Spacing:* Intentional, consistent spacing tokens — not random Tailwind steps.
- *Depth:* Layering system (base → elevated → floating). Not everything at the same z-plane.

## Available Skills

### Design & Visual
- `huashu-design` — prototypes, animations, design variants, interactive demos *(invoke every session)*
- `claude-code-plugins:frontend-design` — distinctive, production-grade frontend interfaces, anti-generic-AI aesthetics *(invoke every session)*
- `everything-claude-code:design-system` — design system work
- `everything-claude-code:frontend-patterns` — frontend patterns & best practices
- `everything-claude-code:liquid-glass-design` — liquid glass visual effects
- `everything-claude-code:ui-demo` — UI demos
- `everything-claude-code:frontend-slides` — presentations / slides

### Quality & Review
- `everything-claude-code:code-review` — code quality and correctness
- `security-review` — XSS, injection, unsafe patterns
- `everything-claude-code:accessibility` — WCAG compliance
- `everything-claude-code:performance-optimizer` — render performance, bundle size
- `everything-claude-code:seo` — meta tags, Core Web Vitals
- `everything-claude-code:browser-qa` — browser QA
- `everything-claude-code:click-path-audit` — user flow testing
- `simplify` — simplify and clean up code

### Planning & Architecture
- `everything-claude-code:plan` — plan complex features
- `everything-claude-code:blueprint` — implementation blueprints
- `everything-claude-code:feature-dev` — feature development workflow
- `everything-claude-code:code-architect` — architecture decisions

### Research & Docs
- `everything-claude-code:deep-research` — deep research
- `everything-claude-code:docs-lookup` — look up library/framework docs

### Tools & Config
- `update-config` — Claude Code settings.json
- `everything-claude-code:git-workflow` — git workflow
- `fewer-permission-prompts` — reduce permission prompts
- `context-mode:ctx-stats` / `ctx-purge` / `ctx-doctor` — context management

## Before Shipping
- `everything-claude-code:code-review`
- `security-review`
- `everything-claude-code:accessibility`
- `everything-claude-code:performance-optimizer`
- `everything-claude-code:seo`

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not pipe large command output directly into context — use context-mode (`ctx_batch_execute`, `ctx_search`)
