import React, { useState, useCallback } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/authContext";

function App() {
	const [token, setToken] = useState(false);
	const [user, setUser] = useState(null);
	const login = useCallback((user) => {
		setToken(user.token);
		setUser(user);
	}, []);
	const logout = useCallback(() => {
		setToken(null);
		setUser(null);
	}, []);

	let routes;

	if (token) {
		routes = (
			<Switch>
				<Route path="/places/new" exact>
					<NewPlace />
				</Route>

				<Route path="/places/:pid" exact>
					<UpdatePlace />
				</Route>

				<Route path="/:userId/places">
					<UserPlaces />
				</Route>

				<Route path="/" exact>
					<Users />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/auth">
					<Auth />
				</Route>

				<Route path="/:userId/places">
					<UserPlaces />
				</Route>

				<Route path="/" exact>
					<Users />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{ isLoggedIn: !!token, token, user, login, logout }}>
			<Router>
				<MainNavigation />
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
