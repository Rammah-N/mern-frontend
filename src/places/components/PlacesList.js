import React from "react";

import Card from "../../shared/components/UIElements/Card";
import "./PlacesList.css";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";

const PlacesList = ({ places }) => {
	if (places.length === 0) {
		return (
			<div className="place-list center">
				<Card>
					<h2>No places found</h2>
					<Button to="/places/new">Share Place</Button>
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
