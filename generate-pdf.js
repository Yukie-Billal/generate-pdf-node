const puppeteer = require('puppeteer');
const fs = require('fs')
const ejs = require('ejs')

function compileTemplate(filename) {
  return ejs.compile(fs.readFileSync(`${filename}`, 'utf-8'))
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();

  // Contoh HTML yang akan diubah menjadi PDF
  const compiled = compileTemplate('./template.ejs')
  const htmlContent = compiled({ name: "Name from compiled template" })

  // Set konten HTML pada halaman
  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

  // Mengekspor ke file PDF
  await page.pdf({ path: `output.pdf`, format: 'A4' , printBackground: true});

  await browser.close();
})();
