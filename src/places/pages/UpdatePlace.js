import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/formHook";
import Card from "../../shared/components/UIElements/Card";

const places = [
	{
		id: 1,
		image: "https://dummyimage.com/400x400/000/fff",
		title: "Park",
		description: "A beautiful park with lush greenery and walking trails.",
		address: "123 Main St, City, Country",
		creator: "1",
		coordinates: { lat: 40.7128, lng: -74.006 },
	},
	{
		id: 2,
		image: "https://dummyimage.com/400x400/000/fff",
		title: "Restaurant",
		description: "A cozy restaurant with delicious cuisine and friendly staff.",
		address: "456 Elm St, City, Country",
		creator: "2",
		coordinates: { lat: 34.0522, lng: -118.2437 },
	},
	{
		id: 3,
		image: "https://dummyimage.com/400x400/000/fff",
		title: "Museum",
		description: "An intriguing museum showcasing art and history exhibits.",
		address: "789 Oak St, City, Country",
		creator: "3",
		coordinates: { lat: 51.5074, lng: -0.1278 },
	},
];

const UpdatePlace = () => {
	const { pid } = useParams();
	const [loading, setLoading] = useState(true);
	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
		},
		false
	);
	const place = places.find((place) => place.id == pid);

	useEffect(() => {
		if (place) {
			setFormData(
				{
					title: {
						value: place.title,
						isValid: true,
					},
					description: {
						value: place.description,
						isValid: true,
					},
				},
				true
			);
		}
		setLoading(false);
	}, [setFormData, place]);

	const updatePlace = (event) => {
		event.preventDefault();
		console.log(formState);
	};

	if (!place) {
		return (
			<div className="center">
				<Card>
					<h2>Place could not be found!</h2>
				</Card>
			</div>
		);
	}

	if (loading) {
		return <h1>Loading</h1>;
	}

	return (
		<form className="place-form" onSubmit={updatePlace}>
			<Input
				id="title"
				element="input"
				type="text"
				label="Title"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title"
				onInput={inputHandler}
				initialValid={formState.inputs.title.isValid}
				initialValue={formState.inputs["title"].value}
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText="Please enter a valid description at least 5 characters long"
				onInput={inputHandler}
				initialValid={formState.inputs.description.isValid}
				initialValue={formState.inputs["description"].value}
			/>

			<Button type="submit" disabled={!formState.isValid}>
				Update Place
			</Button>
		</form>
	);
};

export default UpdatePlace;
