# Remix of Remix of Remix of Remix of Remix of Maatram Volunteer Quest

PROJECT: MAATRAM VOLUNTEER QUEST

Complete Frontend Development – Pixel-Accurate Next.js Implementation

Act as a Senior Frontend Engineer, UI Implementation Specialist, and Design Systems Engineer with expertise in Next.js, React, TypeScript, responsive interfaces, and pixel-accurate UI reconstruction.

Your task is to transform the attached Maatram Foundation UI reference screenshots and the attached Maatram Next.js Design System ZIP into a fully functional, visually faithful frontend application.

This is NOT a UI redesign task.

This is NOT a task to create your own interpretation of the designs.

This is a design replication and frontend implementation task.

Your primary objective is to reproduce the provided nine UI screens as closely as technically possible, preserving their original visual identity, proportions, layout, typography, spacing, colors, illustrations, images, icons, backgrounds, borders, shadows, gradients, and component positioning.

The provided screenshots are the ultimate visual source of truth.

1. DEVELOPMENT SCOPE

Build ONLY the frontend.

Technology requirements:

Next.js with App Router.

React.

TypeScript.

Tailwind CSS where appropriate.

Lucide React for icons where matching icons are not already provided.

CSS custom properties for design tokens.

Reusable React components.

Local mock data.

Local state for frontend interactions.

Do NOT develop:

Backend APIs.

Database.

Firebase.

Supabase.

Authentication services.

Real QR verification.

Real file uploads to a server.

Real notification services.

Payment systems.

Any backend infrastructure.

Everything must work using frontend-only mock data and local state.

The application should run as a complete frontend prototype without requiring backend configuration.

2. DESIGN REFERENCES – STRICT REQUIREMENT

I am attaching:

The complete Maatram Next.js Design System ZIP.

Nine individual original UI screenshots.

You MUST inspect all attached references before implementation.

The ZIP contains:

Original reference screenshots.

Brand logo.

Transparent decorative assets.

Illustrations.

Extracted visual assets.

Design tokens.

Global CSS.

Component styling references.

Dashboard-specific assets.

Dashboard React component and stylesheet.

First, extract and inspect the ZIP.

Do not recreate an existing asset if the exact asset is already available inside the ZIP.

Do not replace original illustrations with generic stock images.

Do not replace the Maatram logo with text.

Do not approximate existing illustrations with CSS when the original image asset is available.

Use the original supplied assets wherever possible.

IMPORTANT:
The nine attached screenshots must be treated as nine separate design specifications. Do not merge screens, omit screens, or redesign them.

3. THE NINE UI SCREENS TO IMPLEMENT

Implement exactly these nine screens.

SCREEN 01 – SPLASH SCREEN

Reference: Maatram Volunteer Quest splash screen.

Visual requirements:

Maatram Foundation logo at the top.

Original white background.

Yellow and cream decorative corner elements.

Large Maatram Volunteer Quest heading.

Yellow highlighted title background.

Volunteer. Empower. Transform. tagline.

Original volunteer group illustration.

Three feature cards:

Find Opportunities.

Collaborate & Volunteer.

Earn Recognition.

Supporting text:
From Volunteer Identification to Volunteer Recognition.

Loading indicator and volunteering-space message.

Original foundation/building decorative background.

Yellow bottom wave.

Maintain the original image composition, typography, spacing, illustration positioning, and yellow visual identity.

The splash screen should automatically transition to the welcome screen after a short simulated loading period.

SCREEN 02 – WELCOME / ROLE SELECTION

Reference: Welcome to Maatram Volunteer Quest.

Visual requirements:

Original Maatram logo.

Welcome heading and highlighted Volunteer Quest text.

Supporting description.

Volunteer group illustration.

Continue as section.

Three primary role cards:

Maatram Student.

Alumni.

Admin.

Other Volunteer registration option.

Original icons and yellow/white card styling.

Decorative yellow bottom wave and corner artwork.

Interactions:

Student → QR scanner screen.

Alumni → QR scanner screen.

Admin → Show a frontend-only mock admin access screen or clear placeholder state.

Other Volunteer → Basic registration screen.

Do not invent additional roles or change the displayed labels.

SCREEN 03 – MAATRAM ID QR SCANNER

Reference: Scan Your Maatram ID.

Visual requirements:

Back navigation.

Maatram logo.

Main heading with yellow highlighted Maatram ID text.

Supporting instruction.

Large camera/scanner visual.

Original Maatram ID card image.

Yellow QR scanning frame and scanning-line effect.

Instruction pill: Align the QR code within the frame.

Flash control.

Scan from Gallery control.

Original decorative yellow waves.

Interactions:

Flash button toggles a mock flash state.

Scan from Gallery opens a local image selection dialog.

Simulate a QR scan after a user interaction.

Use predefined mock student data.

Provide a simulated scanning transition to the verification screen.

Do not implement actual QR verification or camera backend services.

SCREEN 04 – VERIFYING MAATRAM ID

Reference: Verifying Your Maatram ID.

Visual requirements:

Maatram logo.

Large circular verification illustration.

Original yellow segmented progress ring.

ID card and QR illustration.

Main heading with highlighted Maatram ID text.

Supporting description.

Vertical four-step verification timeline:

QR Code Scanned.

Fetching Your Details.

Verifying Profile.

Preparing Your Dashboard.

Yellow active indicators.

Grey inactive indicators.

Animated progress indicators.

Original foundation-building background and bottom waves.

Interactions:

Simulate each verification step sequentially.

Use local mock data.

Automatically navigate to the verified screen after successful simulated verification.

SCREEN 05 – LOGIN SUCCESS / VERIFIED STUDENT PROFILE

Reference: Login Successful.

Visual requirements:

Maatram logo.

Large green success checkmark.

Yellow decorative emphasis strokes.

Login Successful heading with yellow highlight.

Supporting verification message.

Large student profile card.

Student photograph.

Student name.

Maatram ID.

QR code graphic.

Student category.

College name.

Department.

Academic year.

Three-part information card:

Year.

Native Location.

College Location.

Continue to Dashboard button.

Original foundation illustration and yellow bottom wave.

Use mock student information matching the supplied screenshot.

The Continue to Dashboard button should navigate to the student dashboard.

SCREEN 06 – OTHER VOLUNTEER REGISTRATION: BASIC DETAILS

Reference: Other Volunteer Registration – Step 1.

Visual requirements:

Back button.

Maatram logo.

Registration title.

Yellow highlighted Volunteer text.

Supporting subtitle.

Three-step progress indicator.

Basic Details active state.

Main white registration card.

Yellow upper decorative border.

Original section heading and description.

Profile image placeholder with circular dashed border.

Camera/upload photo icon.

Form fields:

Full Name.

Mobile Number.

Email ID.

Create Password.

Confirm Password.

Original field icons.

Password visibility controls.

Yellow Continue button.

Original foundation-building footer and yellow decorative background.

Interactions:

All fields should be editable.

Password visibility toggle.

Profile image selection with local preview.

Basic frontend validation.

Continue moves to Step 2.

SCREEN 07 – OTHER VOLUNTEER REGISTRATION: VOLUNTEER DETAILS

Reference: Other Volunteer Registration – Step 2.

Visual requirements:

Same header, logo, registration title and progress indicator.

Step 2 active.

Know You Better section.

Working Status selection:

Student.

Employee.

Business.

Other.

Location dropdown.

Availability selection:

Weekdays.

Weekends.

Both.

Personal ID Card upload area.

Supported file formats text.

Why do you want to volunteer with Maatram?

Type Your Response option.

Record a Voice Note option.

Textarea with character counter.

Create Account button.

Same original registration card and background styling.

Interactions:

Working status buttons should be selectable.

Availability buttons should be selectable.

Location dropdown should work with mock options.

ID upload should show the selected filename.

Textarea should have a live character counter.

Voice Note should show a simulated recording state.

Create Account should display the submission confirmation screen.

SCREEN 08 – REGISTRATION SUBMITTED / CONFIRMATION

Reference: Your Details Have Been Sent.

Visual requirements:

Maatram Foundation logo.

Large envelope illustration.

Green success checkmark.

Yellow decorative strokes.

Heading: Your Details Have Been Sent!

Supporting confirmation text.

Three-stage progress illustration:

Details Sent.

Profile Verification.

Get Notified.

Notification information card.

Text: You'll be notified once your account is approved.

Back to Login yellow button.

Original foundation building and decorative yellow bottom wave.

Interaction:

Back to Login navigates to the welcome/role-selection screen.

SCREEN 09 – STUDENT HOME DASHBOARD

Reference: Maatram Foundation Volunteer Dashboard.

This screen requires particularly careful implementation.

Reproduce the complete dashboard screenshot, not just its general design.

Visual requirements:

HEADER:

Menu button on the left.

Centered original Maatram Foundation logo.

Notification button on the right with red notification indicator.

STUDENT GREETING:

Circular student photograph with yellow border.

Good morning, Sanjai! greeting.

Student · MT4507.

Sri Krishna College of Engineering and Technology.

HERO BANNER:

Original volunteer group hero artwork.

Text: Make an Impact with Maatram!

Supporting tagline: Volunteer · Lead · Create Change.

Preserve the original image composition.

STATISTICS CARD:
Four equally distributed sections:

12 Opportunities.

48 Volunteer Hours.

5 Volunteering Contributed.

127 Impact Points.

UPCOMING OPPORTUNITIES:

Yellow section indicator.

Upcoming Opportunities heading.

View All action.

11 New badge.

Palm Seeds Plantation opportunity card.

Original plantation photograph.

Chennai location.

November 02 date.

9:00 AM – 12:00 PM.

38 / 50 Volunteers Joined.

Yellow progress bar at 76%.

12 Slots Remaining!

Contribute button with arrow.

ACTIVE VOLUNTEERING:

Green section indicator.

Your Active Volunteering heading.

Green-tinted card.

Physical Verification title.

October 28.

Coimbatore.

Community Active badge.

Open Community button.

YOUR PROGRESS:

Yellow section indicator.

Your Progress heading.

Circular 72% progress ring.

Volunteer Goal.

Your Goal.

Complete 50 Volunteer Hours.

36 / 50 Hours.

Horizontal yellow progress bar.

Trophy illustration.

14 more hours to enter the Top 3!

BOTTOM NAVIGATION:
Five equally distributed navigation items:

Home.

Explore.

Community.

Impact.

Profile.

Home must have the yellow active background.

The bottom navigation must remain fixed to the bottom on mobile, with appropriate safe-area spacing.

Do not remove any section or change the order.

4. DESIGN SYSTEM – MUST FOLLOW

The attached design system ZIP is the primary source for design tokens and assets.

Preserve the existing Maatram visual language.

COLOR PALETTE:

Use the original screenshot colors and supplied design tokens.

Visual direction:

Primary: Bright Maatram yellow.

Secondary: Golden yellow.

Background: Clean white.

Supporting background: Warm cream.

Primary text: Near-black.

Secondary text: Dark navy.

Success: Green.

Error: Red.

Borders: Soft neutral grey.

Do not introduce:

Purple or violet themes.

Unnecessary blue gradients.

Random accent colors.

Generic SaaS dashboard styling.

Dark themes.

TYPOGRAPHY:

Match the screenshots.

Preserve:

Large bold headings.

Italic emphasis where shown.

Yellow highlighted heading words.

Strong section headings.

Clean readable supporting text.

Consistent font weights.

Original text hierarchy.

Use the font assets or font declarations available in the supplied package. If the package does not include the exact font, select the closest available match without changing the typography hierarchy.

COMPONENT STYLING:

Reproduce:

Rounded white cards.

Yellow gradient primary buttons.

Soft shadows.

Thin neutral borders.

Yellow emphasis strokes.

Cream information cards.

Circular icons.

Yellow active states.

Green success states.

Original decorative waves.

Do not randomly change border radius, spacing, shadows, or card proportions.

5. ASSET MANAGEMENT

Extract the attached ZIP and preserve its directory structure wherever practical.

Use original assets for:

Maatram Foundation logo.

Volunteer illustrations.

Building illustrations.

QR scanner visuals.

Verification graphics.

Success illustrations.

Yellow decorative waves.

Corner backgrounds.

Icons and badges.

Student profile photograph.

Dashboard hero image.

Opportunity images.

Use Next.js Image where appropriate.

Keep assets inside the public directory.

Example:

public/
assets/
brand/
decorations/
illustrations/
icons/
photos/
dashboard/

Do not generate replacement artwork if the matching source asset is already supplied.

If an asset is missing, use the closest available asset and clearly identify the missing item rather than inventing an unrelated replacement.

6. FRONTEND ARCHITECTURE

Create a clean, reusable Next.js structure.

Suggested structure:

app/
layout.tsx
page.tsx
splash/
page.tsx
welcome/
page.tsx
login/
page.tsx
verification/
page.tsx
verified/
page.tsx
register/
basic/
page.tsx
volunteer/
page.tsx
submitted/
page.tsx
dashboard/
page.tsx

components/
common/
Logo.tsx
PrimaryButton.tsx
BackButton.tsx
ProgressStepper.tsx
HighlightedHeading.tsx
registration/
ProfileUpload.tsx
FormField.tsx
FileUpload.tsx
VoiceRecorder.tsx
scanner/
ScannerFrame.tsx
verification/
VerificationTimeline.tsx
dashboard/
DashboardHeader.tsx
StudentWelcome.tsx
HeroBanner.tsx
StatsCard.tsx
OpportunityCard.tsx
ActiveVolunteeringCard.tsx
ProgressCard.tsx
BottomNavigation.tsx

data/
mockStudent.ts
mockOpportunities.ts
mockDashboard.ts

styles/
globals.css
design-system.css
dashboard.css

This is a suggested structure. Reuse existing structures from the supplied ZIP when suitable.

Do not duplicate components unnecessarily.

7. MOCK DATA

Create realistic frontend mock data.

Student:

Name: R. Sanjai
Maatram ID: MT4507
Category: Student
College: Sri Krishna College of Engineering and Technology
Department: Mechatronics Engineering
Academic Period: 2024–2028
Year: 3rd Year
Native Location: Dharmapuri
College Location: Coimbatore

Dashboard:

Opportunities: 12
Volunteer Hours: 48
Volunteering Contributed: 5
Impact Points: 127
Volunteer Goal: 50 Hours
Completed Hours: 36
Progress: 72%

Upcoming Opportunity:

Name: Palm Seeds Plantation
Location: Chennai
Date: Nov 02
Time: 9:00 AM – 12:00 PM
Joined: 38
Capacity: 50
Remaining Slots: 12

Active Volunteering:

Name: Physical Verification
Date: Oct 28
Location: Coimbatore
Status: Community Active

Keep all mock data centralized so it can be modified easily.

8. NAVIGATION AND FRONTEND INTERACTIONS

Implement a working frontend journey.

Required navigation:

Splash Screen
→ Welcome Screen

Welcome Screen:

Student → Scanner.

Alumni → Scanner.

Other Volunteer → Basic Registration.

Admin → Mock Admin Access.

Student Journey:

Welcome
→ Scanner
→ Verifying
→ Verified Student Profile
→ Student Dashboard.

Other Volunteer Journey:

Welcome
→ Basic Details
→ Volunteer Details
→ Registration Submitted
→ Back to Login.

Dashboard:

Menu button opens a mock sidebar.

Notification button opens a mock notification panel.

View All navigates to a mock opportunities listing.

Contribute opens an opportunity details view or modal.

Open Community opens a mock community view.

Bottom navigation switches between Home, Explore, Community, Impact and Profile.

All buttons should have functional frontend interactions.

Create lightweight placeholder views for secondary navigation destinations if necessary. Do not add them as additional primary reference screens or redesign the nine requested screens.

Use local state and mock data.

9. RESPONSIVE DESIGN

The supplied references are portrait mobile designs.

The primary target is a mobile viewport.

Pay particular attention to the original screenshot proportions.

The reference screenshots have a narrow portrait composition. Reproduce them accurately at their original aspect ratios and adapt responsively.

Requirements:

Mobile-first implementation.

No horizontal overflow.

Proper text wrapping.

Correct card widths.

Appropriate spacing.

Fixed bottom navigation on dashboard.

Safe-area support.

Responsive typography.

Images must preserve their aspect ratios.

On desktop, present the mobile-designed application in a centered, appropriately sized application layout rather than stretching the mobile UI across the entire desktop screen.

Do not distort illustrations, logos, profile images or banners.

10. PIXEL-ACCURACY QUALITY CONTROL

This section is extremely important.

Do not stop after generating a visually similar first draft.

For each of the nine screens:

Open the original screenshot.

Implement the screen.

Render the actual Next.js page.

Compare the rendered page with the corresponding reference.

Identify visual differences.

Correct spacing, alignment, image sizing, typography, colors, card dimensions and component positioning.

Render and compare again.

Pay special attention to:

Logo dimensions and placement.

Header spacing.

Heading position and font weight.

Yellow highlight shape.

Illustration sizing.

Card dimensions.

Horizontal and vertical spacing.

Button heights.

Border radii.

Shadows.

Background decorative artwork.

Bottom wave positioning.

Icon sizes.

Text alignment.

Dashboard section spacing.

Do not declare a screen complete just because its components are present.

The final implementation should be visually compared against the actual reference screenshots.

Do not use the entire reference screenshot as a background image or place a screenshot over the page to fake implementation.

Every screen must be built from genuine HTML, CSS, React components and the supplied individual assets.

The only use of complete screenshots should be for visual comparison and reference.

11. DEVELOPMENT EXECUTION RULES

Follow this order:

PHASE 1:
Inspect the ZIP, identify all available assets, review the design tokens and inspect all nine screenshots.

PHASE 2:
Set up the Next.js application and global design system.

PHASE 3:
Build the common components, logo, buttons, headings, cards and decorative backgrounds.

PHASE 4:
Implement all nine screens.

PHASE 5:
Implement navigation and mock interactions.

PHASE 6:
Compare the actual browser output with the nine reference screenshots and refine the visual differences.

PHASE 7:
Check responsiveness, interactions, image loading, console errors and route navigation.

Do not skip phases.

Do not stop after building the splash screen.

Do not provide only a design proposal or implementation plan.

Actually generate the complete working frontend.

12. FINAL ACCEPTANCE CRITERIA

The project is complete only when:

All nine screens are implemented.

All nine screens use the supplied visual references.

Original Maatram assets are reused.

The visual identity is consistent across every screen.

The screens are connected through working frontend navigation.

Registration fields and buttons work using mock state.

The QR scanning experience is simulated.

The dashboard reproduces every section of the reference.

Mobile layouts have no horizontal overflow.

No backend or database dependency exists.

No generic replacement design has been introduced.

The application runs successfully in Next.js.

MOST IMPORTANT FINAL INSTRUCTION:

I have already completed the UI design.

Your job is to translate my existing design into code, not to make design decisions on my behalf.

Treat every attached screenshot as a strict visual specification.

Preserve the Maatram Foundation branding and the original yellow, white, cream, black and navy design language.

Prioritize visual fidelity over creative interpretation.

Build all nine screens completely, using real frontend components and mock data only.

Start by inspecting the attached ZIP and nine screenshots, then proceed with implementation.

## Development

To run this project locally, you need Node.js and npm:

```sh
npm install
npm run dev
```
