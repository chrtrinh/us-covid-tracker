const puppeteer = require("puppeteer");

async function startScraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://am-i-eligible.covid19vaccine.health.ny.gov/");

  console.log("before run");

  const allNodes = await page.evaluate(() => {
    const elements = [
      ...document.querySelectorAll(
        "#cntContent_lstMain tr:not(:first-child) td:nth-child(2)"
      ),
    ];
    return elements.map((element) => element.textContent);
  });

  console.log(allNodes);

  await browser.close();
}

startScraper();
