import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  // Go to gallery page
  await page.goto('http://localhost:5174/gallery', { waitUntil: 'networkidle0' });
  
  // Take a full page screenshot
  await page.screenshot({ path: 'gallery_screenshot2.png', fullPage: true });
  
  await browser.close();
  console.log('Screenshot saved to gallery_screenshot2.png');
})();
