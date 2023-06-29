import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/formHook";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/authContext";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttp } from "../../shared/hooks/httpHook";
import "./Auth.css";

const API = process.env.REACT_APP_API;
console.log(API);

const Auth = () => {
	const auth = useContext(AuthContext);
	const [loginMode, setLoginMode] = useState(true);
	const { loading, error, sendRequest, clearError } = useHttp();
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const login = async (event) => {
		event.preventDefault();
		const credentials = {
			email: formState.inputs.email.value,
			password: formState.inputs.password.value,
		};
		try {
			await sendRequest(
				`${API}/users/login`,
				"POST",
				JSON.stringify(credentials),
				{
					"Content-Type": "application/json",
				}
			);

			auth.login();
		} catch (err) {}
	};

	const signUp = async (event) => {
		event.preventDefault();

		const user = {
			name: formState.inputs.name.value,
			email: formState.inputs.email.value,
			password: formState.inputs.password.value,
		};
		try {
			await sendRequest(`${API}/users/signup`, "POST", JSON.stringify(user), {
				"Content-Type": "application/json",
			});

			auth.login();
		} catch (err) {}
	};

	const switchMode = () => {
		if (!loginMode) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: "",
						isValid: false,
					},
				},
				false
			);
		}
		setLoginMode((prevState) => !prevState);
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<Card className="authentication">
				{loading && <LoadingSpinner asOverlay />}
				{loginMode ? <h2>Login required</h2> : <h2>Sign Up</h2>}
				<hr />
				<br />
				<form className="place-form" onSubmit={loginMode ? login : signUp}>
					{!loginMode && (
						<Input
							id="name"
							element="input"
							label="Full Name"
							type="text"
							title="name"
							errorText="Please enter a name"
							validators={[VALIDATOR_REQUIRE()]}
							onInput={inputHandler}
						/>
					)}
					<Input
						id="email"
						element="input"
						label="E-Mail"
						type="email"
						title="email"
						errorText="Please enter a valid email"
						validators={[VALIDATOR_EMAIL()]}
						onInput={inputHandler}
					/>
					<Input
						id="password"
						element="input"
						label="Password"
						type="password"
						title="password"
						errorText="Please enter a valid password, at least 6 characters long "
						validators={[VALIDATOR_MINLENGTH(6)]}
						onInput={inputHandler}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						{!loginMode ? "Sign Up" : "Login"}
					</Button>
				</form>

				<Button inverse onClick={switchMode}>
					{loginMode ? "Sign Up" : "Login"}
				</Button>
			</Card>
		</>
	);
};

export default Auth;
