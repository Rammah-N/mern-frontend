import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/formHook";
import { useHttp } from "../../shared/hooks/httpHook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./PlaceForm.css";
import { AuthContext } from "../../shared/context/authContext";

const API = process.env.REACT_APP_API;

const NewPlace = () => {
	const { loading, error, sendRequest, clearError } = useHttp();
	const auth = useContext(AuthContext);
	console.log(auth);
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
			address: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const history = useHistory();

	const addPlace = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				`${API}/places`,
				"POST",
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
					address: formState.inputs.address.value,
					creator: auth.user.id,
				}),
				{
					"Content-Type": "Application/json",
				}
			);
			history.push("/");
		} catch (error) {}
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />

			<form className="place-form" onSubmit={addPlace}>
				{loading && <LoadingSpinner asOverlay />}
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
		</>
	);
};

export default NewPlace;
