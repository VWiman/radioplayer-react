import React from "react";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Stations from "./components/Stations";

const url = "https://api.sr.se/api/v2/channels?format=json&size=52";

export default function App() {
	// Create the states
	const [stationsData, setStationsData] = useState([]);
	const [userText, setUserText] = useState("");
	const [stationsLoaded, setStationsLoaded] = useState(false);

	async function fetchStations() {
		// Await the data from the url, save it to result
		const result = await fetch(url);
		// Parse json for text and save to rawStationsData
		const rawStationsData = await result.json();
		// Set stationData to rawStationData
		setStationsData(rawStationsData.channels);
		// Set stationsLoaded state to true
		setStationsLoaded(true);
	}

	if (!stationsLoaded) {
		console.log("Fetching stations...");
		// Fetch the stations once
		fetchStations();
	}

	useEffect(() => {
		console.log(userText);
	}, [userText]);

	useEffect(() => {
		console.log(stationsData);
	}, [stationsData]);

	const handleStationImage = (station) => {
		// Handle missing image
		if (station.image) {
			return station.image;
		} else
			return "https://static-cdn.sr.se/images/4866/92556cd3-3254-4424-91bb-6ba511f60f4c.jpg?preset=api-default-square";
	};

	return (
		<section className="main">
			<h1 className="headline">RADIOPLAYER</h1>
			<div className="search-box">
				<label className="label" htmlFor="input-text">
					Search:&nbsp;
				</label>
				<input
					className="text-input"
					type="text"
					id="input-text"
					onChange={(e) => {
						setUserText(e.target.value);
					}}
				/>
			</div>
			<ul className="list">
				{stationsLoaded ? (
					<Stations stationsData={stationsData} handleStationImage={handleStationImage} userText={userText} />
				) : (
					<Skeleton count={4} height={200} />
				)}
			</ul>
		</section>
	);
}
