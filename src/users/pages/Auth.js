import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/formHook";
import Card from "../../shared/components/UIElements/Card";
import "./Auth.css";
import Button from "../../shared/components/FormElements/Button";

const Auth = () => {
	const [loginMode, setLoginMode] = useState(true);
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

	const login = (event) => {
		event.preventDefault();
		console.log(formState);
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
		<Card className="authentication">
			{loginMode ? <h2>Login required</h2> : <h2>Sign Up</h2>}
			<hr />
			<br />
			<form className="place-form" onSubmit={login}>
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
					errorText="Please enter a valid password, at least 8 characters long "
					validators={[VALIDATOR_MINLENGTH(8)]}
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
	);
};

export default Auth;
