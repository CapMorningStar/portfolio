# App Router & Styling Guide (SKILL.md)

Located in `src/app/`, these files manage the Next.js App Router, global styles, and page composition.

---

## 📄 Files

1. **`layout.tsx`**:
   - Sets the global HTML structure, `<title>`, `<meta>` tags, and OpenGraph metadata.
   - Enforces dark mode (`className="dark"`).

2. **`page.tsx`**:
   - Main entry point for the landing page.
   - Organizes all section components in logical sequence:
     - `IntroOverlay` -> `StarfieldCanvas` -> `Navbar` -> `SocialSidebar` -> `HeroBento` -> `ProjectsSection` -> `SkillsSection` -> `EducationSection` -> `ServicesSection` -> `ContactSection` -> `Footer`.

3. **`globals.css`**:
   - Tailwind CSS base directives (`@tailwind base; components; utilities;`).
   - Custom emerald selection highlight (`::selection`).
   - Dark theme scrollbar styling.
