const puppeteer = require('puppeteer');

async function startScraper() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://am-i-eligible.covid19vaccine.health.ny.gov/');
    
console.log('before run')

const [data] = await page.$x('//*[@id="statePods_table"]/tbody/tr[1]/td[1]');
const src = await data.getProperty('src');
const srcTxt = await src.jsonValue();
console.log(srcTxt);

await browser.close();
}

startScraper();