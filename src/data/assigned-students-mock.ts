export type StudentStatus =
  | "Assigned"
  | "Visit Scheduled"
  | "In Progress"
  | "Submitted"
  | "Revisit Required";

export interface Candidate {
  id: string;
  applicationNo: string;
  name: string;
  gender: "Male" | "Female";
  age: number;
  school: string;
  twelfthScore: string;
  percentage: string;
  desiredCourse: string;
  firstGraduate: boolean;
  phone: string;
  parentName: string;
  parentPhone: string;
  parentOccupation: string;
  annualIncome: string;
  rationCardType: string;
  location: string;
  address: string;
  distanceKm: number;
  status: StudentStatus;
  dateLabel: string;
  dateValue: string;
  photoUrl: string;
  verifiedAt?: string | undefined;
  verifiedBy?: string | undefined;
  verifiedNotes?: string | undefined;
  proofPhotoUrl?: string | undefined;
}

export const initialAssignedCandidates: Candidate[] = [
  {
    id: "2026-000123",
    applicationNo: "2026-000123",
    name: "Priya S",
    gender: "Female",
    age: 17,
    school: "Govt Girls Higher Secondary School, Triplicane",
    twelfthScore: "542 / 600",
    percentage: "90.3%",
    desiredCourse: "B.Tech Computer Science & Engineering",
    firstGraduate: true,
    phone: "+91 98765 43210",
    parentName: "Senthil Kumar M (Father)",
    parentPhone: "+91 98765 43211",
    parentOccupation: "Auto Rickshaw Driver",
    annualIncome: "₹48,000 / year",
    rationCardType: "PHH (Priority Household)",
    location: "Chennai, Tamil Nadu",
    address: "No. 14, Kamarajar Street, Triplicane, Chennai, Tamil Nadu - 600005",
    distanceKm: 4.2,
    status: "Assigned",
    dateLabel: "Visit By",
    dateValue: "5 Jul 2026",
    photoUrl: "/assets/communities/student-priya-s.jpg",
  },
  {
    id: "2026-000124",
    applicationNo: "2026-000124",
    name: "Arun K",
    gender: "Male",
    age: 18,
    school: "Govt Model Boys HSS, Madurai South",
    twelfthScore: "518 / 600",
    percentage: "86.3%",
    desiredCourse: "B.E Mechanical Engineering",
    firstGraduate: true,
    phone: "+91 87654 32109",
    parentName: "Krishnan M (Father)",
    parentPhone: "+91 87654 32110",
    parentOccupation: "Daily-wage Construction Mason",
    annualIncome: "₹45,000 / year",
    rationCardType: "PHH (Priority Household)",
    location: "Madurai, Tamil Nadu",
    address: "Plot 8, South Veli Street, Madurai, Tamil Nadu - 625001",
    distanceKm: 6.8,
    status: "Visit Scheduled",
    dateLabel: "Visit Date",
    dateValue: "26 Jul 2026",
    photoUrl: "/assets/communities/student-arun-k.jpg",
  },
  {
    id: "2026-000125",
    applicationNo: "2026-000125",
    name: "Meena R",
    gender: "Female",
    age: 17,
    school: "Municipal HSS, Sulur Taluk",
    twelfthScore: "558 / 600",
    percentage: "93.0%",
    desiredCourse: "B.Tech Information Technology / Data Science",
    firstGraduate: true,
    phone: "+91 91234 56789",
    parentName: "Rani R (Mother - Single Parent)",
    parentPhone: "+91 91234 56780",
    parentOccupation: "Garment Piece-rate Tailor",
    annualIncome: "₹36,000 / year",
    rationCardType: "AAY (Antyodaya Anna Yojana)",
    location: "Coimbatore, Tamil Nadu",
    address: "No. 22, Old Post Office Road, Sulur, Coimbatore, Tamil Nadu - 641402",
    distanceKm: 7.8,
    status: "In Progress",
    dateLabel: "Last Updated",
    dateValue: "24 Jul 2026",
    photoUrl: "/assets/communities/student-meena-r.jpg",
  },
  {
    id: "2026-000126",
    applicationNo: "2026-000126",
    name: "Karthik V",
    gender: "Male",
    age: 18,
    school: "Govt HSS, Karamadai Rural",
    twelfthScore: "565 / 600",
    percentage: "94.1%",
    desiredCourse: "B.E Electronics & Communication Engineering",
    firstGraduate: true,
    phone: "+91 99887 76654",
    parentName: "Velu S (Father)",
    parentPhone: "+91 99887 76650",
    parentOccupation: "Handloom / Powerloom Weaver",
    annualIncome: "₹42,000 / year",
    rationCardType: "PHH (Priority Household)",
    location: "Salem, Tamil Nadu",
    address: "12/4B Karamadai Main Road, Salem, Tamil Nadu - 636001",
    distanceKm: 12.5,
    status: "Submitted",
    dateLabel: "Submitted On",
    dateValue: "23 Jul 2026",
    photoUrl: "/assets/communities/student-karthik-v.jpg",
    verifiedAt: "23 Jul 2026 · 11:30 AM",
    verifiedBy: "Sanjai R (You)",
    verifiedNotes:
      "Physical home visit completed. Inspected 10th & 12th original marksheets and school TC. Family income certificate authenticated. Mud tile roof single room house. Highly genuine and deserving candidate for 100% Maatram scholarship.",
  },
  {
    id: "2026-000127",
    applicationNo: "2026-000127",
    name: "Divya M",
    gender: "Female",
    age: 17,
    school: "Govt Model Girls HSS, Thiruverumbur",
    twelfthScore: "524 / 600",
    percentage: "87.3%",
    desiredCourse: "B.Sc Agriculture / Biotechnology Aspirant",
    firstGraduate: true,
    phone: "+91 90011 22334",
    parentName: "Murugan K (Father)",
    parentPhone: "+91 90011 22330",
    parentOccupation: "Seasonal Farm Laborer",
    annualIncome: "₹40,000 / year",
    rationCardType: "PHH (Priority Household)",
    location: "Trichy, Tamil Nadu",
    address: "3/77 Temple Street, Thiruverumbur, Trichy, Tamil Nadu - 620013",
    distanceKm: 8.9,
    status: "Revisit Required",
    dateLabel: "Visit Again",
    dateValue: "28 Jul 2026",
    photoUrl: "/assets/communities/student-divya-m.jpg",
  },
];
