import React from "react";
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
function App() {
	return (
		<Router>
			<MainNavigation />
			<main>
				<Switch>
					<Route path="/places/new">
						<NewPlace />
					</Route>

					<Route path="/places/:pid">
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
			</main>
		</Router>
	);
}

export default App;
