# Components Documentation & Architecture (SKILL.md)

Located in `src/components/`, these modular React components power the Bento Grid and interactive visual effects.

---

## 🧩 Component Directory & Roles

| Component | File | Description |
| :--- | :--- | :--- |
| **IntroOverlay** | `IntroOverlay.tsx` | Fullscreen intro animation cycling keywords with 600ms fade-out and click-to-skip. |
| **StarfieldCanvas**| `StarfieldCanvas.tsx`| Lightweight HTML5 Canvas particle system with smooth vertical drift and twinkling emerald stars. |
| **Navbar** | `Navbar.tsx` | Floating glassmorphic top navigation bar with active section highlight & mobile menu drawer. |
| **SocialSidebar** | `SocialSidebar.tsx` | Fixed left sidebar with hover tooltips for GitHub, LinkedIn, Email, and Phone. |
| **HeroBento** | `HeroBento.tsx` | 12-column Bento Grid featuring Name & Status, Visual Portrait, Craft, Mindset, Quote, and Coordinates. |
| **ProjectsSection**| `ProjectsSection.tsx`| 3-column project showcase grid with category numbers, tag badges, and detail modal preview. |
| **SkillsSection** | `SkillsSection.tsx` | 3-column categorized skills grid with custom icon badges. |
| **EducationSection**| `EducationSection.tsx`| Dual-column layout for Education (UCSD/Skyline) + Certifications (DeepLearning.AI/Google Cloud). |
| **ServicesSection**| `ServicesSection.tsx`| 4-card grid detailing AI/ML capabilities. |
| **ContactSection** | `ContactSection.tsx` | Get-in-touch CTA with one-click email trigger and copy-to-clipboard functionality. |
| **Footer** | `Footer.tsx` | Clean copyright and credits footer. |

---

## 💡 How to Customize Components

- **Change Intro Text**: Edit `introWords` in `src/data/portfolioData.ts`.
- **Change Bento Layout**: Adjust Tailwind grid span classes (`col-span-4`, `row-span-1`) in `HeroBento.tsx`.
- **Add New Project**: Add an object into `projects` array in `src/data/portfolioData.ts` — the grid updates automatically.
