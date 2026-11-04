<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Maatram UI styling lives in src/styles/*.css (supplied design-system tokens/components/dashboard + screens.css) imported from src/styles.css; reuse those classes and src/components/mq.tsx rather than ad hoc styles — why: the brief requires fidelity to the supplied design system.
- All app data is frontend mock data in src/data/mock.ts; no backend — why: the brief is frontend-only.
- Additional screens use scoped ma-* classes in src/styles/additional.css and shared controls in additional-shared.tsx — why: the original nine screens must retain their appearance.
- Impact Arena uses its own scoped ma-impact styles and centralized frontend mock leaderboard data — why: reference-specific presentation must not change other screens.
- MaatramState wraps the root outlet and holds session-only registration, attendance, chat and fund-request state — why: connected screens must reflect local changes without persistence or backend dependencies.
- Admin Side lives under /admin (src/routes/admin._.tsx) with scoped ad-_ styles in src/styles/admin.css, shared pieces in src/components/admin/, mock data in src/data/admin-mock.ts, and session-only AdminState provided by the /admin layout — why: keeps admin separate from the student screens while sharing one app.
- Admin Volunteer section lives at /admin/volunteers (index with ?tab, review/$id, $id profile) using scoped vl-* styles in src/styles/volunteers.css, components in src/components/admin/volunteers.tsx and data in src/data/volunteers-mock.ts — why: matches the volunteer reference screens without affecting other admin pages.
