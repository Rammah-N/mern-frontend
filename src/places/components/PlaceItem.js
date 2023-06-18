import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import "./PlaceItem.css";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

const PlaceItem = ({ place }) => {
	const [showMap, setShowMap] = useState(false);

	const openMap = () => setShowMap(true);
	const closeMap = () => setShowMap(false);

	return (
		<>
			<Modal
				show={showMap}
				onCancel={closeMap}
				header={place.address}
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={<Button onClick={closeMap}>Close Map</Button>}>
				<div className="map-container">
					<h2>Map</h2>
				</div>
			</Modal>
			<li className="place-item">
				<Card>
					<div className="place-item__image">
						<img src={place.image} alt={place.title} />
					</div>
					<div className="place-item__info">
						<h2>{place.title}</h2>
						<h3>{place.address}</h3>
						<p>{place.description}</p>
					</div>
					<div className="place-item__actions">
						<Button inverse onClick={openMap}>
							View On Map
						</Button>
						<Button to={`/places/${place.id}`}>Edit</Button>
						<Button danger>Delete</Button>
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
