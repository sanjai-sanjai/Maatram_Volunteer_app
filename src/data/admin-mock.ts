import palm from "@/assets/admin/palm-seeds-event-image.png";
import book from "@/assets/admin/book-donation-drive.jpg";
import beach from "@/assets/admin/beach-cleanup.jpg";
import meet from "@/assets/admin/maatram-annual-meet.jpg";
import rural from "@/assets/admin/rural-school-engagement.jpg";
import portrait01 from "@/assets/admin/volunteer-portrait-01.jpg";
import portrait02 from "@/assets/admin/volunteer-portrait-02.jpg";
import portrait03 from "@/assets/admin/volunteer-portrait-03.jpg";
import portrait04 from "@/assets/admin/volunteer-portrait-04.jpg";

export type EventStatus = "Ongoing" | "Upcoming" | "Completed" | "Live";
export type AdminEvent = {
  id: string;
  name: string;
  category: string;
  status: EventStatus;
  date: string;
  location: string;
  fullLocation: string;
  time: string;
  registered: number;
  needed: number;
  image: string;
  tags: string[];
};

export const adminStats = {
  activeEvents: 12,
  registered: 368,
  verified: 286,
  pending: 18,
  newEventsWeek: 3,
  newVolunteersWeek: 42,
};

export const pendingActions = [
  {
    id: "proofs",
    title: "Proofs to Verify",
    sub: "Palm Seeds Plantation",
    count: 8,
    icon: "image",
  },
  {
    id: "funds",
    title: "Fund Requests to Approve",
    sub: "3 requests • Total ₹4,250",
    count: 5,
    icon: "rupee",
  },
  {
    id: "attendance",
    title: "Attendance to Review",
    sub: "2 events",
    count: 3,
    icon: "attendance",
  },
  {
    id: "profiles",
    title: "Other Volunteer Profiles",
    sub: "Awaiting verification",
    count: 2,
    icon: "profile",
  },
] as const;

export const adminEvents: AdminEvent[] = [
  {
    id: "palm-seeds",
    name: "Palm Seeds Plantation",
    category: "School Visits",
    status: "Ongoing",
    date: "Nov 02, 2026",
    location: "Chennai, TN",
    fullLocation: "Chennai, Tamil Nadu",
    time: "9:00 AM – 12:00 PM",
    registered: 42,
    needed: 50,
    image: palm,
    tags: ["environment", "plantation"],
  },
  {
    id: "book-drive",
    name: "Book Donation Drive",
    category: "Community Service",
    status: "Upcoming",
    date: "Nov 10, 2026",
    location: "Coimbatore, TN",
    fullLocation: "Coimbatore, Tamil Nadu",
    time: "10:00 AM – 1:00 PM",
    registered: 0,
    needed: 100,
    image: book,
    tags: ["books", "education"],
  },
  {
    id: "beach-cleanup",
    name: "Beach Cleanup",
    category: "Environment",
    status: "Upcoming",
    date: "Nov 15, 2026",
    location: "Marina, Chennai",
    fullLocation: "Marina Beach, Chennai",
    time: "6:30 AM – 9:30 AM",
    registered: 0,
    needed: 75,
    image: beach,
    tags: ["environment", "beach"],
  },
  {
    id: "annual-meet",
    name: "Maatram Annual Meet",
    category: "Event Support",
    status: "Ongoing",
    date: "Oct 30 – Nov 01, 2026",
    location: "Chennai, TN",
    fullLocation: "Chennai, Tamil Nadu",
    time: "9:00 AM – 6:00 PM",
    registered: 128,
    needed: 150,
    image: meet,
    tags: ["meet", "support"],
  },
  {
    id: "rural-school",
    name: "Rural School Engagement",
    category: "School Visits",
    status: "Upcoming",
    date: "Nov 20, 2026",
    location: "Villupuram, TN",
    fullLocation: "Villupuram, Tamil Nadu",
    time: "9:30 AM – 3:00 PM",
    registered: 0,
    needed: 60,
    image: rural,
    tags: ["school", "mentoring"],
  },
  {
    id: "tree-census",
    name: "Campus Tree Census",
    category: "Environment",
    status: "Completed",
    date: "Oct 12, 2026",
    location: "Coimbatore, TN",
    fullLocation: "Coimbatore, Tamil Nadu",
    time: "8:00 AM – 11:00 AM",
    registered: 40,
    needed: 40,
    image: palm,
    tags: ["environment"],
  },
  {
    id: "mock-interviews",
    name: "Mock Interview Day",
    category: "Mock Interviews",
    status: "Completed",
    date: "Oct 05, 2026",
    location: "Madurai, TN",
    fullLocation: "Madurai, Tamil Nadu",
    time: "10:00 AM – 4:00 PM",
    registered: 25,
    needed: 25,
    image: rural,
    tags: ["interview"],
  },
  {
    id: "pv-salem",
    name: "Physical Verification – Salem",
    category: "Physical Verification",
    status: "Completed",
    date: "Sep 28, 2026",
    location: "Salem, TN",
    fullLocation: "Salem, Tamil Nadu",
    time: "10:00 AM – 4:00 PM",
    registered: 18,
    needed: 20,
    image: book,
    tags: ["verification"],
  },
];
export const broadcastCounts = { All: 12, Ongoing: 5, Upcoming: 4, Completed: 3 } as const;

export const eventTypes = [
  "School Visits",
  "Environment",
  "Community Service",
  "Event Support",
  "Physical Verification",
  "Mock Interviews",
];

export const audienceTiers = [
  { tier: 1, count: 300, label: "Best match – nearby, experienced and active." },
  { tier: 2, count: 1500, label: "Good match – relevant interest and available." },
  { tier: 3, count: 4500, label: "Wider reach – Maatram student community." },
] as const;
export const matchingInsights = { location: 86, experience: 72, availability: 68, relevance: 90 };
export function totalMatches() {
  return audienceTiers.reduce((s, t) => s + t.count, 0);
}
export function recipientsFor(tier: number) {
  return audienceTiers.find((t) => t.tier === tier)?.count ?? 0;
}
export function fillPercent(registered: number, needed: number) {
  return needed > 0 ? Math.round((registered / needed) * 100) : 0;
}

export type ScheduleItem = { time: string; label: string };
export type EventDraft = {
  type: string;
  name: string;
  location: string;
  volunteers: number;
  rawDescription: string;
  description: string;
  tags: string[];
  image: string | null;
  date: string;
  time: string;
  purpose: string;
  responsibilities: string;
  preparation: string;
  schedule: ScheduleItem[];
  contactName: string;
  contactRole: string;
  phone: string;
  email: string;
};
export const defaultDraft: EventDraft = {
  type: "School Visits",
  name: "Palm Seeds Plantation",
  location: "Chennai, Tamil Nadu",
  volunteers: 50,
  rawDescription: "",
  description:
    "A tree plantation drive to plant palm seeds and promote a cleaner, greener environment. Volunteers will work together to plant, water and protect the saplings at the school campus.",
  tags: ["Environment", "Student Engagement", "Sustainability"],
  image: palm,
  date: "Nov 02, 2026",
  time: "9:00 AM – 12:00 PM",
  purpose:
    "To create environmental awareness and contribute to green cover by planting palm seeds.",
  responsibilities:
    "• Participate in the plantation activity.\n• Coordinate with the event team.\n• Ensure proper care of planted seeds.",
  preparation:
    "• Wear comfortable clothes and shoes.\n• Carry a water bottle, cap and sunscreen.\n• Be available for the full duration of the event.",
  schedule: [
    { time: "09:00 AM", label: "Reporting & Briefing" },
    { time: "09:30 AM", label: "Plantation Activity" },
    { time: "11:30 AM", label: "Wrap-up & Group Photo" },
    { time: "12:00 PM", label: "Event Completion" },
  ],
  contactName: "Aravind K",
  contactRole: "Event Coordinator",
  phone: "+91 98765 43210",
  email: "aravind@maatram.org",
};

export type FieldErrors = Partial<
  Record<
    | "type"
    | "name"
    | "location"
    | "volunteers"
    | "description"
    | "image"
    | "purpose"
    | "responsibilities"
    | "preparation"
    | "schedule"
    | "contact",
    string
  >
>;
export function validateDetails(d: EventDraft) {
  const e: FieldErrors = {};
  if (!d.type) e.type = "Select an event type.";
  if (d.name.trim().length < 3) e.name = "Enter an event name (at least 3 characters).";
  if (!d.location.trim()) e.location = "Enter a location.";
  if (d.volunteers < 5 || d.volunteers > 50) e.volunteers = "Choose between 5 and 50 volunteers.";
  if (!d.description.trim()) e.description = "Add or generate an event description.";
  if (!d.image) e.image = "Upload an event image.";
  return e;
}
export function validateGuide(d: EventDraft) {
  const e: FieldErrors = {};
  if (!d.purpose.trim()) e.purpose = "Describe the purpose.";
  if (!d.responsibilities.trim()) e.responsibilities = "List volunteer responsibilities.";
  if (!d.preparation.trim()) e.preparation = "List preparation requirements.";
  if (!d.schedule.length || d.schedule.some((s) => !s.time.trim() || !s.label.trim()))
    e.schedule = "Complete every schedule row.";
  if (!d.contactName.trim()) e.contact = "Enter a contact name.";
  else if (!/^\+?[\d\s]{10,15}$/.test(d.phone)) e.contact = "Enter a valid phone number.";
  else if (!/^\S+@\S+\.\S+$/.test(d.email)) e.contact = "Enter a valid email.";
  return e;
}

/** Simulated "AI" rewrite: turns rough notes into a tidy description and tags (frontend only). */
export function simulateAiDescription(
  raw: string,
  d: Pick<EventDraft, "type" | "name" | "location">,
) {
  const text = raw.trim();
  const lower = (text + " " + d.name + " " + d.type).toLowerCase();
  const tags: string[] = [];
  if (/plant|tree|seed|green|clean|beach|environment/.test(lower)) tags.push("Environment");
  if (/school|student|college|mentor/.test(lower)) tags.push("Student Engagement");
  if (/plant|seed|tree|green|sustain/.test(lower)) tags.push("Sustainability");
  if (/book|teach|educat/.test(lower)) tags.push("Education");
  if (!tags.length) tags.push("Community", "Volunteering");
  const core = text
    ? text.charAt(0).toUpperCase() +
      text
        .slice(1)
        .replace(/\s+/g, " ")
        .replace(/[.\s]*$/, "") +
      "."
    : `${d.name} in ${d.location.split(",")[0]}.`;
  return {
    description:
      `${core} Volunteers will work together as a team, follow the event guide and make a lasting difference for the community.`.slice(
        0,
        500,
      ),
    tags: tags.slice(0, 3),
  };
}

// ===== Reports & Analytics (/admin/reports) =====
export const contributionMax = 1250;
export const contributionSeries = [
  { label: "Jul", value: 680 },
  { label: "Aug", value: 820 },
  { label: "Sep", value: 940 },
  { label: "Oct", value: 1080 },
  { label: "Nov", value: 1250 },
] as const;

export const reportMetrics = [
  { icon: "volunteers", value: "4,500", label: "Total Volunteers", delta: "+18%" },
  { icon: "calendar", value: "12", label: "Current Events", delta: "+3 this week" },
  { icon: "report", value: "42", label: "Events Completed", delta: "+12%" },
  { icon: "rupee", value: "₹5,600", label: "Funded Amount for Volunteers", delta: "+27%" },
] as const;

export const topContributors = [
  { rank: 1, name: "Arun K", meta: "SKCET • III Year", hours: 128, avatar: portrait01 },
  { rank: 2, name: "Priya S", meta: "PSG Tech • IV Year", hours: 112, avatar: portrait02 },
  { rank: 3, name: "Karthik M", meta: "Kumaraguru • III Year", hours: 108, avatar: portrait03 },
] as const;

export const topAlumni = [
  {
    rank: 1,
    name: "Vignesh R",
    meta: "Alumni • Batch 2024",
    eventsLed: 18,
    hours: 320,
    badge: "Alumni Champion",
    avatar: portrait04,
  },
  {
    rank: 2,
    name: "Harini V",
    meta: "Alumni • Batch 2023",
    eventsLed: 15,
    hours: 280,
    badge: "Community Leader",
    avatar: portrait02,
  },
  {
    rank: 3,
    name: "Adithya K",
    meta: "Alumni • Batch 2022",
    eventsLed: 12,
    hours: 240,
    badge: "Mentor of Impact",
    avatar: portrait03,
  },
] as const;

// ===== Report PDF (/admin/reports export) =====
export const monthlyContribution = [
  { label: "Jan", value: 420 },
  { label: "Feb", value: 480 },
  { label: "Mar", value: 560 },
  { label: "Apr", value: 510 },
  { label: "May", value: 640 },
  { label: "Jun", value: 720 },
  { label: "Jul", value: 680 },
  { label: "Aug", value: 820 },
  { label: "Sep", value: 940 },
  { label: "Oct", value: 1080 },
  { label: "Nov", value: 1250 },
] as const;
export const monthlyEvents = [14, 16, 18, 20, 22, 25, 27, 30, 34, 38, 42] as const;
export const monthlyFunded = [
  3200, 2800, 3600, 4100, 3900, 4400, 4700, 5100, 5200, 5400, 5600,
] as const;

export const contributionCategories = [
  { name: "Environment", share: 34, color: "#FFC900" },
  { name: "Education", share: 28, color: "#F5B900" },
  { name: "Community Service", share: 22, color: "#FFDF7E" },
  { name: "Event Support", share: 16, color: "#0B1B3D" },
] as const;

export const topContributors30 = [
  { rank: 1, name: "Arun K", college: "SKCET", year: "III Year", hours: 128 },
  { rank: 2, name: "Priya S", college: "PSG Tech", year: "IV Year", hours: 112 },
  { rank: 3, name: "Karthik M", college: "Kumaraguru", year: "III Year", hours: 108 },
  { rank: 4, name: "Divya R", college: "Anna University", year: "II Year", hours: 102 },
  { rank: 5, name: "Sanjay P", college: "VIT Vellore", year: "III Year", hours: 96 },
  { rank: 6, name: "Kavya M", college: "Amrita", year: "II Year", hours: 91 },
  { rank: 7, name: "Vikram S", college: "SRM", year: "IV Year", hours: 88 },
  { rank: 8, name: "Nithya B", college: "SSN", year: "III Year", hours: 84 },
  { rank: 9, name: "Hariharan T", college: "CIT", year: "II Year", hours: 80 },
  { rank: 10, name: "Meena L", college: "TCE", year: "I Year", hours: 76 },
  { rank: 11, name: "Gokul R", college: "SKCET", year: "IV Year", hours: 72 },
  { rank: 12, name: "Sneha D", college: "PSG Tech", year: "I Year", hours: 69 },
  { rank: 13, name: "Praveen K", college: "Kumaraguru", year: "IV Year", hours: 66 },
  { rank: 14, name: "Ashwini V", college: "Anna University", year: "III Year", hours: 63 },
  { rank: 15, name: "Rahul M", college: "VIT Vellore", year: "II Year", hours: 60 },
  { rank: 16, name: "Bhavana S", college: "Amrita", year: "III Year", hours: 57 },
  { rank: 17, name: "Dinesh A", college: "SRM", year: "III Year", hours: 54 },
  { rank: 18, name: "Keerthana P", college: "SSN", year: "II Year", hours: 51 },
  { rank: 19, name: "Surya N", college: "CIT", year: "IV Year", hours: 48 },
  { rank: 20, name: "Ramya G", college: "TCE", year: "III Year", hours: 46 },
  { rank: 21, name: "Ajith C", college: "SKCET", year: "II Year", hours: 44 },
  { rank: 22, name: "Lakshmi H", college: "PSG Tech", year: "III Year", hours: 41 },
  { rank: 23, name: "Mohan J", college: "Kumaraguru", year: "II Year", hours: 39 },
  { rank: 24, name: "Farhan Z", college: "Anna University", year: "IV Year", hours: 37 },
  { rank: 25, name: "Indira W", college: "VIT Vellore", year: "I Year", hours: 35 },
  { rank: 26, name: "Balaji Q", college: "Amrita", year: "IV Year", hours: 33 },
  { rank: 27, name: "Chitra O", college: "SRM", year: "II Year", hours: 31 },
  { rank: 28, name: "Naveen N", college: "SSN", year: "I Year", hours: 29 },
  { rank: 29, name: "Pavithra U", college: "CIT", year: "III Year", hours: 27 },
  { rank: 30, name: "Manoj Y", college: "TCE", year: "II Year", hours: 25 },
] as const;

export const inactiveStudents = [
  { name: "Vimal K", college: "SRM", last: "Aug 2026" },
  { name: "Deepika S", college: "TCE", last: "Jul 2026" },
  { name: "Aravind M", college: "CIT", last: "Jun 2026" },
  { name: "Swetha R", college: "SSN", last: "May 2026" },
  { name: "Prakash B", college: "Amrita", last: "Apr 2026" },
  { name: "Harish V", college: "VIT Vellore", last: "Mar 2026" },
  { name: "Janani T", college: "Anna University", last: "Feb 2026" },
  { name: "Suresh E", college: "SKCET", last: "Jan 2026" },
] as const;

export const collegeContribution = [
  { college: "TCE Madurai", volunteers: 12, hours: 214 },
  { college: "CIT Coimbatore", volunteers: 15, hours: 268 },
  { college: "SSN Chennai", volunteers: 16, hours: 292 },
  { college: "SRM Chennai", volunteers: 18, hours: 320 },
  { college: "Anna University", volunteers: 22, hours: 380 },
  { college: "Amrita", volunteers: 24, hours: 415 },
  { college: "VIT Vellore", volunteers: 26, hours: 448 },
  { college: "PSG Tech", volunteers: 28, hours: 492 },
  { college: "Kumaraguru", volunteers: 30, hours: 540 },
  { college: "SKCET", volunteers: 32, hours: 590 },
] as const;

export const alumniBoard = [
  {
    rank: 1,
    name: "Vignesh R",
    batch: "2024",
    eventsLed: 18,
    hours: 320,
    badge: "Alumni Champion",
  },
  {
    rank: 2,
    name: "Harini V",
    batch: "2023",
    eventsLed: 15,
    hours: 280,
    badge: "Community Leader",
  },
  {
    rank: 3,
    name: "Adithya K",
    batch: "2022",
    eventsLed: 12,
    hours: 240,
    badge: "Mentor of Impact",
  },
  { rank: 4, name: "Bharath S", batch: "2021", eventsLed: 11, hours: 210, badge: "Rising Mentor" },
  { rank: 5, name: "Divya Prabha", batch: "2020", eventsLed: 10, hours: 195, badge: "Event Star" },
  { rank: 6, name: "Karthik Raja", batch: "2019", eventsLed: 9, hours: 180, badge: "—" },
  { rank: 7, name: "Nandhini M", batch: "2018", eventsLed: 8, hours: 165, badge: "—" },
  { rank: 8, name: "Sathish K", batch: "2017", eventsLed: 7, hours: 150, badge: "—" },
  { rank: 9, name: "Ramya Krishnan", batch: "2016", eventsLed: 6, hours: 140, badge: "—" },
  { rank: 10, name: "Vimal Raj", batch: "2015", eventsLed: 5, hours: 120, badge: "—" },
] as const;
