import { eventGuide } from '@/data/mock';

type Op = { name: string; category: string; location: string; date: string; time: string; joined: number; capacity: number; description: string };

async function loadImage(src: string) {
  const res = await fetch(src);
  const blob = await res.blob();
  return await new Promise<string>((r) => { const fr = new FileReader(); fr.onload = () => r(fr.result as string); fr.readAsDataURL(blob); });
}

export async function buildGuidePdf(op: Op) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210, M = 18, CW = W - M * 2;
  const yellow: [number, number, number] = [245, 184, 0];
  const dark: [number, number, number] = [26, 26, 26];
  const grey: [number, number, number] = [100, 100, 100];
  let y = 0;

  const header = async () => {
    doc.setFillColor(...yellow); doc.rect(0, 0, W, 4, 'F');
    try { doc.addImage(await loadImage('/assets/brand/maatram-foundation-logo.png'), 'PNG', M, 10, 37, 16.4); } catch { /* logo optional */ }
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...grey);
    doc.text('EVENT GUIDE', W - M, 17, { align: 'right' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
    doc.text('Maatram Volunteer Programme', W - M, 22, { align: 'right' });
    doc.setDrawColor(230, 230, 230); doc.line(M, 31, W - M, 31);
    y = 40;
  };
  const ensure = (h: number) => { if (y + h > 282) { doc.addPage(); doc.setFillColor(...yellow); doc.rect(0, 0, W, 4, 'F'); y = 18; } };

  await header();
  doc.setFont('helvetica', 'bold'); doc.setFontSize(22); doc.setTextColor(...dark);
  doc.text(op.name, M, y); y += 3;
  doc.setFillColor(...yellow); doc.rect(M, y, 30, 1.4, 'F'); y += 8;
  doc.setFont('helvetica', 'normal'); doc.setFontSize(11); doc.setTextColor(...grey);
  const desc = doc.splitTextToSize(op.description, CW); doc.text(desc, M, y); y += desc.length * 5 + 6;

  // info grid
  const info: [string, string][] = [['Category', op.category], ['Location', op.location], ['Date', op.date], ['Time', op.time], ['Volunteers', `${op.joined} / ${op.capacity} joined`], ['Slots Left', String(op.capacity - op.joined)]];
  const cw = (CW - 6) / 3, ch = 18;
  info.forEach(([k, v], i) => {
    const x = M + (i % 3) * (cw + 3), yy = y + Math.floor(i / 3) * (ch + 3);
    doc.setFillColor(255, 248, 225); doc.roundedRect(x, yy, cw, ch, 2, 2, 'F');
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...grey); doc.text(k.toUpperCase(), x + 4, yy + 6.5);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); doc.setTextColor(...dark); doc.text(v, x + 4, yy + 13);
  });
  y += ch * 2 + 13;

  eventGuide.forEach((g, i) => {
    ensure(22);
    doc.setFillColor(...yellow); doc.circle(M + 4, y - 1.5, 4, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...dark); doc.text(String(i + 1), M + 4, y, { align: 'center' });
    doc.setFontSize(14); doc.text(g.title, M + 12, y); y += 8;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); doc.setTextColor(60, 60, 60);
    const lines = g.text.split('\n');
    const bulleted = g.title !== 'Purpose';
    lines.forEach((line) => {
      const t = line.replace(' — ', '  —  ').replace(' · ', ', ');
      const wrapped = doc.splitTextToSize(t, CW - 18);
      ensure(wrapped.length * 5 + 2);
      if (bulleted) { doc.setFillColor(...yellow); doc.circle(M + 14, y - 1.3, 0.9, 'F'); }
      doc.text(wrapped, M + (bulleted ? 18 : 12), y);
      y += wrapped.length * 5 + 1;
    });
    y += 2;
    if (i < eventGuide.length - 1) { doc.setDrawColor(238, 238, 238); doc.line(M, y, W - M, y); }
    y += 5;
  });

  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...grey);
    doc.text('Maatram Foundation  ·  Thank you for volunteering!', M, 290);
    doc.text(`Page ${p} of ${pages}`, W - M, 290, { align: 'right' });
  }
  return doc.output('blob');
}
