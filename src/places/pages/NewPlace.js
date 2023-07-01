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
import { AuthContext } from "../../shared/context/authContext";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import "./PlaceForm.css";
const API = process.env.REACT_APP_API;

const NewPlace = () => {
	const auth = useContext(AuthContext);
	const { loading, error, sendRequest, clearError } = useHttp(auth.token);
	console.log(auth);
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
			image: {
				value: null,
				isValid: false,
			},
		},
		false
	);

	const history = useHistory();

	const addPlace = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("title", formState.inputs.title.value);
		formData.append("description", formState.inputs.description.value);
		formData.append("address", formState.inputs.address.value);
		formData.append("creator", auth.user.id);
		formData.append("image", formState.inputs.image.value);
		try {
			await sendRequest(`${API}/places`, "POST", formData);
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
				<ImageUpload
					id="image"
					center
					onInput={inputHandler}
					errorText="Please upload an image"
				/>
				<Button type="submit" disabled={!formState.isValid}>
					Add Place
				</Button>
			</form>
		</>
	);
};

export default NewPlace;
