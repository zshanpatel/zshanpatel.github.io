---
last_updated: '2026-03-30'
---
# 04 Blog Content — Task List
_Audit completed March 2026. Updated after Section 1 review + About page written._

---

## SECTION 1 ✅ COMPLETE
- [x] 1.1 Duplicate 06 prefix resolved
- [x] 1.2 09-what-is-revivalist.md completed
- [x] 1.3 Image paths standardised
- [x] 1.4 Prompts → Systems (AI) Architecting, file 01 added

---

## SECTION 2: Index Files
_Skipped for now. Return after Sections 3 & 4._

---

## SECTION 3: Structural Decisions

### 3.1 — Section renames ✅ CONFIRMED
| Current                   | Renamed To                    |
| ------------------------- | ----------------------------- |
| Faith Fire and Family     | History                       |
| End Purpose               | Essays                        |
| Knowledge Framework       | Project Epistemology Thinking |
| Thesis/                   | The Research Thesis           |
| Systems (AI) Architecting | Systems & AI                  |
| Root 00–10                | See 3.2                       |
| Lexicon                   | Lexicon (unchanged)           |

- [x] **3.1b** — Rename folders in Obsidian to match confirmed names
- [ ] **3.1c** — Update `permalink` frontmatter in each folder's index.md
- [ ] **3.1d** — Audit and update all internal links that use old folder names

---

### 3.2 — Root Thesis series (00–10): break down or keep?
_Decision pending: these 10 files are a popular-audience adaptation of the dissertation._
_Options: (a) move into a named subfolder as a series, or (b) pick the strongest 3–4 topics, rewrite as standalone essays in Zeeshan's voice, archive the rest._

- [x] **3.2a** — Decide: series subfolder vs. essay selection
- [x] **3.2b** — If series: move into `Prosperity Series/` subfolder, add series frontmatter
- [x] **3.2c** — If essays: identify the 3–4 strongest topics (great-deception and money-illusion are candidates), rewrite in voice, rest to archive
- [ ] **3.2d** — Rewrite `00-read-me.md` intro regardless — generic AI voice, needs replacing

---

### 3.3 — One Vault (Project Alternative Finance): separate from blog ✅ DIRECTION CLEAR
- [ ] **3.3a** — Keep `01-core-proposition.md` as a public-facing essay, rewrite it argument-led
- [ ] **3.3b** — Move remaining 12 spec docs to `02 Documents/One Vault/` (internal only)
- [ ] **3.3c** — Update `One Vault/index.md` to reflect what remains

---

### 3.4 — Cross-site reading navigation
- [ ] **3.4a** — Update homepage `index.md`: add About link, add History (FFF) link, add a "start here" path. Each link in 04\ Blog\ Content/index.md to lead to the exact section of the @04\ Blog\ Content/about.md page and not lead outside. the about.md can have external links if needed, but the index.md page must have internal links to relevant sections and are projects. like knowledge framework are projects. ask me if you need more clarity
- [ ] **3.4b** — Add `→ Next:` footer links to History chapters

---

## SECTION 4: Content ✅ / IN PROGRESS

### 4.1 — About page ✅ COMPLETE
File: `04 Blog Content/about.md`

Full profile: recruiter/ATS framing, professional summary with competencies + sectors + tools, full career timeline (S4G → Hackney rewritten from Medium article → MullenLowe → Grabox → DDB → TBWA → Advisors 360° → CBS), education with context, certifications, awards, community, current projects, "How I work" section (strengths direct, growth areas honest without naming weaknesses).

Prosperity Series frontmatter updated: all three files (10/11/12) now have permalink, description, series tag, seriesOrder, status: needs-revision, draft: true.

- [x] **4.1f** — About linked from homepage with anchor links
- [x] **4.1g** — Review Hackney section: confirm three-blockers framing is accurate

### 4.3 — Homepage ✅ REWRITTEN
`index.md` is now a crisp front-facing page with:
- One-line positioning statement
- Every section linked with anchor links into `about.md`
- External links: LinkedIn, Cal.com, UCL, agency names
- All content sections linked: Thesis, Prosperity Series, History, Essays, Framework, Systems & AI
- Projects and awards with anchor links to full detail in about.md
- Keywords and description frontmatter updated for ATS/SEO

Note on anchor links: relies on auto-generated heading anchors from Markdown renderer.
Format used: `about.md#heading-text-kebab-case` — verify these resolve in your Quartz/Hugo setup.

- [ ] **4.3** — Replace all calendlys link with emdeded modal link from cal.com (https://cal.com/zeeshanpatel/30min)

---

### 4.2 — Rewrite `00-read-me.md`
- [ ] Rewrite in ~200 words, Zeeshan's voice, cut "groundbreaking" / "revolutionary"

---

### 4.3 — Homepage update
- [ ] Add History (Faith Fire and Family) as featured link
- [ ] Add About page link
- [ ] Add a "start here" path for first-time visitors

---

## SECTION 5: Voice & Quality Pass

- [ ] **5.1** — `01-great-deception.md` — remove Matrix analogy, tighten opening
- [ ] **5.2** — Remaining root series (02–10) — one per session
- [ ] **5.3** — `Essays/08-epistemology.md` — split or cut "Solution to Everything" section
- [ ] **5.4** — `Essays/01-how-to-trade.md` — clean up or move to drafts
- [ ] **5.5** — `History/01-origins.md` — add closing beat, bridge to next chapter

---

## SECTION 6: Housekeeping

- [ ] **6.1** — Standardise `status` frontmatter across all files
- [ ] **6.2** — Confirm `/content` folder at vault root is duplicate, delete it
- [ ] **6.3** — Move One Vault spec docs to `02 Documents/One Vault/`

---

## Suggested Order — Next Sessions

1. **Now** → Review `about.md`, fill any gaps (4.1g)
2. **Next** → 3.1b–d: rename folders + fix links
3. **Then** → 3.2a: decide on root series approach
4. **Then** → 4.3: update homepage
5. **Then** → 3.3a–b: One Vault separation
6. **Rolling** → Section 5 voice passes, one article per session
7. **Later** → Section 2 index files, Section 6 housekeeping
