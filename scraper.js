const { chromium } = require('playwright');

const urls = Array.from({ length: 10 }, (_, i) => `https://sanand0.github.io/tdsdata/js_table/?seed=${72 + i}`);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url);
    const numbers = await page.$$eval("table td", tds =>
      tds.map(td => parseFloat(td.textContent.trim())).filter(n => !isNaN(n))
    );
    const pageTotal = numbers.reduce((sum, n) => sum + n, 0);
    console.log(`Total for ${url}: ${pageTotal}`);
    grandTotal += pageTotal;
  }

  console.log(`GRAND TOTAL: ${grandTotal}`);
  await browser.close();
})();
