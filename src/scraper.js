const puppeteer = require("puppeteer");
const path = require('path');
const fs = require("fs");

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

	//   console.log(allNodes);

	let count = 0;
	let resultArr = [];
	let holderArr = {siteLocation: '', vaccineType: '', location: '', availability: ''};
	for (let i = 0; i < allNodes.length; i++) {
		let curr = allNodes[i];
		if (count === 4) {
			count = 0;
			resultArr.push(holderArr);
            holderArr = {siteLocation: '', vaccineType: '', location: '', availability: ''};
		}

        if(count === 0){
            holderArr['siteLocation'] = allNodes[i];
        }

        if(count === 1){
            holderArr['vaccineType'] = allNodes[i];
        }

        if(count === 2){
            holderArr['location'] = allNodes[i];
        }

        if(count === 3){
            holderArr['availability'] = allNodes[i];
        }

		count++;
		console.log("pushing curr", curr, count);
	}

	console.log(resultArr);
	await browser.close();

    const data = JSON.stringify({ sites: resultArr }, null, 2);
    const filename = path.join('data', 'ny_state.json');
    fs.writeFileSync(path.resolve(filename), data);
}

startScraper();
