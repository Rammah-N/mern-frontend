import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/formHook";
import Card from "../../shared/components/UIElements/Card";
import { useHttp } from "../../shared/hooks/httpHook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/context/authContext";


const API = process.env.REACT_APP_API;

const UpdatePlace = () => {
	const { user, token } = useContext(AuthContext);
	const { pid } = useParams();
	const [place, setPlace] = useState({});
	const { loading, error, sendRequest, clearError } = useHttp(token);
	const history = useHistory();
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

	useEffect(() => {
		const fetchPlace = async () => {
			try {
				const data = await sendRequest(`${API}/places/${pid}`);
				if (!data.place) {
					setPlace(null);
				} else {
					setPlace(data.place);
					setFormData(
						{
							title: {
								value: data.place.title,
								isValid: true,
							},
							description: {
								value: data.place.description,
								isValid: true,
							},
						},
						true
					);
				}
			} catch (err) {
				setPlace(null);
			}
		};
		fetchPlace();
	}, [setFormData, pid, sendRequest]);
	const updatePlace = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				`${API}/places/${pid}`,
				"PATCH",
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
				}),
				{
					"Content-Type": "Application/json",
				}
			);
			history.push(`/${user.id}/places`);
		} catch (error) {}
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

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<form className="place-form" onSubmit={updatePlace}>
				{loading && <LoadingSpinner asOverlay />}
				{formState.isValid && (
					<>
						<Input
							id="title"
							element="input"
							type="text"
							label="Title"
							validators={[VALIDATOR_REQUIRE()]}
							errorText="Please enter a valid title"
							onInput={inputHandler}
							initialValid={formState.inputs.title.isValid}
							initialValue={formState.inputs.title.value}
						/>
						<Input
							id="description"
							element="textarea"
							label="Description"
							validators={[VALIDATOR_MINLENGTH(5)]}
							errorText="Please enter a valid description at least 5 characters long"
							onInput={inputHandler}
							initialValid={formState.inputs.description.isValid}
							initialValue={formState.inputs.description.value}
						/>
					</>
				)}

				<Button type="submit" disabled={!formState.isValid}>
					Update Place
				</Button>
			</form>
		</>
	);
};

export default UpdatePlace;
