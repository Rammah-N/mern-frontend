import React, { useState, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const center = {
	lat: 51.505,
	lng: -0.09,
};

function DraggableMarker({ setLocation }) {
	const [draggable, setDraggable] = useState(false);
	const [position, setPosition] = useState(center);
	const markerRef = useRef(null);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
					setLocation(marker.getLatLng());
				}
			},
		}),
		[]
	);
	const toggleDraggable = useCallback(() => {
		setDraggable((d) => !d);
	}, []);

	return (
		<Marker
			draggable={draggable}
			eventHandlers={eventHandlers}
			position={position}
			ref={markerRef}>
			<Popup minWidth={90}>
				<span onClick={toggleDraggable}>
					{draggable
						? "Marker is draggable"
						: "Click here to make marker draggable"}
				</span>
			</Popup>
		</Marker>
	);
}

const LocationPicker = ({ setLocation }) => {
	return (
		<MapContainer
			center={[51.505, -0.09]}
			zoom={13}
			scrollWheelZoom={false}
			style={{ width: "100%", height: 300, margin: "20px 0" }}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<DraggableMarker setLocation={setLocation} />
		</MapContainer>
	);
};

export default LocationPicker;
