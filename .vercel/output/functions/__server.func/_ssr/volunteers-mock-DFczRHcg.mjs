//#region node_modules/.nitro/vite/services/ssr/assets/volunteers-mock-DFczRHcg.js
var karthik_review_default = "/assets/karthik-review-D4m-waWv.png";
var karthik_verified_default = "/assets/karthik-verified-B02elnoa.png";
var nandhini_default = "/assets/nandhini-By_An9W2.png";
var aravind_default = "/assets/aravind-B7ziqAJN.png";
var keerthana_default = "/assets/keerthana-E4lS_mpJ.png";
var vignesh_default = "/assets/vignesh-CIhaUf4h.png";
var sanjai_r_default = "/assets/sanjai-r-BQ5RzHKf.png";
var avatar_karthik_default = "/assets/avatar-karthik-DjtWZSJg.jpg";
var avatar_nandhini_default = "/assets/avatar-nandhini-CK-WvCp_.jpg";
var avatar_aravind_default = "/assets/avatar-aravind-wrU2nsib.jpg";
var avatar_keerthana_default = "/assets/avatar-keerthana-D3d6ohFm.jpg";
var avatar_vignesh_default = "/assets/avatar-vignesh-Cl4L6Alh.jpg";
var base = {
	submitted: "Nov 02, 2026",
	availability: "Weekends",
	joined: "Oct 10, 2025",
	idDoc: {
		type: "Aadhaar Card",
		size: "1.2 MB"
	},
	voiceNote: { duration: 134 },
	tier: "Tier 1 Volunteer",
	motivation: "I'm passionate about creating positive impact in the community, especially through environmental and educational initiatives. I would love to contribute to Maatram's meaningful volunteering programs.",
	about: "Active and dedicated volunteer with a passion for environmental initiatives and community service.",
	recent: [{
		name: "Palm Seeds Plantation",
		date: "Nov 02, 2026",
		location: "Chennai",
		status: "Completed",
		image: "/assets/palm-seeds-thumbnail-CoGjwzp0.png"
	}, {
		name: "Beach Cleanup",
		date: "Oct 15, 2026",
		location: "Marina, Chennai",
		status: "Completed",
		image: "/assets/beach-cleanup-thumbnail-Cv7r6ULI.png"
	}]
};
var volunteers = [
	{
		...base,
		id: "VOL0833",
		name: "Sanjai R",
		status: "Student",
		location: "Chennai, Tamil Nadu",
		avatar: sanjai_r_default,
		photo: sanjai_r_default,
		verifiedPhoto: sanjai_r_default,
		pending: false,
		volunteered: true,
		top: true,
		activities: 12,
		events: 6,
		hours: 48,
		email: "sanjair@email.com",
		phone: "+91 98410 66789",
		dob: "Feb 11, 2005",
		org: "Maatram College, Chennai"
	},
	{
		...base,
		id: "VOL0834",
		name: "Karthik M",
		status: "Employee",
		location: "Chennai, Tamil Nadu",
		avatar: avatar_karthik_default,
		photo: karthik_review_default,
		verifiedPhoto: karthik_verified_default,
		pending: true,
		volunteered: true,
		top: true,
		activities: 12,
		events: 6,
		hours: 48,
		email: "karthikm@email.com",
		phone: "+91 98765 43210",
		dob: "Apr 14, 2004",
		org: "Infosys, Chennai"
	},
	{
		...base,
		id: "VOL0835",
		name: "Nandhini S",
		status: "Student",
		location: "Chennai, Tamil Nadu",
		avatar: avatar_nandhini_default,
		photo: nandhini_default,
		verifiedPhoto: nandhini_default,
		pending: true,
		volunteered: true,
		activities: 8,
		events: 4,
		hours: 30,
		email: "nandhinis@email.com",
		phone: "+91 98840 12345",
		dob: "Jun 21, 2005",
		org: "Maatram College, Chennai"
	},
	{
		...base,
		id: "VOL0836",
		name: "Aravind K",
		status: "Employee",
		location: "Chennai, Tamil Nadu",
		avatar: avatar_aravind_default,
		photo: aravind_default,
		verifiedPhoto: aravind_default,
		pending: true,
		volunteered: false,
		activities: 0,
		events: 0,
		hours: 0,
		email: "aravindk@email.com",
		phone: "+91 90031 55678",
		dob: "Jan 09, 2001",
		org: "TCS, Chennai",
		recent: []
	},
	{
		...base,
		id: "VOL0837",
		name: "Keerthana R",
		status: "Student",
		location: "Coimbatore, Tamil Nadu",
		avatar: avatar_keerthana_default,
		photo: keerthana_default,
		verifiedPhoto: keerthana_default,
		pending: true,
		volunteered: true,
		top: true,
		activities: 15,
		events: 7,
		hours: 56,
		email: "keerthanar@email.com",
		phone: "+91 94430 77812",
		dob: "Mar 03, 2005",
		org: "PSG College, Coimbatore"
	},
	{
		...base,
		id: "VOL0838",
		name: "Vignesh P",
		status: "Employee",
		location: "Chennai, Tamil Nadu",
		avatar: avatar_vignesh_default,
		photo: vignesh_default,
		verifiedPhoto: vignesh_default,
		pending: true,
		volunteered: true,
		activities: 9,
		events: 5,
		hours: 36,
		email: "vigneshp@email.com",
		phone: "+91 97910 22334",
		dob: "Sep 17, 2000",
		org: "Zoho, Chennai"
	}
];
var volunteerCounts = {
	verification: 18,
	all: 4500,
	active: 286,
	volunteered: 3240,
	nonVolunteered: 980,
	top: 120
};
var getVolunteer = (id) => volunteers.find((v) => v.id === id);
var formatDuration = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
function matchesSearch(v, q) {
	const t = q.trim().toLowerCase();
	if (!t) return true;
	return [
		v.name,
		v.email,
		v.location,
		v.id,
		v.status
	].some((x) => x.toLowerCase().includes(t));
}
//#endregion
export { volunteers as a, volunteerCounts as i, getVolunteer as n, matchesSearch as r, formatDuration as t };
