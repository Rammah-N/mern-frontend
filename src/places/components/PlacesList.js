import React from "react";

import Card from "../../shared/components/UIElements/Card";
import "./PlacesList.css";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
	if (places.length === 0) {
		return (
			<div className="place-list center">
				<Card>
					<h2>No places found</h2>
					<button> Share place</button>
				</Card>
			</div>
		);
	}

	return (
		<ul className="place-list">
			{places.map((place) => (
				<PlaceItem place={place} key={place.id} />
			))}
		</ul>
	);
};

export default PlacesList;
