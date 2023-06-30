import React, { useContext } from "react";

import { AuthContext } from "../../context/authContext";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import Button from "../FormElements/Button";

const NavLinks = () => {
	const auth = useContext(AuthContext);
	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					All Users
				</NavLink>
			</li>
			{auth.isLoggedIn && (
				<>
					<li>
						<NavLink to={`/${auth.user?.id}/places`}>My Places</NavLink>
					</li>
					<li>
						<NavLink to="/places/new">Add Place</NavLink>
					</li>
					<li>
						<Button inverse onClick={auth.logout}>
							Logout
						</Button>
					</li>
				</>
			)}
			{!auth.isLoggedIn && (
				<li>
					<NavLink to="/auth">Authenticate</NavLink>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
