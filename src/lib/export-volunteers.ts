// Builds a 3-tab spreadsheet (opens in Google Sheets / Excel) with demo volunteer data.
const first = [
  "Karthik",
  "Nandhini",
  "Aravind",
  "Keerthana",
  "Vignesh",
  "Sanjai",
  "Divya",
  "Prakash",
  "Kavya",
  "Saravanan",
  "Meena",
  "Surya",
  "Lakshmi",
  "Arun",
  "Priya",
  "Bharath",
  "Gayathri",
  "Dinesh",
  "Janani",
  "Harish",
  "Abinaya",
  "Manikandan",
  "Swetha",
  "Ramesh",
  "Pavithra",
  "Gokul",
  "Deepika",
  "Sathish",
  "Revathi",
  "Vijay",
  "Anitha",
  "Murugan",
  "Sowmya",
  "Balaji",
  "Ishwarya",
  "Naveen",
  "Yamini",
  "Senthil",
  "Kowsalya",
  "Ajith",
];
const last = ["R", "S", "K", "M", "P", "V", "A", "N", "T", "G", "B", "J", "L", "C", "D"];
const cities = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli",
  "Salem",
  "Tirunelveli",
  "Erode",
  "Vellore",
  "Thoothukudi",
  "Thanjavur",
  "Dindigul",
  "Kanchipuram",
  "Karur",
  "Nagercoil",
  "Cuddalore",
];
const colleges = [
  "Anna University",
  "PSG College of Technology",
  "Loyola College",
  "Madras Christian College",
  "Thiagarajar College of Engineering",
  "SSN College of Engineering",
  "Presidency College",
  "Stella Maris College",
  "Bharathiar University",
  "NIT Tiruchirappalli",
  "Coimbatore Institute of Technology",
  "Madurai Kamaraj University",
  "Sri Krishna College",
  "VIT Vellore",
  "Kumaraguru College",
];
const activities = [
  "Tutoring",
  "Blood Donation Drive",
  "Tree Plantation",
  "Mentoring Juniors",
  "Career Guidance Session",
  "Beach Clean-up",
  "Food Distribution",
  "Digital Literacy Class",
  "Fundraising Event",
  "Health Camp Support",
  "Library Setup",
  "Awareness Campaign",
];
const roles = [
  "Student",
  "Student",
  "Student",
  "Student",
  "Alumni Volunteer",
  "Admin",
  "Coordinator",
  "Mentor",
];
const STATUS = ["Recognized", "Not Recognized", "Verify Pending"];

let seed = 42;
const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
const pick = <T>(a: T[]) => a[Math.floor(rnd() * a.length)];

function rows(count: number, kind: "vol" | "non" | "top", start: number) {
  return Array.from({ length: count }, (_, i) => {
    const n = rnd() < 0.5 ? 1 : rnd() < 0.7 ? 2 : 3;
    const acts =
      kind === "non"
        ? "—"
        : Array.from(
            new Set(Array.from({ length: kind === "top" ? n + 2 : n }, () => pick(activities))),
          ).join(", ");
    const hours =
      kind === "non"
        ? 0
        : kind === "top"
          ? 120 + Math.floor(rnd() * 280)
          : 4 + Math.floor(rnd() * 110);
    const status =
      kind === "top"
        ? rnd() < 0.85
          ? STATUS[0]
          : STATUS[2]
        : kind === "non"
          ? rnd() < 0.6
            ? STATUS[1]
            : STATUS[2]
          : pick(STATUS);
    return [
      `${pick(first)} ${pick(last)}`,
      pick(roles),
      `MQ-${2026}-${String(start + i).padStart(5, "0")}`,
      pick(cities),
      pick(colleges),
      acts,
      hours,
      status,
    ];
  });
}

export async function exportVolunteersSheet() {
  const ExcelJS = (await import("exceljs")).default;
  seed = 42;
  const wb = new ExcelJS.Workbook();
  const header = [
    "Name",
    "Role",
    "Maatram ID",
    "Location",
    "College Name",
    "Activities Done",
    "Hours Contributed",
    "Status",
  ];
  const tabs: [string, number, "vol" | "non" | "top"][] = [
    ["Volunteered", 3240, "vol"],
    ["Non-Volunteered", 980, "non"],
    ["Top Volunteers", 120, "top"],
  ];
  let id = 1;
  for (const [name, count, kind] of tabs) {
    const ws = wb.addWorksheet(name, { views: [{ state: "frozen", ySplit: 1 }] });
    ws.columns = [28, 18, 18, 18, 34, 48, 18, 18].map((width) => ({ width }));
    ws.addRow(header);
    const h = ws.getRow(1);
    h.font = { bold: true, color: { argb: "FFFFFFFF" } };
    h.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F3A93" } };
    let data = rows(count, kind, id);
    if (kind === "top") data = data.sort((a, b) => (b[6] as number) - (a[6] as number));
    id += count;
    ws.addRows(data);
    const last = count + 1;
    for (let r = 2; r <= last; r++) {
      ws.getCell(`H${r}`).dataValidation = {
        type: "list",
        allowBlank: false,
        formulae: [`"${STATUS.join(",")}"`],
      };
    }
    const colors = [
      ["Recognized", "FFB7E1CD", "FF0B6B3A"],
      ["Not Recognized", "FFF4C7C3", "FFA50E0E"],
      ["Verify Pending", "FFE0E0E0", "FF555555"],
    ];
    ws.addConditionalFormatting({
      ref: `H2:H${last}`,
      rules: colors.map(([t, bg, fg], i) => ({
        type: "expression",
        formulae: [`$H2="${t}"`],
        priority: i + 1,
        style: {
          fill: { type: "pattern", pattern: "solid", bgColor: { argb: bg } },
          font: { color: { argb: fg }, bold: true },
        },
      })) as never,
    });
    ws.autoFilter = { from: "A1", to: `H1` };
  }
  const buf = await wb.xlsx.writeBuffer();
  const url = URL.createObjectURL(
    new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "Maatram_Volunteers_Data.xlsx";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
