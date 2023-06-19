import React, { useEffect, useRef } from "react";

import "./Map.css";
const Map = (props) => {
	const mapRef = useRef();

	const { center, zoom } = props;
	console.log(window.ol);
	useEffect(() => {
		const map = new window.ol.Map({
			target: mapRef.current.id,
			layers: [
				new window.ol.layer.Tile({ source: new window.ol.source.OSM() }),
			],
			view: new window.ol.View({
				center: window.ol.proj.fromLonLat([center.lng, center.lat]),
				zoom: zoom,
				maxZoom: 18,
			}),
		});
		const layer = new window.ol.layer.Vector({
			source: new window.ol.source.Vector({
				features: [
					new window.ol.Feature({
						geometry: new window.ol.geom.Point(
							window.ol.proj.fromLonLat([center.lng, center.lat])
						),
					}),
				],
			}),
		});
		map.addLayer(layer);
	}, [center, zoom]);

	return (
		<div
			ref={mapRef}
			className={`map ${props.className}`}
			style={props.style}
			id="map">
			Map
		</div>
	);
};

export default Map;
