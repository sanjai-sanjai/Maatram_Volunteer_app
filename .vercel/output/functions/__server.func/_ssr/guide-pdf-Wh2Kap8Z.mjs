import { o as __toESM } from "../_runtime.mjs";
import { a as eventGuide } from "./mock-DstdW3Hp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide-pdf-Wh2Kap8Z.js
async function loadImage(src) {
	const blob = await (await fetch(src)).blob();
	return await new Promise((r) => {
		const fr = new FileReader();
		fr.onload = () => r(fr.result);
		fr.readAsDataURL(blob);
	});
}
async function buildGuidePdf(op) {
	const { jsPDF } = await import("../_libs/jspdf.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const doc = new jsPDF({
		unit: "mm",
		format: "a4"
	});
	const W = 210, M = 18, CW = 174;
	const yellow = [
		245,
		184,
		0
	];
	const dark = [
		26,
		26,
		26
	];
	const grey = [
		100,
		100,
		100
	];
	let y = 0;
	const header = async () => {
		doc.setFillColor(...yellow);
		doc.rect(0, 0, W, 4, "F");
		try {
			doc.addImage(await loadImage("/assets/brand/maatram-foundation-logo.png"), "PNG", M, 10, 37, 16.4);
		} catch {}
		doc.setFont("helvetica", "bold");
		doc.setFontSize(10);
		doc.setTextColor(...grey);
		doc.text("EVENT GUIDE", 192, 17, { align: "right" });
		doc.setFont("helvetica", "normal");
		doc.setFontSize(8);
		doc.text("Maatram Volunteer Programme", 192, 22, { align: "right" });
		doc.setDrawColor(230, 230, 230);
		doc.line(M, 31, 192, 31);
		y = 40;
	};
	const ensure = (h) => {
		if (y + h > 282) {
			doc.addPage();
			doc.setFillColor(...yellow);
			doc.rect(0, 0, W, 4, "F");
			y = 18;
		}
	};
	await header();
	doc.setFont("helvetica", "bold");
	doc.setFontSize(22);
	doc.setTextColor(...dark);
	doc.text(op.name, M, y);
	y += 3;
	doc.setFillColor(...yellow);
	doc.rect(M, y, 30, 1.4, "F");
	y += 8;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(11);
	doc.setTextColor(...grey);
	const desc = doc.splitTextToSize(op.description, CW);
	doc.text(desc, M, y);
	y += desc.length * 5 + 6;
	const info = [
		["Category", op.category],
		["Location", op.location],
		["Date", op.date],
		["Time", op.time],
		["Volunteers", `${op.joined} / ${op.capacity} joined`],
		["Slots Left", String(op.capacity - op.joined)]
	];
	const cw = 168 / 3, ch = 18;
	info.forEach(([k, v], i) => {
		const x = M + i % 3 * 59, yy = y + Math.floor(i / 3) * 21;
		doc.setFillColor(255, 248, 225);
		doc.roundedRect(x, yy, cw, ch, 2, 2, "F");
		doc.setFont("helvetica", "normal");
		doc.setFontSize(8);
		doc.setTextColor(...grey);
		doc.text(k.toUpperCase(), x + 4, yy + 6.5);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(10.5);
		doc.setTextColor(...dark);
		doc.text(v, x + 4, yy + 13);
	});
	y += 49;
	eventGuide.forEach((g, i) => {
		ensure(22);
		doc.setFillColor(...yellow);
		doc.circle(22, y - 1.5, 4, "F");
		doc.setFont("helvetica", "bold");
		doc.setFontSize(10);
		doc.setTextColor(...dark);
		doc.text(String(i + 1), 22, y, { align: "center" });
		doc.setFontSize(14);
		doc.text(g.title, 30, y);
		y += 8;
		doc.setFont("helvetica", "normal");
		doc.setFontSize(10.5);
		doc.setTextColor(60, 60, 60);
		const lines = g.text.split("\n");
		const bulleted = g.title !== "Purpose";
		lines.forEach((line) => {
			const t = line.replace(" — ", "  —  ").replace(" · ", ", ");
			const wrapped = doc.splitTextToSize(t, 156);
			ensure(wrapped.length * 5 + 2);
			if (bulleted) {
				doc.setFillColor(...yellow);
				doc.circle(32, y - 1.3, .9, "F");
			}
			doc.text(wrapped, M + (bulleted ? 18 : 12), y);
			y += wrapped.length * 5 + 1;
		});
		y += 2;
		if (i < eventGuide.length - 1) {
			doc.setDrawColor(238, 238, 238);
			doc.line(M, y, 192, y);
		}
		y += 5;
	});
	const pages = doc.getNumberOfPages();
	for (let p = 1; p <= pages; p++) {
		doc.setPage(p);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(8);
		doc.setTextColor(...grey);
		doc.text("Maatram Foundation  ·  Thank you for volunteering!", M, 290);
		doc.text(`Page ${p} of ${pages}`, 192, 290, { align: "right" });
	}
	return doc.output("blob");
}
//#endregion
export { buildGuidePdf };
