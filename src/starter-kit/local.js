const index = require('../index');
const config = require('./config');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: process.env.HEADLESS,
        slowMo: process.env.SLOWMO_MS,
        dumpio: !!config.DEBUG,
        // use chrome installed by puppeteer
    });
    await index.getFinishedPage(browser, process.env.URL)
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
    await browser.close();
})();
