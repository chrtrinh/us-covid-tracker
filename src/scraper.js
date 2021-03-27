const puppeteer = require("puppeteer");

async function startScraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://am-i-eligible.covid19vaccine.health.ny.gov/", {
    waitUntil: "networkidle2",
  });

  console.log("before run");

  const allNodes = await page.evaluate(() => {
    let holderArray = [];
    let result = [];
    let counter = 1;
    let elements = [
      ...document.querySelectorAll("#statePods_table tbody tr td"),
    ];
    return elements.map((element) => element.textContent);
  });

  console.log(allNodes);

  await browser.close();
}

startScraper();
