import React from "react";
import Card from "../../shared/components/UIElements/Card";
import "./PlaceItem.css";
import Button from "../../shared/components/FormElements/Button";

const PlaceItem = ({ place }) => {
	return (
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
					<Button inverse>View On Map</Button>
					<Button to={`/places/${place.id}`}>Edit</Button>
					<Button danger>Delete</Button>
				</div>
			</Card>
		</li>
	);
};

export default PlaceItem;
