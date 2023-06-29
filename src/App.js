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
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const login = useCallback((uid) => {
		setLoggedIn(true);
		setUser(uid);
	}, []);
	const logout = useCallback(() => {
		setLoggedIn(false);
		setUser(null);
	}, []);

	let routes;

	if (loggedIn) {
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
		<AuthContext.Provider value={{ isLoggedIn: loggedIn, user, login, logout }}>
			<Router>
				<MainNavigation />
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
