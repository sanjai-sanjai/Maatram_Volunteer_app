import { C as topContributors30, a as collegeContribution, f as inactiveStudents, g as monthlyFunded, h as monthlyEvents, m as monthlyContribution, o as contributionCategories, r as alumniBoard } from "./admin-mock-D2qySwaK.mjs";
import { n as maatram_logo_full_default } from "./admin-profile-avatar-Cks5CCdP.mjs";
import { n as rgb, t as PDFDocument } from "../_libs/pdf-lib.mjs";
import { t as fontkit } from "../_libs/pako+pdf-lib__fontkit.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-pdf-CPILiYJe.js
var dejavu_sans_default = "/assets/dejavu-sans-nNsHGjyL.ttf";
var dejavu_sans_bold_default = "/assets/dejavu-sans-bold-B8STInNC.ttf";
var PW = 595.28;
var PH = 841.89;
var NAVY = rgb(.043, .106, .239);
var INK = rgb(.11, .12, .15);
var YELLOW = rgb(1, .788, 0);
var YELLOW_SOFT = rgb(1, .949, .804);
var CREAM = rgb(1, .976, .929);
var AREA_FILL = rgb(1, .96, .86);
var MUTED = rgb(.42, .45, .52);
var BORDER = rgb(.906, .91, .929);
var GREEN = rgb(.086, .463, .106);
var WHITE = rgb(1, 1, 1);
function rgb2(hex) {
	const n = parseInt(hex.slice(1), 16);
	return rgb((n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255);
}
var fmt = (n) => n.toLocaleString("en-IN");
var rupee = (n) => `₹${fmt(n)}`;
function periodInfo(p) {
	const months = monthlyContribution;
	const ev = monthlyEvents;
	const fu = monthlyFunded;
	const sum = (a) => a.reduce((x, y) => x + y, 0);
	if (p === "This Month") return {
		title: "This Month",
		sub: "November 2026",
		range: "Nov 1 – Nov 30, 2026",
		note: "Volunteer hours contributed July – November 2026",
		series: months.slice(-5),
		events: ev[10],
		funded: fu[10],
		volunteers: 4500
	};
	if (p === "Last 3 Months") return {
		title: "Last 3 Months",
		sub: "September – November 2026",
		range: "Sep 1 – Nov 30, 2026",
		note: "Volunteer hours contributed September – November 2026",
		series: months.slice(-3),
		events: sum(ev.slice(-3)),
		funded: sum(fu.slice(-3)),
		volunteers: 4500
	};
	return {
		title: "This Year",
		sub: "January – November 2026",
		range: "Jan 1 – Nov 30, 2026",
		note: "Volunteer hours contributed January – November 2026",
		series: months,
		events: sum(ev),
		funded: sum(fu),
		volunteers: 4500
	};
}
var rawCache = null;
function raw() {
	if (!rawCache) rawCache = Promise.all([
		fetch(dejavu_sans_default).then((r) => r.arrayBuffer()),
		fetch(dejavu_sans_bold_default).then((r) => r.arrayBuffer()),
		fetch(maatram_logo_full_default).then((r) => r.arrayBuffer())
	]).then(([font, bold, logo]) => ({
		font,
		bold,
		logo
	}));
	return rawCache;
}
function T(page, s, o) {
	let x = o.x;
	const w = o.font.widthOfTextAtSize(s, o.size);
	if (o.align === "center") x -= w / 2;
	else if (o.align === "right") x -= w;
	page.drawText(s, {
		x,
		y: PH - o.y,
		size: o.size,
		font: o.font,
		color: o.color
	});
}
function fit(s, font, size, maxW) {
	if (font.widthOfTextAtSize(s, size) <= maxW) return s;
	let out = s;
	while (out.length > 1 && font.widthOfTextAtSize(out + "…", size) > maxW) out = out.slice(0, -1);
	return out + "…";
}
function wrap(s, font, size, maxW) {
	const lines = [];
	let cur = "";
	for (const w of s.split(" ")) {
		const t = cur ? `${cur} ${w}` : w;
		if (font.widthOfTextAtSize(t, size) > maxW && cur) {
			lines.push(cur);
			cur = w;
		} else cur = t;
	}
	if (cur) lines.push(cur);
	return lines;
}
var K = .5523;
function roundRectPath(w, h, r) {
	const k = r * K;
	return `M 0 ${r} C 0 ${r - k} ${r - k} 0 ${r} 0 L ${w - r} 0 C ${w - r + k} 0 ${w} ${r - k} ${w} ${r} L ${w} ${h - r} C ${w} ${h - r + k} ${w - r + k} ${h} ${w - r} ${h} L ${r} ${h} C ${r - k} ${h} 0 ${h - r + k} 0 ${h - r} Z`;
}
/** Rounded rectangle whose TOP-LEFT is at top-based coords (x, yTop). */
function roundRect(page, x, yTop, w, h, r, fill, border, bw = 1) {
	page.drawSvgPath(roundRectPath(w, h, r), {
		x,
		y: PH - yTop,
		scale: 1,
		...fill ? { color: fill } : {},
		...border ? {
			borderColor: border,
			borderWidth: bw
		} : {}
	});
}
function sectionTitle(page, bold, title, sub, yTop) {
	page.drawRectangle({
		x: 40,
		y: PH - yTop - 18,
		width: 5,
		height: 18,
		color: YELLOW
	});
	T(page, title, {
		x: 54,
		y: yTop + 13,
		size: 15,
		font: bold,
		color: NAVY
	});
	if (sub) T(page, sub, {
		x: 54,
		y: yTop + 30,
		size: 9.5,
		font: bold,
		color: MUTED
	});
}
function table(page, font, bold, o) {
	const size = o.size ?? 9;
	const W = o.colWidths.reduce((a, b) => a + b, 0);
	const align = o.align ?? o.headers.map(() => "left");
	const xs = [o.x];
	o.colWidths.slice(0, -1).forEach((w) => xs.push(xs[xs.length - 1] + w));
	const pad = 8;
	const anchor = (i) => align[i] === "left" ? xs[i] + pad : align[i] === "right" ? xs[i] + o.colWidths[i] - pad : xs[i] + o.colWidths[i] / 2;
	page.drawRectangle({
		x: o.x,
		y: PH - o.yTop - 22,
		width: W,
		height: 22,
		color: YELLOW
	});
	o.headers.forEach((h, i) => T(page, h, {
		x: anchor(i),
		y: o.yTop + 15,
		size,
		font: bold,
		color: NAVY,
		align: align[i]
	}));
	let y = o.yTop + 22;
	o.rows.forEach((row, ri) => {
		if (ri % 2 === 1) page.drawRectangle({
			x: o.x,
			y: PH - y - o.rowH,
			width: W,
			height: o.rowH,
			color: CREAM
		});
		const baseline = y + o.rowH / 2 + size * .36;
		row.forEach((c, ci) => T(page, fit(c, font, size, o.colWidths[ci] - 16), {
			x: anchor(ci),
			y: baseline,
			size,
			font,
			color: ci === row.length - 1 && align[ci] === "right" ? NAVY : INK,
			align: align[ci]
		}));
		page.drawLine({
			start: {
				x: o.x,
				y: PH - y - o.rowH
			},
			end: {
				x: o.x + W,
				y: PH - y - o.rowH
			},
			thickness: .5,
			color: BORDER
		});
		y += o.rowH;
	});
	if (o.totalRow) {
		page.drawRectangle({
			x: o.x,
			y: PH - y - 20,
			width: W,
			height: 20,
			color: YELLOW_SOFT
		});
		const baseline = y + 13;
		o.totalRow.forEach((c, ci) => c && T(page, c, {
			x: anchor(ci),
			y: baseline,
			size,
			font: bold,
			color: NAVY,
			align: align[ci]
		}));
		y += 20;
	}
	page.drawRectangle({
		x: o.x,
		y: PH - y - .5,
		width: W,
		height: .5,
		color: BORDER
	});
	return y;
}
function chartLine(page, points, color, width) {
	const d = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
	page.drawSvgPath(d, {
		x: 0,
		y: PH,
		scale: 1,
		borderColor: color,
		borderWidth: width
	});
}
function l2p(x, yTop, lx, ly) {
	return {
		x: x + lx,
		y: PH - yTop - ly
	};
}
function lineChart(page, period, cardX, cardYTop, cardW, cardH, font, bold) {
	const L = 56, R = cardW - 20, Tm = 44, Bm = cardH - 66;
	const maxV = Math.max(...period.series.map((s) => s.value));
	const top = Math.ceil(maxV / 250) * 250;
	const step = (R - L) / Math.max(period.series.length - 1, 1);
	const pt = (i, v) => [L + i * step, Tm + (Bm - Tm) * (1 - v / top)];
	for (let g = 0; g <= 5; g++) {
		const v = top / 5 * g;
		const [, gy] = pt(0, v);
		page.drawLine({
			start: l2p(cardX, cardYTop, L, gy),
			end: l2p(cardX, cardYTop, R, gy),
			thickness: .7,
			color: g === 0 ? BORDER : rgb(.933, .941, .957)
		});
		T(page, fmt(v), {
			x: cardX + L - 8,
			y: cardYTop + gy + 3.5,
			size: 8,
			font,
			color: MUTED,
			align: "right"
		});
	}
	const pts = period.series.map((s, i) => pt(i, s.value));
	const area = [
		...pts.map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`),
		`L${pts[pts.length - 1][0].toFixed(1)} ${Bm}`,
		`L${pts[0][0].toFixed(1)} ${Bm}`,
		"Z"
	].join(" ").replace(/^L/, "M");
	page.drawSvgPath(area, {
		x: cardX,
		y: PH - cardYTop,
		scale: 1,
		color: AREA_FILL
	});
	chartLine(page, pts.map(([x, y]) => [cardX + x, cardYTop + y]), YELLOW, 3);
	pts.forEach(([lx, ly], i) => {
		const { x: px, y: py } = l2p(cardX, cardYTop, lx, ly);
		page.drawCircle({
			x: px,
			y: py,
			size: 4,
			color: WHITE,
			borderColor: YELLOW,
			borderWidth: 2.5
		});
		const last = i === pts.length - 1;
		const pillW = 46;
		roundRect(page, cardX + lx - pillW / 2, cardYTop + ly - 30, pillW, 18, 9, last ? YELLOW : WHITE, last ? void 0 : BORDER);
		T(page, fmt(period.series[i].value), {
			x: cardX + lx,
			y: cardYTop + ly - 16.5,
			size: 8.5,
			font: last ? bold : font,
			color: INK,
			align: "center"
		});
		T(page, period.series[i].label, {
			x: cardX + lx,
			y: cardYTop + cardH - 52,
			size: 9,
			font: last ? bold : font,
			color: last ? INK : MUTED,
			align: "center"
		});
	});
}
function pieChart(page, cx, cy, r, font) {
	const total = contributionCategories.reduce((a, c) => a + c.share, 0);
	let angle = 90;
	contributionCategories.forEach((c) => {
		const sweep = c.share / total * 360;
		const segs = 24;
		const pts = [`M 0 0`];
		for (let s = 0; s <= segs; s++) {
			const th = (angle - sweep * s / segs) * Math.PI / 180;
			pts.push(`L${(r * Math.cos(th)).toFixed(2)} ${(-r * Math.sin(th)).toFixed(2)}`);
		}
		pts.push("Z");
		page.drawSvgPath(pts.join(" "), {
			x: cx,
			y: PH - cy,
			scale: 1,
			color: rgb2(c.color)
		});
		angle -= sweep;
	});
	page.drawCircle({
		x: cx,
		y: PH - cy,
		size: r * .42,
		color: WHITE
	});
	T(page, "100%", {
		x: cx,
		y: cy + 3,
		size: 10,
		font,
		color: NAVY,
		align: "center"
	});
}
function header(page, logo, font, bold, period, genDate) {
	const lw = 34, lh = logo.height / logo.width * lw;
	page.drawImage(logo, {
		x: 40,
		y: 787.89,
		width: lw,
		height: lh
	});
	T(page, "Maatram Foundation", {
		x: 78,
		y: 24,
		size: 12,
		font: bold,
		color: NAVY
	});
	T(page, "Report Analytics", {
		x: 78,
		y: 38,
		size: 8.5,
		font,
		color: MUTED
	});
	T(page, `${period.title}  •  ${period.sub}`, {
		x: 555.28,
		y: 24,
		size: 9,
		font: bold,
		color: NAVY,
		align: "right"
	});
	T(page, `Generated on ${genDate}`, {
		x: 555.28,
		y: 38,
		size: 8,
		font,
		color: MUTED,
		align: "right"
	});
	page.drawRectangle({
		x: 40,
		y: 793.89,
		width: 515.28,
		height: 1.5,
		color: YELLOW
	});
}
function footer(page, font, pageNo, total) {
	page.drawLine({
		start: {
			x: 40,
			y: 52
		},
		end: {
			x: 555.28,
			y: 52
		},
		thickness: .7,
		color: BORDER
	});
	T(page, "Maatram Foundation — Report Analytics", {
		x: 40,
		y: 805.89,
		size: 7.5,
		font,
		color: MUTED
	});
	T(page, `Page ${pageNo} of ${total}`, {
		x: 555.28,
		y: 805.89,
		size: 7.5,
		font,
		color: MUTED,
		align: "right"
	});
}
var TOTAL_PAGES = 8;
async function buildReportPdf(period) {
	const { font: fontBytes, bold: boldBytes, logo: logoBytes } = await raw();
	const doc = await PDFDocument.create();
	doc.registerFontkit(fontkit);
	const font = await doc.embedFont(fontBytes, { subset: true });
	const bold = await doc.embedFont(boldBytes, { subset: true });
	const logo = await doc.embedPng(logoBytes);
	const p = periodInfo(period);
	const genDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	const newPage = () => doc.addPage([PW, PH]);
	{
		const page = newPage();
		page.drawRectangle({
			x: 0,
			y: 831.89,
			width: PW,
			height: 10,
			color: YELLOW
		});
		page.drawSvgPath("M 0 52 C 110 4 230 92 330 48 C 430 8 520 62 595.28 30 L 595.28 150 L 0 150 Z", {
			x: 0,
			y: 150,
			color: YELLOW_SOFT
		});
		page.drawSvgPath("M 0 70 C 120 20 240 104 350 58 C 450 18 530 74 595.28 44 L 595.28 140 L 0 140 Z", {
			x: 0,
			y: 140,
			color: YELLOW
		});
		const lw = 96, lh = logo.height / logo.width * lw;
		page.drawImage(logo, {
			x: 499.28 / 2,
			y: 631.89,
			width: lw,
			height: lh
		});
		T(page, "Report Analytics", {
			x: PW / 2,
			y: 290,
			size: 34,
			font: bold,
			color: NAVY,
			align: "center"
		});
		T(page, "Maatram Foundation  •  Volunteering & Community Impact", {
			x: PW / 2,
			y: 316,
			size: 11,
			font,
			color: MUTED,
			align: "center"
		});
		roundRect(page, PW / 2 - 130, 360, 260, 36, 18, YELLOW);
		T(page, `${p.title} — ${p.sub}`, {
			x: PW / 2,
			y: 383,
			size: 12,
			font: bold,
			color: NAVY,
			align: "center"
		});
		T(page, `Reporting period: ${p.range}`, {
			x: PW / 2,
			y: 420,
			size: 10,
			font,
			color: INK,
			align: "center"
		});
		T(page, `Generated on ${genDate}  •  Maatram Admin Dashboard`, {
			x: PW / 2,
			y: 438,
			size: 9,
			font,
			color: MUTED,
			align: "center"
		});
		[
			["Total Volunteers", fmt(p.volunteers)],
			["Events Completed", fmt(p.events)],
			["Funded Amount", rupee(p.funded)]
		].forEach(([label, value], i) => {
			const x = 55 + i * 170;
			roundRect(page, x, 500, 150, 86, 14, WHITE, BORDER);
			page.drawRectangle({
				x: x + 14,
				y: 325.89,
				width: 34,
				height: 5,
				color: YELLOW
			});
			T(page, value, {
				x: x + 75,
				y: 556,
				size: 19,
				font: bold,
				color: NAVY,
				align: "center"
			});
			T(page, label, {
				x: x + 75,
				y: 574,
				size: 9,
				font,
				color: MUTED,
				align: "center"
			});
		});
		T(page, "Prepared for the Maatram Foundation administration team.", {
			x: PW / 2,
			y: 660,
			size: 9,
			font,
			color: MUTED,
			align: "center"
		});
	}
	{
		const page = newPage();
		header(page, logo, font, bold, p, genDate);
		sectionTitle(page, bold, "Impact Overview", `Key volunteering numbers — ${p.title}, ${p.sub}`, 90);
		[
			[
				"V",
				fmt(p.volunteers),
				"Total Volunteers",
				"+18%"
			],
			[
				"E",
				fmt(p.events),
				"Events Completed",
				"+12%"
			],
			[
				"C",
				"12",
				"Current Events",
				"+3 this week"
			],
			[
				"₹",
				rupee(p.funded),
				"Funded Amount",
				"+27%"
			]
		].forEach(([glyph, value, label, delta], i) => {
			const x = 40 + i % 2 * 262, yTop = 128 + Math.floor(i / 2) * 118;
			roundRect(page, x, yTop, 253, 104, 16, WHITE, BORDER);
			page.drawCircle({
				x: x + 34,
				y: PH - yTop - 52,
				size: 18,
				color: YELLOW_SOFT
			});
			T(page, glyph, {
				x: x + 34,
				y: yTop + 57,
				size: 14,
				font: bold,
				color: NAVY,
				align: "center"
			});
			T(page, value, {
				x: x + 62,
				y: yTop + 44,
				size: 20,
				font: bold,
				color: NAVY
			});
			T(page, label, {
				x: x + 62,
				y: yTop + 62,
				size: 9.5,
				font,
				color: MUTED
			});
			T(page, `▲ ${delta}`, {
				x: x + 62,
				y: yTop + 82,
				size: 9,
				font: bold,
				color: GREEN
			});
		});
		roundRect(page, 40, 380, 515, 132, 16, CREAM, rgb(.96, .9, .68));
		T(page, `${p.title}’s Insight`, {
			x: 60,
			y: 408,
			size: 12,
			font: bold,
			color: NAVY
		});
		wrap(`Volunteer participation increased by 18% compared to the previous period. A total of ${fmt(p.events)} events were completed, engaging ${fmt(p.volunteers)} volunteers across 10 partner colleges. ${rupee(p.funded)} was funded to support volunteer contributions, and the top 30 volunteers together logged ${fmt(topContributors30.reduce((a, t) => a + t.hours, 0))} hours of community service.`, font, 9.5, 475).forEach((line, i) => T(page, line, {
			x: 60,
			y: 430 + i * 14,
			size: 9.5,
			font,
			color: INK
		}));
		T(page, `Period: ${p.range}`, {
			x: 60,
			y: 494,
			size: 8.5,
			font: bold,
			color: MUTED
		});
		footer(page, font, 2, TOTAL_PAGES);
	}
	{
		const page = newPage();
		header(page, logo, font, bold, p, genDate);
		sectionTitle(page, bold, "Volunteers Contribution", p.note, 90);
		roundRect(page, 40, 128, 515, 392, 16, WHITE, BORDER);
		lineChart(page, p, 40, 128, 515, 392, font, bold);
		const vals = p.series.map((s) => s.value);
		const first = vals[0], last = vals[vals.length - 1];
		const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
		const growth = Math.round((last - first) / first * 100);
		const facts = [
			`Peak: ${p.series[vals.indexOf(Math.max(...vals))].label} — ${fmt(Math.max(...vals))} hrs`,
			`Growth: +${growth}% since ${p.series[0].label}`,
			`Average: ${fmt(avg)} hrs / month`
		];
		roundRect(page, 40, 534, 515, 56, 14, YELLOW_SOFT);
		facts.forEach((f, i) => T(page, f, {
			x: 62 + i * 168,
			y: 566,
			size: 9.5,
			font: bold,
			color: NAVY
		}));
		footer(page, font, 3, TOTAL_PAGES);
	}
	{
		const page = newPage();
		header(page, logo, font, bold, p, genDate);
		sectionTitle(page, bold, "Contribution Distribution", `Share of volunteer hours by activity type — ${p.title}`, 90);
		roundRect(page, 40, 122, 515, 268, 16, WHITE, BORDER);
		pieChart(page, 165, 256, 96, font);
		contributionCategories.forEach((c, i) => {
			const y = 172 + i * 42;
			page.drawRectangle({
				x: 330,
				y: PH - y - 14,
				width: 14,
				height: 14,
				color: rgb2(c.color)
			});
			T(page, c.name, {
				x: 354,
				y,
				size: 10,
				font: bold,
				color: INK
			});
			T(page, `${c.share}% of hours`, {
				x: 354,
				y: y + 14,
				size: 9,
				font,
				color: MUTED
			});
		});
		[
			["Avg hrs / volunteer", "7.8"],
			["Participation rate", "86%"],
			["Active volunteers", "3,870"]
		].forEach(([label, value], i) => {
			const x = 40 + i * 178;
			roundRect(page, x, 428, 160, 78, 14, WHITE, BORDER);
			page.drawRectangle({
				x: x + 14,
				y: 399.89,
				width: 30,
				height: 4,
				color: YELLOW
			});
			T(page, value, {
				x: x + 80,
				y: 470,
				size: 18,
				font: bold,
				color: NAVY,
				align: "center"
			});
			T(page, label, {
				x: x + 80,
				y: 488,
				size: 9,
				font,
				color: MUTED,
				align: "center"
			});
		});
		roundRect(page, 40, 528, 515, 62, 14, CREAM, rgb(.96, .9, .68));
		T(page, "What this tells us", {
			x: 60,
			y: 552,
			size: 10.5,
			font: bold,
			color: NAVY
		});
		wrap("Environment and Education activities drive nearly two-thirds of all volunteer hours, showing a strong service orientation among student volunteers.", font, 9, 470).forEach((line, i) => T(page, line, {
			x: 60,
			y: 570 + i * 13,
			size: 9,
			font,
			color: INK
		}));
		footer(page, font, 4, TOTAL_PAGES);
	}
	{
		const page = newPage();
		header(page, logo, font, bold, p, genDate);
		sectionTitle(page, bold, "Top Contributed Volunteers", `Top 30 student volunteers by hours — ${p.title}, ${p.sub}`, 90);
		const totalHours = topContributors30.reduce((a, t) => a + t.hours, 0);
		table(page, font, bold, {
			x: 40,
			yTop: 128,
			colWidths: [
				38,
				190,
				216,
				71
			],
			headers: [
				"#",
				"Volunteer",
				"College  •  Year",
				"Hours"
			],
			align: [
				"center",
				"left",
				"left",
				"right"
			],
			rows: topContributors30.map((t) => [
				String(t.rank),
				t.name,
				`${t.college}  •  ${t.year}`,
				`${fmt(t.hours)} hrs`
			]),
			rowH: 17,
			size: 8.5,
			totalRow: [
				"",
				"Total — Top 30 Contributors",
				"",
				`${fmt(totalHours)} hrs`
			]
		});
		T(page, "College and year are shown alongside every volunteer so co-ordinators can spot strong campuses at a glance.", {
			x: 40,
			y: 700,
			size: 8,
			font,
			color: MUTED
		});
		footer(page, font, 5, TOTAL_PAGES);
	}
	{
		const page = newPage();
		header(page, logo, font, bold, p, genDate);
		sectionTitle(page, bold, "Top Performing Alumni", `Alumni contributors and mentors — ${p.title}, ${p.sub}`, 90);
		const events = alumniBoard.reduce((a, t) => a + t.eventsLed, 0);
		const hours = alumniBoard.reduce((a, t) => a + t.hours, 0);
		table(page, font, bold, {
			x: 40,
			yTop: 128,
			colWidths: [
				36,
				132,
				62,
				78,
				92,
				115
			],
			headers: [
				"#",
				"Alumni",
				"Batch",
				"Events Led",
				"Total Hours",
				"Recognition"
			],
			align: [
				"center",
				"left",
				"center",
				"center",
				"right",
				"left"
			],
			rows: alumniBoard.map((t) => [
				String(t.rank),
				t.name,
				t.batch,
				String(t.eventsLed),
				`${fmt(t.hours)} hrs`,
				t.badge
			]),
			rowH: 26,
			size: 9,
			totalRow: [
				"",
				"Total — Top 10 Alumni",
				"",
				String(events),
				`${fmt(hours)} hrs`,
				""
			]
		});
		roundRect(page, 40, 470, 515, 56, 14, YELLOW_SOFT);
		wrap(`Alumni mentors led ${events} events and contributed ${fmt(hours)} hours — recognitions highlight the strongest mentors for the period.`, font, 9, 470).forEach((line, i) => T(page, line, {
			x: 60,
			y: 494 + i * 13,
			size: 9,
			font,
			color: NAVY
		}));
		footer(page, font, 6, TOTAL_PAGES);
	}
	{
		const page = newPage();
		header(page, logo, font, bold, p, genDate);
		sectionTitle(page, bold, "Students Not Contributed Yet", `Registered volunteers with no hours logged in ${p.sub.split(" ").slice(-1)[0] === "2026" ? p.sub : p.sub}`, 90);
		table(page, font, bold, {
			x: 40,
			yTop: 128,
			colWidths: [
				230,
				165,
				120
			],
			headers: [
				"Volunteer",
				"College",
				"Last Participated"
			],
			align: [
				"left",
				"left",
				"center"
			],
			rows: inactiveStudents.map((s) => [
				s.name,
				s.college,
				s.last
			]),
			rowH: 24,
			size: 9
		});
		roundRect(page, 40, 388, 515, 92, 14, CREAM, rgb(.96, .9, .68));
		T(page, "Recommended action", {
			x: 60,
			y: 414,
			size: 10.5,
			font: bold,
			color: NAVY
		});
		wrap("These students have not logged any volunteer hours recently. A re-engagement announcement through Pulse, a low-commitment campus event, or a mentor check-in from a top alumni could bring them back to active volunteering.", font, 9, 480).forEach((line, i) => T(page, line, {
			x: 60,
			y: 434 + i * 13,
			size: 9,
			font,
			color: INK
		}));
		footer(page, font, 7, TOTAL_PAGES);
	}
	{
		const page = newPage();
		header(page, logo, font, bold, p, genDate);
		sectionTitle(page, bold, "Colleges Contributing the Least", "Ranked by total volunteer hours — lowest first", 90);
		const totalAll = collegeContribution.reduce((a, c) => a + c.hours, 0);
		table(page, font, bold, {
			x: 40,
			yTop: 128,
			colWidths: [
				200,
				110,
				125,
				80
			],
			headers: [
				"College",
				"Volunteers",
				"Hours Contributed",
				"Share"
			],
			align: [
				"left",
				"center",
				"right",
				"right"
			],
			rows: collegeContribution.map((c) => [
				c.college,
				String(c.volunteers),
				`${fmt(c.hours)} hrs`,
				`${Math.round(c.hours / totalAll * 100)}%`
			]),
			rowH: 24,
			size: 9,
			totalRow: [
				"All colleges",
				String(collegeContribution.reduce((a, c) => a + c.volunteers, 0)),
				`${fmt(totalAll)} hrs`,
				"100%"
			]
		});
		roundRect(page, 40, 452, 515, 84, 14, YELLOW_SOFT);
		T(page, "Focus areas for next month", {
			x: 60,
			y: 476,
			size: 10.5,
			font: bold,
			color: NAVY
		});
		wrap("TCE Madurai, CIT Coimbatore and SSN Chennai contribute the fewest volunteer hours. Pairing each with a top-performing college such as SKCET for joint events, and announcing campus-specific opportunities through Pulse, should lift participation.", font, 9, 480).forEach((line, i) => T(page, line, {
			x: 60,
			y: 496 + i * 13,
			size: 9,
			font,
			color: INK
		}));
		footer(page, font, 8, TOTAL_PAGES);
	}
	const bytes = await doc.save();
	return new Blob([bytes], { type: "application/pdf" });
}
//#endregion
export { buildReportPdf };
