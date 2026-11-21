export interface AdminCommunity {
  id: string;
  name: string;
  tagline: string;
  description: string;
  members: number;
  totalMembers?: number;
  activeVolunteers: number;
  recentActivity: string;
  unreadCount: number;
  category: string;
  logo: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventStatus: "Live" | "Upcoming" | "Completed";
  eventRadius: string;
}

export interface AttendanceRecord {
  id: string;
  studentName: string;
  maatramId: string;
  college: string;
  avatar: string;
  phone: string;
  status: "Marked" | "Not Marked";
  markedAt?: string;
  hoursContributed?: string;
  eventDate: string;
}

export interface ProofSubmission {
  id: string;
  studentName: string;
  maatramId: string;
  college: string;
  avatar: string;
  photoUrl: string;
  photoUrls?: string[];
  submittedAt: string;
  proofType: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  resubmissionEligible?: boolean;
  gps: {
    latitude: string;
    longitude: string;
    locationName: string;
    accuracy: string;
    distance: string;
    withinRadius: boolean;
    timestamp: string;
  };
  locationName?: string;
  coordinates?: string;
  timestamp?: string;
  activityNote?: string;
  studentNotes: string;
  adminInstructions: string;
}

export interface FundingRequest {
  id: string;
  studentName: string;
  maatramId: string;
  avatar: string;
  college: string;
  amount: number;
  purpose: string;
  description: string;
  receiptUrl: string;
  submittedAt: string;
  date?: string;
  category?: string;
  upiId?: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
}

export interface FeedbackItem {
  id: string;
  studentName: string;
  maatramId: string;
  avatar: string;
  college?: string;
  category: "Positive" | "Suggestions" | "Issues" | "Suggestion" | "Issue";
  rating: number;
  comment?: string;
  feedbackText: string;
  submittedAt: string;
  isReviewed: boolean;
  adminReplies: Array<{
    id: string;
    sender: string;
    role: string;
    text: string;
    time: string;
  }>;
}

export interface CommunityChatMessage {
  id: string;
  sender: string;
  role?: "Admin" | "Coordinator" | "Volunteer";
  avatar: string;
  time: string;
  text?: string;
  type: "text" | "poll" | "meeting" | "location" | "media" | "announcement" | "voice";
  pinned?: boolean;
  poll?: {
    question: string;
    options: Array<{ id: string; text: string; votes: number }>;
    multiple: boolean;
    totalVotes: number;
    userVoted?: string[];
  };
  meeting?: {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    meetUrl?: string;
  };
  location?: {
    title: string;
    address: string;
    coordinates: string;
  };
  media?: {
    url: string;
    caption: string;
    fileName: string;
    fileSize: string;
  };
  voice?: {
    audioUrl?: string;
    duration?: string;
  };
}

// -----------------------------------------------------------------------
// 1. Communities Dataset
// -----------------------------------------------------------------------
export const mockAdminCommunities: AdminCommunity[] = [
  {
    id: "sangamam",
    name: "Sangamam Community",
    tagline: "Together for a Better Tomorrow",
    description: "Flagship volunteer community mobilizing school awareness and on-site community service campaigns.",
    members: 50,
    activeVolunteers: 42,
    recentActivity: "Attendance open · Active 15m ago",
    unreadCount: 3,
    category: "School Visits",
    logo: "/assets/communities/logo-sangamam.jpeg",
    eventId: "palm-seeds",
    eventName: "Sangamam Volunteering Event",
    eventDate: "Nov 02, 2026",
    eventTime: "9:00 AM – 12:00 PM",
    eventLocation: "Madhavaram Botanical Garden, Chennai",
    eventStatus: "Live",
    eventRadius: "300 meters",
  },
  {
    id: "school-visits",
    name: "School Visits Taskforce",
    tagline: "Inspiring Rural Minds",
    description: "Visiting government schools to create higher education awareness and identify deserving rural scholars.",
    members: 45,
    activeVolunteers: 38,
    recentActivity: "Govt HSS Tiruvallur visit scheduled · 1h ago",
    unreadCount: 2,
    category: "School Visits",
    logo: "/assets/communities/logo-school-visits.jpg",
    eventId: "school-visit-01",
    eventName: "Govt School Outreach & Career Awareness Drive",
    eventDate: "Nov 04, 2026",
    eventTime: "9:30 AM – 1:30 PM",
    eventLocation: "Govt Model Girls HSS, Tiruvallur",
    eventStatus: "Upcoming",
    eventRadius: "200 meters",
  },
  {
    id: "admissions-support",
    name: "Admissions Support Desk",
    tagline: "Guiding Aspirations to Colleges",
    description: "Assisting scholarship qualifiers with college applications, seat allocations, document prep and hostel forms.",
    members: 36,
    activeVolunteers: 30,
    recentActivity: "Counseling camp helpdesk active · 2h ago",
    unreadCount: 5,
    category: "Admissions Support",
    logo: "/assets/communities/logo-admissions.jpeg",
    eventId: "admissions-camp",
    eventName: "Scholarship Admission Guidance Camp",
    eventDate: "Nov 06, 2026",
    eventTime: "9:00 AM – 3:00 PM",
    eventLocation: "Maatram Foundation Centre, Chennai",
    eventStatus: "Upcoming",
    eventRadius: "150 meters",
  },
  {
    id: "bgv",
    name: "BGV Verification Taskforce",
    tagline: "Authenticity & Integrity",
    description: "Conducting thorough physical background verifications and candidate home visits across Tamil Nadu.",
    members: 32,
    activeVolunteers: 28,
    recentActivity: "4 physical checks verified · 3h ago",
    unreadCount: 1,
    category: "BGV",
    logo: "/assets/communities/logo-bgv.jpeg",
    eventId: "bgv-drive",
    eventName: "Candidate Home & Background Verification Drive",
    eventDate: "Nov 08, 2026",
    eventTime: "8:30 AM – 5:00 PM",
    eventLocation: "Madurai & Dindigul Rural Blocks",
    eventStatus: "Upcoming",
    eventRadius: "500 meters",
  },
  {
    id: "mock-interviews",
    name: "Mock Interview Mentors",
    tagline: "Polishing Tomorrow's Professionals",
    description: "Alumni and corporate mentors giving technical, aptitude, and HR interview training to final-year scholars.",
    members: 40,
    activeVolunteers: 35,
    recentActivity: "Slot allocation sheet published · Yesterday",
    unreadCount: 0,
    category: "Mock Interviews",
    logo: "/assets/communities/logo-mock-interviews.jpg",
    eventId: "mock-interviews-01",
    eventName: "Final Year Placement Mock Interview Series",
    eventDate: "Nov 10, 2026",
    eventTime: "2:00 PM – 6:00 PM",
    eventLocation: "Virtual via Google Meet",
    eventStatus: "Upcoming",
    eventRadius: "Online / Verified",
  },
  {
    id: "panel-interviews",
    name: "Admission Panel Interviews Board",
    tagline: "Selecting Future Changemakers",
    description: "Senior advisory board and volunteer panel conducting live admissions selection rounds for aspiring scholars.",
    members: 24,
    activeVolunteers: 20,
    recentActivity: "Panel evaluation criteria finalized · 5h ago",
    unreadCount: 3,
    category: "Admission Panel Interviews",
    logo: "/assets/communities/logo-panel-interviews.jpeg",
    eventId: "panel-interviews-01",
    eventName: "Scholar Selection Panel Interview Rounds",
    eventDate: "Nov 14, 2026",
    eventTime: "9:00 AM – 4:30 PM",
    eventLocation: "Loyola College Auditorium, Chennai",
    eventStatus: "Upcoming",
    eventRadius: "250 meters",
  },
];

// -----------------------------------------------------------------------
// 2. Attendance Dataset (Total 50 volunteers for Palm Seeds: 42 Marked, 8 Not Marked)
// -----------------------------------------------------------------------
export const mockAttendanceRecords: Record<string, AttendanceRecord[]> = {
  "palm-seeds": [
    { id: "att-1", studentName: "R. Sanjai", maatramId: "MT4507", college: "PSG Tech, Coimbatore", avatar: "/assets/dashboard/student-avatar.jpg", phone: "+91 98401 22310", status: "Marked", markedAt: "09:12 AM", hoursContributed: "3h 25m", eventDate: "Nov 02, 2026" },
    { id: "att-2", studentName: "Kaviya S", maatramId: "MT4112", college: "CIT, Chennai", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98402 33421", status: "Marked", markedAt: "09:15 AM", hoursContributed: "3h 20m", eventDate: "Nov 02, 2026" },
    { id: "att-3", studentName: "Arun Kumar", maatramId: "MT3981", college: "Thiagarajar Engg, Madurai", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98403 44532", status: "Marked", markedAt: "09:18 AM", hoursContributed: "3h 15m", eventDate: "Nov 02, 2026" },
    { id: "att-4", studentName: "Priya Dharshini", maatramId: "MT4620", college: "GCT, Coimbatore", avatar: "/assets/admin/volunteer-portrait-03.jpg", phone: "+91 98404 55643", status: "Marked", markedAt: "09:22 AM", hoursContributed: "3h 10m", eventDate: "Nov 02, 2026" },
    { id: "att-5", studentName: "Vigneshwaran P", maatramId: "MT4733", college: "Anna Univ CEG, Chennai", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98405 66754", status: "Marked", markedAt: "09:25 AM", hoursContributed: "3h 05m", eventDate: "Nov 02, 2026" },
    { id: "att-6", studentName: "Deepak Raj", maatramId: "MT4419", college: "Kongu Engg, Erode", avatar: "/assets/dashboard/student-avatar.jpg", phone: "+91 98406 77865", status: "Marked", markedAt: "09:28 AM", hoursContributed: "3h 00m", eventDate: "Nov 02, 2026" },
    { id: "att-7", studentName: "Ananya Swaminathan", maatramId: "MT4582", college: "Loyola College, Chennai", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98407 88976", status: "Marked", markedAt: "09:30 AM", hoursContributed: "2h 58m", eventDate: "Nov 02, 2026" },
    { id: "att-8", studentName: "Karthikeyan B", maatramId: "MT4302", college: "Sona Tech, Salem", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98408 99087", status: "Marked", markedAt: "09:32 AM", hoursContributed: "2h 55m", eventDate: "Nov 02, 2026" },
    { id: "att-9", studentName: "Sneha Ramachandran", maatramId: "MT4821", college: "Stella Maris, Chennai", avatar: "/assets/admin/volunteer-portrait-03.jpg", phone: "+91 98409 11298", status: "Marked", markedAt: "09:35 AM", hoursContributed: "2h 50m", eventDate: "Nov 02, 2026" },
    { id: "att-10", studentName: "Manojkumar T", maatramId: "MT4215", college: "Kumaraguru Tech, CBE", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98410 22309", status: "Marked", markedAt: "09:36 AM", hoursContributed: "2h 48m", eventDate: "Nov 02, 2026" },
    { id: "att-11", studentName: "Divya Bharathi", maatramId: "MT4698", college: "Bannari Amman Inst, Erode", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98411 33410", status: "Marked", markedAt: "09:38 AM", hoursContributed: "2h 45m", eventDate: "Nov 02, 2026" },
    { id: "att-12", studentName: "Hariharan S", maatramId: "MT4350", college: "Madras Institute of Tech", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98412 44521", status: "Marked", markedAt: "09:40 AM", hoursContributed: "2h 42m", eventDate: "Nov 02, 2026" },
    { id: "att-13", studentName: "Gayathri R", maatramId: "MT4771", college: "Mepco Schlenk, Sivakasi", avatar: "/assets/admin/volunteer-portrait-03.jpg", phone: "+91 98413 55632", status: "Marked", markedAt: "09:42 AM", hoursContributed: "2h 40m", eventDate: "Nov 02, 2026" },
    { id: "att-14", studentName: "Santhosh Kumar", maatramId: "MT4190", college: "Sri Krishna Tech, CBE", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98414 66743", status: "Marked", markedAt: "09:45 AM", hoursContributed: "2h 38m", eventDate: "Nov 02, 2026" },
    { id: "att-15", studentName: "Keerthana M", maatramId: "MT4855", college: "Government Arts, Salem", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98415 77854", status: "Marked", markedAt: "09:48 AM", hoursContributed: "2h 35m", eventDate: "Nov 02, 2026" },
    { id: "att-16", studentName: "Gokulnath V", maatramId: "MT4288", college: "St. Joseph's Engg, Chennai", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98416 88965", status: "Marked", markedAt: "09:50 AM", hoursContributed: "2h 32m", eventDate: "Nov 02, 2026" },
    { id: "att-17", studentName: "Pavithra K", maatramId: "MT4612", college: "Alagappa Univ, Karaikudi", avatar: "/assets/admin/volunteer-portrait-03.jpg", phone: "+91 98417 99076", status: "Marked", markedAt: "09:52 AM", hoursContributed: "2h 30m", eventDate: "Nov 02, 2026" },
    { id: "att-18", studentName: "Naveen Prasath", maatramId: "MT4334", college: "National Engg, Kovilpatti", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98418 11287", status: "Marked", markedAt: "09:55 AM", hoursContributed: "2h 25m", eventDate: "Nov 02, 2026" },
    { id: "att-19", studentName: "Abinaya C", maatramId: "MT4742", college: "Govt Women's College, Kumbakonam", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98419 22398", status: "Marked", markedAt: "09:58 AM", hoursContributed: "2h 20m", eventDate: "Nov 02, 2026" },
    { id: "att-20", studentName: "Dinesh Babu", maatramId: "MT4167", college: "Vellore Institute of Tech", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98420 33409", status: "Marked", markedAt: "10:00 AM", hoursContributed: "2h 15m", eventDate: "Nov 02, 2026" },
    { id: "att-21", studentName: "Saravanan G", maatramId: "MT4890", college: "Annamalai Univ, Chidambaram", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98421 44510", status: "Marked", markedAt: "10:02 AM", hoursContributed: "2h 12m", eventDate: "Nov 02, 2026" },
    { id: "att-22", studentName: "Meenakshi Sundaram", maatramId: "MT4523", college: "Madurai Kamaraj Univ", avatar: "/assets/admin/volunteer-portrait-03.jpg", phone: "+91 98422 55621", status: "Marked", markedAt: "10:05 AM", hoursContributed: "2h 10m", eventDate: "Nov 02, 2026" },
    { id: "att-23", studentName: "Ranjith K", maatramId: "MT4230", college: "Hindusthan Tech, CBE", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98423 66732", status: "Marked", markedAt: "10:07 AM", hoursContributed: "2h 05m", eventDate: "Nov 02, 2026" },
    { id: "att-24", studentName: "Subhashini V", maatramId: "MT4665", college: "PSG College of Arts & Sci", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98424 77843", status: "Marked", markedAt: "10:10 AM", hoursContributed: "2h 02m", eventDate: "Nov 02, 2026" },
    { id: "att-25", studentName: "Aravindh Raja", maatramId: "MT4388", college: "Kalasalingam Univ, Srivilliputtur", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98425 88954", status: "Marked", markedAt: "10:12 AM", hoursContributed: "2h 00m", eventDate: "Nov 02, 2026" },
    { id: "att-26", studentName: "Kavitha Murugan", maatramId: "MT4799", college: "Govt Engg, Tirunelveli", avatar: "/assets/admin/volunteer-portrait-03.jpg", phone: "+91 98426 99065", status: "Marked", markedAt: "10:15 AM", hoursContributed: "1h 55m", eventDate: "Nov 02, 2026" },
    { id: "att-27", studentName: "Sridhar N", maatramId: "MT4144", college: "Sri Sivasubramaniya Nadar", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98427 11276", status: "Marked", markedAt: "10:18 AM", hoursContributed: "1h 50m", eventDate: "Nov 02, 2026" },
    { id: "att-28", studentName: "Swetha Chandran", maatramId: "MT4872", college: "Ethiraj College, Chennai", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98428 22387", status: "Marked", markedAt: "10:20 AM", hoursContributed: "1h 48m", eventDate: "Nov 02, 2026" },
    { id: "att-29", studentName: "Venkatesan L", maatramId: "MT4311", college: "SRM Institute of Tech", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98429 33498", status: "Marked", markedAt: "10:22 AM", hoursContributed: "1h 45m", eventDate: "Nov 02, 2026" },
    { id: "att-30", studentName: "Madhumitha P", maatramId: "MT4644", college: "WCC Chennai", avatar: "/assets/admin/volunteer-portrait-03.jpg", phone: "+91 98430 44509", status: "Marked", markedAt: "10:25 AM", hoursContributed: "1h 40m", eventDate: "Nov 02, 2026" },
    { id: "att-31", studentName: "Pradeep Rajan", maatramId: "MT4255", college: "Rajalakshmi Engg, Thandalam", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98431 55610", status: "Marked", markedAt: "10:28 AM", hoursContributed: "1h 35m", eventDate: "Nov 02, 2026" },
    { id: "att-32", studentName: "Bhuvaneshwari S", maatramId: "MT4718", college: "Lady Doak, Madurai", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98432 66721", status: "Marked", markedAt: "10:30 AM", hoursContributed: "1h 30m", eventDate: "Nov 02, 2026" },
    { id: "att-33", studentName: "Sathish Kumar", maatramId: "MT4399", college: "Kongu Arts & Sci, Erode", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98433 77832", status: "Marked", markedAt: "10:32 AM", hoursContributed: "1h 28m", eventDate: "Nov 02, 2026" },
    { id: "att-34", studentName: "Nandhini Devi", maatramId: "MT4833", college: "Bishop Heber, Trichy", avatar: "/assets/admin/volunteer-portrait-03.jpg", phone: "+91 98434 88943", status: "Marked", markedAt: "10:35 AM", hoursContributed: "1h 25m", eventDate: "Nov 02, 2026" },
    { id: "att-35", studentName: "Vijay Anand", maatramId: "MT4188", college: "Karpagam Academy of HE", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98435 99054", status: "Marked", markedAt: "10:38 AM", hoursContributed: "1h 20m", eventDate: "Nov 02, 2026" },
    { id: "att-36", studentName: "Sangeetha R", maatramId: "MT4655", college: "Meenakshi College, Chennai", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98436 11265", status: "Marked", markedAt: "10:40 AM", hoursContributed: "1h 18m", eventDate: "Nov 02, 2026" },
    { id: "att-37", studentName: "Muthukumar T", maatramId: "MT4277", college: "Govt Arts College, Coimbatore", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98437 22376", status: "Marked", markedAt: "10:42 AM", hoursContributed: "1h 15m", eventDate: "Nov 02, 2026" },
    { id: "att-38", studentName: "Sharmila Devi", maatramId: "MT4755", college: "Holy Cross College, Trichy", avatar: "/assets/admin/volunteer-portrait-03.jpg", phone: "+91 98438 33487", status: "Marked", markedAt: "10:45 AM", hoursContributed: "1h 10m", eventDate: "Nov 02, 2026" },
    { id: "att-39", studentName: "Surya Prakash", maatramId: "MT4344", college: "VLB Janakiammal, CBE", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98439 44598", status: "Marked", markedAt: "10:48 AM", hoursContributed: "1h 05m", eventDate: "Nov 02, 2026" },
    { id: "att-40", studentName: "Lavanya Mohan", maatramId: "MT4866", college: "Quaid-E-Millath, Chennai", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98440 55609", status: "Marked", markedAt: "10:50 AM", hoursContributed: "1h 00m", eventDate: "Nov 02, 2026" },
    { id: "att-41", studentName: "Ganesh Moorthy", maatramId: "MT4299", college: "Sri Ramakrishna Engg, CBE", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98441 66710", status: "Marked", markedAt: "10:52 AM", hoursContributed: "0h 55m", eventDate: "Nov 02, 2026" },
    { id: "att-42", studentName: "Yamuna S", maatramId: "MT4788", college: "Govt College, Salem", avatar: "/assets/admin/volunteer-portrait-03.jpg", phone: "+91 98442 77821", status: "Marked", markedAt: "10:55 AM", hoursContributed: "0h 50m", eventDate: "Nov 02, 2026" },

    // 8 Not Marked
    { id: "att-43", studentName: "Baranidharan K", maatramId: "MT4102", college: "Government College of Tech, CBE", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98443 88932", status: "Not Marked", eventDate: "Nov 02, 2026" },
    { id: "att-44", studentName: "Haripriya M", maatramId: "MT4677", college: "Avinashilingam Univ, CBE", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98444 99043", status: "Not Marked", eventDate: "Nov 02, 2026" },
    { id: "att-45", studentName: "Jeevanandham V", maatramId: "MT4366", college: "Saveetha Engg College, Chennai", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98445 11254", status: "Not Marked", eventDate: "Nov 02, 2026" },
    { id: "att-46", studentName: "Karthika Devi", maatramId: "MT4800", college: "Fatima College, Madurai", avatar: "/assets/admin/volunteer-portrait-03.jpg", phone: "+91 98446 22365", status: "Not Marked", eventDate: "Nov 02, 2026" },
    { id: "att-47", studentName: "Lokeshwaran S", maatramId: "MT4177", college: "Jeppiaar Engg, Chennai", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98447 33476", status: "Not Marked", eventDate: "Nov 02, 2026" },
    { id: "att-48", studentName: "Monisha B", maatramId: "MT4722", college: "Vysya College, Salem", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98448 44587", status: "Not Marked", eventDate: "Nov 02, 2026" },
    { id: "att-49", studentName: "Praveen Kumar R", maatramId: "MT4322", college: "SNS College of Tech, CBE", avatar: "/assets/admin/volunteer-portrait-04.jpg", phone: "+91 98449 55698", status: "Not Marked", eventDate: "Nov 02, 2026" },
    { id: "att-50", studentName: "Rohith Varshan", maatramId: "MT4888", college: "Rathinam College of Arts, CBE", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98450 66709", status: "Not Marked", eventDate: "Nov 02, 2026" },
  ],
  "campus-cleanup": [
    { id: "att-cc-1", studentName: "R. Sanjai", maatramId: "MT4507", college: "PSG Tech, Coimbatore", avatar: "/assets/dashboard/student-avatar.jpg", phone: "+91 98401 22310", status: "Marked", markedAt: "08:10 AM", hoursContributed: "2h 45m", eventDate: "Nov 05, 2026" },
    { id: "att-cc-2", studentName: "Kaviya S", maatramId: "MT4112", college: "CIT, Chennai", avatar: "/assets/admin/volunteer-portrait-01.jpg", phone: "+91 98402 33421", status: "Marked", markedAt: "08:14 AM", hoursContributed: "2h 40m", eventDate: "Nov 05, 2026" },
    { id: "att-cc-3", studentName: "Arun Kumar", maatramId: "MT3981", college: "Thiagarajar Engg, Madurai", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98403 44532", status: "Marked", markedAt: "08:20 AM", hoursContributed: "2h 30m", eventDate: "Nov 05, 2026" },
    { id: "att-cc-4", studentName: "Baranidharan K", maatramId: "MT4102", college: "Government College of Tech, CBE", avatar: "/assets/admin/volunteer-portrait-02.jpg", phone: "+91 98443 88932", status: "Not Marked", eventDate: "Nov 05, 2026" },
  ],
};

// -----------------------------------------------------------------------
// 3. Proof Submissions Dataset (Pending, Approved, Rejected)
// -----------------------------------------------------------------------
export const mockProofSubmissions: Record<string, ProofSubmission[]> = {
  "palm-seeds": [
    {
      id: "prf-1",
      studentName: "R. Sanjai",
      maatramId: "MT4507",
      college: "PSG Tech, Coimbatore",
      avatar: "/assets/dashboard/student-avatar.jpg",
      photoUrl: "/assets/additional/planting-clean.jpg",
      photoUrls: [
        "/assets/additional/planting-clean.jpg",
        "/assets/admin/palm-seeds-event-image.png",
        "/assets/additional/palm-team.jpg",
      ],
      submittedAt: "Today, 10:14 AM",
      proofType: "GPS Geotagged Photo",
      status: "approved",
      gps: {
        latitude: "13.0067° N",
        longitude: "80.0033° E",
        locationName: "Chembarambakkam Lake Bund, Section B",
        accuracy: "4.2 meters",
        distance: "48m from target (Allowed: 300m)",
        withinRadius: true,
        timestamp: "02 Nov 2026 · 10:12:45 AM",
      },
      studentNotes: "Planted 35 palm seed pits along the north embankment. Verified by coordinator Aravind.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
    {
      id: "prf-2",
      studentName: "Kaviya S",
      maatramId: "MT4112",
      college: "CIT, Chennai",
      avatar: "/assets/admin/volunteer-portrait-01.jpg",
      photoUrl: "/assets/additional/planting-hero-clean.jpg",
      photoUrls: [
        "/assets/additional/planting-hero-clean.jpg",
        "/assets/admin/palm-seeds-plantation.jpg",
      ],
      submittedAt: "Today, 10:20 AM",
      proofType: "GPS Geotagged Photo",
      status: "approved",
      gps: {
        latitude: "13.0065° N",
        longitude: "80.0031° E",
        locationName: "Chembarambakkam Bund Central Point",
        accuracy: "3.8 meters",
        distance: "32m from target (Allowed: 300m)",
        withinRadius: true,
        timestamp: "02 Nov 2026 · 10:18:12 AM",
      },
      studentNotes: "Watered saplings and installed protective fencing across Section A.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
    {
      id: "prf-3",
      studentName: "Arun Kumar",
      maatramId: "MT3981",
      college: "Thiagarajar Engg, Madurai",
      avatar: "/assets/admin/volunteer-portrait-02.jpg",
      photoUrl: "/assets/admin/palm-seeds-plantation-pulse.jpg",
      photoUrls: [
        "/assets/admin/palm-seeds-plantation-pulse.jpg",
        "/assets/additional/planting.jpg",
        "/assets/admin/palm-seeds-event-image.png",
      ],
      submittedAt: "Today, 10:25 AM",
      proofType: "GPS Geotagged Photo",
      status: "pending",
      gps: {
        latitude: "13.0071° N",
        longitude: "80.0038° E",
        locationName: "Bund Extension Reach, Chembarambakkam",
        accuracy: "5.1 meters",
        distance: "72m from target (Allowed: 300m)",
        withinRadius: true,
        timestamp: "02 Nov 2026 · 10:24:00 AM",
      },
      studentNotes: "Digging and soil enrichment along Sector 4 with team members.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
    {
      id: "prf-4",
      studentName: "Priya Dharshini",
      maatramId: "MT4620",
      college: "GCT, Coimbatore",
      avatar: "/assets/admin/volunteer-portrait-03.jpg",
      photoUrl: "/assets/additional/cleanup.jpg",
      photoUrls: [
        "/assets/additional/cleanup.jpg",
        "/assets/additional/planting-clean.jpg",
      ],
      submittedAt: "Today, 10:32 AM",
      proofType: "GPS Geotagged Photo",
      status: "pending",
      gps: {
        latitude: "13.0068° N",
        longitude: "80.0035° E",
        locationName: "Chembarambakkam Nursery Point",
        accuracy: "4.5 meters",
        distance: "60m from target (Allowed: 300m)",
        withinRadius: true,
        timestamp: "02 Nov 2026 · 10:30:15 AM",
      },
      studentNotes: "Sorting and transporting healthy seeds to trench sites.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
    {
      id: "prf-5",
      studentName: "Vigneshwaran P",
      maatramId: "MT4733",
      college: "Anna Univ CEG, Chennai",
      avatar: "/assets/admin/volunteer-portrait-04.jpg",
      photoUrl: "/assets/additional/palm-team.jpg",
      photoUrls: [
        "/assets/additional/palm-team.jpg",
        "/assets/admin/palm-seeds-plantation.jpg",
        "/assets/additional/planting-hero-clean.jpg",
      ],
      submittedAt: "Today, 10:35 AM",
      proofType: "GPS Geotagged Photo",
      status: "pending",
      gps: {
        latitude: "13.0069° N",
        longitude: "80.0032° E",
        locationName: "North Bund Pier Section",
        accuracy: "3.2 meters",
        distance: "40m from target (Allowed: 300m)",
        withinRadius: true,
        timestamp: "02 Nov 2026 · 10:33:48 AM",
      },
      studentNotes: "Prepared 20 seed beds with organic compost.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
    {
      id: "prf-6",
      studentName: "Deepak Raj",
      maatramId: "MT4419",
      college: "Kongu Engg, Erode",
      avatar: "/assets/dashboard/student-avatar.jpg",
      photoUrl: "/assets/admin/palm-seeds-plantation.jpg",
      photoUrls: [
        "/assets/admin/palm-seeds-plantation.jpg",
        "/assets/additional/planting.jpg",
      ],
      submittedAt: "Today, 10:40 AM",
      proofType: "GPS Geotagged Photo",
      status: "pending",
      gps: {
        latitude: "13.0064° N",
        longitude: "80.0029° E",
        locationName: "Chembarambakkam Lake Bund Section A",
        accuracy: "4.0 meters",
        distance: "25m from target (Allowed: 300m)",
        withinRadius: true,
        timestamp: "02 Nov 2026 · 10:38:50 AM",
      },
      studentNotes: "Plantation trench excavation complete.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
    {
      id: "prf-7",
      studentName: "Ananya Swaminathan",
      maatramId: "MT4582",
      college: "Loyola College, Chennai",
      avatar: "/assets/admin/volunteer-portrait-01.jpg",
      photoUrl: "/assets/additional/planting-clean.jpg",
      photoUrls: [
        "/assets/additional/planting-clean.jpg",
        "/assets/additional/palm-team.jpg",
      ],
      submittedAt: "Today, 10:45 AM",
      proofType: "GPS Geotagged Photo",
      status: "pending",
      gps: {
        latitude: "13.0066° N",
        longitude: "80.0034° E",
        locationName: "Central Lake Bund Shore",
        accuracy: "4.8 meters",
        distance: "55m from target (Allowed: 300m)",
        withinRadius: true,
        timestamp: "02 Nov 2026 · 10:42:30 AM",
      },
      studentNotes: "Volunteering with plantation group 3.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
    {
      id: "prf-8",
      studentName: "Karthikeyan B",
      maatramId: "MT4302",
      college: "Sona Tech, Salem",
      avatar: "/assets/admin/volunteer-portrait-02.jpg",
      photoUrl: "/assets/admin/beach-cleanup.jpg",
      photoUrls: [
        "/assets/admin/beach-cleanup.jpg",
      ],
      submittedAt: "Yesterday, 4:10 PM",
      proofType: "GPS Geotagged Photo",
      status: "rejected",
      rejectionReason: "Photograph is blurred and does not show active plantation work or volunteer badge. GPS coordinates were also outside the allowed lake bund radius.",
      resubmissionEligible: true,
      gps: {
        latitude: "13.0185° N",
        longitude: "80.0150° E",
        locationName: "Poonamallee Bypass (Outside Radius)",
        accuracy: "18.5 meters",
        distance: "1,240m from target (Allowed: 300m)",
        withinRadius: false,
        timestamp: "01 Nov 2026 · 04:05:12 PM",
      },
      studentNotes: "Uploaded picture while travelling back.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
    {
      id: "prf-9",
      studentName: "Sneha Ramachandran",
      maatramId: "MT4821",
      college: "Stella Maris, Chennai",
      avatar: "/assets/admin/volunteer-portrait-03.jpg",
      photoUrl: "/assets/admin/rural-school-engagement.jpg",
      photoUrls: [
        "/assets/admin/rural-school-engagement.jpg",
        "/assets/admin/beach-cleanup.jpg",
      ],
      submittedAt: "Yesterday, 3:45 PM",
      proofType: "GPS Geotagged Photo",
      status: "rejected",
      rejectionReason: "Photo submitted shows only landscape without student presence or active seed planting activity. Please retake photo with face visible.",
      resubmissionEligible: true,
      gps: {
        latitude: "13.0067° N",
        longitude: "80.0033° E",
        locationName: "Chembarambakkam Lake Bund",
        accuracy: "5.0 meters",
        distance: "40m from target (Allowed: 300m)",
        withinRadius: true,
        timestamp: "01 Nov 2026 · 03:40:20 PM",
      },
      studentNotes: "View of the lake bund after our work.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
    {
      id: "prf-10",
      studentName: "Manojkumar T",
      maatramId: "MT4215",
      college: "Kumaraguru Tech, CBE",
      avatar: "/assets/admin/volunteer-portrait-04.jpg",
      photoUrl: "/assets/admin/palm-seeds-event-image.png",
      photoUrls: [
        "/assets/admin/palm-seeds-event-image.png",
        "/assets/additional/planting-hero-clean.jpg",
      ],
      submittedAt: "Today, 9:55 AM",
      proofType: "GPS Geotagged Photo",
      status: "approved",
      gps: {
        latitude: "13.0068° N",
        longitude: "80.0034° E",
        locationName: "Bund East Embankment",
        accuracy: "4.1 meters",
        distance: "50m from target (Allowed: 300m)",
        withinRadius: true,
        timestamp: "02 Nov 2026 · 09:52:10 AM",
      },
      studentNotes: "40 seeds planted in 2 rows. Verified by volunteer coordinator.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
    {
      id: "prf-11",
      studentName: "Divya Bharathi",
      maatramId: "MT4698",
      college: "Bannari Amman Inst, Erode",
      avatar: "/assets/admin/volunteer-portrait-01.jpg",
      photoUrl: "/assets/dashboard/palm-seeds-opportunity.jpg",
      submittedAt: "Today, 9:58 AM",
      proofType: "GPS Geotagged Photo",
      status: "approved",
      gps: {
        latitude: "13.0066° N",
        longitude: "80.0031° E",
        locationName: "Chembarambakkam Lake Bund Section B",
        accuracy: "3.9 meters",
        distance: "35m from target (Allowed: 300m)",
        withinRadius: true,
        timestamp: "02 Nov 2026 · 09:54:33 AM",
      },
      studentNotes: "Planted palm saplings and placed numbered identifiers.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
    {
      id: "prf-12",
      studentName: "Hariharan S",
      maatramId: "MT4350",
      college: "Madras Institute of Tech",
      avatar: "/assets/admin/volunteer-portrait-02.jpg",
      photoUrl: "/assets/dashboard/palm-seeds-opportunity.jpg",
      submittedAt: "Today, 10:02 AM",
      proofType: "GPS Geotagged Photo",
      status: "approved",
      gps: {
        latitude: "13.0067° N",
        longitude: "80.0033° E",
        locationName: "Chembarambakkam Lake Bund",
        accuracy: "4.0 meters",
        distance: "42m from target (Allowed: 300m)",
        withinRadius: true,
        timestamp: "02 Nov 2026 · 10:00:15 AM",
      },
      studentNotes: "Team 2 completed planting row 8.",
      adminInstructions: "Instruction by Admin: Ensure your face, active planting work, or volunteer badge is visible in clear daylight.",
    },
  ],
};

// -----------------------------------------------------------------------
// 4. Requested Funds Dataset (Pending, Approved, Rejected)
// -----------------------------------------------------------------------
export const mockFundingRequests: Record<string, FundingRequest[]> = {
  "palm-seeds": [
    {
      id: "fnd-1",
      studentName: "R. Sanjai",
      maatramId: "MT4507",
      avatar: "/assets/dashboard/student-avatar.jpg",
      college: "PSG Tech, Coimbatore",
      amount: 1250,
      purpose: "Travel & Transport for Seed Sacks",
      description: "Auto-rickshaw and loading fare for transporting 200kg organic palm seeds from Forest Nursery to lake bund site.",
      receiptUrl: "/assets/admin/clipboard.png",
      submittedAt: "Today, 11:20 AM",
      status: "pending",
    },
    {
      id: "fnd-2",
      studentName: "Kaviya S",
      maatramId: "MT4112",
      avatar: "/assets/admin/volunteer-portrait-01.jpg",
      college: "CIT, Chennai",
      amount: 850,
      purpose: "Volunteer Refreshments & Water",
      description: "Drinking water cans (4 x 20L) and electrolyte glucose packets purchased for 40 volunteers working under the morning sun.",
      receiptUrl: "/assets/admin/clipboard.png",
      submittedAt: "Today, 10:45 AM",
      status: "pending",
    },
    {
      id: "fnd-3",
      studentName: "Arun Kumar",
      maatramId: "MT3981",
      avatar: "/assets/admin/volunteer-portrait-02.jpg",
      college: "Thiagarajar Engg, Madurai",
      amount: 1600,
      purpose: "Plantation Digging Tools & Gloves",
      description: "Purchased 8 hand shovels and 30 pairs of heavy-duty safety gloves from hardware store for trench digging.",
      receiptUrl: "/assets/admin/clipboard.png",
      submittedAt: "Yesterday, 3:30 PM",
      status: "approved",
    },
    {
      id: "fnd-4",
      studentName: "Priya Dharshini",
      maatramId: "MT4620",
      avatar: "/assets/admin/volunteer-portrait-03.jpg",
      college: "GCT, Coimbatore",
      amount: 450,
      purpose: "Emergency First Aid & Antiseptic Bandages",
      description: "Bandages, Dettol antiseptic lotion and cotton rolls for minor thorny bush scratches on the bund.",
      receiptUrl: "/assets/admin/clipboard.png",
      submittedAt: "Yesterday, 1:15 PM",
      status: "approved",
    },
    {
      id: "fnd-5",
      studentName: "Vigneshwaran P",
      maatramId: "MT4733",
      avatar: "/assets/admin/volunteer-portrait-04.jpg",
      college: "Anna Univ CEG, Chennai",
      amount: 550,
      purpose: "Bamboo Stakes & Jute Binding Twine",
      description: "Stakes to mark freshly seeded pits to prevent trampling by cattle.",
      receiptUrl: "/assets/admin/clipboard.png",
      submittedAt: "Nov 01, 2026",
      status: "approved",
    },
    {
      id: "fnd-6",
      studentName: "Sneha Ramachandran",
      maatramId: "MT4821",
      avatar: "/assets/admin/volunteer-portrait-03.jpg",
      college: "Stella Maris, Chennai",
      amount: 2400,
      purpose: "Private AC Cab Fare",
      description: "Private cab hire for 4 volunteers from Adyar to Chembarambakkam.",
      receiptUrl: "/assets/admin/clipboard.png",
      submittedAt: "Nov 01, 2026",
      status: "rejected",
      rejectionReason: "Private AC cab travel was not pre-authorized. Standard public bus transport or pre-coordinated shared volunteer vehicles apply for reimbursements.",
    },
  ],
};

// -----------------------------------------------------------------------
// 5. Feedback Review Dataset (Positive, Suggestions, Issues)
// -----------------------------------------------------------------------
export const mockFeedbackItems: Record<string, FeedbackItem[]> = {
  "palm-seeds": [
    {
      id: "fb-1",
      studentName: "R. Sanjai",
      maatramId: "MT4507",
      avatar: "/assets/dashboard/student-avatar.jpg",
      category: "Positive",
      rating: 5,
      feedbackText: "The drive was super well-organized! The GPS attendance and live photo proof upload made check-in seamless, and planting 35 palm seeds gave a tremendous sense of community impact.",
      submittedAt: "Today, 11:30 AM",
      isReviewed: true,
      adminReplies: [
        {
          id: "rep-1",
          sender: "Admin (Operations)",
          role: "Admin",
          text: "Thank you Sanjai! Fantastic contribution on the north embankment today. Your efforts protect the bund for decades to come.",
          time: "11:45 AM",
        },
      ],
    },
    {
      id: "fb-2",
      studentName: "Priya Dharshini",
      maatramId: "MT4620",
      avatar: "/assets/admin/volunteer-portrait-03.jpg",
      category: "Positive",
      rating: 5,
      feedbackText: "Loved the team spirit! Coordinators explained seed placement and soil conditioning very clearly before we began.",
      submittedAt: "Today, 11:15 AM",
      isReviewed: true,
      adminReplies: [
        {
          id: "rep-2",
          sender: "Aravind K",
          role: "Coordinator",
          text: "Glad the briefing helped Priya! Great job handling the seed distribution desk.",
          time: "11:25 AM",
        },
      ],
    },
    {
      id: "fb-3",
      studentName: "Karthikeyan B",
      maatramId: "MT4302",
      avatar: "/assets/admin/volunteer-portrait-02.jpg",
      category: "Suggestions",
      rating: 4,
      feedbackText: "We ran short of digging spades during the first 30 minutes. Recommending bringing at least 15 extra trowels/shovels for the next drive so all volunteer pairs can start simultaneously.",
      submittedAt: "Today, 10:50 AM",
      isReviewed: false,
      adminReplies: [],
    },
    {
      id: "fb-4",
      studentName: "Ananya Swaminathan",
      maatramId: "MT4582",
      avatar: "/assets/admin/volunteer-portrait-01.jpg",
      category: "Suggestions",
      rating: 4,
      feedbackText: "Water refill stations were stationed at the entry point only. Having one moving water refill trolley along Section C would help volunteers working deep in the bund under the sun.",
      submittedAt: "Today, 10:40 AM",
      isReviewed: false,
      adminReplies: [],
    },
    {
      id: "fb-5",
      studentName: "Deepak Raj",
      maatramId: "MT4419",
      avatar: "/assets/dashboard/student-avatar.jpg",
      category: "Issues",
      rating: 2,
      feedbackText: "The local bus from Poonamallee junction was delayed by 40 minutes due to road work. Several volunteers arrived late and missed the opening safety briefing. Could we arrange a common pickup point at Poonamallee next time?",
      submittedAt: "Today, 10:15 AM",
      isReviewed: false,
      adminReplies: [],
    },
  ],
};

// -----------------------------------------------------------------------
// 6. Community Chat Initial Messages
// -----------------------------------------------------------------------
export const mockCommunityChatMessages: Record<string, CommunityChatMessage[]> = {
  "sangamam": [
    {
      id: "msg-0",
      sender: "System Announcement",
      role: "Admin",
      avatar: "/assets/brand/maatram-foundation-logo.png",
      time: "9:00 AM",
      type: "announcement",
      pinned: true,
      text: "📢 Attendance for Sangamam Event is now OPEN! All volunteers please mark your GPS verified attendance within the 300m lake bund radius.",
    },
    {
      id: "msg-1",
      sender: "Aravind K",
      role: "Coordinator",
      avatar: "/assets/admin/volunteer-portrait-04.jpg",
      time: "9:01 AM",
      type: "text",
      text: "Good morning team Sangamam! 👋 Welcome to our Palm Seeds Plantation Drive at Chembarambakkam Lake Bund. Please report to the registration desk at Section B.",
    },
    {
      id: "msg-2",
      sender: "Sujith Kumar",
      role: "Admin",
      avatar: "/assets/admin/admin-profile-avatar.png",
      time: "9:05 AM",
      type: "text",
      text: "Welcome volunteers! Remember to stay hydrated and plant each palm seed 15cm deep with proper soil cover. Every seed planted strengthens the bund for generations! 🌱",
    },
    {
      id: "msg-3",
      sender: "R. Sanjai",
      role: "Volunteer",
      avatar: "/assets/dashboard/student-avatar.jpg",
      time: "9:12 AM",
      type: "text",
      text: "Marked my attendance! Ready with group 1 at the north embankment. 👍",
    },
    {
      id: "msg-4",
      sender: "Kaviya S",
      role: "Volunteer",
      avatar: "/assets/admin/volunteer-portrait-01.jpg",
      time: "9:16 AM",
      type: "text",
      text: "Checked in! Seed sacks are unloaded and distributed across trench lines.",
    },
    {
      id: "msg-5",
      sender: "Aravind K",
      role: "Coordinator",
      avatar: "/assets/admin/volunteer-portrait-04.jpg",
      time: "9:25 AM",
      type: "poll",
      poll: {
        question: "Which zone should we allocate extra volunteers for seed planting?",
        options: [
          { id: "opt-1", text: "North Embankment (Section B)", votes: 18 },
          { id: "opt-2", text: "South Canal Bund (Section C)", votes: 12 },
          { id: "opt-3", text: "Nursery Infill (Section A)", votes: 6 },
        ],
        multiple: false,
        totalVotes: 36,
        userVoted: ["opt-1"],
      },
    },
    {
      id: "msg-6",
      sender: "Arun Kumar",
      role: "Volunteer",
      avatar: "/assets/admin/volunteer-portrait-02.jpg",
      time: "9:35 AM",
      type: "text",
      text: "North Embankment has longer trenches prepared, allocating 10 more volunteers there will finish the sector early!",
    },
  ],
};
