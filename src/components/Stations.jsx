export default function Stations(props) {
   
    const stationsData = props.stationsData
    const handleStationImage = props.handleStationImage
    const userText = props.userText

	const filteredStations = stationsData.filter(
		(station) =>
			(station =
				station.name.toLowerCase().includes(userText.toLowerCase()) ||
				station.tagline.toLowerCase().includes(userText.toLowerCase()))
    );
    
	return filteredStations.map((station) => (
		<li className="channel" key={station.id} style={{ backgroundColor: "#" + station.color }}>
			<img className="image" src={handleStationImage(station)} alt="Station image" width={200} height={200} />
			<div className="channel-inner">
				<h2 className="name">{station.name}</h2>
				<p className="text">{station.tagline}</p>
				<audio className="audio" controls>
					<source src={station.liveaudio.url} type="audio/mpeg" />
				</audio>
			</div>
		</li>
	));
}
