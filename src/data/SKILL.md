# Portfolio Data Layer Guide (SKILL.md)

Located in `src/data/portfolioData.ts`, this file serves as the **single source of truth** for all personal information, projects, skills, education, and credentials.

---

## 📊 Data Structures

1. **`personal`**:
   - `name`, `initials`, `badge`, `headline`, `bio`, `location`, `coordinates`, `email`, `phone`, `linkedin`, `github`, `quote`.

2. **`projects`**:
   - Array of `ProjectItem`:
     - `id`: unique identifier
     - `number`: "01", "02", etc.
     - `title`: Project title
     - `category`: Sub-heading category
     - `year`: Year built
     - `description`: Overview summary
     - `bullets`: Array of technical bullets
     - `tags`: Array of tech stack tags
     - `github`: Repository URL
     - `gradient`: Card ambient gradient

3. **`skillsData`**:
   - Array of `SkillCategory` (Languages & Data, ML & Deep Learning, GenAI & Cloud).

4. **`education` & `certifications`**:
   - Academic history, GPA, relevant coursework, and certified industry specializations.

5. **`services`**:
   - Capabilities and engineering services offered.

---

## ✏️ How to Update Your Information

To update any content on your portfolio:
1. Open `src/data/portfolioData.ts`.
2. Edit the desired fields (e.g. modify project links, add new skills, update coursework).
3. Save the file. Next.js Fast Refresh will update the live site instantly!
