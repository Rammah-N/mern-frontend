import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
const Map = (props) => {
	const mapRef = useRef();

	const { center, zoom, title } = props;
	/* 	useEffect(() => {
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
	}, [center, zoom]); */

	return (
		<MapContainer
			center={center}
			zoom={zoom}
			scrollWheelZoom={true}
			style={{ width: "100%", height: 300 }}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={center}>
				<Popup>{title}</Popup>
			</Marker>
		</MapContainer>
	);
};

export default Map;
