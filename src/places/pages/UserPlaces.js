import React from "react";
import PlacesList from "../components/PlacesList";
import { useParams } from "react-router-dom";

const UserPlaces = () => {
	const { userId } = useParams();
	console.log(userId);
	const places = [
		{
			id: 1,
			image: "https://dummyimage.com/400x400/000/fff",
			title: "Park",
			description: "A beautiful park with lush greenery and walking trails.",
			address: "123 Main St, City, Country",
			creator: "1",
			coordinates: { latitude: 40.7128, longitude: -74.006 },
		},
		{
			id: 2,
			image: "https://dummyimage.com/400x400/000/fff",
			title: "Restaurant",
			description:
				"A cozy restaurant with delicious cuisine and friendly staff.",
			address: "456 Elm St, City, Country",
			creator: "2",
			coordinates: { latitude: 34.0522, longitude: -118.2437 },
		},
		{
			id: 3,
			image: "https://dummyimage.com/400x400/000/fff",
			title: "Museum",
			description: "An intriguing museum showcasing art and history exhibits.",
			address: "789 Oak St, City, Country",
			creator: "3",
			coordinates: { latitude: 51.5074, longitude: -0.1278 },
		},
	];

	return (
		<PlacesList places={places.filter((place) => place.creator === userId)} />
	);
};

export default UserPlaces;
