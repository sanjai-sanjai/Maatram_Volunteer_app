# Maatram Volunteer Quest – Frontend Build Plan

## Important note on framework
This project runs on TanStack Start (React 19 + TypeScript + Vite + Tailwind v4), not Next.js. Lovable cannot run Next.js. Everything else in the brief is kept: App-Router-style file routes, React components, TypeScript, Tailwind, CSS tokens, Lucide icons, mock data, local state, no backend. The design system's CSS and Dashboard component will be ported directly.

## Assets (from the ZIP, used as-is)
Logo, corner waves (TL/TR), bottom waves (L/R), foundation footer composites, yellow swoosh and emphasis strokes, volunteer hero scene, verification ID badge, success checkmark, envelope success, ID/QR card photo, 4 icon badges, dashboard hero, student avatar, palm seeds photo. Uploaded to CDN as asset pointers (folder structure brand/decorations/illustrations/icons/photos/dashboard/composites preserved). Reference screenshots used only for comparison, never rendered.

Missing items will be listed at the end (e.g. a separate standalone volunteer-group illustration for the welcome screen, if the hero scene does not cover it; trophy illustration on dashboard — will use the closest supplied asset or a Lucide icon and flag it).

## Routes
```text
/              -> Splash (auto -> /welcome after ~2.5s)
/welcome       -> Role selection
/login         -> QR scanner (Student/Alumni)
/verification  -> 4-step simulated verification -> /verified
/verified      -> Login successful profile -> /dashboard
/register/basic, /register/volunteer, /register/submitted
/admin         -> mock admin access placeholder
/dashboard     -> Student home (+ explore, community, impact, profile, opportunities as light placeholder views)
```

## Components
common: Logo, PrimaryButton, BackButton, ProgressStepper, HighlightedHeading, MobileShell (centered phone-width frame on desktop, safe-area padding), decorative corners/waves.
registration: ProfileUpload (local preview), FormField (icons, password toggle), FileUpload (filename), VoiceRecorder (simulated timer).
scanner: ScannerFrame (yellow corners, animated scan line, flash toggle, gallery file picker, tap-to-scan).
verification: VerificationTimeline (sequential steps, segmented ring).
dashboard: Header (sidebar sheet + notifications panel), StudentWelcome, HeroBanner, StatsCard, OpportunityCard (details modal), ActiveVolunteeringCard, ProgressCard (72% ring), BottomNavigation (fixed, yellow active).

## Data
Centralized `src/data/` mockStudent, mockOpportunities, mockDashboard with the exact values from the brief. Registration form state kept in a small client store across steps 1–2.

## Design system
Port tokens.css / components.css / dashboard.css values into src/styles.css tokens (yellow, golden, cream, near-black, navy, green, red, grey). Load the font declared in the package (closest Google Font if not bundled) via a link tag. Per-route head titles/descriptions.

## Quality pass
After building, render each of the 9 screens in a headless browser at the reference's mobile width, compare side by side with each screenshot, and fix spacing, sizing, typography and decoration placement; then check 390px no-overflow, desktop centering, all navigation flows and console errors.
