import React, { Suspense } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { useAuth } from "./shared/hooks/authHook";
import { AuthContext } from "./shared/context/authContext";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./users/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const Auth = React.lazy(() => import("./users/pages/Auth"));

function App() {
	const { token, login, logout, user } = useAuth();
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
				<main>
					<Suspense
						fallback={
							<div className="center">
								<LoadingSpinner />
							</div>
						}>
						{routes}
					</Suspense>
				</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
