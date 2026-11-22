const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 775, height: 868 } });
    
    const consoleLogs = [];
    page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));
    page.on('pageerror', err => consoleLogs.push({ type: 'pageerror', text: err.toString() }));

    await page.goto('http://localhost:8081/admin', { waitUntil: 'networkidle' });

    console.log('Console logs / errors:');
    console.log(consoleLogs);

    const elementsInfo = await page.evaluate(() => {
      const main = document.querySelector('main');
      if (!main) return 'No main';
      return Array.from(main.children).map(el => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return {
          tagName: el.tagName,
          className: el.className,
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity
        };
      });
    });

    console.log('Elements in main:');
    console.log(JSON.stringify(elementsInfo, null, 2));

    await page.screenshot({ path: 'C:/Users/sanja/.gemini/antigravity/brain/4f8e0598-26dd-4bc7-8283-1bfc0b85d9d9/scratch/playwright_admin_775x868.png' });
    console.log('Screenshot saved.');

    await browser.close();
  } catch (err) {
    console.error('Error running test:', err);
  }
})();
