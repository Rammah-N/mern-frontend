import React from "react";

import Button from "../../shared/components/FormElements/Button";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/formHook";
import "./PlaceForm.css";

const NewPlace = () => {
	const [formState, inputHandler] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
			address: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const addPlace = (event) => {
		event.preventDefault();
		console.log(formState);
	};

	return (
		<form className="place-form" onSubmit={addPlace}>
			<Input
				id="title"
				element="input"
				type="text"
				label="Title"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title"
				onInput={inputHandler}
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText="Please enter a valid description at least 5 characters long"
				onInput={inputHandler}
			/>
			<Input
				id="address"
				element="input"
				label="Address"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid address"
				onInput={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				Add Place
			</Button>
		</form>
	);
};

export default NewPlace;
