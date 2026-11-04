//#region node_modules/.nitro/vite/services/ssr/assets/mock-DstdW3Hp.js
var mockStudent = {
	name: "R. Sanjai",
	firstName: "Sanjai",
	maatramId: "MT4507",
	category: "Student",
	college: "Sri Krishna College of Engineering and Technology",
	department: "Mechatronics Engineering",
	academicPeriod: "2024 – 2028",
	year: "3rd Year",
	nativeLocation: "Dharmapuri",
	collegeLocation: "Coimbatore"
};
var mockDashboard = {
	opportunities: 12,
	volunteerHours: 48,
	contributed: 5,
	impactPoints: 127,
	goalHours: 50,
	completedHours: 36,
	progress: 72,
	newOpportunities: 11,
	hoursToTop3: 14
};
var impactArena = {
	totals: {
		volunteers: 368,
		hours: 2450,
		events: 125,
		points: 8200
	},
	position: 27,
	hours: 36,
	contributors: [
		{
			id: "014",
			role: "Engineering Student",
			city: "Coimbatore",
			hours: 56,
			weekly: 14,
			allTime: 168,
			category: "education",
			contribution: "Helped 25 students explore higher education opportunities."
		},
		{
			id: "028",
			role: "College Student",
			city: "Chennai",
			hours: 42,
			weekly: 12,
			allTime: 126,
			category: "environment",
			contribution: "Planted 45 palm trees for a greener environment."
		},
		{
			id: "091",
			role: "Engineering Student",
			city: "Erode",
			hours: 38,
			weekly: 10,
			allTime: 114,
			category: "awareness",
			contribution: "Created awareness about Maatram through school visits."
		},
		{
			id: "067",
			role: "College Student",
			city: "Madurai",
			hours: 36,
			weekly: 9,
			allTime: 108,
			category: "community",
			contribution: "Supported 18 students in the admission process."
		},
		{
			id: "112",
			role: "Engineering Student",
			city: "Trichy",
			hours: 34,
			weekly: 8,
			allTime: 102,
			category: "community",
			contribution: "Conducted mock interviews to help students prepare for higher studies."
		},
		{
			id: "203",
			role: "College Support",
			city: "Coimbatore",
			hours: 32,
			weekly: 7,
			allTime: 96,
			category: "verification",
			contribution: "BGV support for student verification and admissions."
		},
		{
			id: "089",
			role: "Engineering Student",
			city: "Chennai",
			hours: 30,
			weekly: 6,
			allTime: 90,
			category: "school",
			contribution: "Contributed to multiple school visits."
		},
		{
			id: "170",
			role: "College Student",
			city: "Salem",
			hours: 28,
			weekly: 5,
			allTime: 84,
			category: "interview",
			contribution: "Supported admission panel interviews."
		},
		{
			id: "145",
			role: "Engineering Student",
			city: "Tirunelveli",
			hours: 26,
			weekly: 4,
			allTime: 78,
			category: "environment",
			contribution: "Organized an environmental awareness drive."
		},
		{
			id: "198",
			role: "College Student",
			city: "Erode",
			hours: 24,
			weekly: 3,
			allTime: 72,
			category: "community",
			contribution: "Assisted in community engagement activities."
		}
	]
};
function impactHours(contributor, period) {
	return period === "Weekly" ? contributor.weekly : period === "All Time" ? contributor.allTime : contributor.hours;
}
var mockOpportunities = [
	{
		id: "palm-seeds",
		name: "Palm Seeds Plantation",
		location: "Chennai",
		date: "Nov 02",
		time: "9:00 AM – 12:00 PM",
		joined: 38,
		capacity: 50,
		image: "/assets/dashboard/palm-seeds-opportunity.jpg",
		description: "Join fellow volunteers to plant palm seeds along the lake bund and help restore the local ecosystem."
	},
	{
		id: "book-drive",
		name: "Community Book Drive",
		location: "Coimbatore",
		date: "Nov 09",
		time: "10:00 AM – 1:00 PM",
		joined: 21,
		capacity: 40,
		image: "/assets/dashboard/palm-seeds-opportunity.jpg",
		description: "Collect and sort donated books for rural school libraries."
	},
	{
		id: "mentoring",
		name: "School Mentoring Session",
		location: "Dharmapuri",
		date: "Nov 16",
		time: "2:00 PM – 5:00 PM",
		joined: 12,
		capacity: 20,
		image: "/assets/dashboard/palm-seeds-opportunity.jpg",
		description: "Guide higher-secondary students on college admissions."
	}
];
var mockActive = {
	name: "Physical Verification",
	date: "Oct 28",
	location: "Coimbatore",
	status: "Community Active"
};
var mockNotifications = [
	"New opportunity: Palm Seeds Plantation in Chennai",
	"Physical Verification community has 3 new messages",
	"You earned 10 impact points this week"
];
var locations = [
	"Chennai",
	"Coimbatore",
	"Dharmapuri",
	"Madurai",
	"Salem",
	"Tiruchirappalli",
	"Tirunelveli",
	"Erode",
	"Vellore"
];
/** In-memory registration draft shared across the registration steps (frontend only). */
var regDraft = {};
var additionalOpportunities = [
	{
		id: "palm-seeds",
		name: "Palm Seeds Plantation",
		category: "Environment",
		location: "Chennai",
		date: "Nov 02",
		time: "9:00 AM – 12:00 PM",
		joined: 38,
		capacity: 50,
		photo: "planting",
		trending: true,
		description: "Plant today for a greener tomorrow."
	},
	{
		id: "physical-verification",
		name: "Physical Verification",
		category: "Physical Verification",
		location: "Coimbatore",
		date: "Oct 28",
		time: "10:00 AM – 4:00 PM",
		joined: 16,
		capacity: 25,
		photo: "verification-team",
		trending: false,
		description: "Help the Maatram team verify and support our students."
	},
	{
		id: "campus-cleanup",
		name: "Campus Clean-up Drive",
		category: "School Visits",
		location: "Coimbatore",
		date: "Nov 05",
		time: "8:00 AM – 11:00 AM",
		joined: 27,
		capacity: 40,
		photo: "cleanup",
		trending: false,
		description: "Together, keep our campus clean and green."
	}
];
var additionalCommunities = [
	{
		id: "palm-plantation",
		name: "Palm Plantation Team",
		category: "Environment",
		members: 38,
		active: "Active Today",
		photo: "palm-team",
		eventId: "palm-seeds"
	},
	{
		id: "physical-verification",
		name: "Physical Verification Team",
		category: "Physical Verification",
		members: 16,
		active: "Active Today",
		photo: "verification-team",
		eventId: "physical-verification"
	},
	{
		id: "mock-interview",
		name: "Mock Interview Team",
		category: "Mock Interviews",
		members: 27,
		active: "Last active 2 days ago",
		photo: "interview",
		eventId: "palm-seeds"
	},
	{
		id: "school-visit",
		name: "School Visit Team",
		category: "School Visits",
		members: 42,
		active: "Last active 3 days ago",
		photo: "school",
		eventId: "campus-cleanup"
	}
];
var eventGuide = [
	{
		title: "Purpose",
		text: "To plant palm seeds, restore green cover, improve biodiversity and promote environmental sustainability within our community."
	},
	{
		title: "Responsibilities",
		text: "Participate in the plantation activity at the assigned location.\nFollow safety and environmental guidelines.\nWork collaboratively with the event team.\nEnsure the planted area is kept clean."
	},
	{
		title: "Preparation Requirements",
		text: "Wear comfortable, full-sleeve clothes and closed shoes.\nCarry a reusable water bottle.\nBring a cap, sunscreen and personal essentials if needed."
	},
	{
		title: "Schedule",
		text: "8:45 AM — Reporting & Registration\n9:00 AM — Event Briefing & Area Allocation\n9:15 AM – 12:00 PM — Plantation Activity & Wrap-up"
	},
	{
		title: "Contact Details",
		text: "Mr. Aravind K · Event Coordinator\n+91 98765 43210\naravind@maatram.org"
	}
];
var registrationAcknowledgements = [
	"I will be available at the event on the mentioned date and time.",
	"I will follow the event guide and coordinator’s instructions.",
	"I will adhere to safety and environmental guidelines.",
	"I understand that my contribution is voluntary and for a social cause."
];
var attendanceMock = {
	distanceMeters: 72,
	allowedRadiusMeters: 300,
	markedCount: 28,
	totalCount: 42
};
function canConfirmRegistration(checks) {
	return checks.length === 4 && checks.every(Boolean);
}
function isWithinAttendanceRadius(distance, radius) {
	return distance <= radius;
}
function validateFundRequest(draft) {
	const errors = [];
	if (!draft.title) errors.push("Select an expense title.");
	if (!draft.description.trim()) errors.push("Enter an expense description.");
	if (!Number.isFinite(Number(draft.amount)) || Number(draft.amount) <= 0) errors.push("Enter a valid amount greater than zero.");
	if (!draft.category) errors.push("Select an expense category.");
	if (!draft.files.length) errors.push("Attach at least one bill or proof.");
	if (draft.payment === "UPI" && !/^[\w.-]+@[\w]+$/.test(draft.reference)) errors.push("Enter a valid UPI ID.");
	if (draft.payment === "Bank Account" && (!/^\d{9,18}$/.test(draft.bankAccount) || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(draft.ifsc))) errors.push("Enter valid bank account and IFSC details.");
	return errors;
}
//#endregion
export { validateFundRequest as _, eventGuide as a, isWithinAttendanceRadius as c, mockDashboard as d, mockNotifications as f, registrationAcknowledgements as g, regDraft as h, canConfirmRegistration as i, locations as l, mockStudent as m, additionalOpportunities as n, impactArena as o, mockOpportunities as p, attendanceMock as r, impactHours as s, additionalCommunities as t, mockActive as u };
