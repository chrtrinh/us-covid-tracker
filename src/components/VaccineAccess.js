import React, { useEffect, useState } from "react";
import axios from "axios";
// import startScraper from "../scraper";

function VaccineAccess() {
	let [sites, setSites] = useState([]);

	useEffect(async () => {
		console.log("starting scrapper");
		let data = await axios.get("http://localhost:4000/sites");
		console.log("this is the return data ---> ", data);
		console.log("ending scrapper");
	}, []);

	return (
		<div className="vaccineAccess">
			<h1> hello</h1>
		</div>
	);
}

export default VaccineAccess;
