import karthikReview from "@/assets/volunteers/karthik-review.png.asset.json";
import karthikVerified from "@/assets/volunteers/karthik-verified.png.asset.json";
import nandhini from "@/assets/volunteers/nandhini.png.asset.json";
import aravind from "@/assets/volunteers/aravind.png.asset.json";
import keerthana from "@/assets/volunteers/keerthana.png.asset.json";
import vignesh from "@/assets/volunteers/vignesh.png.asset.json";
import sanjai from "@/assets/volunteers/sanjai-r.png.asset.json";
import avKarthik from "@/assets/volunteers/avatar-karthik.jpg";
import avNandhini from "@/assets/volunteers/avatar-nandhini.jpg";
import avAravind from "@/assets/volunteers/avatar-aravind.jpg";
import avKeerthana from "@/assets/volunteers/avatar-keerthana.jpg";
import avVignesh from "@/assets/volunteers/avatar-vignesh.jpg";
import palm from "@/assets/volunteers/palm-seeds-thumbnail.png.asset.json";
import beach from "@/assets/volunteers/beach-cleanup-thumbnail.png.asset.json";

export type WorkStatus = "Student" | "Employee";
export type Activity = { name: string; date: string; location: string; status: "Completed" | "Upcoming"; image: string };
export type Volunteer = {
  id: string;
  name: string;
  status: WorkStatus;
  location: string;
  avatar: string;
  photo: string;
  verifiedPhoto: string;
  pending: boolean;
  volunteered: boolean;
  top?: boolean;
  activities: number;
  events: number;
  hours: number;
  tier: string;
  email: string;
  phone: string;
  dob: string;
  submitted: string;
  availability: string;
  org: string;
  joined: string;
  about: string;
  motivation: string;
  voiceNote: { duration: number; src?: string };
  idDoc: { type: string; size: string };
  recent: Activity[];
};

const palmAct: Activity = { name: "Palm Seeds Plantation", date: "Nov 02, 2026", location: "Chennai", status: "Completed", image: palm.url };
const beachAct: Activity = { name: "Beach Cleanup", date: "Oct 15, 2026", location: "Marina, Chennai", status: "Completed", image: beach.url };

const base = {
  submitted: "Nov 02, 2026",
  availability: "Weekends",
  joined: "Oct 10, 2025",
  idDoc: { type: "Aadhaar Card", size: "1.2 MB" },
  voiceNote: { duration: 134 },
  tier: "Tier 1 Volunteer",
  motivation:
    "I'm passionate about creating positive impact in the community, especially through environmental and educational initiatives. I would love to contribute to Maatram's meaningful volunteering programs.",
  about: "Active and dedicated volunteer with a passion for environmental initiatives and community service.",
  recent: [palmAct, beachAct],
};

export const volunteers: Volunteer[] = [
  { ...base, id: "VOL0833", name: "Sanjai R", status: "Student", location: "Chennai, Tamil Nadu", avatar: sanjai.url, photo: sanjai.url, verifiedPhoto: sanjai.url, pending: false, volunteered: true, top: true, activities: 12, events: 6, hours: 48, email: "sanjair@email.com", phone: "+91 98410 66789", dob: "Feb 11, 2005", org: "Maatram College, Chennai" },
  { ...base, id: "VOL0834", name: "Karthik M", status: "Employee", location: "Chennai, Tamil Nadu", avatar: avKarthik, photo: karthikReview.url, verifiedPhoto: karthikVerified.url, pending: true, volunteered: true, top: true, activities: 12, events: 6, hours: 48, email: "karthikm@email.com", phone: "+91 98765 43210", dob: "Apr 14, 2004", org: "Infosys, Chennai" },
  { ...base, id: "VOL0835", name: "Nandhini S", status: "Student", location: "Chennai, Tamil Nadu", avatar: avNandhini, photo: nandhini.url, verifiedPhoto: nandhini.url, pending: true, volunteered: true, activities: 8, events: 4, hours: 30, email: "nandhinis@email.com", phone: "+91 98840 12345", dob: "Jun 21, 2005", org: "Maatram College, Chennai" },
  { ...base, id: "VOL0836", name: "Aravind K", status: "Employee", location: "Chennai, Tamil Nadu", avatar: avAravind, photo: aravind.url, verifiedPhoto: aravind.url, pending: true, volunteered: false, activities: 0, events: 0, hours: 0, email: "aravindk@email.com", phone: "+91 90031 55678", dob: "Jan 09, 2001", org: "TCS, Chennai", recent: [] },
  { ...base, id: "VOL0837", name: "Keerthana R", status: "Student", location: "Coimbatore, Tamil Nadu", avatar: avKeerthana, photo: keerthana.url, verifiedPhoto: keerthana.url, pending: true, volunteered: true, top: true, activities: 15, events: 7, hours: 56, email: "keerthanar@email.com", phone: "+91 94430 77812", dob: "Mar 03, 2005", org: "PSG College, Coimbatore" },
  { ...base, id: "VOL0838", name: "Vignesh P", status: "Employee", location: "Chennai, Tamil Nadu", avatar: avVignesh, photo: vignesh.url, verifiedPhoto: vignesh.url, pending: true, volunteered: true, activities: 9, events: 5, hours: 36, email: "vigneshp@email.com", phone: "+91 97910 22334", dob: "Sep 17, 2000", org: "Zoho, Chennai" },
];

export const volunteerCounts = { verification: 18, all: 4500, active: 286, volunteered: 3240, nonVolunteered: 980, top: 120 };

export const getVolunteer = (id: string) => volunteers.find((v) => v.id === id);

export const formatDuration = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function matchesSearch(v: Volunteer, q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return true;
  return [v.name, v.email, v.location, v.id, v.status].some((x) => x.toLowerCase().includes(t));
}
